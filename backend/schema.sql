CREATE TABLE videos (
    id BIGSERIAL PRIMARY KEY,
    name text NOT NULL,
    youtube_id text NOT NULL,
    created_at TIMESTAMP NOT NULL
);