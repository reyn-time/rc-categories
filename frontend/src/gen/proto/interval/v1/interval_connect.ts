// @generated by protoc-gen-connect-es v1.4.0 with parameter "target=ts"
// @generated from file proto/interval/v1/interval.proto (package interval.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { DeleteIntervalRequest, DeleteIntervalResponse, ListIntervalRequest, ListIntervalResponse, PostIntervalRequest, PostIntervalResponse, UpdateIntervalRequest, UpdateIntervalResponse } from "./interval_pb.js";
import { MethodKind } from "@bufbuild/protobuf";

/**
 * @generated from service interval.v1.IntervalService
 */
export const IntervalService = {
  typeName: "interval.v1.IntervalService",
  methods: {
    /**
     * @generated from rpc interval.v1.IntervalService.PostInterval
     */
    postInterval: {
      name: "PostInterval",
      I: PostIntervalRequest,
      O: PostIntervalResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc interval.v1.IntervalService.ListInterval
     */
    listInterval: {
      name: "ListInterval",
      I: ListIntervalRequest,
      O: ListIntervalResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc interval.v1.IntervalService.UpdateInterval
     */
    updateInterval: {
      name: "UpdateInterval",
      I: UpdateIntervalRequest,
      O: UpdateIntervalResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc interval.v1.IntervalService.DeleteInterval
     */
    deleteInterval: {
      name: "DeleteInterval",
      I: DeleteIntervalRequest,
      O: DeleteIntervalResponse,
      kind: MethodKind.Unary,
    },
  }
} as const;

