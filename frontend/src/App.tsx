import { useEffect } from "react";
import { listVideo } from "./features/video/videoSlice";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Box } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";

export function App() {
  const dispatch = useAppDispatch();
  const postStatus = useAppSelector((state) => state.videos.status);
  const videos = useAppSelector((state) => state.videos.videos);

  useEffect(() => {
    if (postStatus === "idle") {
      void dispatch(listVideo());
    }
  }, [postStatus, dispatch]);

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
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "baseline",
          justifyContent: "space-evenly",
        }}
      >
        {videos.map((video) => (
          <Card sx={{ maxWidth: 345, m: 2 }} key={video.id}>
            <CardActionArea>
              <CardMedia
                sx={{ height: 190 }}
                image={`https://img.youtube.com/vi/${video.youtubeId}/default.jpg`}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {video.name}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </>
  );
}
