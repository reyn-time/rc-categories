-- name: ListVideos :many
SELECT *
FROM videos
ORDER BY created_at DESC;