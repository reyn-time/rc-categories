// @generated by protoc-gen-es v1.10.0 with parameter "target=ts"
// @generated from file proto/video/v1/video.proto (package video.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, Timestamp, proto3 } from "@bufbuild/protobuf";
import { User } from "../../user/v1/user_pb.js";

/**
 * @generated from enum video.v1.VideoStatus
 */
export enum VideoStatus {
  /**
   * @generated from enum value: Pending = 0;
   */
  Pending = 0,

  /**
   * @generated from enum value: Archived = 1;
   */
  Archived = 1,

  /**
   * @generated from enum value: Approved = 2;
   */
  Approved = 2,

  /**
   * @generated from enum value: InProgress = 3;
   */
  InProgress = 3,

  /**
   * @generated from enum value: InReview = 4;
   */
  InReview = 4,
}
// Retrieve enum metadata with: proto3.getEnumType(VideoStatus)
proto3.util.setEnumType(VideoStatus, "video.v1.VideoStatus", [
  { no: 0, name: "Pending" },
  { no: 1, name: "Archived" },
  { no: 2, name: "Approved" },
  { no: 3, name: "InProgress" },
  { no: 4, name: "InReview" },
]);

/**
 * @generated from message video.v1.ListVideoRequest
 */
export class ListVideoRequest extends Message<ListVideoRequest> {
  constructor(data?: PartialMessage<ListVideoRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "video.v1.ListVideoRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ListVideoRequest {
    return new ListVideoRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ListVideoRequest {
    return new ListVideoRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ListVideoRequest {
    return new ListVideoRequest().fromJsonString(jsonString, options);
  }

  static equals(a: ListVideoRequest | PlainMessage<ListVideoRequest> | undefined, b: ListVideoRequest | PlainMessage<ListVideoRequest> | undefined): boolean {
    return proto3.util.equals(ListVideoRequest, a, b);
  }
}

/**
 * @generated from message video.v1.ListVideoResponse
 */
export class ListVideoResponse extends Message<ListVideoResponse> {
  /**
   * @generated from field: repeated video.v1.Video videos = 1;
   */
  videos: Video[] = [];

  constructor(data?: PartialMessage<ListVideoResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "video.v1.ListVideoResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "videos", kind: "message", T: Video, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ListVideoResponse {
    return new ListVideoResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ListVideoResponse {
    return new ListVideoResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ListVideoResponse {
    return new ListVideoResponse().fromJsonString(jsonString, options);
  }

  static equals(a: ListVideoResponse | PlainMessage<ListVideoResponse> | undefined, b: ListVideoResponse | PlainMessage<ListVideoResponse> | undefined): boolean {
    return proto3.util.equals(ListVideoResponse, a, b);
  }
}

/**
 * @generated from message video.v1.ChangeVideoStatusRequest
 */
export class ChangeVideoStatusRequest extends Message<ChangeVideoStatusRequest> {
  /**
   * @generated from field: repeated int32 ids = 1;
   */
  ids: number[] = [];

  /**
   * @generated from field: video.v1.VideoStatus status = 2;
   */
  status = VideoStatus.Pending;

  constructor(data?: PartialMessage<ChangeVideoStatusRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "video.v1.ChangeVideoStatusRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "ids", kind: "scalar", T: 5 /* ScalarType.INT32 */, repeated: true },
    { no: 2, name: "status", kind: "enum", T: proto3.getEnumType(VideoStatus) },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ChangeVideoStatusRequest {
    return new ChangeVideoStatusRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ChangeVideoStatusRequest {
    return new ChangeVideoStatusRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ChangeVideoStatusRequest {
    return new ChangeVideoStatusRequest().fromJsonString(jsonString, options);
  }

  static equals(a: ChangeVideoStatusRequest | PlainMessage<ChangeVideoStatusRequest> | undefined, b: ChangeVideoStatusRequest | PlainMessage<ChangeVideoStatusRequest> | undefined): boolean {
    return proto3.util.equals(ChangeVideoStatusRequest, a, b);
  }
}

/**
 * @generated from message video.v1.ChangeVideoStatusResponse
 */
export class ChangeVideoStatusResponse extends Message<ChangeVideoStatusResponse> {
  constructor(data?: PartialMessage<ChangeVideoStatusResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "video.v1.ChangeVideoStatusResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ChangeVideoStatusResponse {
    return new ChangeVideoStatusResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ChangeVideoStatusResponse {
    return new ChangeVideoStatusResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ChangeVideoStatusResponse {
    return new ChangeVideoStatusResponse().fromJsonString(jsonString, options);
  }

  static equals(a: ChangeVideoStatusResponse | PlainMessage<ChangeVideoStatusResponse> | undefined, b: ChangeVideoStatusResponse | PlainMessage<ChangeVideoStatusResponse> | undefined): boolean {
    return proto3.util.equals(ChangeVideoStatusResponse, a, b);
  }
}

/**
 * @generated from message video.v1.ChangeVideoEditorRequest
 */
export class ChangeVideoEditorRequest extends Message<ChangeVideoEditorRequest> {
  /**
   * @generated from field: int32 id = 1;
   */
  id = 0;

  /**
   * @generated from field: int32 editor_id = 2;
   */
  editorId = 0;

  constructor(data?: PartialMessage<ChangeVideoEditorRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "video.v1.ChangeVideoEditorRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 2, name: "editor_id", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ChangeVideoEditorRequest {
    return new ChangeVideoEditorRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ChangeVideoEditorRequest {
    return new ChangeVideoEditorRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ChangeVideoEditorRequest {
    return new ChangeVideoEditorRequest().fromJsonString(jsonString, options);
  }

  static equals(a: ChangeVideoEditorRequest | PlainMessage<ChangeVideoEditorRequest> | undefined, b: ChangeVideoEditorRequest | PlainMessage<ChangeVideoEditorRequest> | undefined): boolean {
    return proto3.util.equals(ChangeVideoEditorRequest, a, b);
  }
}

/**
 * @generated from message video.v1.ChangeVideoEditorResponse
 */
export class ChangeVideoEditorResponse extends Message<ChangeVideoEditorResponse> {
  constructor(data?: PartialMessage<ChangeVideoEditorResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "video.v1.ChangeVideoEditorResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ChangeVideoEditorResponse {
    return new ChangeVideoEditorResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ChangeVideoEditorResponse {
    return new ChangeVideoEditorResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ChangeVideoEditorResponse {
    return new ChangeVideoEditorResponse().fromJsonString(jsonString, options);
  }

  static equals(a: ChangeVideoEditorResponse | PlainMessage<ChangeVideoEditorResponse> | undefined, b: ChangeVideoEditorResponse | PlainMessage<ChangeVideoEditorResponse> | undefined): boolean {
    return proto3.util.equals(ChangeVideoEditorResponse, a, b);
  }
}

/**
 * @generated from message video.v1.Video
 */
export class Video extends Message<Video> {
  /**
   * @generated from field: int32 id = 1;
   */
  id = 0;

  /**
   * @generated from field: string name = 2;
   */
  name = "";

  /**
   * @generated from field: string youtube_id = 5;
   */
  youtubeId = "";

  /**
   * @generated from field: string description = 3;
   */
  description = "";

  /**
   * @generated from field: google.protobuf.Timestamp created_at = 4;
   */
  createdAt?: Timestamp;

  /**
   * @generated from field: video.v1.VideoStatus status = 6;
   */
  status = VideoStatus.Pending;

  /**
   * @generated from field: user.v1.User editor = 7;
   */
  editor?: User;

  constructor(data?: PartialMessage<Video>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "video.v1.Video";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 2, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 5, name: "youtube_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "description", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "created_at", kind: "message", T: Timestamp },
    { no: 6, name: "status", kind: "enum", T: proto3.getEnumType(VideoStatus) },
    { no: 7, name: "editor", kind: "message", T: User },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Video {
    return new Video().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Video {
    return new Video().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Video {
    return new Video().fromJsonString(jsonString, options);
  }

  static equals(a: Video | PlainMessage<Video> | undefined, b: Video | PlainMessage<Video> | undefined): boolean {
    return proto3.util.equals(Video, a, b);
  }
}

