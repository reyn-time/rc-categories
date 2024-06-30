import { Code, ConnectError, createPromiseClient } from "@connectrpc/connect";
import { UserService } from "../../gen/proto/user/v1/user_connect";
import { transport } from "../../util/connect";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../../gen/proto/user/v1/user_pb";
import { PlainMessage } from "@bufbuild/protobuf";

const userClient = createPromiseClient(UserService, transport);

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUser: builder.query<PlainMessage<User> | undefined, void>({
      queryFn: async () => {
        try {
          const res = await userClient.getUser({});
          return { data: res.user };
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
    logoutUser: builder.mutation<void, void>({
      queryFn: async () => {
        try {
          await userClient.logoutUser({});
          return { data: undefined };
        } catch (error) {
          // TODO: refactor error handling.
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
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useGetUserQuery, useLogoutUserMutation } = userApi;
