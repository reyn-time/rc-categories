// @generated by protoc-gen-es v1.8.0 with parameter "target=ts"
// @generated from file proto/video/v1/video.proto (package video.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, Timestamp, proto3 } from "@bufbuild/protobuf";

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

