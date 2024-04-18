-- name: ListVideos :many
SELECT *
FROM reorder.videos
ORDER BY created_at DESC;
-- name: UpdateVideoStatus :exec
UPDATE reorder.videos
SET status = $2
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
WHERE video_id = $1;
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