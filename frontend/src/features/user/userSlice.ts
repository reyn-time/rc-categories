import { Code, ConnectError, createPromiseClient } from "@connectrpc/connect";
import { UserService } from "../../gen/proto/user/v1/user_connect";
import { transport } from "../../util/connect";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetUserResponse } from "../../gen/proto/user/v1/user_pb";

const userClient = createPromiseClient(UserService, transport);

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUser: builder.query<GetUserResponse, void>({
      queryFn: async () => {
        try {
          const res = await userClient.getUser({});
          return { data: res };
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
      providesTags: ["User"],
    }),
  }),
});

export const { useGetUserQuery } = userApi;
