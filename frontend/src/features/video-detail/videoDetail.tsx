import { useParams } from "react-router-dom";
import ReactPlayer from "react-player/youtube";
import { useState, useRef } from "react";
import { Grid, Box, Skeleton, Alert } from "@mui/material";
import "./videoDetail.css";
import { useListVideoQuery } from "../video/videoSlice";
import { useListCategoryQuery } from "../category/categorySlice";
import { IntervalTabs } from "./intervalTabs";

export const VideoDetail = () => {
  const { id } = useParams();
  const {
    video,
    isLoading: isVideoLoading,
    error: videoError,
  } = useListVideoQuery(undefined, {
    selectFromResult: ({ data, isLoading, error }) => ({
      video: data?.find((video) => video.id.toString() === id),
      isLoading,
      error,
    }),
  });
  const { isLoading: isCategoryLoading } = useListCategoryQuery();
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const playerRef = useRef<ReactPlayer>(null);

  const seekTo = (time: number) => {
    playerRef.current?.seekTo(time, "seconds");
    setIsPlaying(true);
  };

  return (
    <>
      <Grid container sx={{ p: 2 }} spacing={2}>
        <Grid item xs={12} lg={8} xl={5}>
          {isVideoLoading ? (
            <Skeleton variant="rectangular" height="100%"></Skeleton>
          ) : videoError ? (
            <Alert severity="error">
              GG 出事了: {JSON.stringify(videoError)}
            </Alert>
          ) : !video ? (
            <Alert severity="error">找不到影片</Alert>
          ) : (
            <Box sx={{ position: "relative", paddingTop: "56.25%" }}>
              <ReactPlayer
                url={"https://www.youtube.com/watch?v=" + video?.youtubeId}
                controls
                width="100%"
                height="100%"
                onDuration={(duration) => setDuration(duration)}
                onProgress={(progress) =>
                  setCurrentTime(progress.playedSeconds)
                }
                playing={isPlaying}
                onPause={() => setIsPlaying(false)}
                onPlay={() => setIsPlaying(true)}
                ref={playerRef}
                className="react-player"
              />
            </Box>
          )}
        </Grid>
        <Grid item xs={12} lg={8} xl={7}>
          {duration && playerRef.current && !isCategoryLoading && video ? (
            <IntervalTabs
              videoId={video.id}
              seekTo={seekTo}
              duration={duration}
              currentTime={currentTime}
              status={video.status}
            ></IntervalTabs>
          ) : (
            <Skeleton
              variant="rectangular"
              width="100%"
              height={400}
            ></Skeleton>
          )}
        </Grid>
      </Grid>
    </>
  );
};
