import {
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Icon,
  Avatar,
  Skeleton,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useGetUserQuery } from "../user/userSlice";

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
  const { data: user, isLoading: isUserLoading } = useGetUserQuery();
  if (isUserLoading) {
    return <Skeleton variant="circular" height={40} width={40} />;
  }
  if (user === undefined) {
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
    <Avatar {...stringAvatar(user.name)} alt={user.name} src={user.photoUrl} />
  );
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

const stringAvatar = (name: string) => {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
};
