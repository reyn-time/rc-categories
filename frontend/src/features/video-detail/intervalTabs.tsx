import {
  Avatar,
  Box,
  Chip,
  Fade,
  Icon,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Menu,
  MenuItem,
  MenuList,
  Slide,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
} from "@mui/material";
import { IntervalList } from "./intervalList";
import { IntervalInputForm } from "./intervalInput";
import { useState } from "react";
import { PanelTypes } from "./intervalTypes";
import { Video, VideoStatus } from "../../gen/proto/video/v1/video_pb";
import {
  allVideoStatus,
  videoStatusToStatusText,
} from "../../util/videoStatus";
import {
  useChangeVideoEditorMutation,
  useChangeVideoStatusMutation,
} from "../video/videoSlice";
import { PlainMessage } from "@bufbuild/protobuf";
import { NoBigIntMessage } from "../../util/types";
import { userAvatarProps } from "../user/avatar";
import { useGetUserQuery, useGetUsersQuery } from "../user/userSlice";

export const IntervalTabs = (props: {
  video: NoBigIntMessage<PlainMessage<Video>>;
  seekTo: (second: number) => void;
  duration: number;
  currentTime: number;
  status: VideoStatus;
}) => {
  const { video, seekTo, duration, currentTime, status } = props;
  const [panel, setPanel] = useState<PanelTypes | null>(null);
  const [changeVideoStatus] = useChangeVideoStatusMutation();
  const { data: user, isError: userIsError } = useGetUserQuery();
  const [buttonEnabled, setButtonEnabled] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const onStatusChange = (newStatus: VideoStatus) => {
    setButtonEnabled(false);
    void changeVideoStatus({
      ids: [video.id],
      status: newStatus,
    }).then(() => {
      setButtonEnabled(true);
    });
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Stack gap={2}>
      <Stack
        direction="row"
        gap={1}
        alignItems="center"
        justifyContent="space-between"
      >
        <ToggleButtonGroup
          exclusive
          value={status}
          size="small"
          aria-label="text alignment"
          onChange={(_, value) => onStatusChange(+value)}
        >
          {allVideoStatus.map((status) => (
            <ToggleButton
              key={status}
              color={videoStatusToStatusText[status].color}
              value={status}
              disabled={!buttonEnabled}
            >
              {videoStatusToStatusText[status].text}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        <Tooltip title={!user || userIsError ? "請先登入" : ""}>
          <span>
            <Chip
              avatar={
                video.editor && <Avatar {...userAvatarProps(video.editor)} />
              }
              label={"負責人：" + (video.editor?.name ?? "不明")}
              onClick={handleClick}
              deleteIcon={<Icon>arrow_drop_down</Icon>}
              onDelete={handleClick}
              disabled={!user || userIsError}
            />
          </span>
        </Tooltip>
      </Stack>
      <Box
        sx={{
          position: "relative",
        }}
      >
        <Fade in={panel === null} appear={false}>
          <IntervalList
            videoId={video.id}
            seekTo={seekTo}
            setPanel={setPanel}
          ></IntervalList>
        </Fade>

        <Box sx={{ position: "absolute", top: 0, left: 0, width: "100%" }}>
          <Slide in={!!panel?.type} direction="left" mountOnEnter unmountOnExit>
            <IntervalInputForm
              videoId={video.id}
              intervalId={
                panel?.type === "UpdateInterval" ? panel.interval.id : undefined
              }
              duration={duration}
              times={
                panel?.type === "UpdateInterval"
                  ? [panel.interval.startTime, panel.interval.endTime]
                  : [0, duration]
              }
              selectedCategoryNames={
                panel?.type === "UpdateInterval"
                  ? panel.categoryNames
                  : undefined
              }
              currentTime={currentTime}
              seekTo={seekTo}
              setPanel={setPanel}
            ></IntervalInputForm>
          </Slide>
        </Box>
      </Box>
      {open && (
        <SelectUserMenu
          anchorEl={anchorEl}
          open={open}
          handleClose={handleClose}
          selectedUserEmail={video.editor?.email ?? ""}
          videoId={video.id}
        />
      )}
    </Stack>
  );
};

// TODO: Allow users to refresh the list of users?
// TODO: Show skeleton on loading.
const SelectUserMenu = (props: {
  anchorEl: HTMLElement | null;
  selectedUserEmail: string;
  open: boolean;
  handleClose: () => void;
  videoId: number;
}) => {
  const { data: users } = useGetUsersQuery();
  const [updateVideoEditor] = useChangeVideoEditorMutation();

  const { anchorEl, open, handleClose, selectedUserEmail, videoId } = props;

  const onClick = (userId: number) => {
    void updateVideoEditor({ id: videoId, editorId: userId });
    handleClose();
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      sx={{ maxHeight: 500 }}
      MenuListProps={{ sx: { pt: 0 } }}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <MenuList dense subheader={<ListSubheader>更改負責人</ListSubheader>}>
        <MenuItem
          key="0"
          onClick={() => onClick(0)}
          selected={selectedUserEmail === ""}
          disabled={selectedUserEmail === ""}
        >
          <ListItemIcon>
            <Icon>delete</Icon>
          </ListItemIcon>
          <ListItemText primary="刪除" />
        </MenuItem>
        {(users ?? []).map((user) => (
          <MenuItem
            key={user.id}
            onClick={() => onClick(user.id)}
            selected={user.email === selectedUserEmail}
            disabled={user.email === selectedUserEmail}
          >
            <ListItemIcon>
              <Avatar {...userAvatarProps(user, 24)} />
            </ListItemIcon>
            <ListItemText primary={user.name} />
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};
