import { Typography, AppBar, Toolbar, IconButton, Icon } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useGetUserQuery } from "../user/userSlice";

export const CustomAppBar = () => {
  const navigate = useNavigate();
  const {} = useGetUserQuery();

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
      </Toolbar>
    </AppBar>
  );
};
