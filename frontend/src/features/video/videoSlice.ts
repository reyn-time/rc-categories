import { createPromiseClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { VideoService } from "../../gen/proto/video/v1/video_connect";
import { PlainMessage, toPlainMessage } from "@bufbuild/protobuf";
import { Video } from "../../gen/proto/video/v1/video_pb";

const client = createPromiseClient(
  VideoService,
  createConnectTransport({
    baseUrl: "http://localhost:8080",
  })
);

interface VideoState {
  videos: PlainMessage<Video>[];
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
  return response.videos.map(toPlainMessage);
});

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
      });
  },
});

export default videoSlice.reducer;
