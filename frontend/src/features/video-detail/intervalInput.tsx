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
  SliderMarkLabel,
  IconButton,
  Tooltip,
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
import { LoginPromptDirective } from "../user/loginPromptDirective";

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
    setPanel(null);
  };

  const MarkLabelComponent = (props: {
    children: string;
    "data-index": number;
    style: React.CSSProperties;
  }) => {
    if (props["data-index"] == 1) {
      return (
        <Stack
          style={{
            ...props.style,
            position: "absolute",
            top: "-30px",
            transform: "translate(-50%, 0)",
          }}
          flexDirection="row"
          alignItems="center"
          flexWrap="nowrap"
        >
          <Tooltip title="設定為開始時間" placement="left">
            <IconButton
              size="small"
              onMouseDown={(e) => {
                e.preventDefault();
                setTimes((t) =>
                  currentTime <= t[1]
                    ? [currentTime, t[1]]
                    : [currentTime, currentTime]
                );
              }}
            >
              <Icon baseClassName="material-symbols-outlined" fontSize="small">
                skip_previous
              </Icon>
            </IconButton>
          </Tooltip>
          <Typography
            onMouseDown={(e) => {
              e.preventDefault();
            }}
            sx={{
              color: "gray",
              fontSize: "14px",
              cursor: "default",
              "white-space": "nowrap",
              overflow: "hidden",
            }}
          >
            現時
          </Typography>
          <Tooltip title="設定為結束時間" placement="right">
            <IconButton
              size="small"
              onMouseDown={(e) => {
                e.preventDefault();
                setTimes((t) =>
                  t[0] <= currentTime
                    ? [t[0], currentTime]
                    : [currentTime, currentTime]
                );
              }}
            >
              <Icon baseClassName="material-symbols-outlined" fontSize="small">
                skip_next
              </Icon>
            </IconButton>
          </Tooltip>
        </Stack>
      );
    }
    return <SliderMarkLabel {...props}>{props.children}</SliderMarkLabel>;
  };

  return (
    <Box ref={ref}>
      <Paper sx={{ p: 3 }}>
        <FormGroup>
          <Stack alignItems="flex-start" gap={2}>
            <Button variant="outlined" onClick={() => setPanel(null)}>
              <Icon baseClassName="material-symbols-outlined">
                navigate_before
              </Icon>
              返回
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
                { value: currentTime, label: "mid" },
                { value: duration, label: secondToText(duration) },
              ]}
              sx={{ width: "80%", margin: "40px auto" }}
              slots={{ markLabel: MarkLabelComponent }}
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
              <LoginPromptDirective>
                {(disabled) => (
                  <Button
                    onClick={handleFormSubmit}
                    disabled={
                      disabled ||
                      selectedCategoryNames.length === 0 ||
                      isCreatingInterval ||
                      isUpdatingInterval
                    }
                    variant="contained"
                    size="large"
                  >
                    {intervalId ? "更新" : "儲存"}時段
                  </Button>
                )}
              </LoginPromptDirective>
            </Stack>
          </Stack>
        </FormGroup>
      </Paper>
    </Box>
  );
});
