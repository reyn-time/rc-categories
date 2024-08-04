import { PlainMessage, toPlainMessage } from "@bufbuild/protobuf";
import { createPromiseClient } from "@connectrpc/connect";
import { CategoryService } from "../../gen/proto/category/v1/category_connect";
import { Category } from "../../gen/proto/category/v1/category_pb";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { queryFnWrapper, transport } from "../../util/connect";

const client = createPromiseClient(CategoryService, transport);

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  endpoints: (builder) => ({
    listCategory: builder.query<PlainMessage<Category>[], void>({
      queryFn: queryFnWrapper(async () => {
        const res = await client.listCategory({});
        return { data: res.categories.map(toPlainMessage) };
      }),
    }),
  }),
});

export const { useListCategoryQuery } = categoryApi;
