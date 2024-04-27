import { createSelector } from "@reduxjs/toolkit/react";
import { intervalApi } from "./intervalSlice";
import { Interval } from "../../gen/proto/interval/v1/interval_pb";
import { selectCategories } from "../category/categorySlice";

const emptyInterval: Interval[] = [];

export const selectExtendedIntervals = createSelector(
  (state, videoId) => intervalApi.endpoints.listInterval.select(videoId)(state),
  selectCategories,
  (videoIds, categories) => {
    if (
      videoIds.status === "loading" ||
      categories.status === "loading" ||
      !videoIds.data
    ) {
      return emptyInterval;
    }
    const intervals = videoIds.data;
    const idToCategory = new Map<number, string>();
    categories.data?.forEach((category) => {
      idToCategory.set(category.id, category.name);
    });
    return intervals.map((interval) => ({
      ...interval,
      categoryNames: interval.categoryIds.map(
        (id) => idToCategory.get(id) ?? "Unknown"
      ),
    }));
  }
);
