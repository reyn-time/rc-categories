import { VideoStatus } from "../gen/proto/video/v1/video_pb";

export const allVideoStatus: VideoStatus[] = [
  VideoStatus.Pending,
  VideoStatus.InProgress,
  VideoStatus.InReview,
  VideoStatus.Approved,
  VideoStatus.Archived,
];

type Color =
  | "error"
  | undefined
  | "success"
  | "info"
  | "warning"
  | "primary"
  | "secondary";

interface StatusText {
  color: Color;
  text: string;
}

export const videoStatusToStatusText: Record<VideoStatus, StatusText> = {
  [VideoStatus.Pending]: {
    color: undefined,
    text: "待分類",
  },
  [VideoStatus.InProgress]: {
    color: "primary",
    text: "分類中",
  },
  [VideoStatus.InReview]: {
    color: "warning",
    text: "待驗證",
  },
  [VideoStatus.Approved]: {
    color: "success",
    text: "已驗證",
  },
  [VideoStatus.Archived]: {
    color: "error",
    text: "刪除",
  },
};
