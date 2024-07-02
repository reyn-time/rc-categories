import {
  Avatar,
  Box,
  Chip,
  Fade,
  Slide,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { IntervalList } from "./intervalList";
import { IntervalInputForm } from "./intervalInput";
import { useState } from "react";
import { PanelTypes } from "./intervalTypes";
import { Video, VideoStatus } from "../../gen/proto/video/v1/video_pb";
import {
  allVideoStatus,
  videoStatusToStatusText,
} from "../../util/videoStatus";
import { useChangeVideoStatusMutation } from "../video/videoSlice";
import { PlainMessage } from "@bufbuild/protobuf";
import { NoBigIntMessage } from "../../util/types";
import { userAvatarProps } from "../user/avatar";

export const IntervalTabs = (props: {
  video: NoBigIntMessage<PlainMessage<Video>>;
  seekTo: (second: number) => void;
  duration: number;
  currentTime: number;
  status: VideoStatus;
}) => {
  const { video, seekTo, duration, currentTime, status } = props;
  const [panel, setPanel] = useState<PanelTypes | null>(null);
  const [changeVideoStatus] = useChangeVideoStatusMutation();
  const [buttonEnabled, setButtonEnabled] = useState(true);

  const onStatusChange = (newStatus: VideoStatus) => {
    setButtonEnabled(false);
    void changeVideoStatus({
      ids: [video.id],
      status: newStatus,
    }).then(() => {
      setButtonEnabled(true);
    });
  };

  return (
    <Stack gap={2}>
      <Stack
        direction="row"
        gap={1}
        alignItems="center"
        justifyContent="space-between"
      >
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
        {/* TODO: Create dropdown to select other users as editors */}
        <Chip
          avatar={video.editor && <Avatar {...userAvatarProps(video.editor)} />}
          label={"負責人：" + (video.editor?.name ?? "不明")}
          onClick={() => {}}
        />
      </Stack>
      <Box
        sx={{
          position: "relative",
        }}
      >
        <Fade in={panel === null} appear={false}>
          <IntervalList
            videoId={video.id}
            seekTo={seekTo}
            setPanel={setPanel}
          ></IntervalList>
        </Fade>

        <Box sx={{ position: "absolute", top: 0, left: 0, width: "100%" }}>
          <Slide in={!!panel?.type} direction="left" mountOnEnter unmountOnExit>
            <IntervalInputForm
              videoId={video.id}
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
