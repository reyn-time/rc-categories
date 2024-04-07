import { useEffect } from "react";
import { listVideo } from "./features/video/videoSlice";
import { useAppDispatch, useAppSelector } from "./app/hooks";

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
      <h1>Vite + React</h1>
      <ul>
        {videos.map((video) => (
          <li key={video.id}>
            {video.name} {video.youtubeId}
          </li>
        ))}
      </ul>
    </>
  );
}
