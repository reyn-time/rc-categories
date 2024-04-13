package video

import (
	"context"

	"connectrpc.com/connect"
	"github.com/reyn-time/rc-categories/backend/db"
	videopb "github.com/reyn-time/rc-categories/backend/gen/proto/video/v1"
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
		db.ReorderVideoStatusPending:  videopb.VideoStatus_Pending,
		db.ReorderVideoStatusApproved: videopb.VideoStatus_Approved,
		db.ReorderVideoStatusArchived: videopb.VideoStatus_Archived,
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
	}

	res := connect.NewResponse(&videopb.ListVideoResponse{
		Videos: videos,
	})
	return res, nil
}

func (s *VideoService) ChangeVideoStatus(ctx context.Context, req *connect.Request[videopb.ChangeVideoStatusRequest]) (*connect.Response[videopb.ChangeVideoStatusResponse], error) {
	err := s.Queries.UpdateVideoStatus(ctx, db.UpdateVideoStatusParams{
		ID:     req.Msg.Id,
		Status: db.ReorderVideoStatus(req.Msg.Status),
	})
	if err != nil {
		return nil, err
	}

	res := connect.NewResponse(&videopb.ChangeVideoStatusResponse{})
	return res, nil
}
