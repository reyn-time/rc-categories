import {
  Alert,
  Box,
  Button,
  Divider,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Skeleton,
  Stack,
} from "@mui/material";
import {
  useDeleteIntervalMutation,
  useListIntervalQuery,
} from "./intervalSlice";
import { secondToText } from "../../util/time";
import { useListCategoryQuery } from "../category/categorySlice";
import { forwardRef, useMemo } from "react";
import { PanelTypes } from "./intervalTypes";

export const IntervalList = forwardRef(function X(
  props: {
    videoId: number;
    seekTo: (second: number) => void;
    setPanel: (panelType: PanelTypes) => void;
  },
  ref
) {
  const { videoId, seekTo, setPanel } = props;
  const {
    data: intervals = [],
    isLoading,
    isFetching,
    error,
  } = useListIntervalQuery(videoId);
  const { data: categories = [] } = useListCategoryQuery();
  const [deleteInterval] = useDeleteIntervalMutation();

  const categoryIdToName = useMemo(() => {
    const categoryIdToName = new Map<number, string>();
    categories.forEach((category) => {
      categoryIdToName.set(category.id, category.name);
    });
    return categoryIdToName;
  }, [categories]);

  if (isLoading || isFetching) {
    return (
      <Box ref={ref}>
        <Skeleton variant="rectangular" height="200px"></Skeleton>
      </Box>
    );
  }

  if (error) {
    return (
      <Box ref={ref}>
        <Alert severity="error">GG 出事了: {JSON.stringify(error)}</Alert>
      </Box>
    );
  }

  return (
    <Box ref={ref}>
      <Paper sx={{ p: 3 }}>
        <Stack alignItems="flex-start">
          {intervals.length === 0 && (
            <Alert severity="info">尚未標記任何時段</Alert>
          )}
          <List sx={{ width: "100%" }}>
            {intervals.map((interval, i) => (
              <Box key={interval.id} width="100%">
                {i !== 0 && <Divider />}
                <ListItem>
                  <ListItemText
                    primary={`${secondToText(
                      interval.startTime
                    )} - ${secondToText(interval.endTime)}`}
                    secondary={interval.categoryIds
                      .map((id) => categoryIdToName.get(id) ?? "")
                      .filter((name) => name !== "")
                      .join("，")}
                  />
                  <ListItemSecondaryAction>
                    <IconButton onClick={() => seekTo(interval.startTime)}>
                      <Icon>play_arrow</Icon>
                    </IconButton>
                    <IconButton
                      onClick={() =>
                        setPanel({
                          type: "UpdateInterval",
                          interval,
                          categoryNames: interval.categoryIds
                            .map((id) => categoryIdToName.get(id) ?? "")
                            .filter((name) => name !== ""),
                        })
                      }
                    >
                      <Icon>edit</Icon>
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        void deleteInterval(interval.id);
                      }}
                    >
                      <Icon>delete</Icon>
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </Box>
            ))}
          </List>
          <Button
            variant="contained"
            onClick={() => setPanel({ type: "CreateInterval" })}
          >
            新增時段
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
});
