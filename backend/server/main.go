package main

import (
	"context"
	"log"
	"net/http"

	"connectrpc.com/connect"
	video "github.com/reyn-time/rc-categories/gen/proto/video/v1"
	pb "github.com/reyn-time/rc-categories/gen/proto/video/v1/videov1connect"
	"golang.org/x/net/http2"
	"golang.org/x/net/http2/h2c"
)

type server struct{}

func (s *server) ListVideo(ctx context.Context, req *connect.Request[video.ListVideoRequest]) (*connect.Response[video.ListVideoResponse], error) {
	log.Printf("received request: %v\n", req)
	return connect.NewResponse(&video.ListVideoResponse{
		Videos: []*video.Video{},
	}), nil
}

func main() {
	mux := http.NewServeMux()
	path, handler := pb.NewVideoServiceHandler(&server{})
	mux.Handle(path, handler)
	err := http.ListenAndServe(
		"localhost:8080",
		h2c.NewHandler(mux, &http2.Server{}),
	)
	log.Printf("listen failed: %v\n", err)
}
