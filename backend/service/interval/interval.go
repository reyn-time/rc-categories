package interval

import (
	"context"
	"fmt"

	"connectrpc.com/connect"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/reyn-time/rc-categories/backend/db"
	intervalpb "github.com/reyn-time/rc-categories/backend/gen/proto/interval/v1"
)

type IntervalService struct {
	Conn    *pgxpool.Pool
	Queries *db.Queries
}

func (s *IntervalService) PostInterval(ctx context.Context, req *connect.Request[intervalpb.PostIntervalRequest]) (*connect.Response[intervalpb.PostIntervalResponse], error) {
	tx, err := s.Conn.BeginTx(ctx, pgx.TxOptions{})
	if err != nil {
		return nil, err
	}
	defer tx.Rollback(ctx)
	qtx := s.Queries.WithTx(tx)
	intervalID, err := qtx.PostInterval(ctx, db.PostIntervalParams{
		VideoID:   req.Msg.Interval.VideoId,
		StartTime: req.Msg.Interval.StartTime,
		EndTime:   req.Msg.Interval.EndTime,
		Description: pgtype.Text{
			String: req.Msg.Interval.Description,
			Valid:  true,
		},
	})
	if err != nil {
		return nil, err
	}
	for _, categoryId := range req.Msg.Interval.CategoryIds {
		err = qtx.PostIntervalCategory(ctx, db.PostIntervalCategoryParams{
			VideoIntervalID: intervalID,
			CategoryID:      categoryId,
		})
		if err != nil {
			return nil, err
		}
	}
	err = tx.Commit(ctx)
	if err != nil {
		return nil, err
	}
	return &connect.Response[intervalpb.PostIntervalResponse]{}, nil
}

func (s *IntervalService) ListInterval(ctx context.Context, req *connect.Request[intervalpb.ListIntervalRequest]) (*connect.Response[intervalpb.ListIntervalResponse], error) {
	intervals, err := s.Queries.ListIntervals(ctx, req.Msg.VideoId)
	if err != nil {
		return nil, err
	}

	intervalPb := make([]*intervalpb.Interval, len(intervals))
	for i, interval := range intervals {
		arr, ok := interval.ArrayAgg.([]interface{})
		if !ok {
			return nil, fmt.Errorf("unexpected type %T for ArrayAgg", interval.ArrayAgg)
		}
		categoryIds := make([]int32, len(arr))
		for j, v := range arr {
			switch typedValue := v.(type) {
			case int32:
				categoryIds[j] = typedValue
			default:
				return nil, fmt.Errorf("unexpected type %T for ArrayAgg[%d]", typedValue, j)
			}
		}

		intervalPb[i] = &intervalpb.Interval{
			Id:          interval.ID,
			VideoId:     interval.VideoID,
			Description: interval.Description.String,
			StartTime:   interval.StartTime,
			EndTime:     interval.EndTime,
			CategoryIds: categoryIds,
		}
	}

	return connect.NewResponse(&intervalpb.ListIntervalResponse{
		Intervals: intervalPb,
	}), nil
}

func (s *IntervalService) UpdateInterval(ctx context.Context, req *connect.Request[intervalpb.UpdateIntervalRequest]) (*connect.Response[intervalpb.UpdateIntervalResponse], error) {
	tx, err := s.Conn.BeginTx(ctx, pgx.TxOptions{})
	if err != nil {
		return nil, err
	}
	defer tx.Rollback(ctx)
	qtx := s.Queries.WithTx(tx)
	err = qtx.UpdateInterval(ctx, db.UpdateIntervalParams{
		ID:        req.Msg.Interval.Id,
		StartTime: req.Msg.Interval.StartTime,
		EndTime:   req.Msg.Interval.EndTime,
		Description: pgtype.Text{
			String: req.Msg.Interval.Description,
			Valid:  true,
		},
	})
	if err != nil {
		return nil, err
	}

	err = qtx.DeleteIntervalCategories(ctx, req.Msg.Interval.Id)
	if err != nil {
		return nil, err
	}
	for _, categoryId := range req.Msg.Interval.CategoryIds {
		err = qtx.PostIntervalCategory(ctx, db.PostIntervalCategoryParams{
			VideoIntervalID: req.Msg.Interval.Id,
			CategoryID:      categoryId,
		})
		if err != nil {
			return nil, err
		}
	}

	err = tx.Commit(ctx)
	if err != nil {
		return nil, err
	}
	return connect.NewResponse(&intervalpb.UpdateIntervalResponse{}), nil
}
