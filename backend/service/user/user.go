package user

import (
	"context"
	"log"
	"net/http"

	"connectrpc.com/connect"
	"github.com/gorilla/securecookie"
	userpb "github.com/reyn-time/rc-categories/backend/gen/proto/user/v1"
	"github.com/reyn-time/rc-categories/backend/oauth"
)

type UserService struct {
	Config *oauth.OauthConfig
}

func (s *UserService) GetUser(ctx context.Context, req *connect.Request[userpb.GetUserRequest]) (*connect.Response[userpb.GetUserResponse], error) {
	rawCookies := req.Header().Get("Cookie")
	header := http.Header{}
	header.Add("Cookie", rawCookies)
	httpReq := http.Request{Header: header}
	authData, err := httpReq.Cookie(s.Config.CookieName)
	if err != nil {
		return nil, err
	}
	encryptedVal := authData.Value
	dict := map[string]string{}
	sc := securecookie.New(s.Config.CookieHashKey, s.Config.CookieBlockKey)
	sc.Decode(s.Config.CookieName, encryptedVal, &dict)
	log.Println(dict)

	res := connect.NewResponse(&userpb.GetUserResponse{})
	return res, nil
}
