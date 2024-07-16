import bigIntSupport from "dayjs/plugin/bigIntSupport";
import dayjs from "dayjs";

export const secondToText = (second: number) => {
  if (second < 3600) {
    return new Date(second * 1000).toISOString().slice(14, 22);
  }
  return new Date(second * 1000).toISOString().slice(11, 22);
};

dayjs.extend(bigIntSupport);
export const dateToString = (
  createdAt: { seconds: string } | undefined
): string => {
  if (createdAt === undefined) {
    return "時間不明";
  }
  const { seconds } = createdAt;
  const milliseconds = BigInt(seconds) * BigInt(1000);
  const date = dayjs(milliseconds);
  return date.format("YYYY年MM月DD日");
};
