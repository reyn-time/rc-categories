import { PlainMessage, toPlainMessage } from "@bufbuild/protobuf";
import { Code, ConnectError, createPromiseClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";
import { CategoryService } from "../../gen/proto/category/v1/category_connect";
import { Category } from "../../gen/proto/category/v1/category_pb";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const client = createPromiseClient(
  CategoryService,
  createConnectTransport({
    baseUrl: "http://localhost:8080",
  })
);

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  endpoints: (builder) => ({
    listCategory: builder.query<PlainMessage<Category>[], void>({
      queryFn: async () => {
        try {
          const res = await client.listCategory({});
          return { data: res.categories.map(toPlainMessage) };
        } catch (error) {
          const connectErr = ConnectError.from(error);
          return {
            error: {
              status: connectErr.code,
              statusText: Code[connectErr.code],
              data: connectErr.rawMessage,
            },
          };
        }
      },
    }),
  }),
});

export const { useListCategoryQuery } = categoryApi;
