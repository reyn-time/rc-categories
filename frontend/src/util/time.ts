import bigIntSupport from "dayjs/plugin/bigIntSupport";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs, { Dayjs } from "dayjs";

dayjs.extend(bigIntSupport);
dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);

export const secondToText = (second: number) => {
  if (second < 3600) {
    return new Date(second * 1000).toISOString().slice(14, 22);
  }
  return new Date(second * 1000).toISOString().slice(11, 22);
};

export const dateToString = (
  createdAt: { seconds: string } | undefined
): string => {
  if (createdAt === undefined) {
    return "時間不明";
  }
  const { seconds } = createdAt;
  const milliseconds = BigInt(seconds) * BigInt(1000);
  const date = dayjs(milliseconds);
  return date.format("DD/MM/YYYY");
};

const dayOfMonth = "日一二三四五六";
export const dateTimeToString = (
  createdAt: { seconds: string } | undefined
): string => {
  if (createdAt === undefined) {
    return "時間不明";
  }
  const { seconds } = createdAt;
  const milliseconds = BigInt(seconds) * BigInt(1000);
  const date = dayjs(milliseconds);
  return date.format(`DD/MM/YYYY (${dayOfMonth[date.day()]}) HH:mm`);
};

export const dayjsToString = (d: Dayjs): string => {
  return d.format(`DD/MM/YYYY (${dayOfMonth[d.day()]}) ha`);
};

export const timeFromNow = (
  createdAt: { seconds: string } | undefined
): string => {
  if (createdAt === undefined) {
    return "???";
  }
  const { seconds } = createdAt;
  const milliseconds = BigInt(seconds) * BigInt(1000);
  const date = dayjs(milliseconds);
  const current = dayjs();
  return current.diff(date, "days").toString() + " 日前";
};

export const getTimeFromString = (
  dayString: string,
  monthString: string,
  hourString: string,
  period: string,
  tz: string
) => {
  const fullTimezone = tz === "HKT" ? "Asia/Hong_Kong" : "Europe/London";

  const currentTime = dayjs().tz(fullTimezone);
  const month = +monthString;
  const day = +dayString;
  let year = currentTime.year();
  if (
    month < currentTime.month() + 1 ||
    (month == currentTime.month() + 1 && day < currentTime.date())
  ) {
    year += 1;
  }

  let date = dayjs(
    `${year}-${month}-${day} ${+hourString} ${period}`,
    "YYYY-M-D h a",
    true
  );
  if (!date.isValid()) {
    return null;
  }
  date = date.tz(fullTimezone, true);
  return date;
};
