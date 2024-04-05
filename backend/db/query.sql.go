// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.26.0
// source: query.sql

package db

import (
	"context"
)

const listVideos = `-- name: ListVideos :many
SELECT id, name, youtube_id, created_at
FROM videos
ORDER BY created_at DESC
`

func (q *Queries) ListVideos(ctx context.Context) ([]Video, error) {
	rows, err := q.db.Query(ctx, listVideos)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []Video
	for rows.Next() {
		var i Video
		if err := rows.Scan(
			&i.ID,
			&i.Name,
			&i.YoutubeID,
			&i.CreatedAt,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}
