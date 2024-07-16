import {
  setPageNumber,
  setSearchTerm,
  setSelectedVideoStatus,
  useChangeVideoStatusMutation,
  useListVideoQuery,
} from "./videoSlice";
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
  Menu,
  MenuItem,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { convertHTMLToText } from "../../util/encoding";
import { useMemo, useState } from "react";
import { VideoStatus } from "../../gen/proto/video/v1/video_pb";
import { dateToString } from "../../util/time";
import {
  allVideoStatus,
  videoStatusToStatusText,
} from "../../util/videoStatus";
import { userAvatarProps } from "../user/avatar";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { LoginPromptDirective } from "../user/loginPromptDirective";

// TODO: Add a button to refresh video list.
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
  const [isEditMode, setIsEditMode] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const pageNumber = useAppSelector((state) => state.videoFilter.pageNumber);
  const selectedVideoStatus = useAppSelector(
    (state) => state.videoFilter.selectedVideoStatus
  );
  const searchTerm = useAppSelector((state) => state.videoFilter.searchTerm);
  const dispatch = useAppDispatch();

  const isFilterPanelOpen = Boolean(anchorEl);

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
    .filter((video) => selectedVideoStatus.has(video.status))
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
    dispatch(setPageNumber(1));
    setIsEditMode(false);
  };

  const handleRevert = () => {
    void changeVideoStatus({
      ids: [...checked],
      status: VideoStatus.Pending,
    });
    setChecked(new Set());
    dispatch(setPageNumber(1));
    setIsEditMode(false);
  };

  const handleFilterButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterPanelClose = () => {
    setAnchorEl(null);
  };

  const toggleSelectedVideoStatus = (status: VideoStatus) => {
    const newSelected = new Set(selectedVideoStatus);
    if (newSelected.has(status)) {
      newSelected.delete(status);
    } else {
      newSelected.add(status);
    }
    dispatch(setSelectedVideoStatus(newSelected));
    dispatch(setPageNumber(1));
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
                page={pageNumber}
                onChange={(_, value) => dispatch(setPageNumber(value))}
              />
              <Stack direction="row" gap={1} alignItems="center">
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
                    dispatch(setPageNumber(1));
                    dispatch(setSearchTerm(e.target.value));
                  }}
                />
                <IconButton onClick={handleFilterButtonClick}>
                  <Icon>filter_list</Icon>
                </IconButton>
              </Stack>
              <Stack direction="row" gap={2} alignItems="center">
                <IconButton onClick={() => setIsEditMode((edit) => !edit)}>
                  <Icon>{isEditMode ? "toggle_on" : "toggle_off"}</Icon>
                </IconButton>

                {isEditMode && (
                  <Typography variant="subtitle2">
                    已選擇 {checked.size} 項
                  </Typography>
                )}
                {isEditMode && (
                  <LoginPromptDirective>
                    {(disabled) => (
                      <Button
                        variant="contained"
                        color="error"
                        disabled={disabled || checked.size === 0}
                        onClick={() => handleDelete()}
                      >
                        刪除
                      </Button>
                    )}
                  </LoginPromptDirective>
                )}
                {isEditMode && (
                  <LoginPromptDirective>
                    {(disabled) => (
                      <Button
                        variant="contained"
                        color="inherit"
                        disabled={disabled || checked.size === 0}
                        onClick={() => handleRevert()}
                      >
                        復原
                      </Button>
                    )}
                  </LoginPromptDirective>
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
                        onClick={(e) => {
                          if (isEditMode) {
                            toggleCheck(row.id);
                          } else if (e.ctrlKey || e.button === 1) {
                            window.open(`/video/${row.id}`, "_blank");
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

                        {
                          <ListItemAvatar>
                            {row.editor ? (
                              <Avatar {...userAvatarProps(row.editor)} />
                            ) : (
                              <Avatar>
                                <Icon>person_off</Icon>
                              </Avatar>
                            )}
                          </ListItemAvatar>
                        }

                        <ListItemText
                          primary={
                            <Stack direction="row" alignItems="center" gap={1}>
                              {row.main}
                              <Chip
                                size="small"
                                label={videoStatusToStatusText[row.status].text}
                                color={
                                  videoStatusToStatusText[row.status].color
                                }
                                variant="outlined"
                              />
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
      <Menu
        anchorEl={anchorEl}
        open={isFilterPanelOpen}
        onClose={handleFilterPanelClose}
      >
        {allVideoStatus.map((status) => {
          const selected = selectedVideoStatus.has(status);
          return (
            <MenuItem
              key={status}
              onClick={() => toggleSelectedVideoStatus(status)}
            >
              <ListItemIcon>{selected && <Icon>check</Icon>}</ListItemIcon>
              <ListItemText>
                <Chip
                  label={videoStatusToStatusText[status].text}
                  color={videoStatusToStatusText[status].color}
                  variant="outlined"
                />
              </ListItemText>
            </MenuItem>
          );
        })}
      </Menu>
    </Grid>
  );
};

export default VideoList;
