package main

import (
	"context"
	"log"
	"net/http"

	"connectrpc.com/connect"
	connectcors "connectrpc.com/cors"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/reyn-time/rc-categories/backend/db"
	video "github.com/reyn-time/rc-categories/backend/gen/proto/video/v1"
	videoconn "github.com/reyn-time/rc-categories/backend/gen/proto/video/v1/videov1connect"
	"github.com/rs/cors"
	"golang.org/x/net/http2"
	"golang.org/x/net/http2/h2c"
	"google.golang.org/protobuf/types/known/timestamppb"
)

type VideoService struct {
	queries *db.Queries
}

func (s *VideoService) ListVideo(ctx context.Context, req *connect.Request[video.ListVideoRequest]) (*connect.Response[video.ListVideoResponse], error) {
	videosDB, err := s.queries.ListVideos(ctx)

	if err != nil {
		return nil, err
	}

	statusMapping := map[db.ReorderVideoStatus]video.VideoStatus{
		db.ReorderVideoStatusPending:  video.VideoStatus_Pending,
		db.ReorderVideoStatusApproved: video.VideoStatus_Approved,
		db.ReorderVideoStatusArchived: video.VideoStatus_Archived,
	}

	videos := make([]*video.Video, len(videosDB))
	for i, v := range videosDB {
		videos[i] = &video.Video{
			Id:        v.ID,
			Name:      v.Name,
			YoutubeId: v.YoutubeID,
			CreatedAt: timestamppb.New(v.CreatedAt.Time),
			Status:    statusMapping[v.Status],
		}
	}

	res := connect.NewResponse(&video.ListVideoResponse{
		Videos: videos,
	})
	return res, nil
}

func (s *VideoService) ChangeVideoStatus(ctx context.Context, req *connect.Request[video.ChangeVideoStatusRequest]) (*connect.Response[video.ChangeVideoStatusResponse], error) {
	err := s.queries.UpdateVideoStatus(ctx, db.UpdateVideoStatusParams{
		ID:     req.Msg.Id,
		Status: db.ReorderVideoStatus(req.Msg.Status),
	})
	if err != nil {
		return nil, err
	}

	res := connect.NewResponse(&video.ChangeVideoStatusResponse{})
	return res, nil
}

func withCORS(h http.Handler) http.Handler {
	middleware := cors.New(cors.Options{
		AllowedOrigins: []string{"http://localhost:5173"},
		AllowedMethods: []string{"POST", "OPTIONS"},
		AllowedHeaders: connectcors.AllowedHeaders(),
		ExposedHeaders: connectcors.ExposedHeaders(),
	})
	return middleware.Handler(h)
}

func main() {
	ctx := context.Background()
	conn, err := pgxpool.New(ctx, "user=postgres sslmode=disable password=password")
	if err != nil {
		return
	}
	defer conn.Close()

	queries := db.New(conn)

	mux := http.NewServeMux()
	path, handler := videoconn.NewVideoServiceHandler(&VideoService{
		queries: queries,
	})
	mux.Handle(path, handler)
	err = http.ListenAndServe(
		"localhost:8080",
		withCORS(h2c.NewHandler(mux, &http2.Server{})),
	)
	log.Printf("listen failed: %v\n", err)
}
