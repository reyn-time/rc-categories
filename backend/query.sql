-- name: ListVideos :many
SELECT *
FROM reorder.videos
ORDER BY created_at DESC;