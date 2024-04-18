CREATE SCHEMA reorder;
CREATE TYPE reorder.video_status AS ENUM ('approved', 'archived', 'pending');
CREATE TABLE reorder.videos (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    youtube_id TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    status reorder.video_status NOT NULL DEFAULT 'pending',
    UNIQUE (youtube_id)
);
CREATE TABLE reorder.categories (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    parent_id INTEGER REFERENCES reorder.categories(id),
    rank INTEGER NOT NULL DEFAULT 0,
    UNIQUE (name)
);
CREATE TABLE reorder.video_intervals (
    id SERIAL PRIMARY KEY,
    video_id INTEGER NOT NULL REFERENCES reorder.videos(id),
    start_time INTEGER NOT NULL,
    end_time INTEGER NOT NULL,
    description TEXT
);
CREATE TABLE reorder.video_interval_categories (
    id SERIAL PRIMARY KEY,
    video_interval_id INTEGER NOT NULL REFERENCES reorder.video_intervals(id),
    category_id INTEGER NOT NULL REFERENCES reorder.categories(id)
);