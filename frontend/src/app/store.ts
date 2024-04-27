import { configureStore } from "@reduxjs/toolkit";
import { videoApi } from "../features/video/videoSlice";
import { categoryApi } from "../features/category/categorySlice";
import { intervalApi } from "../features/video-detail/intervalSlice";

export const store = configureStore({
  reducer: {
    [videoApi.reducerPath]: videoApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [intervalApi.reducerPath]: intervalApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(videoApi.middleware)
      .concat(categoryApi.middleware)
      .concat(intervalApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
