import { Typography, AppBar, Toolbar, IconButton, Icon } from "@mui/material";
import { useNavigate } from "react-router-dom";

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
      </Toolbar>
    </AppBar>
  );
};
