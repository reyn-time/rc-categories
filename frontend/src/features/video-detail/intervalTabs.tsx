import { Paper, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { IntervalList } from "./intervalList";
import { IntervalInputForm } from "./intervalInput";

export const IntervalTabs = (props: {
  videoId: number;
  seekTo: (second: number) => void;
  duration: number;
  currentTime: number;
}) => {
  const { videoId, seekTo, duration, currentTime } = props;
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <>
      <Tabs
        value={tabIndex}
        onChange={(_event, newValue: number) => handleTabChange(newValue)}
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label="已標記時段" />
        <Tab label="新增時段" />
        <Tab label="修改時段" disabled />
      </Tabs>

      <CustomTabPanel value={tabIndex} index={0}>
        <IntervalList videoId={videoId} seekTo={seekTo}></IntervalList>
      </CustomTabPanel>
      <CustomTabPanel value={tabIndex} index={1}>
        <IntervalInputForm
          videoId={videoId}
          duration={duration}
          times={[0, duration]}
          currentTime={currentTime}
          seekTo={seekTo}
          setTabIndex={setTabIndex}
        ></IntervalInputForm>
      </CustomTabPanel>
      <CustomTabPanel value={tabIndex} index={2}>
        <IntervalInputForm
          videoId={videoId}
          duration={duration}
          times={[0, duration]}
          currentTime={currentTime}
          seekTo={seekTo}
          setTabIndex={setTabIndex}
        ></IntervalInputForm>
      </CustomTabPanel>
    </>
  );
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const CustomTabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      <Paper sx={{ p: 3 }}>{children}</Paper>
    </div>
  );
};
