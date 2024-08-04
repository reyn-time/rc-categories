package patient

import (
	"github.com/reyn-time/rc-categories/backend/db"
	pproto "github.com/reyn-time/rc-categories/backend/gen/proto/patient/v1"
)

func DBGenderToProtoGender(dbGender db.ReorderGender) pproto.Gender {
	m := map[db.ReorderGender]pproto.Gender{
		db.ReorderGenderMale:   pproto.Gender_Male,
		db.ReorderGenderFemale: pproto.Gender_Female,
	}
	return m[dbGender]
}

func ProtoGenderToDBGender(protoGender pproto.Gender) db.ReorderGender {
	m := map[pproto.Gender]db.ReorderGender{
		pproto.Gender_Male:   db.ReorderGenderMale,
		pproto.Gender_Female: db.ReorderGenderFemale,
	}
	return m[protoGender]
}

func DBPatientStatusToProtoPatientStatus(dbStatus db.ReorderPatientStatus) pproto.PatientStatus {
	m := map[db.ReorderPatientStatus]pproto.PatientStatus{
		db.ReorderPatientStatusActive:      pproto.PatientStatus_Active,
		db.ReorderPatientStatusBlacklisted: pproto.PatientStatus_Blacklisted,
		db.ReorderPatientStatusOnHold:      pproto.PatientStatus_OnHold,
	}
	return m[dbStatus]
}

func ProtoPatientStatusToDBPatientStatus(protoStatus pproto.PatientStatus) db.ReorderPatientStatus {
	m := map[pproto.PatientStatus]db.ReorderPatientStatus{
		pproto.PatientStatus_Active:      db.ReorderPatientStatusActive,
		pproto.PatientStatus_Blacklisted: db.ReorderPatientStatusBlacklisted,
		pproto.PatientStatus_OnHold:      db.ReorderPatientStatusOnHold,
	}
	return m[protoStatus]
}
