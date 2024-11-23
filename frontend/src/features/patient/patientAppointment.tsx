import { PlainMessage } from "@bufbuild/protobuf";
import { Patient, PatientStatus } from "../../gen/proto/patient/v1/patient_pb";
import { PatientAppointment } from "../../gen/proto/patientappointment/v1/patientappointment_pb";
import { useListAppointmentQuery } from "./patientAppointmentSlice";
import {
  Alert,
  Box,
  Button,
  Fab,
  Icon,
  Paper,
  Skeleton,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useListPatientQuery } from "./patientSlice";
import { NoBigIntMessage } from "../../util/types";
import { useState } from "react";
import {
  AppointmentDetailsModal,
  CreateAppointmentModal,
  CreatePatientModal,
  EditAppointmentModal,
  Modal,
  SyncCalendarModal,
} from "./patientModal";
import { useGetUserQuery } from "../user/userSlice";
import { AppointmentPage } from "./appointmentPage";
import { PatientTable } from "./patientTable";

export const PatientAppointmentList = () => {
  const { data: appointments = [], isLoading: appointmentIsLoading } =
    useListAppointmentQuery();
  const { data: patients = [], isLoading: patientIsLoading } =
    useListPatientQuery();
  const { data: user, isError: userIsError } = useGetUserQuery();
  const [isSortByDate, setIsSortByDate] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState<Modal>(null);

  const isAuthenticated = !!user && !userIsError;

  if (!isAuthenticated) {
    return (
      <Alert severity="error" sx={{ maxWidth: "700px", my: 3, mx: "auto" }}>
        請先登入
      </Alert>
    );
  }

  if (appointmentIsLoading || patientIsLoading) {
    return (
      <Skeleton
        variant="rectangular"
        sx={{ maxWidth: "700px", my: 3, mx: "auto" }}
        height="700px"
      ></Skeleton>
    );
  }

  const patientIdToPatient: Record<number, PlainMessage<Patient>> = {};
  const patientIdToMostRecentAppointment: Record<
    number,
    NoBigIntMessage<PlainMessage<PatientAppointment>>
  > = {};
  const activePatientIds: Set<number> = new Set();
  patients.forEach((patient) => {
    patientIdToPatient[patient.id] = patient;
    if (patient.status === PatientStatus.Active) {
      activePatientIds.add(patient.id);
    }
  });
  appointments.forEach((appointment) => {
    patientIdToMostRecentAppointment[appointment.patientId] = appointment;
  });

  const remainingPatientIds = new Set(patients.map((patient) => patient.id));
  const filteredAppointments = appointments.filter(
    (appointment) =>
      isSortByDate ||
      (appointment.startTime &&
        BigInt(appointment.startTime?.seconds ?? 0) >=
          new Date().getTime() / 1000)
  );

  filteredAppointments.forEach((appointment) => {
    remainingPatientIds.delete(appointment.patientId);
  });
  remainingPatientIds.forEach((patientId) => {
    if (patientId in patientIdToMostRecentAppointment) {
      filteredAppointments.push(patientIdToMostRecentAppointment[patientId]);
    } else {
      filteredAppointments.push({
        id: -patientId,
        meetingNumber: 0,
        patientId: patientId,
        isUserSignedUp: false,
        signedUpUserIds: [],
      });
    }
  });

  filteredAppointments.sort((a, b) => {
    const byStatus =
      (patientIdToPatient[a.patientId].status === PatientStatus.Active
        ? 0
        : 1) -
      (patientIdToPatient[b.patientId].status === PatientStatus.Active ? 0 : 1);
    const byId = a.patientId - b.patientId;
    const byTime = +(b.startTime?.seconds ?? 0) - +(a.startTime?.seconds ?? 0);
    return isSortByDate ? byTime || byId : byTime || byStatus;
  });

  // TODO:
  // 1. Sign up and opt out of an appointment for other users.
  // 2. Merge the AddUser/AddAppointment icons into a speed dial.
  // 3. Allow tentative join (add comments?)
  // 4. Allow cancel event
  return (
    <Box>
      <Paper
        sx={{ maxWidth: "700px", width: "80%", mt: 3, mb: 12, mx: "auto" }}
      >
        <Stack sx={{ p: 0 }} gap={3}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap"
            gap={2}
            sx={{ pt: 3, px: 3 }}
          >
            <ToggleButtonGroup
              value={isSortByDate.toString()}
              exclusive
              onChange={(_, value) => {
                setIsSortByDate(value === "true");
              }}
            >
              <ToggleButton value="true">報名表</ToggleButton>
              <ToggleButton value="false">事主資料</ToggleButton>
            </ToggleButtonGroup>
            <Button
              variant="contained"
              onClick={() => setIsOpenModal({ type: "SyncCalendar" })}
            >
              <Icon baseClassName="material-symbols-outlined" sx={{ mr: 1 }}>
                calendar_month
              </Icon>
              與日曆同步
            </Button>
          </Stack>

          {isSortByDate ? (
            <AppointmentPage
              appointments={filteredAppointments}
              patientIdToPatient={patientIdToPatient}
              setIsOpenModalType={setIsOpenModal}
              user={user}
            />
          ) : (
            <PatientTable
              appointments={filteredAppointments}
              patientIdToPatient={patientIdToPatient}
            />
          )}
        </Stack>
      </Paper>
      <Stack
        flexDirection="row"
        gap={2}
        sx={{ position: "fixed", right: "20px", bottom: "20px" }}
      >
        <Fab
          color="primary"
          onClick={() => setIsOpenModal({ type: "CreateAppointment" })}
        >
          <Icon baseClassName="material-symbols-outlined">calendar_add_on</Icon>
        </Fab>
        <Fab
          color="secondary"
          onClick={() => setIsOpenModal({ type: "CreatePatient" })}
        >
          <Icon baseClassName="material-symbols-outlined">person_add</Icon>
        </Fab>
      </Stack>

      {isOpenModal?.type === "CreateAppointment" && (
        <CreateAppointmentModal
          open={!!isOpenModal}
          handleClose={() => setIsOpenModal(null)}
        />
      )}
      {isOpenModal?.type === "CreatePatient" && (
        <CreatePatientModal
          open={!!isOpenModal}
          handleClose={() => setIsOpenModal(null)}
        ></CreatePatientModal>
      )}
      {isOpenModal?.type === "EditAppointment" && (
        <EditAppointmentModal
          appointment={isOpenModal.payload}
          open={!!isOpenModal}
          handleClose={() => setIsOpenModal(null)}
        ></EditAppointmentModal>
      )}
      {isOpenModal?.type === "AppointmentDetails" && (
        <AppointmentDetailsModal
          appointment={isOpenModal.payload.appointment}
          patient={isOpenModal.payload.patient}
          open={!!isOpenModal}
          handleClose={() => setIsOpenModal(null)}
        ></AppointmentDetailsModal>
      )}
      {isOpenModal?.type === "SyncCalendar" && (
        <SyncCalendarModal
          open={!!isOpenModal}
          handleClose={() => setIsOpenModal(null)}
        ></SyncCalendarModal>
      )}
    </Box>
  );
};

export default PatientAppointmentList;
