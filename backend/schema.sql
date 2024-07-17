CREATE SCHEMA reorder;
CREATE TYPE reorder.video_status AS ENUM (
    'approved',
    'archived',
    'pending',
    'in_progress',
    'in_review'
);
CREATE TABLE reorder.categories (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    parent_id INTEGER REFERENCES reorder.categories(id),
    rank INTEGER NOT NULL DEFAULT 0,
    UNIQUE (name)
);
CREATE TABLE reorder.users (
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL,
    name TEXT NOT NULL,
    photo_url TEXT NOT NULL,
    UNIQUE (email)
);
CREATE TABLE reorder.videos (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    youtube_id TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    status reorder.video_status NOT NULL DEFAULT 'pending',
    editor INTEGER REFERENCES reorder.users(id),
    UNIQUE (youtube_id)
);
CREATE TABLE reorder.video_intervals (
    id SERIAL PRIMARY KEY,
    video_id INTEGER NOT NULL REFERENCES reorder.videos(id),
    start_time REAL NOT NULL,
    end_time REAL NOT NULL,
    description TEXT
);
CREATE TABLE reorder.video_interval_categories (
    id SERIAL PRIMARY KEY,
    video_interval_id INTEGER NOT NULL REFERENCES reorder.video_intervals(id) ON DELETE CASCADE,
    category_id INTEGER NOT NULL REFERENCES reorder.categories(id)
);
CREATE TYPE reorder.patient_status AS ENUM (
    'active',
    'on_hold',
    'blacklisted'
);
CREATE TYPE reorder.gender AS ENUM ('male', 'female');
CREATE TABLE reorder.patients (
    id SERIAL PRIMARY KEY,
    initials TEXT NOT NULL,
    gender reorder.gender NOT NULL,
    status reorder.patient_status NOT NULL DEFAULT 'active',
    UNIQUE (initials)
);
CREATE TABLE reorder.patient_appointments (
    id SERIAL PRIMARY KEY,
    start_time TIMESTAMP NOT NULL,
    patient_id INTEGER NOT NULL REFERENCES reorder.patients(id)
)