package video

import (
	"context"

	"connectrpc.com/connect"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/reyn-time/rc-categories/backend/db"
	userpb "github.com/reyn-time/rc-categories/backend/gen/proto/user/v1"
	videopb "github.com/reyn-time/rc-categories/backend/gen/proto/video/v1"
	"github.com/reyn-time/rc-categories/backend/service/user"
	"google.golang.org/protobuf/types/known/timestamppb"
)

type VideoService struct {
	Queries *db.Queries
}

func (s *VideoService) ListVideo(ctx context.Context, req *connect.Request[videopb.ListVideoRequest]) (*connect.Response[videopb.ListVideoResponse], error) {
	videosDB, err := s.Queries.ListVideos(ctx)

	if err != nil {
		return nil, err
	}

	statusMapping := map[db.ReorderVideoStatus]videopb.VideoStatus{
		db.ReorderVideoStatusPending:    videopb.VideoStatus_Pending,
		db.ReorderVideoStatusApproved:   videopb.VideoStatus_Approved,
		db.ReorderVideoStatusArchived:   videopb.VideoStatus_Archived,
		db.ReorderVideoStatusInProgress: videopb.VideoStatus_InProgress,
		db.ReorderVideoStatusInReview:   videopb.VideoStatus_InReview,
	}

	videos := make([]*videopb.Video, len(videosDB))
	for i, v := range videosDB {
		videos[i] = &videopb.Video{
			Id:        v.ID,
			Name:      v.Name,
			YoutubeId: v.YoutubeID,
			CreatedAt: timestamppb.New(v.CreatedAt.Time),
			Status:    statusMapping[v.Status],
		}
		if v.UserID.Valid {
			videos[i].Editor = &userpb.User{
				Id:       v.UserID.Int32,
				Email:    v.Email.String,
				PhotoUrl: v.PhotoUrl.String,
				Name:     v.UserName.String,
				Role:     user.DbRoleToPbRole[v.Role.ReorderUserRole],
			}
		}
	}

	res := connect.NewResponse(&videopb.ListVideoResponse{
		Videos: videos,
	})
	return res, nil
}

func (s *VideoService) ChangeVideoStatus(ctx context.Context, req *connect.Request[videopb.ChangeVideoStatusRequest]) (*connect.Response[videopb.ChangeVideoStatusResponse], error) {
	statusMapping := map[videopb.VideoStatus]db.ReorderVideoStatus{
		videopb.VideoStatus_Pending:    db.ReorderVideoStatusPending,
		videopb.VideoStatus_Approved:   db.ReorderVideoStatusApproved,
		videopb.VideoStatus_Archived:   db.ReorderVideoStatusArchived,
		videopb.VideoStatus_InProgress: db.ReorderVideoStatusInProgress,
		videopb.VideoStatus_InReview:   db.ReorderVideoStatusInReview,
	}
	status := statusMapping[req.Msg.Status]

	err := s.Queries.UpdateVideoStatus(ctx, db.UpdateVideoStatusParams{
		Column1: req.Msg.Ids,
		Status:  status,
	})
	if err != nil {
		return nil, err
	}

	res := connect.NewResponse(&videopb.ChangeVideoStatusResponse{})
	return res, nil
}

func (s *VideoService) ChangeVideoEditor(ctx context.Context, req *connect.Request[videopb.ChangeVideoEditorRequest]) (*connect.Response[videopb.ChangeVideoEditorResponse], error) {
	editorID := pgtype.Int4{Valid: false}
	if req.Msg.EditorId > 0 {
		editorID.Valid = true
		editorID.Int32 = req.Msg.EditorId
	}

	err := s.Queries.UpdateVideoEditor(ctx, db.UpdateVideoEditorParams{
		ID:     req.Msg.Id,
		Editor: editorID,
	})
	if err != nil {
		return nil, err
	}

	res := connect.NewResponse(&videopb.ChangeVideoEditorResponse{})
	return res, nil
}
