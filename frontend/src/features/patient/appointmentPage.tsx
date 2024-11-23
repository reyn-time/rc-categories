import Pagination from "@mui/material/Pagination/Pagination";
import { useState } from "react";
import { NoBigIntMessage } from "../../util/types";
import { PatientAppointment } from "../../gen/proto/patientappointment/v1/patientappointment_pb";
import { PlainMessage } from "@bufbuild/protobuf";
import {
  List,
  Box,
  Divider,
  ListItem,
  IconButton,
  Icon,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Stack,
  Chip,
  Menu,
  MenuItem,
  ListItemIcon,
  styled,
  Badge,
  BadgeProps,
} from "@mui/material";
import { Patient, PatientStatus } from "../../gen/proto/patient/v1/patient_pb";
import { User } from "../../gen/proto/user/v1/user_pb";
import { dateTimeToString, timeFromNow } from "../../util/time";
import { patientAvatarProps } from "../user/avatar";
import { patientToName } from "./util";
import {
  useJoinAppointmentMutation,
  useQuitAppointmentMutation,
  useDeleteAppointmentMutation,
} from "./patientAppointmentSlice";
import { useChangePatientStatusMutation } from "./patientSlice";
import { Modal } from "./patientModal";

export const AppointmentPage = ({
  appointments,
  patientIdToPatient,
  setIsOpenModalType,
  user,
}: {
  appointments: NoBigIntMessage<PlainMessage<PatientAppointment>>[];
  patientIdToPatient: Record<number, PlainMessage<Patient>>;
  setIsOpenModalType: (arg: Modal) => void;
  user: PlainMessage<User>;
}) => {
  const [pageNumber, setPageNumber] = useState(1);

  const pageSize = 15;
  const pageCount = Math.ceil(appointments.length / pageSize);

  return (
    <>
      <Pagination
        count={pageCount}
        size="large"
        page={pageNumber}
        onChange={(_, v) => setPageNumber(v)}
      />

      <AppointmentList
        appointments={appointments.slice(
          pageSize * (pageNumber - 1),
          pageSize * pageNumber
        )}
        patientIdToPatient={patientIdToPatient}
        setIsOpenModalType={setIsOpenModalType}
        user={user}
      />
    </>
  );
};

const AppointmentList = (props: {
  appointments: NoBigIntMessage<PlainMessage<PatientAppointment>>[];
  patientIdToPatient: Record<number, PlainMessage<Patient>>;
  setIsOpenModalType: (arg: Modal) => void;
  user: PlainMessage<User>;
}) => {
  const { appointments, patientIdToPatient, setIsOpenModalType, user } = props;

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
  setIsOpenModalType,
}: {
  appointment: NoBigIntMessage<PlainMessage<PatientAppointment>>;
  user: PlainMessage<User>;
  patient: PlainMessage<Patient>;
  setIsOpenModalType: (arg: Modal) => void;
}) => {
  const [changePatientStatus] = useChangePatientStatusMutation();
  const [joinAppointment] = useJoinAppointmentMutation();
  const [quitAppointment] = useQuitAppointmentMutation();
  const [deleteAppointment] = useDeleteAppointmentMutation();

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
            isEmpty ? (
              "兩個月前見面"
            ) : isCurrent ? (
              dateTimeToString(appointment.startTime)
            ) : (
              <Typography variant="body2" sx={{ color: "warning.main" }}>
                {`${dateTimeToString(appointment.startTime)} (${timeFromNow(
                  appointment.startTime
                )})`}
              </Typography>
            )
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
