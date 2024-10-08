import {
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Icon,
  Skeleton,
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useGetUserQuery, useLogoutUserMutation } from "../user/userSlice";
import { useState } from "react";
import { userAvatarProps } from "../user/avatar";

export const CustomAppBar = () => {
  const navigate = useNavigate();
  const {
    data: user,
    isLoading: isUserLoading,
    isFetching: isUserFetching,
    isError: isUserError,
  } = useGetUserQuery();

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={() => {
            navigate("/");
          }}
        >
          <Icon baseClassName="material-symbols-outlined">home</Icon>
        </IconButton>
        {!isUserLoading && !isUserFetching && !isUserError && user && (
          <IconButton
            size="large"
            color="inherit"
            sx={{ mr: 2 }}
            onClick={() => {
              navigate("/appointment");
            }}
          >
            <Icon baseClassName="material-symbols-outlined">
              calendar_month
            </Icon>
          </IconButton>
        )}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          HollyHub
        </Typography>
        <UserPortal />
      </Toolbar>
    </AppBar>
  );
};

const UserPortal = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const {
    data: user,
    isLoading: isUserLoading,
    isFetching: isUserFetching,
    isError: isUserError,
  } = useGetUserQuery();
  const [logout] = useLogoutUserMutation();

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (isUserLoading || isUserFetching) {
    return <Skeleton variant="circular" height={40} width={40} />;
  }
  if (user === undefined || isUserError) {
    return (
      <IconButton
        size="large"
        color="inherit"
        onClick={() => {
          window.location.replace(
            new URL(
              "../auth/google/login",
              import.meta.env.VITE_API_BASE_URL as string
            ).href
          );
        }}
      >
        <Icon baseClassName="material-symbols-outlined">login</Icon>
      </IconButton>
    );
  }

  return (
    <>
      <Tooltip title="開啟設定">
        <IconButton onClick={handleClick}>
          <Avatar {...userAvatarProps(user)} />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          onClick={() => {
            void logout();
            handleClose();
          }}
        >
          <ListItemIcon>
            <Icon baseClassName="material-symbols-outlined" fontSize="small">
              logout
            </Icon>
          </ListItemIcon>
          登出
        </MenuItem>
      </Menu>
    </>
  );
};
