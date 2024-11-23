// @generated by protoc-gen-connect-es v1.6.1 with parameter "target=ts"
// @generated from file proto/category/v1/category.proto (package category.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { ListCategoryRequest, ListCategoryResponse } from "./category_pb.js";
import { MethodKind } from "@bufbuild/protobuf";

/**
 * @generated from service category.v1.CategoryService
 */
export const CategoryService = {
  typeName: "category.v1.CategoryService",
  methods: {
    /**
     * @generated from rpc category.v1.CategoryService.ListCategory
     */
    listCategory: {
      name: "ListCategory",
      I: ListCategoryRequest,
      O: ListCategoryResponse,
      kind: MethodKind.Unary,
    },
  }
} as const;

