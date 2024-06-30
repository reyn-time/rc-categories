package user

import (
	"context"
	"net/http"

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
