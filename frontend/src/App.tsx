import { Typography, AppBar, Toolbar, IconButton, Icon } from "@mui/material";
import { VideoList } from "./features/video/videoList";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { VideoDetail } from "./features/video-detail/videoDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <VideoList />,
  },
  {
    path: "/video/:youtubeId",
    element: <VideoDetail />,
  },
]);

export const App = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Icon>menu</Icon>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            HollyHub
          </Typography>
        </Toolbar>
      </AppBar>
      <RouterProvider router={router} />
    </>
  );
};
