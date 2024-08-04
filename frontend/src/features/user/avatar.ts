import { Gender, Patient } from "../../gen/proto/patient/v1/patient_pb";
import { User } from "../../gen/proto/user/v1/user_pb";
import { PlainMessage } from "@bufbuild/protobuf";

export const userAvatarProps = (user: PlainMessage<User>, sizePx?: number) => {
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

export const patientAvatarProps = (patient: PlainMessage<Patient>) => {
  const seed = cyrb128(patient.initials);
  const rand = sfc32(seed[0], seed[1], seed[2], seed[3]);
  const hue = (patient.gender === Gender.Male ? 180 : 300) + rand() * 60;
  const saturation = 50 + rand() * 50;
  const lightness = 30 + rand() * 50;
  const hsl = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  return {
    sx: {
      bgcolor: hsl,
      color: "#ffffff !important",
    },
    children: patient.initials,
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

const cyrb128 = (str: string): [number, number, number, number] => {
  let h1 = 1779033703,
    h2 = 3144134277,
    h3 = 1013904242,
    h4 = 2773480762;
  for (let i = 0, k; i < str.length; i++) {
    k = str.charCodeAt(i);
    h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
    h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
    h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
    h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
  }
  h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
  h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
  h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
  h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
  (h1 ^= h2 ^ h3 ^ h4), (h2 ^= h1), (h3 ^= h1), (h4 ^= h1);
  return [h1 >>> 0, h2 >>> 0, h3 >>> 0, h4 >>> 0];
};

const sfc32 = (a: number, b: number, c: number, d: number) => {
  return function () {
    a |= 0;
    b |= 0;
    c |= 0;
    d |= 0;
    let t = (((a + b) | 0) + d) | 0;
    d = (d + 1) | 0;
    a = b ^ (b >>> 9);
    b = (c + (c << 3)) | 0;
    c = (c << 21) | (c >>> 11);
    c = (c + t) | 0;
    return (t >>> 0) / 4294967296;
  };
};
