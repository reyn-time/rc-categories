import { PlainMessage } from "@bufbuild/protobuf";
import {
  ChangePatientStatusRequest,
  Patient,
  PatientStatus,
} from "../../gen/proto/patient/v1/patient_pb";
import {
  DeletePatientAppointmentRequest,
  PatientAppointment,
} from "../../gen/proto/patientappointment/v1/patientappointment_pb";
import {
  useDeleteAppointmentMutation,
  useListAppointmentQuery,
} from "./patientAppointmentSlice";
import { dateTimeToString, timeFromNow } from "../../util/time";
import {
  Avatar,
  Box,
  Collapse,
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
import { CreateAppointmentModal } from "./patientModal";
import { patientToName } from "./util";

export const PatientAppointmentList = () => {
  const { data: appointments = [], isLoading: appointmentIsLoading } =
    useListAppointmentQuery();
  const { data: patients = [], isLoading: patientIsLoading } =
    useListPatientQuery();
  const [changePatientStatus] = useChangePatientStatusMutation();
  const [deleteAppointment] = useDeleteAppointmentMutation();
  const [isInactiveExpanded, setIsInactiveExpanded] = useState(false);
  const [isSortByDate, setIsSortByDate] = useState(true);
  const [isShowHistory, setIsShowHistory] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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
      });
    }
  });

  filteredAppointments.sort((a, b) => {
    const byId = a.patientId - b.patientId;
    const byTime = +(a.startTime?.seconds ?? 0) - +(b.startTime?.seconds ?? 0);
    return isSortByDate ? byTime || byId : byId || byTime;
  });

  // TODO:
  // 1. Add a new patient.
  // 2. Edit an appointment.
  // 3. Sign up to an appointment.
  // 4. Opt out of an appointment (for someone else too).
  // 5. List all users that signed up to an appointment.
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

        <Typography variant="h4">未死</Typography>
        <AppointmentList
          appointments={filteredAppointments.filter((appointment) =>
            activePatientIds.has(appointment.patientId)
          )}
          changePatientStatus={changePatientStatus}
          deleteAppointment={deleteAppointment}
          patientIdToPatient={patientIdToPatient}
        />
        <Stack flexDirection="row" gap={2} alignItems="baseline">
          <Typography variant="h4">已死</Typography>
          <IconButton
            onClick={() => {
              setIsInactiveExpanded((t) => !t);
            }}
          >
            <Icon baseClassName="material-symbols-outlined">
              {isInactiveExpanded ? "collapse_all" : "expand_all"}
            </Icon>
          </IconButton>
        </Stack>

        <Collapse in={isInactiveExpanded} unmountOnExit>
          <AppointmentList
            appointments={filteredAppointments.filter(
              (appointment) => !activePatientIds.has(appointment.patientId)
            )}
            changePatientStatus={changePatientStatus}
            deleteAppointment={deleteAppointment}
            patientIdToPatient={patientIdToPatient}
          />
        </Collapse>
      </Stack>
      <Fab
        color="primary"
        sx={{ position: "fixed", right: "20px", bottom: "20px" }}
        onClick={() => setIsOpen(true)}
      >
        <Icon baseClassName="material-symbols-outlined">calendar_add_on</Icon>
      </Fab>
      {isOpen && (
        <CreateAppointmentModal
          open={isOpen}
          handleClose={() => setIsOpen(false)}
        />
      )}
    </Box>
  );
};

const AppointmentList = (props: {
  appointments: NoBigIntMessage<PlainMessage<PatientAppointment>>[];
  patientIdToPatient: Record<number, PlainMessage<Patient>>;
  changePatientStatus: (arg: PlainMessage<ChangePatientStatusRequest>) => void;
  deleteAppointment: (
    args: PlainMessage<DeletePatientAppointmentRequest>
  ) => void;
}) => {
  const {
    appointments,
    patientIdToPatient,
    changePatientStatus,
    deleteAppointment,
  } = props;
  return (
    <Paper sx={{ maxWidth: "700px" }}>
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
                  <Avatar {...patientAvatarProps(patient)} />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    isEmpty ? (
                      <Typography sx={{ color: "text.secondary" }}>
                        沒有預約
                      </Typography>
                    ) : (
                      <Typography
                        sx={isCurrent ? {} : { color: "text.secondary" }}
                      >{`${patientToName(patient)} 的第 ${
                        appointment.meetingNumber
                      } 次見面`}</Typography>
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
                    <IconButton>
                      <Icon baseClassName="material-symbols-outlined">
                        event_available
                      </Icon>
                    </IconButton>
                  )}
                  {!isEmpty && (
                    <IconButton>
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

export default PatientAppointmentList;
