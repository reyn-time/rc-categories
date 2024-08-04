import {
  Alert,
  Box,
  Button,
  Divider,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
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
import { LoginPromptDirective } from "../user/loginPromptDirective";

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
                  <ListItemIcon>
                    <IconButton onClick={() => seekTo(interval.startTime)}>
                      <Icon baseClassName="material-symbols-outlined">
                        play_arrow
                      </Icon>
                    </IconButton>
                  </ListItemIcon>
                  <ListItemIcon>
                    <LoginPromptDirective>
                      {(disabled) => (
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
                          disabled={disabled}
                        >
                          <Icon baseClassName="material-symbols-outlined">
                            edit
                          </Icon>
                        </IconButton>
                      )}
                    </LoginPromptDirective>
                  </ListItemIcon>
                  <ListItemIcon>
                    <LoginPromptDirective>
                      {(disabled) => (
                        <IconButton
                          onClick={() => {
                            void deleteInterval(interval.id);
                          }}
                          disabled={disabled}
                        >
                          <Icon baseClassName="material-symbols-outlined">
                            delete
                          </Icon>
                        </IconButton>
                      )}
                    </LoginPromptDirective>
                  </ListItemIcon>
                </ListItem>
              </Box>
            ))}
          </List>
          <LoginPromptDirective>
            {(disabled) => (
              <Button
                variant="contained"
                onClick={() => setPanel({ type: "CreateInterval" })}
                disabled={disabled}
              >
                新增時段
              </Button>
            )}
          </LoginPromptDirective>
        </Stack>
      </Paper>
    </Box>
  );
});
