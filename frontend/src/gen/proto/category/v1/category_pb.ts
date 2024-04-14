// @generated by protoc-gen-es v1.8.0 with parameter "target=ts"
// @generated from file proto/category/v1/category.proto (package category.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";

/**
 * @generated from message category.v1.ListCategoryRequest
 */
export class ListCategoryRequest extends Message<ListCategoryRequest> {
  constructor(data?: PartialMessage<ListCategoryRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "category.v1.ListCategoryRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ListCategoryRequest {
    return new ListCategoryRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ListCategoryRequest {
    return new ListCategoryRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ListCategoryRequest {
    return new ListCategoryRequest().fromJsonString(jsonString, options);
  }

  static equals(a: ListCategoryRequest | PlainMessage<ListCategoryRequest> | undefined, b: ListCategoryRequest | PlainMessage<ListCategoryRequest> | undefined): boolean {
    return proto3.util.equals(ListCategoryRequest, a, b);
  }
}

/**
 * @generated from message category.v1.ListCategoryResponse
 */
export class ListCategoryResponse extends Message<ListCategoryResponse> {
  /**
   * @generated from field: repeated category.v1.Category categories = 1;
   */
  categories: Category[] = [];

  constructor(data?: PartialMessage<ListCategoryResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "category.v1.ListCategoryResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "categories", kind: "message", T: Category, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ListCategoryResponse {
    return new ListCategoryResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ListCategoryResponse {
    return new ListCategoryResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ListCategoryResponse {
    return new ListCategoryResponse().fromJsonString(jsonString, options);
  }

  static equals(a: ListCategoryResponse | PlainMessage<ListCategoryResponse> | undefined, b: ListCategoryResponse | PlainMessage<ListCategoryResponse> | undefined): boolean {
    return proto3.util.equals(ListCategoryResponse, a, b);
  }
}

/**
 * @generated from message category.v1.Category
 */
export class Category extends Message<Category> {
  /**
   * @generated from field: int32 id = 1;
   */
  id = 0;

  /**
   * @generated from field: string name = 2;
   */
  name = "";

  /**
   * @generated from field: string description = 3;
   */
  description = "";

  /**
   * @generated from field: int32 parent_id = 4;
   */
  parentId = 0;

  /**
   * @generated from field: int32 rank = 5;
   */
  rank = 0;

  constructor(data?: PartialMessage<Category>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "category.v1.Category";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 2, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "description", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "parent_id", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 5, name: "rank", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Category {
    return new Category().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Category {
    return new Category().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Category {
    return new Category().fromJsonString(jsonString, options);
  }

  static equals(a: Category | PlainMessage<Category> | undefined, b: Category | PlainMessage<Category> | undefined): boolean {
    return proto3.util.equals(Category, a, b);
  }
}

