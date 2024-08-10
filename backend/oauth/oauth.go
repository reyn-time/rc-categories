package oauth

import (
	"context"
	"crypto/rand"
	_ "embed"
	"encoding/base64"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"log"
	"net/http"
	"net/url"
	"time"

	"connectrpc.com/connect"
	"github.com/gorilla/securecookie"
	"github.com/reyn-time/rc-categories/backend/db"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
	"google.golang.org/protobuf/reflect/protoreflect"
)

//go:embed secrets.json
var secretsJson []byte

type OauthConfig struct {
	CallbackURL    string `env:"CALLBACK_URL, default=http://localhost:8080/auth/google/callback"`
	RedirectURL    string `env:"REDIRECT_URL, default=http://localhost:5173/"`
	CookieDomain   string `env:"COOKIE_DOMAIN"`
	CookiePath     string `env:"COOKIE_PATH, default=/"`
	CookieSameSite int    `env:"COOKIE_SAMESITE, default=4"`
	CookieName     string `env:"COOKIE_NAME, default=holly-hub-auth"`
	CookieHashKey  []byte `env:"COOKIE_HASH_KEY, default=Q0xjDNmaP67W0ylbSvnJhwBWvCuS9jr0MPdW2f2dTJBzyKoB3qIljekW4sEODTZf"`
	CookieBlockKey []byte `env:"COOKIE_BLOCK_KEY, default=NIgqG9Qhwur8V4qZb5gn5NdYkswKp6tr"`
}

type OauthService struct {
	Queries           *db.Queries
	Config            *OauthConfig
	SC                *securecookie.SecureCookie
	googleOauthConfig *oauth2.Config
}

type oauthSecret struct {
	ClientID     string `json:"client_id"`
	ClientSecret string `json:"client_secret"`
}

type UserCtxKey struct{}

func NewOauthServiceHandler(service OauthService) (string, http.Handler) {
	var secret oauthSecret
	json.Unmarshal(secretsJson, &secret)
	service.googleOauthConfig = &oauth2.Config{
		RedirectURL:  service.Config.CallbackURL,
		ClientID:     secret.ClientID,
		ClientSecret: secret.ClientSecret,
		Scopes: []string{
			"https://www.googleapis.com/auth/userinfo.email",
			"https://www.googleapis.com/auth/userinfo.profile",
		},
		Endpoint: google.Endpoint,
	}

	return "/auth/google/", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		switch r.URL.Path {
		case "/auth/google/login":
			service.OauthGoogleLogin(w, r)
		case "/auth/google/callback":
			service.OauthGoogleCallback(w, r)
		default:
			http.NotFound(w, r)
		}
	})
}

func (o *OauthService) NewAuthInterceptors() []connect.Interceptor {
	interceptor1 := func(next connect.UnaryFunc) connect.UnaryFunc {
		return connect.UnaryFunc(func(
			ctx context.Context,
			req connect.AnyRequest,
		) (connect.AnyResponse, error) {
			// Extracts user email from cookie if existent
			httpReq := http.Request{Header: req.Header().Clone()}
			authData, err := httpReq.Cookie(o.Config.CookieName)
			if err != nil {
				return next(ctx, req)
			}
			encryptedVal := authData.Value
			dict := map[string]string{}
			o.SC.Decode(o.Config.CookieName, encryptedVal, &dict)
			email := dict["email"]
			expiryDateString := dict["expiryDate"]

			// Reject user if the cookie expired.
			if expiryDate, err := time.Parse(time.RFC3339, expiryDateString); err != nil || expiryDate.Before(time.Now()) {
				return next(ctx, req)
			}

			// Reads user from DB based on email, and set it in ctx.
			user, err := o.Queries.GetUser(ctx, email)
			if err != nil {
				return next(ctx, req)
			}
			newCtx := context.WithValue(ctx, UserCtxKey{}, user)
			return next(newCtx, req)
		})
	}

	interceptor2 := func(next connect.UnaryFunc) connect.UnaryFunc {
		return connect.UnaryFunc(func(
			ctx context.Context,
			req connect.AnyRequest,
		) (connect.AnyResponse, error) {
			// Check if auth enabled in RPC method
			authEnabled := false
			methodDescriptor, ok := req.Spec().Schema.(protoreflect.MethodDescriptor)
			if ok {
				methodDescriptor.Options().ProtoReflect().Range(func(key protoreflect.FieldDescriptor, val protoreflect.Value) bool {
					if key.FullName() == "auth.v1.auth_enabled" {
						authEnabled = val.Interface().(bool)
						return false
					}
					return true
				})
			}

			if authEnabled {
				userRaw := ctx.Value(UserCtxKey{})
				if userRaw == nil {
					return nil, connect.NewError(
						connect.CodeUnauthenticated,
						errors.New("unauthenticated user"),
					)
				}
			}
			return next(ctx, req)
		})
	}

	return []connect.Interceptor{connect.UnaryInterceptorFunc(interceptor1), connect.UnaryInterceptorFunc(interceptor2)}
}

func (o *OauthService) OauthGoogleLogin(w http.ResponseWriter, r *http.Request) {
	// Create OAuth state by randomly generating a byte string
	b := make([]byte, 16)
	rand.Read(b)
	oauthState := base64.URLEncoding.EncodeToString(b)

	u := o.googleOauthConfig.AuthCodeURL(oauthState, oauth2.AccessTypeOffline)
	http.Redirect(w, r, u, http.StatusTemporaryRedirect)
}

func (o *OauthService) OauthGoogleCallback(w http.ResponseWriter, r *http.Request) {
	// TODO: On error, tell frontend that something is wrong.
	data, err := o.getUserDataFromGoogle(r.FormValue("code"))
	if err != nil {
		log.Println(err.Error())
		http.Redirect(w, r, o.Config.RedirectURL, http.StatusTemporaryRedirect)
		return
	}

	// Update user record in database.
	if _, err := o.Queries.UpdateUser(r.Context(), db.UpdateUserParams{
		Email:    data.Email,
		Name:     data.Name,
		PhotoUrl: data.Picture,
	}); err != nil {
		log.Println(err.Error())
		http.Redirect(w, r, o.Config.RedirectURL, http.StatusTemporaryRedirect)
		return
	}

	expiryDate := time.Now().Add(time.Hour * 24 * 7) // One week
	encoded, err := o.SC.Encode(o.Config.CookieName, map[string]string{
		"email":      data.Email,
		"expiryDate": expiryDate.UTC().Format(time.RFC3339),
	})
	if err != nil {
		log.Println(err.Error())
		http.Redirect(w, r, o.Config.RedirectURL, http.StatusTemporaryRedirect)
		return
	}
	cookie := http.Cookie{
		Name:     o.Config.CookieName,
		Value:    encoded,
		Domain:   o.Config.CookieDomain,
		Path:     o.Config.CookiePath,
		MaxAge:   60 * 60 * 24 * 7, // 1 week
		Secure:   true,
		HttpOnly: true,
		SameSite: http.SameSite(o.Config.CookieSameSite),
	}
	http.SetCookie(w, &cookie)
	http.Redirect(w, r, o.Config.RedirectURL, http.StatusTemporaryRedirect)
}

type userInfoResponse struct {
	ID              string `json:"id"`
	Email           string `json:"email"`
	IsEmailVerified bool   `json:"verified_email"`
	Name            string `json:"name"`
	GivenName       string `json:"given_name"`
	FamilyName      string `json:"family_name"`
	Picture         string `json:"picture"`
	Locale          string `json:"locale"`
}

func (o *OauthService) getUserDataFromGoogle(code string) (*userInfoResponse, error) {
	// Get OAuth token.
	token, err := o.googleOauthConfig.Exchange(context.Background(), code)
	if err != nil {
		return nil, fmt.Errorf("code exchange wrong: %s", err.Error())
	}

	// Using the OAuth token, get user info from the Google API.
	userInfoUrl, err := url.Parse("https://www.googleapis.com/oauth2/v2/userinfo")
	if err != nil {
		return nil, fmt.Errorf("oauth userinfo endpoint error: %s", err.Error())
	}
	q := userInfoUrl.Query()
	q.Add("oauth_token", token.AccessToken)
	userInfoUrl.RawQuery = q.Encode()
	response, err := http.Get(userInfoUrl.String())
	if err != nil {
		return nil, fmt.Errorf("failed getting user info: %s", err.Error())
	}
	defer response.Body.Close()
	contents, err := io.ReadAll(response.Body)
	if err != nil {
		return nil, fmt.Errorf("failed read response: %s", err.Error())
	}

	var res userInfoResponse
	err = json.Unmarshal(contents, &res)
	if err != nil {
		return nil, fmt.Errorf("failed unmarshalling response: %s", err.Error())
	}

	return &res, nil
}
