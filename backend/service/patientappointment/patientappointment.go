package patientappointment

import (
	"context"

	"connectrpc.com/connect"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/reyn-time/rc-categories/backend/db"
	paproto "github.com/reyn-time/rc-categories/backend/gen/proto/patientappointment/v1"
	"github.com/reyn-time/rc-categories/backend/oauth"
	"google.golang.org/protobuf/types/known/timestamppb"
)

type PatientAppointmentService struct {
	Queries *db.Queries
}

func (s *PatientAppointmentService) ListCurrentPatientAppointment(ctx context.Context, req *connect.Request[paproto.ListCurrentPatientAppointmentRequest]) (*connect.Response[paproto.ListCurrentPatientAppointmentResponse], error) {
	user := ctx.Value(oauth.UserCtxKey{}).(db.ReorderUser)

	dbAppointments, err := s.Queries.ListCurrentAppointments(ctx, user.ID)
	if err != nil {
		return nil, err
	}
	protoAppointments := make([]*paproto.PatientAppointment, len(dbAppointments))

	for i, dbAppointment := range dbAppointments {
		protoAppointments[i] = &paproto.PatientAppointment{
			Id:             dbAppointment.ID,
			StartTime:      timestamppb.New(dbAppointment.StartTime.Time),
			PatientId:      dbAppointment.PatientID,
			MeetingNumber:  int32(dbAppointment.MeetingNumber),
			IsUserSignedUp: dbAppointment.Joined.(bool),
		}
	}

	res := connect.NewResponse(&paproto.ListCurrentPatientAppointmentResponse{
		Appointments: protoAppointments,
	})
	return res, nil
}

func (s *PatientAppointmentService) CreatePatientAppointment(ctx context.Context, req *connect.Request[paproto.CreatePatientAppointmentRequest]) (*connect.Response[paproto.CreatePatientAppointmentResponse], error) {
	if err := s.Queries.CreatePatientAppointment(ctx, db.CreatePatientAppointmentParams{
		StartTime: pgtype.Timestamp{Time: req.Msg.StartTime.AsTime(), Valid: true},
		PatientID: req.Msg.PatientId,
	}); err != nil {
		return nil, err
	}

	return connect.NewResponse(&paproto.CreatePatientAppointmentResponse{}), nil
}

func (s *PatientAppointmentService) UpdatePatientAppointment(ctx context.Context, req *connect.Request[paproto.UpdatePatientAppointmentRequest]) (*connect.Response[paproto.UpdatePatientAppointmentResponse], error) {
	if err := s.Queries.UpdatePatientAppointment(ctx, db.UpdatePatientAppointmentParams{
		ID:        req.Msg.Id,
		StartTime: pgtype.Timestamp{Time: req.Msg.StartTime.AsTime(), Valid: true},
	}); err != nil {
		return nil, err
	}

	return connect.NewResponse(&paproto.UpdatePatientAppointmentResponse{}), nil
}

func (s *PatientAppointmentService) DeletePatientAppointment(ctx context.Context, req *connect.Request[paproto.DeletePatientAppointmentRequest]) (*connect.Response[paproto.DeletePatientAppointmentResponse], error) {
	if err := s.Queries.DeletePatientAppointment(ctx, req.Msg.Id); err != nil {
		return nil, err
	}

	return connect.NewResponse(&paproto.DeletePatientAppointmentResponse{}), nil
}

func (s *PatientAppointmentService) JoinPatientAppointment(ctx context.Context, req *connect.Request[paproto.JoinPatientAppointmentRequest]) (*connect.Response[paproto.JoinPatientAppointmentResponse], error) {
	if err := s.Queries.CreatePatientAppointmentSignUp(ctx, db.CreatePatientAppointmentSignUpParams{
		AppointmentID: req.Msg.AppointmentId,
		UserID:        req.Msg.UserId,
	}); err != nil {
		return nil, err
	}

	return connect.NewResponse(&paproto.JoinPatientAppointmentResponse{}), nil
}

func (s *PatientAppointmentService) QuitPatientAppointment(ctx context.Context, req *connect.Request[paproto.QuitPatientAppointmentRequest]) (*connect.Response[paproto.QuitPatientAppointmentResponse], error) {
	if _, err := s.Queries.DeletePatientAppointmentSignUp(ctx, db.DeletePatientAppointmentSignUpParams{
		AppointmentID: req.Msg.AppointmentId,
		UserID:        req.Msg.UserId,
	}); err != nil {
		return nil, err
	}

	return connect.NewResponse(&paproto.QuitPatientAppointmentResponse{}), nil
}
