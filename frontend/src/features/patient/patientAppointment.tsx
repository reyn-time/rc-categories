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
  FormControlLabel,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Skeleton,
  Stack,
  styled,
  Switch,
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
  | null;

export const PatientAppointmentList = () => {
  // TODO: Both timeline and patient mode should show paginated lists.
  // TODO: Remove history toggle.
  // TODO: Remember filter toggles in this page.
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
  const [isShowHistory, setIsShowHistory] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState<Modal>(null);

  const isAuthenticated = !!user && !userIsError;

  if (!isAuthenticated) {
    return <Alert severity="error">請先登入</Alert>;
  }

  if (appointmentIsLoading || patientIsLoading) {
    return (
      <Skeleton
        variant="rectangular"
        sx={{ maxWidth: "700px", m: 3 }}
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
      isShowHistory ||
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

  // TODO:
  // 1. On event click, show all users that signed up to an appointment.
  // 2. Sign up and opt out of an appointment for other users.
  // 3. Group less often used buttons into submenu.
  return (
    <Box>
      <Stack sx={{ p: 3 }} gap={2}>
        <Stack flexDirection="row" gap={2}>
          <ToggleButtonGroup
            value={isSortByDate.toString()}
            exclusive
            onChange={(_, value) => setIsSortByDate(value === "true")}
          >
            <ToggleButton value="true">時間排序</ToggleButton>
            <ToggleButton value="false">事主排序</ToggleButton>
          </ToggleButtonGroup>
          <FormControlLabel
            control={
              <Switch
                checked={isShowHistory}
                onChange={(_, value) => setIsShowHistory(value)}
              />
            }
            label="顯示八週歷史"
          />
        </Stack>

        <AppointmentList
          appointments={filteredAppointments}
          changePatientStatus={changePatientStatus}
          joinAppointment={joinAppointment}
          quitAppointment={quitAppointment}
          deleteAppointment={deleteAppointment}
          patientIdToPatient={patientIdToPatient}
          setIsOpenModalType={setIsOpenModal}
          user={user}
        />
      </Stack>
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
    </Box>
  );
};

const AppointmentList = (props: {
  appointments: NoBigIntMessage<PlainMessage<PatientAppointment>>[];
  patientIdToPatient: Record<number, PlainMessage<Patient>>;
  changePatientStatus: (arg: PlainMessage<ChangePatientStatusRequest>) => void;
  deleteAppointment: (
    arg: PlainMessage<DeletePatientAppointmentRequest>
  ) => void;
  joinAppointment: (arg: PlainMessage<JoinPatientAppointmentRequest>) => void;
  quitAppointment: (arg: PlainMessage<QuitPatientAppointmentRequest>) => void;
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
    <Paper sx={{ maxWidth: "700px", minWidth: "600px", margin: "auto" }}>
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
              <ListItem>
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
                <ListItemSecondaryAction>
                  {isCurrent && (
                    <IconButton
                      onClick={() => {
                        if (appointment.isUserSignedUp) {
                          quitAppointment({
                            appointmentId: appointment.id,
                            userId: user.id,
                          });
                        } else {
                          joinAppointment({
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
                      onClick={() =>
                        setIsOpenModalType({
                          type: "EditAppointment",
                          payload: appointment,
                        })
                      }
                    >
                      <Icon baseClassName="material-symbols-outlined">
                        edit
                      </Icon>
                    </IconButton>
                  )}
                  {!isEmpty && (
                    <IconButton
                      onClick={() => deleteAppointment({ id: appointment.id })}
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
                </ListItemSecondaryAction>
              </ListItem>
            </Box>
          );
        })}
      </List>
    </Paper>
  );
};

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    border: `2px solid ${theme.palette.background.paper}`,
  },
}));

export default PatientAppointmentList;
