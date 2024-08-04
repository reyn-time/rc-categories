import { createPromiseClient } from "@connectrpc/connect";
import { UserService } from "../../gen/proto/user/v1/user_connect";
import { queryFnWrapper, transport } from "../../util/connect";
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
      queryFn: queryFnWrapper(async () => {
        const res = await userClient.getUsers({});
        return { data: res.users.map(toPlainMessage) };
      }),
    }),
    getUser: builder.query<PlainMessage<User> | undefined, void>({
      queryFn: queryFnWrapper(async () => {
        const res = await userClient.getCurrentUser({});
        return { data: res.user ? toPlainMessage(res.user) : undefined };
      }),
      providesTags: ["User"],
    }),
    logoutUser: builder.mutation<void, void>({
      queryFn: queryFnWrapper(async () => {
        await userClient.logoutUser({});
        return { data: undefined };
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useGetUsersQuery, useGetUserQuery, useLogoutUserMutation } =
  userApi;
