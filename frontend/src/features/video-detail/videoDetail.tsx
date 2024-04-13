import { useParams } from "react-router-dom";
import ReactPlayer from "react-player/youtube";
import { useEffect, useState, useRef } from "react";
import {
  Grid,
  Slider,
  Typography,
  Box,
  Button,
  Paper,
  Icon,
  InputLabel,
  Select,
  Chip,
  MenuItem,
  SelectChangeEvent,
  OutlinedInput,
  FormControl,
  FormGroup,
} from "@mui/material";
import "./videoDetail.css";
const secondToText = (second: number) => {
  if (second < 3600) {
    return new Date(second * 1000).toISOString().slice(14, 19);
  }
  return new Date(second * 1000).toISOString().slice(11, 19);
};

export const VideoDetail = () => {
  const { youtubeId } = useParams();
  const [duration, setDuration] = useState<number>(0);
  const [times, setTimes] = useState<number[]>([0, 1]);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const playerRef = useRef<ReactPlayer>(null);
  const [personName, setPersonName] = useState<string[]>([]);

  useEffect(() => {
    setTimes([0, duration]);
  }, [duration]);

  const handlePersonNameChange = (
    event: SelectChangeEvent<typeof personName>
  ) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleChange = (_event: Event, newValue: number | number[]) => {
    setTimes(newValue as number[]);
  };

  const names = [
    "Oliver Hansen",
    "Van Henry",
    "April Tucker",
    "Ralph Hubbard",
    "Omar Alexander",
    "Carlos Abbott",
    "Miriam Wagner",
    "Bradley Wilkerson",
    "Virginia Andrews",
    "Kelly Snyder",
  ];

  return (
    <>
      <Grid container>
        <Grid item xs={12} lg={8} xl={5}>
          <FormGroup sx={{ flexDirection: "column", m: 3 }}>
            <Box sx={{ position: "relative", paddingTop: "56.25%" }}>
              <ReactPlayer
                url={"https://www.youtube.com/watch?v=" + youtubeId}
                controls
                width="100%"
                height="100%"
                onDuration={(duration) => setDuration(duration)}
                onProgress={(progress) =>
                  setCurrentTime(progress.playedSeconds)
                }
                playing={isPlaying}
                onPause={() => setIsPlaying(false)}
                onPlay={() => setIsPlaying(true)}
                ref={playerRef}
                className="react-player"
              />
            </Box>

            <Paper className="input-form">
              <Slider
                min={0}
                max={duration}
                valueLabelDisplay="auto"
                valueLabelFormat={secondToText}
                value={times}
                onChange={handleChange}
                marks={[
                  { value: 0, label: secondToText(0) },
                  { value: duration, label: secondToText(duration) },
                ]}
                sx={{ width: "80%", margin: "40px auto" }}
              />
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography sx={{ marginRight: 3 }}>
                  標記時段：{secondToText(times[0])} - {secondToText(times[1])}
                </Typography>
                <Button
                  variant="outlined"
                  onClick={() => {
                    playerRef.current?.seekTo(times[0], "seconds");
                    setIsPlaying(true);
                  }}
                >
                  重播時段
                </Button>
              </Box>
              <Typography>現在時間：{secondToText(currentTime)}</Typography>
              <Box
                sx={{ display: "flex", alignItems: "center", m: 2, gap: 0.5 }}
              >
                <Button
                  onClick={() =>
                    setTimes((t) =>
                      currentTime <= t[1]
                        ? [currentTime, t[1]]
                        : [currentTime, currentTime]
                    )
                  }
                >
                  <Icon>west</Icon>&nbsp;設定為開始時間
                </Button>
                <Button
                  onClick={() =>
                    setTimes((t) =>
                      t[0] <= currentTime
                        ? [t[0], currentTime]
                        : [currentTime, currentTime]
                    )
                  }
                >
                  設定為結束時間&nbsp;<Icon>east</Icon>
                </Button>
              </Box>
              <FormControl>
                <InputLabel id="demo-simple-select-label">神學分類</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  multiple
                  value={personName}
                  onChange={handlePersonNameChange}
                  input={<OutlinedInput label="神學分類" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip
                          key={value}
                          label={value}
                          onMouseDown={(event) => {
                            event.stopPropagation();
                          }}
                          onDelete={() => {
                            console.log(value);
                          }}
                        />
                      ))}
                    </Box>
                  )}
                >
                  {names.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Paper>
          </FormGroup>
        </Grid>
      </Grid>
    </>
  );
};
