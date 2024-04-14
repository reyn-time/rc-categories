import { configureStore } from "@reduxjs/toolkit";
import videoReducer from "../features/video/videoSlice";
import categoryReducer from "../features/category/categorySlice";

export const store = configureStore({
  reducer: {
    videos: videoReducer,
    categories: categoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
