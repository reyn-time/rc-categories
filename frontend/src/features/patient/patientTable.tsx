import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid";
import { PatientAppointment } from "../../gen/proto/patientappointment/v1/patientappointment_pb";
import { PlainMessage } from "@bufbuild/protobuf";
import { NoBigIntMessage } from "../../util/types";
import { Patient } from "../../gen/proto/patient/v1/patient_pb";
import { patientToName } from "./util";
import { dateTimeToString } from "../../util/time";
import { alpha, styled } from "@mui/material";

const columns: GridColDef[] = [
  {
    field: "fullName",
    headerName: "姓名",
    valueGetter: (_, patient: PatientWithTime) => patientToName(patient),
    type: "string",
  },
  {
    field: "status",
    headerName: "狀態",
    valueGetter: (_, patient: PatientWithTime) =>
      ["未死", "已死", "已死"][patient.status],
    type: "string",
    cellClassName: (params: GridCellParams<PatientWithTime>) => {
      return "status-" + ["alive", "dead", "dead"][params.row.status];
    },
  },
  {
    field: "lastAppointment",
    headerName: "最後預約",
    valueGetter: (_, patient: PatientWithTime) =>
      dateTimeToString(
        patient.epoch === "0" ? undefined : { seconds: patient.epoch }
      ),
    flex: 1,
    minWidth: 250,
    cellClassName: (params: GridCellParams<PatientWithTime>) => {
      return +params.row.epoch < Date.now() / 1000 ? "past-appointment" : "";
    },
  },
  {
    field: "meetingNumber",
    headerName: "會議編號",
    type: "number",
  },
];

interface PatientWithTime extends PlainMessage<Patient> {
  epoch: string;
  meetingNumber: number;
}

export const PatientTable = ({
  appointments,
  patientIdToPatient,
}: {
  appointments: NoBigIntMessage<PlainMessage<PatientAppointment>>[];
  patientIdToPatient: Record<number, PlainMessage<Patient>>;
}) => {
  const rows: PatientWithTime[] = appointments.map((appointment) => ({
    ...patientIdToPatient[appointment.patientId],
    epoch: appointment.startTime?.seconds ?? "0",
    meetingNumber: appointment.meetingNumber,
  }));

  return (
    <StyledDataGrid
      rows={rows}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 100,
          },
        },
      }}
      pageSizeOptions={[100]}
      disableRowSelectionOnClick
    />
  );
};

const StyledDataGrid = styled(DataGrid)`
  .status-dead {
    color: ${({ theme }) => theme.palette.error.contrastText};
    background-color: ${({ theme }) => theme.palette.error.light};
  }
  .past-appointment {
    background-color: ${({ theme }) => alpha(theme.palette.error.light, 0.3)};
  }
`;
