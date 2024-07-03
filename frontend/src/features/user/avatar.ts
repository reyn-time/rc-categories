import { User } from "../../gen/proto/user/v1/user_pb";
import { PlainMessage } from "@bufbuild/protobuf";

export const userAvatarProps = (
  user: PlainMessage<User>,
  sizePx: number | undefined
) => {
  let initials = "?";
  const parts = user.name.split(" ");
  if (parts.length >= 2) {
    initials = `${parts[0][0]}${parts[1][0]}`;
  } else if (parts.length == 1 && user.name.length > 0) {
    initials = user.name[0];
  }

  return {
    sx: {
      bgcolor: stringToColor(user.name),
      color: "#ffffff !important",
      ...(sizePx === undefined
        ? {}
        : { fontSize: sizePx / 2, width: sizePx, height: sizePx }),
    },
    children: initials,
    alt: user.name,
    src: user.photoUrl,
  };
};

const stringToColor = (string: string) => {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
};
