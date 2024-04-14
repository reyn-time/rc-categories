package main

import (
	"context"
	"log"
	"net/http"

	connectcors "connectrpc.com/cors"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/reyn-time/rc-categories/backend/db"

	categoryconn "github.com/reyn-time/rc-categories/backend/gen/proto/category/v1/categoryv1connect"
	videoconn "github.com/reyn-time/rc-categories/backend/gen/proto/video/v1/videov1connect"
	"github.com/reyn-time/rc-categories/backend/service/category"
	"github.com/reyn-time/rc-categories/backend/service/video"
	"github.com/rs/cors"
	"golang.org/x/net/http2"
	"golang.org/x/net/http2/h2c"
)

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
	mux.Handle(videoconn.NewVideoServiceHandler(&video.VideoService{
		Queries: queries,
	}))
	mux.Handle(categoryconn.NewCategoryServiceHandler(&category.CategoryService{
		Queries: queries,
	}))
	err = http.ListenAndServe(
		"localhost:8080",
		withCORS(h2c.NewHandler(mux, &http2.Server{})),
	)
	log.Printf("listen failed: %v\n", err)
}
