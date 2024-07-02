import {
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Icon,
  Avatar,
  Skeleton,
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useGetUserQuery, useLogoutUserMutation } from "../user/userSlice";
import { useState } from "react";

export const CustomAppBar = () => {
  const navigate = useNavigate();

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
          <Icon>home</Icon>
        </IconButton>
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
        component={Link}
        to={
          new URL(
            "../auth/google/login",
            import.meta.env.VITE_API_BASE_URL as string
          ).href
        }
      >
        <Icon>login</Icon>
      </IconButton>
    );
  }

  return (
    <>
      <Tooltip title="開啟設定">
        <IconButton onClick={handleClick}>
          <Avatar
            {...stringAvatar(user.name)}
            alt={user.name}
            src={user.photoUrl}
          />
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
            <Icon fontSize="small">logout</Icon>
          </ListItemIcon>
          登出
        </MenuItem>
      </Menu>
    </>
  );
};

const stringAvatar = (name: string) => {
  let initials = "?";
  const parts = name.split(" ");
  if (parts.length >= 2) {
    initials = `${parts[0][0]}${parts[1][0]}`;
  } else if (parts.length == 1 && name.length > 0) {
    initials = name[0];
  }

  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: initials,
  };
};

const stringToColor = (string: string) => {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
};
