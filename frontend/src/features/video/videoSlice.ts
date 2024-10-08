import { createPromiseClient } from "@connectrpc/connect";
import { VideoService } from "../../gen/proto/video/v1/video_connect";
import { PlainMessage, toPlainMessage } from "@bufbuild/protobuf";
import {
  ChangeVideoEditorRequest,
  ChangeVideoStatusRequest,
  Video,
  VideoStatus,
} from "../../gen/proto/video/v1/video_pb";
import { NoBigIntMessage } from "../../util/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { queryFnWrapper, transport } from "../../util/connect";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { allVideoStatus } from "../../util/videoStatus";

const videoClient = createPromiseClient(VideoService, transport);

export const videoApi = createApi({
  reducerPath: "videoApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  tagTypes: ["Video"],
  endpoints: (builder) => ({
    listVideo: builder.query<NoBigIntMessage<PlainMessage<Video>>[], void>({
      queryFn: queryFnWrapper(async () => {
        const res = await videoClient.listVideo({});
        return {
          data: res.videos.map((video) => ({
            ...toPlainMessage(video),
            createdAt: video.createdAt
              ? {
                  seconds: "" + (video.createdAt.seconds ?? 0),
                  nanos: video.createdAt.nanos,
                }
              : undefined,
          })),
        };
      }),
      providesTags: ["Video"],
    }),
    changeVideoEditor: builder.mutation<
      void,
      PlainMessage<ChangeVideoEditorRequest>
    >({
      queryFn: queryFnWrapper(async (req) => {
        await videoClient.changeVideoEditor(req);
        return { data: undefined };
      }),
      invalidatesTags: ["Video"],
    }),
    changeVideoStatus: builder.mutation<
      void,
      PlainMessage<ChangeVideoStatusRequest>
    >({
      queryFn: queryFnWrapper(async (req) => {
        await videoClient.changeVideoStatus(req);
        return { data: undefined };
      }),
      invalidatesTags: ["Video"], //TODO: More fine-grained invalidation for videos
    }),
  }),
});

interface VideoFilterState {
  pageNumber: number;
  selectedVideoStatus: VideoStatus[];
  searchTerm: string;
}

const initialState = {
  pageNumber: 1,
  selectedVideoStatus: allVideoStatus.filter(
    (status) => status != VideoStatus.Archived
  ),
  searchTerm: "",
} satisfies VideoFilterState as VideoFilterState;

export const videoFilterSlice = createSlice({
  name: "videoFilter",
  initialState,
  reducers: {
    setPageNumber(state, action: PayloadAction<number>) {
      state.pageNumber = action.payload;
    },
    setSelectedVideoStatus(state, action: PayloadAction<number[]>) {
      state.selectedVideoStatus = action.payload;
    },
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
  },
});

export const {
  useListVideoQuery,
  useChangeVideoStatusMutation,
  useChangeVideoEditorMutation,
} = videoApi;

export const { setPageNumber, setSelectedVideoStatus, setSearchTerm } =
  videoFilterSlice.actions;
