import { List, ListItem, ListItemText } from "@mui/material";
import { useListIntervalQuery } from "./intervalSlice";
import { secondToText } from "../../util/time";

export const IntervalList = (props: { videoId: number }) => {
  const { videoId } = props;
  const { data: intervals = [] } = useListIntervalQuery(videoId);
  return (
    <List>
      {intervals.map((interval) => (
        <ListItem key={interval.id}>
          <ListItemText
            primary={`${secondToText(interval.startTime)} - ${secondToText(
              interval.endTime
            )}`}
            secondary={interval.categoryIds.join(", ")}
          />
        </ListItem>
      ))}
    </List>
  );
};
