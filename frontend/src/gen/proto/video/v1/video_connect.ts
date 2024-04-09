// @generated by protoc-gen-connect-es v1.4.0 with parameter "target=ts"
// @generated from file proto/video/v1/video.proto (package video.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { ChangeVideoStatusRequest, ChangeVideoStatusResponse, ListVideoRequest, ListVideoResponse } from "./video_pb.js";
import { MethodKind } from "@bufbuild/protobuf";

/**
 * @generated from service video.v1.VideoService
 */
export const VideoService = {
  typeName: "video.v1.VideoService",
  methods: {
    /**
     * @generated from rpc video.v1.VideoService.ListVideo
     */
    listVideo: {
      name: "ListVideo",
      I: ListVideoRequest,
      O: ListVideoResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc video.v1.VideoService.ChangeVideoStatus
     */
    changeVideoStatus: {
      name: "ChangeVideoStatus",
      I: ChangeVideoStatusRequest,
      O: ChangeVideoStatusResponse,
      kind: MethodKind.Unary,
    },
  }
} as const;

