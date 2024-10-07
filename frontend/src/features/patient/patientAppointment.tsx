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
  Button,
  Chip,
  Divider,
  Fab,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
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
  SyncCalendarModal,
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
  | {
      type: "SyncCalendar";
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
  // 1. Sign up and opt out of an appointment for other users.
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
                setPageNumber(1);
              }}
            >
              <ToggleButton value="true">時間排序</ToggleButton>
              <ToggleButton value="false">事主排序</ToggleButton>
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
      {isOpenModal?.type === "SyncCalendar" && (
        <SyncCalendarModal
          open={!!isOpenModal}
          handleClose={() => setIsOpenModal(null)}
        ></SyncCalendarModal>
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
        const patient = patientIdToPatient[appointment.patientId];
        return (
          <Box key={appointment.id}>
            {i > 0 && <Divider />}
            <AppointmentListItem
              appointment={appointment}
              user={user}
              patient={patient}
              changePatientStatus={changePatientStatus}
              deleteAppointment={deleteAppointment}
              joinAppointment={joinAppointment}
              quitAppointment={quitAppointment}
              setIsOpenModalType={setIsOpenModalType}
            ></AppointmentListItem>
          </Box>
        );
      })}
    </List>
  );
};

const AppointmentListItem = ({
  appointment,
  user,
  patient,
  changePatientStatus,
  deleteAppointment,
  joinAppointment,
  quitAppointment,
  setIsOpenModalType,
}: {
  appointment: NoBigIntMessage<PlainMessage<PatientAppointment>>;
  user: PlainMessage<User>;
  patient: PlainMessage<Patient>;
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
}) => {
  const isEmpty = appointment.startTime === undefined;
  const isCurrent =
    !isEmpty &&
    BigInt(appointment.startTime?.seconds ?? 0) >= new Date().getTime() / 1000;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <ListItem
      disablePadding
      secondaryAction={
        <IconButton onClick={handleClick}>
          <Icon baseClassName="material-symbols-outlined">more_vert</Icon>
        </IconButton>
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
              <Typography sx={{ color: "text.secondary" }}>沒有預約</Typography>
            ) : (
              <Stack flexDirection="row" gap={1} alignItems="center">
                <Typography
                  sx={isCurrent ? {} : { color: "text.secondary" }}
                >{`${patientToName(patient)} (第 ${
                  appointment.meetingNumber
                } 次)`}</Typography>
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
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        {isCurrent && (
          <MenuItem
            onClick={() => {
              if (appointment.isUserSignedUp) {
                void quitAppointment({
                  appointmentId: appointment.id,
                  userId: user.id,
                }).then(handleMenuClose);
              } else {
                void joinAppointment({
                  appointmentId: appointment.id,
                  userId: user.id,
                  message: "",
                }).then(handleMenuClose);
              }
            }}
          >
            <ListItemIcon>
              <Icon
                color={appointment.isUserSignedUp ? "error" : "success"}
                baseClassName="material-symbols-outlined"
              >
                {appointment.isUserSignedUp ? "event_busy" : "event_available"}
              </Icon>
            </ListItemIcon>
            <ListItemText>
              {appointment.isUserSignedUp ? "取消報名" : "報名"}
            </ListItemText>
          </MenuItem>
        )}
        {!isEmpty && (
          <MenuItem
            onClick={() => {
              setIsOpenModalType({
                type: "EditAppointment",
                payload: appointment,
              });
              handleMenuClose();
            }}
          >
            <ListItemIcon>
              <Icon baseClassName="material-symbols-outlined">edit</Icon>
            </ListItemIcon>
            <ListItemText>更改日期</ListItemText>
          </MenuItem>
        )}
        {!isEmpty && (
          <MenuItem
            onClick={() => {
              void deleteAppointment({ id: appointment.id }).then(
                handleMenuClose
              );
            }}
          >
            <ListItemIcon>
              <Icon baseClassName="material-symbols-outlined">delete</Icon>
            </ListItemIcon>
            <ListItemText>刪除</ListItemText>
          </MenuItem>
        )}
        <MenuItem
          onClick={() => {
            void changePatientStatus({
              patientId: appointment.patientId,
              status:
                patient.status === PatientStatus.Active
                  ? PatientStatus.OnHold
                  : PatientStatus.Active,
            }).then(handleMenuClose);
          }}
        >
          <ListItemIcon>
            <Icon baseClassName="material-symbols-outlined">
              {patient.status === PatientStatus.Active
                ? "move_down"
                : "move_up"}
            </Icon>
          </ListItemIcon>
          <ListItemText>
            {patient.status === PatientStatus.Active ? "放棄牧養" : "死者蘇生"}
          </ListItemText>
        </MenuItem>
      </Menu>
    </ListItem>
  );
};

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    border: `2px solid ${theme.palette.background.paper}`,
  },
}));

export default PatientAppointmentList;
