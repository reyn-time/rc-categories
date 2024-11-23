import {
  Alert,
  Avatar,
  Box,
  Button,
  Chip,
  FormControlLabel,
  FormLabel,
  Icon,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Modal,
  Paper,
  Radio,
  RadioGroup,
  Skeleton,
  Snackbar,
  SnackbarCloseReason,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Gender, Patient } from "../../gen/proto/patient/v1/patient_pb";
import { useCreatePatientMutation, useListPatientQuery } from "./patientSlice";
import { dayjsToString, getTimeFromString } from "../../util/time";
import { PlainMessage } from "@bufbuild/protobuf";
import dayjs, { Dayjs } from "dayjs";
import { patientToName } from "./util";
import {
  useCreateAppointmentMutation,
  useListAppointmentSignedUpUsersQuery,
  useUpdateAppointmentMutation,
} from "./patientAppointmentSlice";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { PatientAppointment } from "../../gen/proto/patientappointment/v1/patientappointment_pb";
import { NoBigIntMessage } from "../../util/types";
import { userAvatarProps } from "../user/avatar";
import { useGetUserQuery } from "../user/userSlice";

export type Modal =
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

interface ValidationError {
  message: string;
  value: number;
}

// TODO: Make these modals more attractive for phone settings.
export const CreatePatientModal = (props: {
  open: boolean;
  handleClose: () => void;
}) => {
  const { open, handleClose } = props;
  const [gender, setGender] = useState<"male" | "female">("male");
  const [initials, setInitials] = useState("");
  const { data: patients } = useListPatientQuery();
  const [addPatient] = useCreatePatientMutation();

  const re = /^[A-Z0-9]{1,3}$/;
  const duplicatedPatient = !!(patients ?? []).find(
    (patient) => patient.initials == initials
  );
  const stringTooLong = initials.length > 3;
  const regexNotFulfilled = !re.test(initials);
  const error = regexNotFulfilled || duplicatedPatient;
  const errorMessage = stringTooLong
    ? "太長了"
    : regexNotFulfilled
    ? "請只使用以下文字：A-Z, 0-9"
    : duplicatedPatient
    ? "簡稱已被使用"
    : "";

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          maxWidth: 500,
        }}
      >
        <Paper sx={{ p: 3 }}>
          <Stack gap={3} alignItems="flex-start">
            <Typography variant="h4">新增事主</Typography>

            <Stack>
              <FormLabel>性別</FormLabel>
              <RadioGroup
                row
                value={gender}
                onChange={(e) => setGender(e.target.value as "female" | "male")}
              >
                <FormControlLabel value="male" control={<Radio />} label="男" />
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="女"
                />
              </RadioGroup>
            </Stack>

            <TextField
              label="簡稱"
              variant="standard"
              value={initials}
              onChange={(e) => setInitials(e.target.value)}
              error={!!errorMessage}
              helperText={errorMessage}
            />

            <Button
              variant="contained"
              sx={{ alignSelf: "flex-end" }}
              disabled={error}
              onClick={() => {
                void addPatient({
                  initials,
                  gender: gender === "male" ? Gender.Male : Gender.Female,
                }).then(() => {
                  handleClose();
                });
              }}
            >
              <Stack flexDirection="row" gap={1} alignItems="center">
                <Icon baseClassName="material-symbols-outlined">
                  person_add
                </Icon>
                <Typography variant="button">新增</Typography>
              </Stack>
            </Button>
          </Stack>
        </Paper>
      </Box>
    </Modal>
  );
};

export const AppointmentDetailsModal = (props: {
  patient: PlainMessage<Patient>;
  appointment: NoBigIntMessage<PlainMessage<PatientAppointment>>;
  open: boolean;
  handleClose: () => void;
}) => {
  const { open, handleClose, patient, appointment } = props;

  const { data: signedUpUsers = [], isLoading } =
    useListAppointmentSignedUpUsersQuery({
      appointmentId: appointment.id,
    });

  // TODO: Refactor the modal part a bit.
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          maxWidth: 500,
        }}
      >
        <Paper sx={{ p: 3 }}>
          <Typography variant="h4" sx={{ mb: 3 }}>
            {patientToName(patient)}
          </Typography>
          <Typography variant="h5">參與者</Typography>
          {isLoading && (
            <Skeleton variant="rectangular" height="500px"></Skeleton>
          )}
          <List>
            {signedUpUsers.map((user) => (
              <ListItem key={user.id}>
                <ListItemAvatar>
                  <Avatar {...userAvatarProps(user)} />
                </ListItemAvatar>
                <ListItemText>{user.name}</ListItemText>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </Modal>
  );
};

export const CreateAppointmentModal = (props: {
  open: boolean;
  handleClose: () => void;
}) => {
  const { open, handleClose } = props;
  const [dateTimeString, setDateTimeString] = useState("");
  const { data: patients } = useListPatientQuery();
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>(
    []
  );
  const [showDetails, setShowDetails] = useState(false);
  const [selectedPatient, setSelectedPatient] =
    useState<PlainMessage<Patient> | null>(null);
  const [selectedTime, setSelectedTime] = useState<Dayjs | null>(null);
  const [createAppointment] = useCreateAppointmentMutation();

  const re =
    /^\s*(M[rs])\s*([A-Z0-9]{1,3})\s*(\d{1,2})\/(\d{1,2})\s*(\d{1,2})([ap]m)\s*([UH]KT)\s*$/;

  const extractAppointment = (dtString: string) => {
    const errors: ValidationError[] = [];
    const parts = re.exec(dtString);

    if (parts == null) {
      return;
    }
    const [
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _,
      genderPrefix,
      initials,
      dayString,
      monthString,
      hourString,
      period,
      timezone,
    ] = parts;
    const gender = genderPrefix === "Mr" ? Gender.Male : Gender.Female;
    const target = (patients ?? []).find(
      (patient) => patient.gender === gender && patient.initials === initials
    );
    if (target === undefined) {
      errors.push({
        message: `而我不知道 ${genderPrefix} ${initials} 是誰`,
        value: 100,
      });
    }

    const date = getTimeFromString(
      dayString,
      monthString,
      hourString,
      period,
      timezone
    );
    if (date === null) {
      errors.push({
        message: `${dayString}/${monthString} ${hourString}${period} 不是有效日期`,
        value: 100,
      });
    } else {
      const londonTime = date.tz("Europe/London");
      const d = londonTime.day();
      if ([1, 4, 6].includes(d)) {
        errors.push({
          message: `星期${"日一二三四五六"[d]}不是驅趕日`,
          value: 40,
        });
      }
      const h = londonTime.hour();
      if (h >= 23 || h <= 7) {
        errors.push({
          message: `${h.toString().padStart(2, "0")}:00 UKT 非英國工作時間`,
          value: 30,
        });
      }
    }

    setValidationErrors(errors);
    setShowDetails(true);
    setSelectedTime(date);
    setSelectedPatient(target ?? null);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          maxWidth: 500,
        }}
      >
        <Paper sx={{ p: 3 }}>
          <Stack gap={2}>
            <Typography variant="h4">新增見面日期</Typography>
            <Stack flexDirection="row" gap={2} alignItems="center">
              <TextField
                id="standard-basic"
                label="輸入見面日期"
                variant="standard"
                helperText="參考格式：Mr B 23/8 9pm UKT"
                error={!re.test(dateTimeString)}
                value={dateTimeString}
                onChange={(e) => setDateTimeString(e.target.value)}
                sx={{ flexGrow: 1 }}
              />
              <Button
                disabled={!re.test(dateTimeString)}
                onClick={() => extractAppointment(dateTimeString)}
              >
                提交
              </Button>
            </Stack>
            {showDetails && (
              <Stack gap={1} alignItems="flex-start">
                <Typography variant="h5">眼力測試</Typography>
                <Typography variant="body2">
                  眼盲指數：
                  {validationErrors.reduce(
                    (prev, curr) => prev + curr.value,
                    0
                  )}
                  /100
                </Typography>
                <List dense>
                  {validationErrors.map((error, i) => {
                    return (
                      <ListItem key={i}>
                        <ListItemIcon>
                          <Icon
                            fontSize="small"
                            color="error"
                            baseClassName="material-symbols-outlined"
                          >
                            error
                          </Icon>
                        </ListItemIcon>
                        <ListItemText
                          sx={{ color: "error.main" }}
                          primary={
                            <Stack
                              flexDirection="row"
                              justifyContent="space-between"
                              alignItems="center"
                            >
                              <Typography>{error.message}</Typography>
                              <Chip
                                label={"+" + error.value}
                                variant="outlined"
                                size="small"
                                color="error"
                              />
                            </Stack>
                          }
                        />
                      </ListItem>
                    );
                  })}
                  {selectedTime &&
                    [
                      { time: selectedTime.tz(), location: "當地" },
                      {
                        time: selectedTime.tz("Europe/London"),
                        location: "英國",
                      },
                      {
                        time: selectedTime.tz("Asia/Hong_Kong"),
                        location: "香港",
                      },
                    ].map(({ time, location }, i) => (
                      <ListItem key={i}>
                        <ListItemIcon>
                          <Icon
                            fontSize="small"
                            baseClassName="material-symbols-outlined"
                          >
                            info
                          </Icon>
                        </ListItemIcon>
                        <ListItemText
                          primary={`${location}時間：${dayjsToString(time)}`}
                        />
                      </ListItem>
                    ))}
                  {selectedPatient && (
                    <ListItem>
                      <ListItemIcon>
                        <Icon
                          fontSize="small"
                          baseClassName="material-symbols-outlined"
                        >
                          info
                        </Icon>
                      </ListItemIcon>
                      <ListItemText
                        primary={`事主：${patientToName(selectedPatient)}`}
                      />
                    </ListItem>
                  )}
                </List>
                <Button
                  variant="contained"
                  disabled={!selectedPatient || !selectedTime}
                  sx={{ alignSelf: "flex-end" }}
                  color={validationErrors.length ? "warning" : "primary"}
                  onClick={() => {
                    void createAppointment({
                      patientId: selectedPatient!.id,
                      startTime: {
                        seconds: BigInt(selectedTime!.unix()),
                        nanos: 0,
                      },
                    }).then(() => handleClose());
                  }}
                >
                  <Stack flexDirection="row" gap={1} alignItems="center">
                    <Icon baseClassName="material-symbols-outlined">
                      calendar_add_on
                    </Icon>
                    <Typography variant="button">新增</Typography>
                  </Stack>
                </Button>
              </Stack>
            )}
          </Stack>
        </Paper>
      </Box>
    </Modal>
  );
};

export const EditAppointmentModal = (props: {
  appointment: NoBigIntMessage<PlainMessage<PatientAppointment>>;
  open: boolean;
  handleClose: () => void;
}) => {
  const { open, handleClose, appointment } = props;
  const [value, setValue] = useState<Dayjs | null>(
    dayjs(BigInt(appointment.startTime!.seconds) * BigInt(1000))
  );
  const [updateAppointment] = useUpdateAppointmentMutation();

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          maxWidth: 500,
        }}
      >
        <Paper sx={{ p: 3 }}>
          <Stack gap={3} alignItems="flex-start">
            <Typography variant="h4">修改見面日期</Typography>
            <DateTimePicker
              label="英國時間"
              value={value}
              timezone="Europe/London"
              onChange={(newValue) => setValue(newValue)}
            />
            <DateTimePicker
              label="香港時間"
              value={value}
              timezone="Asia/Hong_Kong"
              onChange={(newValue) => setValue(newValue)}
            />
            <Button
              variant="contained"
              disabled={value === null}
              sx={{ alignSelf: "flex-end" }}
              onClick={() => {
                void updateAppointment({
                  id: appointment.id,
                  startTime: { seconds: BigInt(value!.unix()), nanos: 0 },
                }).then(() => handleClose());
              }}
            >
              <Stack flexDirection="row" gap={1} alignItems="center">
                <Icon baseClassName="material-symbols-outlined">edit</Icon>
                <Typography variant="button">修改</Typography>
              </Stack>
            </Button>
          </Stack>
        </Paper>
      </Box>
    </Modal>
  );
};

export const SyncCalendarModal = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  const { data: user } = useGetUserQuery();

  const [alertOpen, setAlertOpen] = useState(false);
  const handleAlertClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setAlertOpen(false);
  };

  const httpURL = new URL(
    `../calendar/${user!.userUuid}.ics`,
    import.meta.env.VITE_API_BASE_URL as string
  ).toString();
  const webcalURL = "webcal" + httpURL.slice(httpURL.indexOf("://"));

  return (
    <Modal open={open} onClose={handleClose}>
      <>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            maxWidth: 500,
          }}
        >
          <Paper sx={{ p: 3 }}>
            <Typography variant="h4" sx={{ mb: 3 }}>
              與日曆同步
            </Typography>
            <Stack gap={2} alignItems="flex-start">
              <Button
                href={
                  "https://www.google.com/calendar/render?cid=" +
                  encodeURIComponent(webcalURL)
                }
                target="_blank"
                variant="contained"
              >
                同步 Google 日曆
              </Button>
              <Button href={webcalURL} target="_blank" variant="contained">
                同步桌面／Android／Apple 日曆
              </Button>
              <Button
                href={`https://outlook.office.com/owa?path=%2Fcalendar%2Faction%2Fcompose&rru=addsubscription&url=${encodeURIComponent(
                  webcalURL
                )}&name=RC_Meetings`}
                target="_blank"
                variant="contained"
              >
                同步 Outlook 365 日曆
              </Button>
              <Button
                href={`https://outlook.live.com/owa?path=%2Fcalendar%2Faction%2Fcompose&rru=addsubscription&url=${encodeURIComponent(
                  webcalURL
                )}&name=RC_Meetings`}
                target="_blank"
                variant="contained"
              >
                同步 Outlook Live 日曆
              </Button>
              <TextField
                label="訂閱連結"
                variant="filled"
                value={httpURL}
                sx={{ width: "100%", input: { cursor: "pointer" } }}
                onClick={() => {
                  void navigator.clipboard.writeText(httpURL).then(() => {
                    setAlertOpen(true);
                  });
                }}
                onFocus={(e) => e.target.select()}
              />
            </Stack>
          </Paper>
        </Box>
        <Snackbar
          open={alertOpen}
          autoHideDuration={6000}
          onClose={handleAlertClose}
        >
          <Alert
            onClose={handleAlertClose}
            severity="info"
            variant="filled"
            sx={{ width: "100%" }}
          >
            已複製訂閱連結
          </Alert>
        </Snackbar>
      </>
    </Modal>
  );
};
