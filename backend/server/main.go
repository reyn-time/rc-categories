package main

import (
	"context"
	"embed"
	"io/fs"
	"log"
	"net/http"
	"os"
	"path"
	"strings"

	"connectrpc.com/connect"
	connectcors "connectrpc.com/cors"
	"github.com/gorilla/securecookie"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/reyn-time/rc-categories/backend/db"

	categoryconn "github.com/reyn-time/rc-categories/backend/gen/proto/category/v1/categoryv1connect"
	intervalconn "github.com/reyn-time/rc-categories/backend/gen/proto/interval/v1/intervalv1connect"
	pconn "github.com/reyn-time/rc-categories/backend/gen/proto/patient/v1/patientv1connect"
	paconn "github.com/reyn-time/rc-categories/backend/gen/proto/patientappointment/v1/patientappointmentv1connect"
	userconn "github.com/reyn-time/rc-categories/backend/gen/proto/user/v1/userv1connect"
	videoconn "github.com/reyn-time/rc-categories/backend/gen/proto/video/v1/videov1connect"
	"github.com/reyn-time/rc-categories/backend/oauth"
	"github.com/reyn-time/rc-categories/backend/service/category"
	"github.com/reyn-time/rc-categories/backend/service/interval"
	"github.com/reyn-time/rc-categories/backend/service/patient"
	"github.com/reyn-time/rc-categories/backend/service/patientappointment"
	"github.com/reyn-time/rc-categories/backend/service/user"
	"github.com/reyn-time/rc-categories/backend/service/video"
	"github.com/rs/cors"
	"github.com/sethvargo/go-envconfig"
	"golang.org/x/net/http2"
	"golang.org/x/net/http2/h2c"
)

type Config struct {
	PostgresConnString string             `env:"POSTGRES_CONN_STR, default=user=postgres password=password sslmode=disable"`
	Environment        string             `env:"ENV, default=development"`
	OauthConfig        *oauth.OauthConfig `env:", prefix=OAUTH_"`
}

var (
	//go:embed dist/*
	web embed.FS
)

func withCORS(h http.Handler) http.Handler {
	middleware := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:5173"},
		AllowedMethods:   []string{"POST", "OPTIONS"},
		AllowedHeaders:   connectcors.AllowedHeaders(),
		ExposedHeaders:   connectcors.ExposedHeaders(),
		AllowCredentials: true,
	})
	return middleware.Handler(h)
}

func frontendHandler() http.Handler {
	// TODO: gzip dist files
	dist, _ := fs.Sub(web, "dist")
	fs := http.FileServer(http.FS(dist))

	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path == "/" {
			fs.ServeHTTP(w, r)
			return
		}
		f, err := dist.Open(strings.TrimPrefix(path.Clean(r.URL.Path), "/"))
		if err == nil {
			defer f.Close()
		}
		if os.IsNotExist(err) {
			r.URL.Path = "/"
		}
		fs.ServeHTTP(w, r)
	})
}

func main() {
	ctx := context.Background()

	var c Config
	if err := envconfig.Process(ctx, &c); err != nil {
		log.Fatal(err)
	}
	sc := securecookie.New(c.OauthConfig.CookieHashKey, c.OauthConfig.CookieBlockKey)

	conn, err := pgxpool.New(ctx, c.PostgresConnString)
	if err != nil {
		log.Printf("postgres failed: %v\n", err)
		return
	}
	defer conn.Close()

	queries := db.New(conn)

	oauthService := oauth.OauthService{Queries: queries, Config: c.OauthConfig, SC: sc}
	interceptors := connect.WithInterceptors(oauthService.NewAuthInterceptors()...)

	api := http.NewServeMux()
	api.Handle(videoconn.NewVideoServiceHandler(&video.VideoService{
		Queries: queries,
	}, interceptors))
	api.Handle(categoryconn.NewCategoryServiceHandler(&category.CategoryService{
		Queries: queries,
	}, interceptors))
	api.Handle(intervalconn.NewIntervalServiceHandler(&interval.IntervalService{
		Conn:    conn,
		Queries: queries,
	}, interceptors))
	api.Handle(userconn.NewUserServiceHandler(&user.UserService{
		Queries: queries,
		Config:  c.OauthConfig,
		SC:      sc,
	}, interceptors))
	api.Handle(paconn.NewPatientAppointmentServiceHandler(&patientappointment.PatientAppointmentService{
		Queries: queries,
	}, interceptors))
	api.Handle(pconn.NewPatientServiceHandler(&patient.PatientService{
		Queries: queries,
	}, interceptors))

	mux := http.NewServeMux()

	mux.Handle("/", frontendHandler())
	mux.Handle("/grpc/", http.StripPrefix("/grpc", api))
	mux.Handle(oauth.NewOauthServiceHandler(oauthService))
	mux.Handle("/calendar/", http.StripPrefix("/calendar", patientappointment.CalendarHandler(queries)))

	log.Printf("Server started! Lovely jubbly.")

	handler := h2c.NewHandler(mux, &http2.Server{})
	if c.Environment == "development" {
		handler = withCORS(handler)
	}

	err = http.ListenAndServe(
		":8080",
		handler,
	)
	log.Printf("listen failed: %v\n", err)
}
