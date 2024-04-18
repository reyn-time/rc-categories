// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.26.0
// source: query.sql

package db

import (
	"context"

	"github.com/jackc/pgx/v5/pgtype"
)

const deleteIntervalCategories = `-- name: DeleteIntervalCategories :exec
DELETE FROM reorder.video_interval_categories
WHERE video_interval_id = $1
`

func (q *Queries) DeleteIntervalCategories(ctx context.Context, videoIntervalID int32) error {
	_, err := q.db.Exec(ctx, deleteIntervalCategories, videoIntervalID)
	return err
}

const listCategories = `-- name: ListCategories :many
SELECT id, name, description, parent_id, rank
FROM reorder.categories
`

func (q *Queries) ListCategories(ctx context.Context) ([]ReorderCategory, error) {
	rows, err := q.db.Query(ctx, listCategories)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []ReorderCategory
	for rows.Next() {
		var i ReorderCategory
		if err := rows.Scan(
			&i.ID,
			&i.Name,
			&i.Description,
			&i.ParentID,
			&i.Rank,
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

const listIntervals = `-- name: ListIntervals :many
SELECT id, video_id, start_time, end_time, description, video_interval_id, array_agg
FROM reorder.video_intervals v
    JOIN (
        select video_interval_id,
            array_agg(category_id)
        from reorder.video_interval_categories
        group by video_interval_id
    ) c ON v.id = c.video_interval_id
WHERE video_id = $1
`

type ListIntervalsRow struct {
	ID              int32
	VideoID         int32
	StartTime       int32
	EndTime         int32
	Description     pgtype.Text
	VideoIntervalID int32
	ArrayAgg        interface{}
}

func (q *Queries) ListIntervals(ctx context.Context, videoID int32) ([]ListIntervalsRow, error) {
	rows, err := q.db.Query(ctx, listIntervals, videoID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []ListIntervalsRow
	for rows.Next() {
		var i ListIntervalsRow
		if err := rows.Scan(
			&i.ID,
			&i.VideoID,
			&i.StartTime,
			&i.EndTime,
			&i.Description,
			&i.VideoIntervalID,
			&i.ArrayAgg,
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

const listVideos = `-- name: ListVideos :many
SELECT id, name, youtube_id, created_at, status
FROM reorder.videos
ORDER BY created_at DESC
`

func (q *Queries) ListVideos(ctx context.Context) ([]ReorderVideo, error) {
	rows, err := q.db.Query(ctx, listVideos)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []ReorderVideo
	for rows.Next() {
		var i ReorderVideo
		if err := rows.Scan(
			&i.ID,
			&i.Name,
			&i.YoutubeID,
			&i.CreatedAt,
			&i.Status,
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

const postInterval = `-- name: PostInterval :one
INSERT INTO reorder.video_intervals (video_id, start_time, end_time, description)
VALUES ($1, $2, $3, $4)
RETURNING id
`

type PostIntervalParams struct {
	VideoID     int32
	StartTime   int32
	EndTime     int32
	Description pgtype.Text
}

func (q *Queries) PostInterval(ctx context.Context, arg PostIntervalParams) (int32, error) {
	row := q.db.QueryRow(ctx, postInterval,
		arg.VideoID,
		arg.StartTime,
		arg.EndTime,
		arg.Description,
	)
	var id int32
	err := row.Scan(&id)
	return id, err
}

const postIntervalCategory = `-- name: PostIntervalCategory :exec
INSERT INTO reorder.video_interval_categories (video_interval_id, category_id)
VALUES ($1, $2)
`

type PostIntervalCategoryParams struct {
	VideoIntervalID int32
	CategoryID      int32
}

func (q *Queries) PostIntervalCategory(ctx context.Context, arg PostIntervalCategoryParams) error {
	_, err := q.db.Exec(ctx, postIntervalCategory, arg.VideoIntervalID, arg.CategoryID)
	return err
}

const updateInterval = `-- name: UpdateInterval :exec
UPDATE reorder.video_intervals
SET start_time = $2,
    end_time = $3,
    description = $4
WHERE id = $1
`

type UpdateIntervalParams struct {
	ID          int32
	StartTime   int32
	EndTime     int32
	Description pgtype.Text
}

func (q *Queries) UpdateInterval(ctx context.Context, arg UpdateIntervalParams) error {
	_, err := q.db.Exec(ctx, updateInterval,
		arg.ID,
		arg.StartTime,
		arg.EndTime,
		arg.Description,
	)
	return err
}

const updateVideoStatus = `-- name: UpdateVideoStatus :exec
UPDATE reorder.videos
SET status = $2
WHERE id = $1
`

type UpdateVideoStatusParams struct {
	ID     int32
	Status ReorderVideoStatus
}

func (q *Queries) UpdateVideoStatus(ctx context.Context, arg UpdateVideoStatusParams) error {
	_, err := q.db.Exec(ctx, updateVideoStatus, arg.ID, arg.Status)
	return err
}
