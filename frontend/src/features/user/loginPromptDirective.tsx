import { Tooltip } from "@mui/material";
import { useGetUserQuery } from "./userSlice";

interface LoginPromptDirectiveProps {
  children: (disabled: boolean) => React.JSX.Element;
}

/**
 * A wrapper that disables a button-like object when the user did not login.
 * Prompts the user to login when the user hovers over the object.
 */
export const LoginPromptDirective = ({
  children,
}: LoginPromptDirectiveProps) => {
  const { data: user, isError: userIsError } = useGetUserQuery();
  const isAuthenticated = !!user && !userIsError;

  return (
    <Tooltip title={!isAuthenticated ? "請先登入" : ""}>
      <div>{children(!isAuthenticated)}</div>
    </Tooltip>
  );
};
