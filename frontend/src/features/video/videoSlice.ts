import { createPromiseClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { VideoService } from "../../gen/proto/video/v1/video_connect";
import { PlainMessage, toPlainMessage } from "@bufbuild/protobuf";
import { Video, VideoStatus } from "../../gen/proto/video/v1/video_pb";
import { NoBigIntMessage } from "../../util/types";

const client = createPromiseClient(
  VideoService,
  createConnectTransport({
    baseUrl: "http://localhost:8080",
  })
);

interface VideoState {
  videos: NoBigIntMessage<PlainMessage<Video>>[];
  status: "idle" | "loading" | "success" | "failed";
  error: string | undefined;
}

const initialState: VideoState = {
  videos: [],
  status: "idle",
  error: undefined,
};

export const listVideo = createAsyncThunk("video/listVideo", async () => {
  const response = await client.listVideo({});
  return response.videos.map((video) => ({
    ...toPlainMessage(video),
    createdAt: video.createdAt
      ? {
          seconds: "" + (video.createdAt.seconds ?? 0),
          nanos: "" + (video.createdAt.nanos ?? 0),
        }
      : undefined,
  }));
});

export const changeVideoStatus = createAsyncThunk(
  "video/changeStatus",
  async (payload: { id: number; status: VideoStatus }) => {
    await client.changeVideoStatus(payload);
    return payload;
  }
);

export const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(listVideo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(listVideo.fulfilled, (state, action) => {
        state.status = "success";
        state.videos = action.payload;
      })
      .addCase(listVideo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(changeVideoStatus.fulfilled, (state, action) => {
        state.videos.map((video) => {
          if (video.id === action.payload.id) {
            video.status = action.payload.status;
          }
        });
      });
  },
});

export default videoSlice.reducer;
