package user

import (
	"context"
	"net/http"
	"time"

	"connectrpc.com/connect"
	"github.com/gorilla/securecookie"
	"github.com/reyn-time/rc-categories/backend/db"
	userpb "github.com/reyn-time/rc-categories/backend/gen/proto/user/v1"
	"github.com/reyn-time/rc-categories/backend/oauth"
)

type UserService struct {
	Config  *oauth.OauthConfig
	SC      *securecookie.SecureCookie
	Queries *db.Queries
}

func (s *UserService) GetUser(ctx context.Context, req *connect.Request[userpb.GetUserRequest]) (*connect.Response[userpb.GetUserResponse], error) {
	// TODO: Move this to an authentication middleware
	httpReq := http.Request{Header: req.Header().Clone()}
	authData, err := httpReq.Cookie(s.Config.CookieName)
	if err != nil {
		return nil, err
	}
	encryptedVal := authData.Value
	dict := map[string]string{}
	s.SC.Decode(s.Config.CookieName, encryptedVal, &dict)
	email := dict["email"]
	user, err := s.Queries.GetUser(ctx, email)
	if err != nil {
		return nil, err
	}

	res := connect.NewResponse(&userpb.GetUserResponse{
		User: &userpb.User{
			Id:       user.ID,
			Email:    user.Email,
			Name:     user.Name,
			PhotoUrl: user.PhotoUrl,
		},
	})
	return res, nil
}

func (s *UserService) LogoutUser(ctx context.Context, req *connect.Request[userpb.LogoutUserRequest]) (*connect.Response[userpb.LogoutUserResponse], error) {
	// Remove auth cookie
	cookie := http.Cookie{
		Name:     s.Config.CookieName,
		Value:    "",
		Domain:   s.Config.CookieDomain,
		Path:     s.Config.CookiePath,
		Expires:  time.Unix(0, 0), // Set a time in the past to clear the cookie
		Secure:   true,
		HttpOnly: true,
		SameSite: http.SameSite(s.Config.CookieSameSite),
	}

	res := connect.NewResponse(&userpb.LogoutUserResponse{})
	res.Header().Add("Set-Cookie", cookie.String())
	return res, nil
}
