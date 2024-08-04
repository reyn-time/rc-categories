import { Code, ConnectError } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export const transport = createConnectTransport({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  credentials: import.meta.env.VITE_API_CREDENTIALS,
});

export const queryFnWrapper = <A, B>(
  queryFn: (arg: A) => Promise<B>
): ((arg: A) => Promise<B | { error: FetchBaseQueryError }>) => {
  return async function (arg: A) {
    try {
      return await queryFn(arg);
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
  };
};
