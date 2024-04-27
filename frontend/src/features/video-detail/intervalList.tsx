import {
  Alert,
  Divider,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Skeleton,
} from "@mui/material";
import { useListIntervalQuery } from "./intervalSlice";
import { secondToText } from "../../util/time";
import { useListCategoryQuery } from "../category/categorySlice";
import { useMemo } from "react";

export const IntervalList = (props: {
  videoId: number;
  seekTo: (second: number) => void;
}) => {
  const { videoId, seekTo } = props;
  const {
    data: intervals = [],
    isLoading,
    isFetching,
    error,
  } = useListIntervalQuery(videoId);
  const { data: categories = [] } = useListCategoryQuery();

  const categoryIdToName = useMemo(() => {
    const categoryIdToName = new Map<number, string>();
    categories.forEach((category) => {
      categoryIdToName.set(category.id, category.name);
    });
    return categoryIdToName;
  }, [categories]);

  if (isLoading || isFetching) {
    return <Skeleton variant="rectangular" height="200px"></Skeleton>;
  }

  if (error) {
    return <Alert severity="error">GG 出事了: {JSON.stringify(error)}</Alert>;
  }

  if (intervals.length === 0) {
    return <Alert severity="info">尚未標記任何時段</Alert>;
  }

  return (
    <List>
      {intervals.map((interval) => (
        <>
          <ListItem key={interval.id}>
            <ListItemText
              primary={`${secondToText(interval.startTime)} - ${secondToText(
                interval.endTime
              )}`}
              secondary={interval.categoryIds
                .map((id) => categoryIdToName.get(id) ?? "不明")
                .join("，")}
            />
            <ListItemSecondaryAction>
              <IconButton onClick={() => seekTo(interval.startTime)}>
                <Icon>play_arrow</Icon>
              </IconButton>
              <IconButton>
                <Icon>edit</Icon>
              </IconButton>
              <IconButton>
                <Icon>delete</Icon>
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
        </>
      ))}
    </List>
  );
};
