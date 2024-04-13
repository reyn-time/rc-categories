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