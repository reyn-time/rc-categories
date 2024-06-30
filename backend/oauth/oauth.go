package oauth

import (
	"context"
	"crypto/rand"
	_ "embed"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"net/url"

	"github.com/gorilla/securecookie"
	"github.com/reyn-time/rc-categories/backend/db"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
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

func (o *OauthService) OauthGoogleLogin(w http.ResponseWriter, r *http.Request) {
	// Create OAuth state by randomly generating a byte string
	b := make([]byte, 16)
	rand.Read(b)
	oauthState := base64.URLEncoding.EncodeToString(b)

	u := o.googleOauthConfig.AuthCodeURL(oauthState, oauth2.AccessTypeOffline)
	http.Redirect(w, r, u, http.StatusTemporaryRedirect)
}

func (o *OauthService) OauthGoogleCallback(w http.ResponseWriter, r *http.Request) {
	data, err := o.getUserDataFromGoogle(r.FormValue("code"))
	if err != nil {
		log.Println(err.Error())
		http.Redirect(w, r, o.Config.RedirectURL, http.StatusTemporaryRedirect)
		return
	}

	// Update user record in database.
	if err = o.Queries.UpsertUser(context.TODO(), db.UpsertUserParams{
		Email:    data.Email,
		Name:     data.Name,
		PhotoUrl: data.Picture,
	}); err != nil {
		log.Println(err.Error())
		http.Redirect(w, r, o.Config.RedirectURL, http.StatusTemporaryRedirect)
		return
	}

	encoded, err := o.SC.Encode(o.Config.CookieName, map[string]string{
		"email": data.Email,
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
