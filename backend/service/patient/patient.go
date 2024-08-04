package patient

import (
	"context"

	"connectrpc.com/connect"
	"github.com/reyn-time/rc-categories/backend/db"
	pproto "github.com/reyn-time/rc-categories/backend/gen/proto/patient/v1"
)

type PatientService struct {
	Queries *db.Queries
}

func (s *PatientService) ListPatient(ctx context.Context, req *connect.Request[pproto.ListPatientRequest]) (*connect.Response[pproto.ListPatientResponse], error) {
	dbPatients, err := s.Queries.ListPatients(ctx)
	if err != nil {
		return nil, err
	}

	protoPatients := make([]*pproto.Patient, len(dbPatients))
	for i, dbPatient := range dbPatients {
		protoPatients[i] = &pproto.Patient{
			Id:       dbPatient.ID,
			Initials: dbPatient.Initials,
			Gender:   DBGenderToProtoGender(dbPatient.Gender),
			Status:   DBPatientStatusToProtoPatientStatus(dbPatient.Status),
		}
	}

	res := connect.NewResponse(&pproto.ListPatientResponse{
		Patients: protoPatients,
	})
	return res, nil
}

func (s *PatientService) CreatePatient(ctx context.Context, req *connect.Request[pproto.CreatePatientRequest]) (*connect.Response[pproto.CreatePatientResponse], error) {
	if err := s.Queries.CreatePatient(ctx, db.CreatePatientParams{
		Initials: req.Msg.Initials,
		Gender:   ProtoGenderToDBGender(req.Msg.Gender),
	}); err != nil {
		return nil, err
	}

	return connect.NewResponse(&pproto.CreatePatientResponse{}), nil
}

func (s *PatientService) ChangePatientStatus(ctx context.Context, req *connect.Request[pproto.ChangePatientStatusRequest]) (*connect.Response[pproto.ChangePatientStatusResponse], error) {
	if err := s.Queries.UpdatePatientStatus(ctx, db.UpdatePatientStatusParams{
		ID:     req.Msg.PatientId,
		Status: ProtoPatientStatusToDBPatientStatus(req.Msg.Status),
	}); err != nil {
		return nil, err
	}

	res := connect.NewResponse(&pproto.ChangePatientStatusResponse{})
	return res, nil
}
