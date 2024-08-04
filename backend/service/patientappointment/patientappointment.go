package patientappointment

import (
	"context"

	"connectrpc.com/connect"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/reyn-time/rc-categories/backend/db"
	paproto "github.com/reyn-time/rc-categories/backend/gen/proto/patientappointment/v1"
	"google.golang.org/protobuf/types/known/timestamppb"
)

type PatientAppointmentService struct {
	Queries *db.Queries
}

func (s *PatientAppointmentService) ListCurrentPatientAppointment(ctx context.Context, req *connect.Request[paproto.ListCurrentPatientAppointmentRequest]) (*connect.Response[paproto.ListCurrentPatientAppointmentResponse], error) {
	dbAppointments, err := s.Queries.ListCurrentAppointments(ctx)
	if err != nil {
		return nil, err
	}
	protoAppointments := make([]*paproto.PatientAppointment, len(dbAppointments))

	for i, dbAppointment := range dbAppointments {
		protoAppointments[i] = &paproto.PatientAppointment{
			Id:            dbAppointment.ID,
			StartTime:     timestamppb.New(dbAppointment.StartTime.Time),
			PatientId:     dbAppointment.PatientID,
			MeetingNumber: int32(dbAppointment.MeetingNumber),
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
