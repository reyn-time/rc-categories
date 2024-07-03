-- name: ListVideos :many
SELECT v.*,
    u.id as user_id,
    u.email,
    u.name as user_name,
    u.photo_url
FROM reorder.videos v
    LEFT JOIN reorder.users u ON v.editor = u.id
ORDER BY created_at DESC;
-- name: UpdateVideoStatus :exec
UPDATE reorder.videos
SET status = $2
WHERE id = ANY($1::integer []);
-- name: UpdateVideoEditor :exec
UPDATE reorder.videos
SET editor = $2
WHERE id = $1;
-- name: ListCategories :many
SELECT *
FROM reorder.categories;
-- name: ListIntervals :many
SELECT *
FROM reorder.video_intervals v
    JOIN (
        select video_interval_id,
            array_agg(category_id)
        from reorder.video_interval_categories
        group by video_interval_id
    ) c ON v.id = c.video_interval_id
WHERE video_id = $1
ORDER BY v.start_time;
-- name: PostInterval :one
INSERT INTO reorder.video_intervals (video_id, start_time, end_time, description)
VALUES ($1, $2, $3, $4)
RETURNING id;
-- name: PostIntervalCategory :exec
INSERT INTO reorder.video_interval_categories (video_interval_id, category_id)
VALUES ($1, $2);
-- name: UpdateInterval :exec
UPDATE reorder.video_intervals
SET start_time = $2,
    end_time = $3,
    description = $4
WHERE id = $1;
-- name: DeleteIntervalCategories :exec
DELETE FROM reorder.video_interval_categories
WHERE video_interval_id = $1;
-- name: DeleteInterval :exec
DELETE FROM reorder.video_intervals
WHERE id = $1;
-- name: ListUsers :many
SELECT *
FROM reorder.users;
-- name: GetUser :one
SELECT *
FROM reorder.users
WHERE email = $1;
-- name: UpsertUser :exec
INSERT INTO reorder.users (email, name, photo_url)
VALUES ($1, $2, $3) ON CONFLICT (email) DO
UPDATE
SET name = $2,
    photo_url = $3;