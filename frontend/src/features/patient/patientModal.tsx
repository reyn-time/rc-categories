import {
  Box,
  Button,
  Chip,
  Icon,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Modal,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Gender, Patient } from "../../gen/proto/patient/v1/patient_pb";
import { useListPatientQuery } from "./patientSlice";
import { dayjsToString, getTimeFromString } from "../../util/time";
import { PlainMessage } from "@bufbuild/protobuf";
import { Dayjs } from "dayjs";
import { patientToName } from "./util";
import { useCreateAppointmentMutation } from "./patientAppointmentSlice";

interface ValidationError {
  message: string;
  value: number;
}

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
          width: 500,
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
                  {validationErrors.map((error) => {
                    return (
                      <ListItem>
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
                    ].map(({ time, location }) => (
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