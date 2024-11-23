// @generated by protoc-gen-es v1.10.0 with parameter "target=ts"
// @generated from file proto/user/v1/user.proto (package user.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";

/**
 * @generated from enum user.v1.UserRole
 */
export enum UserRole {
  /**
   * @generated from enum value: USER_ROLE_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * @generated from enum value: USER_ROLE_ADMIN = 1;
   */
  ADMIN = 1,

  /**
   * @generated from enum value: USER_ROLE_NOBODY = 2;
   */
  NOBODY = 2,
}
// Retrieve enum metadata with: proto3.getEnumType(UserRole)
proto3.util.setEnumType(UserRole, "user.v1.UserRole", [
  { no: 0, name: "USER_ROLE_UNSPECIFIED" },
  { no: 1, name: "USER_ROLE_ADMIN" },
  { no: 2, name: "USER_ROLE_NOBODY" },
]);

/**
 * @generated from message user.v1.GetUsersRequest
 */
export class GetUsersRequest extends Message<GetUsersRequest> {
  constructor(data?: PartialMessage<GetUsersRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "user.v1.GetUsersRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetUsersRequest {
    return new GetUsersRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetUsersRequest {
    return new GetUsersRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetUsersRequest {
    return new GetUsersRequest().fromJsonString(jsonString, options);
  }

  static equals(a: GetUsersRequest | PlainMessage<GetUsersRequest> | undefined, b: GetUsersRequest | PlainMessage<GetUsersRequest> | undefined): boolean {
    return proto3.util.equals(GetUsersRequest, a, b);
  }
}

/**
 * @generated from message user.v1.GetUsersResponse
 */
export class GetUsersResponse extends Message<GetUsersResponse> {
  /**
   * @generated from field: repeated user.v1.User users = 1;
   */
  users: User[] = [];

  constructor(data?: PartialMessage<GetUsersResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "user.v1.GetUsersResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "users", kind: "message", T: User, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetUsersResponse {
    return new GetUsersResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetUsersResponse {
    return new GetUsersResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetUsersResponse {
    return new GetUsersResponse().fromJsonString(jsonString, options);
  }

  static equals(a: GetUsersResponse | PlainMessage<GetUsersResponse> | undefined, b: GetUsersResponse | PlainMessage<GetUsersResponse> | undefined): boolean {
    return proto3.util.equals(GetUsersResponse, a, b);
  }
}

/**
 * @generated from message user.v1.GetCurrentUserRequest
 */
export class GetCurrentUserRequest extends Message<GetCurrentUserRequest> {
  constructor(data?: PartialMessage<GetCurrentUserRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "user.v1.GetCurrentUserRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetCurrentUserRequest {
    return new GetCurrentUserRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetCurrentUserRequest {
    return new GetCurrentUserRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetCurrentUserRequest {
    return new GetCurrentUserRequest().fromJsonString(jsonString, options);
  }

  static equals(a: GetCurrentUserRequest | PlainMessage<GetCurrentUserRequest> | undefined, b: GetCurrentUserRequest | PlainMessage<GetCurrentUserRequest> | undefined): boolean {
    return proto3.util.equals(GetCurrentUserRequest, a, b);
  }
}

/**
 * @generated from message user.v1.GetCurrentUserResponse
 */
export class GetCurrentUserResponse extends Message<GetCurrentUserResponse> {
  /**
   * @generated from field: user.v1.User user = 1;
   */
  user?: User;

  constructor(data?: PartialMessage<GetCurrentUserResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "user.v1.GetCurrentUserResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "user", kind: "message", T: User },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetCurrentUserResponse {
    return new GetCurrentUserResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetCurrentUserResponse {
    return new GetCurrentUserResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetCurrentUserResponse {
    return new GetCurrentUserResponse().fromJsonString(jsonString, options);
  }

  static equals(a: GetCurrentUserResponse | PlainMessage<GetCurrentUserResponse> | undefined, b: GetCurrentUserResponse | PlainMessage<GetCurrentUserResponse> | undefined): boolean {
    return proto3.util.equals(GetCurrentUserResponse, a, b);
  }
}

/**
 * @generated from message user.v1.LogoutUserRequest
 */
export class LogoutUserRequest extends Message<LogoutUserRequest> {
  constructor(data?: PartialMessage<LogoutUserRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "user.v1.LogoutUserRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): LogoutUserRequest {
    return new LogoutUserRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): LogoutUserRequest {
    return new LogoutUserRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): LogoutUserRequest {
    return new LogoutUserRequest().fromJsonString(jsonString, options);
  }

  static equals(a: LogoutUserRequest | PlainMessage<LogoutUserRequest> | undefined, b: LogoutUserRequest | PlainMessage<LogoutUserRequest> | undefined): boolean {
    return proto3.util.equals(LogoutUserRequest, a, b);
  }
}

/**
 * @generated from message user.v1.LogoutUserResponse
 */
export class LogoutUserResponse extends Message<LogoutUserResponse> {
  constructor(data?: PartialMessage<LogoutUserResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "user.v1.LogoutUserResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): LogoutUserResponse {
    return new LogoutUserResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): LogoutUserResponse {
    return new LogoutUserResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): LogoutUserResponse {
    return new LogoutUserResponse().fromJsonString(jsonString, options);
  }

  static equals(a: LogoutUserResponse | PlainMessage<LogoutUserResponse> | undefined, b: LogoutUserResponse | PlainMessage<LogoutUserResponse> | undefined): boolean {
    return proto3.util.equals(LogoutUserResponse, a, b);
  }
}

/**
 * @generated from message user.v1.User
 */
export class User extends Message<User> {
  /**
   * @generated from field: int32 id = 1;
   */
  id = 0;

  /**
   * @generated from field: string email = 2;
   */
  email = "";

  /**
   * @generated from field: string name = 3;
   */
  name = "";

  /**
   * @generated from field: string photo_url = 4;
   */
  photoUrl = "";

  /**
   * @generated from field: string user_uuid = 5;
   */
  userUuid = "";

  /**
   * @generated from field: user.v1.UserRole role = 6;
   */
  role = UserRole.UNSPECIFIED;

  constructor(data?: PartialMessage<User>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "user.v1.User";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 2, name: "email", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "photo_url", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 5, name: "user_uuid", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 6, name: "role", kind: "enum", T: proto3.getEnumType(UserRole) },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): User {
    return new User().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): User {
    return new User().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): User {
    return new User().fromJsonString(jsonString, options);
  }

  static equals(a: User | PlainMessage<User> | undefined, b: User | PlainMessage<User> | undefined): boolean {
    return proto3.util.equals(User, a, b);
  }
}

