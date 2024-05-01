import { Box, Slide } from "@mui/material";
import { IntervalList } from "./intervalList";
import { IntervalInputForm } from "./intervalInput";
import { useState } from "react";
import { PanelTypes } from "./intervalTypes";

export const IntervalTabs = (props: {
  videoId: number;
  seekTo: (second: number) => void;
  duration: number;
  currentTime: number;
}) => {
  const { videoId, seekTo, duration, currentTime } = props;
  const [panel, setPanel] = useState<PanelTypes | null>(null);

  return (
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
              panel?.type === "UpdateInterval" ? panel.categoryNames : undefined
            }
            currentTime={currentTime}
            seekTo={seekTo}
            setPanel={setPanel}
          ></IntervalInputForm>
        </Slide>
      </Box>
    </Box>
  );
};
