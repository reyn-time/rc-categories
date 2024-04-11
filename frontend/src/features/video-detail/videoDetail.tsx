import { useParams } from "react-router-dom";

export const VideoDetail = () => {
  const { youtubeId } = useParams();
  return <div>{youtubeId}</div>;
};
