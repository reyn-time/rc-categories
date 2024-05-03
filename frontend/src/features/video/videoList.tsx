import { useChangeVideoStatusMutation, useListVideoQuery } from "./videoSlice";
import {
  Paper,
  Grid,
  Skeleton,
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Checkbox,
  Pagination,
  Stack,
  ListItemIcon,
  IconButton,
  Icon,
  Button,
  Typography,
  TextField,
  InputAdornment,
  Chip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { convertHTMLToText } from "../../util/encoding";
import { useMemo, useState } from "react";
import { VideoStatus } from "../../gen/proto/video/v1/video_pb";
import { dateToString } from "../../util/time";

const statusToChip: Record<VideoStatus, React.JSX.Element> = {
  [VideoStatus.Approved]: (
    <Chip size="small" label="已驗證" color="success" variant="outlined" />
  ),
  [VideoStatus.Archived]: (
    <Chip size="small" label="刪除" color="error" variant="outlined" />
  ),
  [VideoStatus.Pending]: (
    <Chip size="small" label="待分類" color="default" variant="outlined" />
  ),
  [VideoStatus.InProgress]: (
    <Chip size="small" label="分類中" color="primary" variant="outlined" />
  ),
  [VideoStatus.InReview]: (
    <Chip size="small" label="待驗證" color="warning" variant="outlined" />
  ),
};

export const VideoList = () => {
  const {
    data: videos = [],
    isLoading,
    isFetching,
    error,
  } = useListVideoQuery();
  const [changeVideoStatus] = useChangeVideoStatusMutation();
  const navigate = useNavigate();
  const [checked, setChecked] = useState(new Set<number>());
  const [pageNumber, setPageNumber] = useState(1);
  const [isEditMode, setIsEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const extendedList = useMemo(
    () =>
      videos.map((video) => ({
        ...video,
        main: convertHTMLToText(video.name),
        sub: dateToString(video.createdAt) + ` #${video.id}`,
      })),
    [videos]
  );
  const filteredList = extendedList
    .filter((video) => video.status !== VideoStatus.Archived)
    .filter((video) => searchTerm === "" || video.name.includes(searchTerm));
  const pageSize = 15;
  const numOfPages = Math.ceil(filteredList.length / pageSize);

  const toggleCheck = (rowId: number) => {
    const newChecked = new Set(checked);
    if (newChecked.has(rowId)) {
      newChecked.delete(rowId);
    } else {
      newChecked.add(rowId);
    }
    setChecked(newChecked);
  };

  const handleDelete = () => {
    void changeVideoStatus({
      ids: [...checked],
      status: VideoStatus.Archived,
    });
    setChecked(new Set());
    setPageNumber(1);
    setIsEditMode(false);
  };

  return (
    <Grid container>
      <Grid item xs={0} sm={1} md={2}></Grid>
      <Grid item xs={12} sm={10} md={8} sx={{ mt: 3 }}>
        {isLoading || isFetching ? (
          <Skeleton variant="rectangular" height={1000} />
        ) : error ? (
          <Alert severity="error">GG 出事了: {JSON.stringify(error)}</Alert>
        ) : (
          <Paper sx={{ p: 2 }}>
            <Stack gap={1} alignItems="flex-start">
              <Pagination
                count={numOfPages}
                size="large"
                showFirstButton
                showLastButton
                page={pageNumber}
                onChange={(_, value) => setPageNumber(value)}
              />
              <TextField
                sx={{ p: 2 }}
                variant="outlined"
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Icon>search</Icon>
                    </InputAdornment>
                  ),
                }}
                value={searchTerm}
                onChange={(e) => {
                  setPageNumber(1);
                  setSearchTerm(e.target.value);
                }}
              />
              <Stack direction="row" gap={2} alignItems="center">
                <IconButton onClick={() => setIsEditMode((edit) => !edit)}>
                  <Icon>{isEditMode ? "chevron_left" : "chevron_right"}</Icon>
                </IconButton>

                {isEditMode && (
                  <Typography variant="subtitle2">
                    已選擇 {checked.size} 項
                  </Typography>
                )}
                {isEditMode && (
                  <Button
                    variant="contained"
                    color="error"
                    disabled={checked.size === 0}
                    onClick={() => handleDelete()}
                  >
                    刪除
                  </Button>
                )}
              </Stack>
              <List sx={{ width: "100%" }}>
                {filteredList
                  .slice(pageSize * (pageNumber - 1), pageSize * pageNumber)
                  .map((row) => (
                    <ListItem
                      key={row.id}
                      disablePadding
                      dense
                      color="red"
                      divider
                    >
                      <ListItemButton
                        onClick={() => {
                          if (isEditMode) {
                            toggleCheck(row.id);
                          } else {
                            navigate(`/video/${row.id}`);
                          }
                        }}
                      >
                        {isEditMode && (
                          <ListItemIcon>
                            <Checkbox
                              edge="start"
                              checked={checked.has(row.id)}
                              tabIndex={-1}
                              disableRipple
                            />
                          </ListItemIcon>
                        )}

                        <ListItemText
                          primary={
                            <Stack direction="row" alignItems="center" gap={1}>
                              {row.main}
                              {statusToChip[row.status]}
                            </Stack>
                          }
                          secondary={row.sub}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
              </List>
            </Stack>
          </Paper>
        )}
      </Grid>
    </Grid>
  );
};
