import { createConnectTransport } from "@connectrpc/connect-web";
import { IntervalService } from "../../gen/proto/interval/v1/interval_connect";
import { createPromiseClient } from "@connectrpc/connect";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { PartialMessage, toPlainMessage } from "@bufbuild/protobuf";
import {
  PostIntervalRequest,
  UpdateIntervalRequest,
} from "../../gen/proto/interval/v1/interval_pb";

const client = createPromiseClient(
  IntervalService,
  createConnectTransport({
    baseUrl: "http://localhost:8080",
  })
);

export const listInterval = createAsyncThunk(
  "interval/listInterval",
  async () => {
    const response = await client.listInterval({});
    return response.intervals.map(toPlainMessage);
  }
);

export const postInterval = createAsyncThunk(
  "interval/postInterval",
  async (interval: PartialMessage<PostIntervalRequest>) => {
    const response = await client.postInterval(interval);
    return response;
  }
);

export const updateInterval = createAsyncThunk(
  "interval/updateInterval",
  async (interval: PartialMessage<UpdateIntervalRequest>) => {
    const response = await client.updateInterval(interval);
    return response;
  }
);
