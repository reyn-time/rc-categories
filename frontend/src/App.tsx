import { useEffect, useState } from "react";
import { createConnectTransport } from "@connectrpc/connect-web";
import { createPromiseClient } from "@connectrpc/connect";
import { VideoService } from "./gen/proto/video/v1/video_connect";
import { ListVideoRequest } from "./gen/proto/video/v1/video_pb";

const client = createPromiseClient(
  VideoService,
  createConnectTransport({
    baseUrl: "http://localhost:8080",
  })
);

export function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    void (async () => {
      const video = await client.listVideo(new ListVideoRequest());
      console.log(video.videos.map((v) => v.toJson()));
    })();
  }, []);

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  );
}
