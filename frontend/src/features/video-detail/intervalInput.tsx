import {
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
  OutlinedInput,
  FormControl,
  SelectChangeEvent,
  FormGroup,
} from "@mui/material";
import { useState } from "react";
import { selectExtendedCategories } from "../category/categorySelector";
import { store } from "../../app/store";
import { useListCategoryQuery } from "../category/categorySlice";
import { usePostIntervalMutation } from "./intervalSlice";
import { secondToText } from "../../util/time";

export const IntervalInputForm = (props: {
  videoId: number;
  duration: number;
  times: [number, number];
  currentTime: number;
  seekTo: (time: number) => void;
}) => {
  const [times, setTimes] = useState<[number, number]>(props.times);
  const [selectedCategoryNames, setSelectedCategoryNames] = useState<string[]>(
    []
  );
  const extendedCategories = selectExtendedCategories(store.getState());
  const { data: categories = [] } = useListCategoryQuery();
  const [postInterval, { isLoading: isCreatingInterval }] =
    usePostIntervalMutation();

  const { duration, currentTime, seekTo, videoId } = props;

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
    void postInterval({
      interval: {
        videoId,
        startTime,
        endTime,
        categoryIds: selectedCategoryIds,
      },
    });
  };

  return (
    <Paper sx={{ p: 3 }}>
      <FormGroup>
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
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
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
        </Box>
        <Typography>現在時間：{secondToText(currentTime)}</Typography>
        <Box sx={{ display: "flex", alignItems: "center", m: 2, gap: 0.5 }}>
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
            value={selectedCategoryNames}
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
                      setSelectedCategoryNames((prev) =>
                        prev.filter((name) => name !== value)
                      );
                    }}
                  />
                ))}
              </Box>
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
        <Box sx={{ display: "flex", justifyContent: "flex-end", m: 2 }}>
          <Button
            onClick={handleFormSubmit}
            disabled={selectedCategoryNames.length === 0 || isCreatingInterval}
            variant="contained"
            size="large"
          >
            儲存標記
          </Button>
        </Box>
      </FormGroup>
    </Paper>
  );
};
