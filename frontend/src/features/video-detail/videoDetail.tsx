import { useParams } from "react-router-dom";
import ReactPlayer from "react-player/youtube";
import { useState } from "react";

export const VideoDetail = () => {
  const { youtubeId } = useParams();
  const [duration, setDuration] = useState<number>(0);

  const onDuration = (duration: number) => {
    setDuration(duration);
  };

  return (
    <>
      <ReactPlayer
        url={"https://www.youtube.com/watch?v=" + youtubeId}
        controls
        onDuration={onDuration}
      />
      {duration > 0 && <div>影片長度: {duration} 秒</div>}
    </>
  );
};
