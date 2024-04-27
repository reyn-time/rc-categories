import { createConnectTransport } from "@connectrpc/connect-web";
import { IntervalService } from "../../gen/proto/interval/v1/interval_connect";
import { createPromiseClient } from "@connectrpc/connect";
import {
  PartialMessage,
  PlainMessage,
  toPlainMessage,
} from "@bufbuild/protobuf";
import {
  Interval,
  PostIntervalRequest,
  UpdateIntervalRequest,
} from "../../gen/proto/interval/v1/interval_pb";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const client = createPromiseClient(
  IntervalService,
  createConnectTransport({
    baseUrl: "http://localhost:8080",
  })
);

export const intervalApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  reducerPath: "intervalApi",
  tagTypes: ["Interval"],
  endpoints: (builder) => ({
    listInterval: builder.query<PlainMessage<Interval>[], number>({
      queryFn: async (videoId: number) => {
        const response = await client.listInterval({ videoId });
        return { data: response.intervals.map(toPlainMessage) };
      },
      providesTags: ["Interval"],
    }),
    postInterval: builder.mutation<void, PartialMessage<PostIntervalRequest>>({
      queryFn: async (interval) => {
        await client.postInterval(interval);
        return { data: undefined };
      },
      invalidatesTags: ["Interval"],
    }),
    updateInterval: builder.mutation<
      void,
      PartialMessage<UpdateIntervalRequest>
    >({
      queryFn: async (interval) => {
        await client.updateInterval(interval);
        return { data: undefined };
      },
      invalidatesTags: ["Interval"],
    }),
  }),
});

export const {
  useListIntervalQuery,
  usePostIntervalMutation,
  useUpdateIntervalMutation,
} = intervalApi;
