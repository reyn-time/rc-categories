package main

import (
	"context"
	"embed"
	"io/fs"
	"log"
	"net/http"

	connectcors "connectrpc.com/cors"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/reyn-time/rc-categories/backend/db"

	categoryconn "github.com/reyn-time/rc-categories/backend/gen/proto/category/v1/categoryv1connect"
	intervalconn "github.com/reyn-time/rc-categories/backend/gen/proto/interval/v1/intervalv1connect"
	videoconn "github.com/reyn-time/rc-categories/backend/gen/proto/video/v1/videov1connect"
	"github.com/reyn-time/rc-categories/backend/service/category"
	"github.com/reyn-time/rc-categories/backend/service/interval"
	"github.com/reyn-time/rc-categories/backend/service/video"
	"github.com/rs/cors"
	"github.com/sethvargo/go-envconfig"
	"golang.org/x/net/http2"
	"golang.org/x/net/http2/h2c"
)

type Config struct {
	PostgresConnString string `env:"POSTGRES_CONN_STR, default=user=postgres password=password sslmode=disable"`
}

var (
	//go:embed dist/*
	web embed.FS
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

	var c Config
	if err := envconfig.Process(ctx, &c); err != nil {
		log.Fatal(err)
	}

	conn, err := pgxpool.New(ctx, c.PostgresConnString)
	if err != nil {
		log.Printf("postgres failed: %v\n", err)
		return
	}
	defer conn.Close()

	queries := db.New(conn)

	api := http.NewServeMux()
	api.Handle(videoconn.NewVideoServiceHandler(&video.VideoService{
		Queries: queries,
	}))
	api.Handle(categoryconn.NewCategoryServiceHandler(&category.CategoryService{
		Queries: queries,
	}))
	api.Handle(intervalconn.NewIntervalServiceHandler(&interval.IntervalService{
		Conn:    conn,
		Queries: queries,
	}))

	mux := http.NewServeMux()

	dist, _ := fs.Sub(web, "dist")
	mux.Handle("/", http.FileServer(http.FS(dist)))
	mux.Handle("/grpc/", http.StripPrefix("/grpc", api))

	log.Printf("Server started! Lovely jubbly.")

	err = http.ListenAndServe(
		":8080",
		withCORS(h2c.NewHandler(mux, &http2.Server{})),
	)
	log.Printf("listen failed: %v\n", err)
}
