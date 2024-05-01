import {
  Slider,
  Typography,
  Box,
  Button,
  Icon,
  InputLabel,
  Select,
  Chip,
  MenuItem,
  OutlinedInput,
  FormControl,
  SelectChangeEvent,
  FormGroup,
  Paper,
  Stack,
} from "@mui/material";
import { forwardRef, useState } from "react";
import { selectExtendedCategories } from "../category/categorySelector";
import { store } from "../../app/store";
import { useListCategoryQuery } from "../category/categorySlice";
import {
  usePostIntervalMutation,
  useUpdateIntervalMutation,
} from "./intervalSlice";
import { secondToText } from "../../util/time";
import { PanelTypes } from "./intervalTypes";

export const IntervalInputForm = forwardRef(function IntervalInputForm(
  props: {
    videoId: number;
    intervalId?: number;
    selectedCategoryNames?: string[];
    duration: number;
    times: [number, number];
    currentTime: number;
    seekTo: (time: number) => void;
    setPanel: (panelType: PanelTypes | null) => void;
  },
  ref
) {
  const [times, setTimes] = useState<[number, number]>(props.times);
  const [selectedCategoryNames, setSelectedCategoryNames] = useState<string[]>(
    props.selectedCategoryNames ?? []
  );
  const extendedCategories = selectExtendedCategories(store.getState());
  const { data: categories = [] } = useListCategoryQuery();
  const [postInterval, { isLoading: isCreatingInterval }] =
    usePostIntervalMutation();
  const [updateInterval, { isLoading: isUpdatingInterval }] =
    useUpdateIntervalMutation();

  const { duration, currentTime, seekTo, videoId, setPanel, intervalId } =
    props;

  const handlePersonNameChange = (
    event: SelectChangeEvent<typeof selectedCategoryNames>
  ) => {
    const {
      target: { value },
    } = event;
    setSelectedCategoryNames(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleFormSubmit = () => {
    const [startTime, endTime] = times;
    const selectedCategoryIds = selectedCategoryNames
      .map((name) => {
        const category = categories.find((c) => c.name === name);
        return category?.id;
      })
      .filter((id) => id !== undefined) as number[];

    if (intervalId) {
      void updateInterval({
        interval: {
          id: intervalId,
          videoId,
          startTime,
          endTime,
          categoryIds: selectedCategoryIds,
        },
      });
    } else {
      void postInterval({
        interval: {
          videoId,
          startTime,
          endTime,
          categoryIds: selectedCategoryIds,
        },
      });
    }

    // Clear form
    setTimes([0, duration]);
    setSelectedCategoryNames([]);
    setPanel(null);
  };

  return (
    <Box ref={ref}>
      <Paper sx={{ p: 3 }}>
        <FormGroup>
          <Stack alignItems="flex-start" gap={2}>
            <Button variant="outlined" onClick={() => setPanel(null)}>
              <Icon>navigate_before</Icon>返回
            </Button>
            <Slider
              min={0}
              max={duration}
              valueLabelDisplay="auto"
              valueLabelFormat={secondToText}
              value={times}
              onChange={(_event, value) => setTimes(value as [number, number])}
              marks={[
                { value: 0, label: secondToText(0) },
                { value: duration, label: secondToText(duration) },
              ]}
              sx={{ width: "80%", margin: "40px auto" }}
            />
            <Stack gap={1}>
              <Stack direction="row" alignItems="center" gap={3}>
                <Typography>
                  標記時段：{secondToText(times[0])} - {secondToText(times[1])}
                </Typography>
                <Button
                  variant="outlined"
                  onClick={() => {
                    seekTo(times[0]);
                  }}
                >
                  重播時段
                </Button>
              </Stack>
              <Typography>現在時間：{secondToText(currentTime)}</Typography>
              <Stack direction="row" alignItems="center" gap={0.5}>
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
              </Stack>
            </Stack>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">神學分類</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                multiple
                value={selectedCategoryNames}
                onChange={handlePersonNameChange}
                input={<OutlinedInput label="神學分類" />}
                renderValue={(selected) => (
                  <Stack direction="row" flexWrap="wrap" gap={0.5}>
                    {selected.map((value) => (
                      <Chip
                        key={value}
                        label={value}
                        onMouseDown={(event) => {
                          event.stopPropagation();
                        }}
                        onDelete={() => {
                          setSelectedCategoryNames((prev) =>
                            prev.filter((name) => name !== value)
                          );
                        }}
                      />
                    ))}
                  </Stack>
                )}
              >
                {extendedCategories.map((category) => (
                  <MenuItem
                    key={category.id}
                    value={category.name}
                    sx={{
                      pl: (category.rankList.length - 1) * 3 + 2,
                    }}
                  >
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Stack width="100%" alignItems="flex-end">
              <Button
                onClick={handleFormSubmit}
                disabled={
                  selectedCategoryNames.length === 0 ||
                  isCreatingInterval ||
                  isUpdatingInterval
                }
                variant="contained"
                size="large"
              >
                {intervalId ? "更新" : "儲存"}時段
              </Button>
            </Stack>
          </Stack>
        </FormGroup>
      </Paper>
    </Box>
  );
});
