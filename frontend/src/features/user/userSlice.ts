import { Code, ConnectError, createPromiseClient } from "@connectrpc/connect";
import { UserService } from "../../gen/proto/user/v1/user_connect";
import { transport } from "../../util/connect";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../../gen/proto/user/v1/user_pb";
import { PlainMessage, toPlainMessage } from "@bufbuild/protobuf";

const userClient = createPromiseClient(UserService, transport);

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  tagTypes: ["User", "Users"],
  endpoints: (builder) => ({
    getUsers: builder.query<PlainMessage<User>[], void>({
      queryFn: async () => {
        try {
          const res = await userClient.getUsers({});
          return { data: res.users.map(toPlainMessage) };
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
    getUser: builder.query<PlainMessage<User> | undefined, void>({
      queryFn: async () => {
        try {
          const res = await userClient.getCurrentUser({});
          return { data: res.user ? toPlainMessage(res.user) : undefined };
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

export const { useGetUsersQuery, useGetUserQuery, useLogoutUserMutation } =
  userApi;
