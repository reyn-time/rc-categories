import { PlainMessage } from "@bufbuild/protobuf";
import {
  ChangePatientStatusRequest,
  Patient,
  PatientStatus,
} from "../../gen/proto/patient/v1/patient_pb";
import {
  DeletePatientAppointmentRequest,
  JoinPatientAppointmentRequest,
  PatientAppointment,
  QuitPatientAppointmentRequest,
} from "../../gen/proto/patientappointment/v1/patientappointment_pb";
import {
  useDeleteAppointmentMutation,
  useJoinAppointmentMutation,
  useListAppointmentQuery,
  useQuitAppointmentMutation,
} from "./patientAppointmentSlice";
import { dateTimeToString, timeFromNow } from "../../util/time";
import {
  Alert,
  Avatar,
  Badge,
  BadgeProps,
  Box,
  Chip,
  Divider,
  Fab,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Pagination,
  Paper,
  Skeleton,
  Stack,
  styled,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import {
  useChangePatientStatusMutation,
  useListPatientQuery,
} from "./patientSlice";
import { NoBigIntMessage } from "../../util/types";
import { patientAvatarProps } from "../user/avatar";
import { useState } from "react";
import {
  AppointmentDetailsModal,
  CreateAppointmentModal,
  CreatePatientModal,
  EditAppointmentModal,
} from "./patientModal";
import { patientToName } from "./util";
import { useGetUserQuery } from "../user/userSlice";
import { User } from "../../gen/proto/user/v1/user_pb";

type Modal =
  | { type: "CreatePatient" }
  | { type: "CreateAppointment" }
  | {
      type: "EditAppointment";
      payload: NoBigIntMessage<PlainMessage<PatientAppointment>>;
    }
  | {
      type: "AppointmentDetails";
      payload: {
        patient: PlainMessage<Patient>;
        appointment: NoBigIntMessage<PlainMessage<PatientAppointment>>;
      };
    }
  | null;

export const PatientAppointmentList = () => {
  const { data: appointments = [], isLoading: appointmentIsLoading } =
    useListAppointmentQuery();
  const { data: patients = [], isLoading: patientIsLoading } =
    useListPatientQuery();
  const { data: user, isError: userIsError } = useGetUserQuery();
  const [changePatientStatus] = useChangePatientStatusMutation();
  const [deleteAppointment] = useDeleteAppointmentMutation();
  const [joinAppointment] = useJoinAppointmentMutation();
  const [quitAppointment] = useQuitAppointmentMutation();
  const [isSortByDate, setIsSortByDate] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState<Modal>(null);
  const [pageNumber, setPageNumber] = useState(1);

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
    return isSortByDate ? byTime || byId : byStatus || byId || byTime;
  });

  const pageSize = 15;
  const pageCount = Math.ceil(filteredAppointments.length / pageSize);

  // TODO:
  // 1. On event click, show all users that signed up to an appointment.
  // 2. Sign up and opt out of an appointment for other users.
  // 3. Group less often used buttons into submenu.
  return (
    <Box>
      <Paper sx={{ maxWidth: "700px", minWidth: "600px", my: 3, mx: "auto" }}>
        <Stack sx={{ p: 0 }} gap={3}>
          <ToggleButtonGroup
            sx={{ pt: 3, px: 3 }}
            value={isSortByDate.toString()}
            exclusive
            onChange={(_, value) => {
              setIsSortByDate(value === "true");
              setPageNumber(1);
            }}
          >
            <ToggleButton value="true">時間排序</ToggleButton>
            <ToggleButton value="false">事主排序</ToggleButton>
          </ToggleButtonGroup>

          <Pagination
            count={pageCount}
            size="large"
            page={pageNumber}
            onChange={(_, v) => setPageNumber(v)}
          />

          <AppointmentList
            appointments={filteredAppointments.slice(
              pageSize * (pageNumber - 1),
              pageSize * pageNumber
            )}
            changePatientStatus={changePatientStatus}
            joinAppointment={joinAppointment}
            quitAppointment={quitAppointment}
            deleteAppointment={deleteAppointment}
            patientIdToPatient={patientIdToPatient}
            setIsOpenModalType={setIsOpenModal}
            user={user}
          />
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
    </Box>
  );
};

const AppointmentList = (props: {
  appointments: NoBigIntMessage<PlainMessage<PatientAppointment>>[];
  patientIdToPatient: Record<number, PlainMessage<Patient>>;
  changePatientStatus: (
    arg: PlainMessage<ChangePatientStatusRequest>
  ) => Promise<unknown>;
  deleteAppointment: (
    arg: PlainMessage<DeletePatientAppointmentRequest>
  ) => Promise<unknown>;
  joinAppointment: (
    arg: PlainMessage<JoinPatientAppointmentRequest>
  ) => Promise<unknown>;
  quitAppointment: (
    arg: PlainMessage<QuitPatientAppointmentRequest>
  ) => Promise<unknown>;
  setIsOpenModalType: (arg: Modal) => void;
  user: PlainMessage<User>;
}) => {
  const {
    appointments,
    patientIdToPatient,
    changePatientStatus,
    deleteAppointment,
    joinAppointment,
    quitAppointment,
    setIsOpenModalType,
    user,
  } = props;
  return (
    <List>
      {appointments.map((appointment, i) => {
        const isEmpty = appointment.startTime === undefined;
        const isCurrent =
          !isEmpty &&
          BigInt(appointment.startTime?.seconds ?? 0) >=
            new Date().getTime() / 1000;
        const patient = patientIdToPatient[appointment.patientId];
        return (
          <Box key={appointment.id}>
            {i > 0 && <Divider />}
            <ListItem
              disablePadding
              secondaryAction={
                <>
                  {isCurrent && (
                    <IconButton
                      onClick={() => {
                        if (appointment.isUserSignedUp) {
                          void quitAppointment({
                            appointmentId: appointment.id,
                            userId: user.id,
                          });
                        } else {
                          void joinAppointment({
                            appointmentId: appointment.id,
                            userId: user.id,
                            message: "",
                          });
                        }
                      }}
                    >
                      <Icon
                        color={appointment.isUserSignedUp ? "error" : "success"}
                        baseClassName="material-symbols-outlined"
                      >
                        {appointment.isUserSignedUp
                          ? "event_busy"
                          : "event_available"}
                      </Icon>
                    </IconButton>
                  )}
                  {!isEmpty && (
                    <IconButton
                      onClick={() => {
                        setIsOpenModalType({
                          type: "EditAppointment",
                          payload: appointment,
                        });
                      }}
                    >
                      <Icon baseClassName="material-symbols-outlined">
                        edit
                      </Icon>
                    </IconButton>
                  )}
                  {!isEmpty && (
                    <IconButton
                      onClick={() => {
                        void deleteAppointment({ id: appointment.id });
                      }}
                    >
                      <Icon baseClassName="material-symbols-outlined">
                        delete
                      </Icon>
                    </IconButton>
                  )}
                  <IconButton
                    size="small"
                    onClick={() => {
                      void changePatientStatus({
                        patientId: appointment.patientId,
                        status:
                          patient.status === PatientStatus.Active
                            ? PatientStatus.OnHold
                            : PatientStatus.Active,
                      });
                    }}
                  >
                    <Icon baseClassName="material-symbols-outlined">
                      {patient.status === PatientStatus.Active
                        ? "move_down"
                        : "move_up"}
                    </Icon>
                  </IconButton>
                </>
              }
            >
              <ListItemButton
                onClick={() => {
                  setIsOpenModalType({
                    type: "AppointmentDetails",
                    payload: {
                      patient,
                      appointment,
                    },
                  });
                }}
                disabled={isEmpty}
              >
                <ListItemAvatar>
                  <StyledBadge
                    color="warning"
                    badgeContent={
                      patient.status === PatientStatus.Active ? undefined : "死"
                    }
                  >
                    <Avatar {...patientAvatarProps(patient)} />
                  </StyledBadge>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    isEmpty ? (
                      <Typography sx={{ color: "text.secondary" }}>
                        沒有預約
                      </Typography>
                    ) : (
                      <Stack flexDirection="row" gap={1}>
                        <Typography
                          sx={isCurrent ? {} : { color: "text.secondary" }}
                        >{`${patientToName(patient)} 的第 ${
                          appointment.meetingNumber
                        } 次見面`}</Typography>
                        {appointment.isUserSignedUp && (
                          <Chip
                            label="已報名"
                            color="success"
                            variant="outlined"
                            size="small"
                          />
                        )}
                      </Stack>
                    )
                  }
                  secondary={
                    isEmpty
                      ? "兩個月前見面"
                      : isCurrent
                      ? dateTimeToString(appointment.startTime)
                      : timeFromNow(appointment.startTime)
                  }
                ></ListItemText>
              </ListItemButton>
            </ListItem>
          </Box>
        );
      })}
    </List>
  );
};

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    border: `2px solid ${theme.palette.background.paper}`,
  },
}));

export default PatientAppointmentList;
