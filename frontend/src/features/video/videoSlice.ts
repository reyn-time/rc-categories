import { Code, ConnectError, createPromiseClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";
import { VideoService } from "../../gen/proto/video/v1/video_connect";
import { PlainMessage, toPlainMessage } from "@bufbuild/protobuf";
import {
  ChangeVideoStatusRequest,
  Video,
} from "../../gen/proto/video/v1/video_pb";
import { NoBigIntMessage } from "../../util/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const videoClient = createPromiseClient(
  VideoService,
  createConnectTransport({
    baseUrl: "http://localhost:8080",
  })
);

export const videoApi = createApi({
  reducerPath: "videoApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  tagTypes: ["Video"],
  endpoints: (builder) => ({
    listVideo: builder.query<NoBigIntMessage<PlainMessage<Video>>[], void>({
      queryFn: async () => {
        try {
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
        } catch (error) {
          const connectErr = ConnectError.from(error);
          return {
            error: {
              status: connectErr.code,
              statusText: Code[connectErr.code],
              data: connectErr.rawMessage,
            },
          };
        }
      },
      providesTags: ["Video"],
    }),
    changeVideoStatus: builder.mutation<
      void,
      PlainMessage<ChangeVideoStatusRequest>
    >({
      queryFn: async (req) => {
        try {
          await videoClient.changeVideoStatus(req);
          return { data: undefined };
        } catch (error) {
          const connectErr = ConnectError.from(error);
          return {
            error: {
              status: connectErr.code,
              statusText: Code[connectErr.code],
              data: connectErr.rawMessage,
            },
          };
        }
      },
      invalidatesTags: ["Video"],
    }),
  }),
});

export const { useListVideoQuery, useChangeVideoStatusMutation } = videoApi;
