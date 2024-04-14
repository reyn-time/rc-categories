import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Category } from "../../gen/proto/category/v1/category_pb";
import { PlainMessage } from "@bufbuild/protobuf";

export const selectExtendedCategories = createSelector(
  [(state: RootState) => state.categories.categories],
  (categories) => {
    const idToCategory = new Map<number, PlainMessage<Category>>();
    const idToRankList = new Map<number, number[]>();
    categories.forEach((category) => {
      idToCategory.set(category.id, category);
    });
    const getRankList = (id: number): number[] => {
      if (!idToRankList.has(id)) {
        const category = idToCategory.get(id)!;
        if (!category.parentId) {
          idToRankList.set(id, [category.rank]);
        } else {
          idToRankList.set(id, [
            ...getRankList(category.parentId),
            category.rank,
          ]);
        }
      }
      return idToRankList.get(id)!;
    };
    categories.forEach((category) => {
      getRankList(category.id);
    });

    return [...categories]
      .sort((a, b) => {
        const aRankList = idToRankList.get(a.id)!;
        const bRankList = idToRankList.get(b.id)!;
        for (let i = 0; i < Math.min(aRankList.length, bRankList.length); i++) {
          if (aRankList[i] !== bRankList[i]) {
            return aRankList[i] - bRankList[i];
          }
        }
        return aRankList.length - bRankList.length;
      })
      .map((category) => ({
        ...category,
        rankList: idToRankList.get(category.id)!,
      }));
  }
);
