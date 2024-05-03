import {
  Box,
  Slide,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { IntervalList } from "./intervalList";
import { IntervalInputForm } from "./intervalInput";
import { useState } from "react";
import { PanelTypes } from "./intervalTypes";
import { VideoStatus } from "../../gen/proto/video/v1/video_pb";
import {
  allVideoStatus,
  videoStatusToStatusText,
} from "../../util/videoStatus";
import { useChangeVideoStatusMutation } from "../video/videoSlice";

export const IntervalTabs = (props: {
  videoId: number;
  seekTo: (second: number) => void;
  duration: number;
  currentTime: number;
  status: VideoStatus;
}) => {
  const { videoId, seekTo, duration, currentTime, status } = props;
  const [panel, setPanel] = useState<PanelTypes | null>(null);
  const [changeVideoStatus] = useChangeVideoStatusMutation();
  const [buttonEnabled, setButtonEnabled] = useState(true);

  const onStatusChange = (newStatus: VideoStatus) => {
    setButtonEnabled(false);
    void changeVideoStatus({
      ids: [videoId],
      status: newStatus,
    }).then(() => {
      setButtonEnabled(true);
    });
  };

  return (
    <Stack gap={2}>
      <ToggleButtonGroup
        exclusive
        value={status}
        size="small"
        aria-label="text alignment"
        onChange={(_, value) => onStatusChange(+value)}
      >
        {allVideoStatus.map((status) => (
          <ToggleButton
            key={status}
            color={videoStatusToStatusText[status].color}
            value={status}
            disabled={!buttonEnabled}
          >
            {videoStatusToStatusText[status].text}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      <Box sx={{ position: "relative" }}>
        <Slide in={panel === null} direction="left" appear={false}>
          <IntervalList
            videoId={videoId}
            seekTo={seekTo}
            setPanel={setPanel}
          ></IntervalList>
        </Slide>

        <Box sx={{ position: "absolute", top: 0, left: 0, width: "100%" }}>
          <Slide in={!!panel?.type} direction="left" mountOnEnter unmountOnExit>
            <IntervalInputForm
              videoId={videoId}
              intervalId={
                panel?.type === "UpdateInterval" ? panel.interval.id : undefined
              }
              duration={duration}
              times={
                panel?.type === "UpdateInterval"
                  ? [panel.interval.startTime, panel.interval.endTime]
                  : [0, duration]
              }
              selectedCategoryNames={
                panel?.type === "UpdateInterval"
                  ? panel.categoryNames
                  : undefined
              }
              currentTime={currentTime}
              seekTo={seekTo}
              setPanel={setPanel}
            ></IntervalInputForm>
          </Slide>
        </Box>
      </Box>
    </Stack>
  );
};
