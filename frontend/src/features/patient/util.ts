import { PlainMessage } from "@bufbuild/protobuf";
import { Gender, Patient } from "../../gen/proto/patient/v1/patient_pb";

export const patientToName = (patient: PlainMessage<Patient>) => {
  const prefix = patient.gender === Gender.Male ? "Mr" : "Ms";
  return prefix + " " + patient.initials;
};
