import { configureStore } from "@reduxjs/toolkit";
import { videoApi, videoFilterSlice } from "../features/video/videoSlice";
import { categoryApi } from "../features/category/categorySlice";
import { intervalApi } from "../features/video-detail/intervalSlice";
import { userApi } from "../features/user/userSlice";
import { patientAppointmentApi } from "../features/patient/patientAppointmentSlice";
import { patientApi } from "../features/patient/patientSlice";

export const store = configureStore({
  reducer: {
    [videoApi.reducerPath]: videoApi.reducer,
    [videoFilterSlice.reducerPath]: videoFilterSlice.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [intervalApi.reducerPath]: intervalApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [patientAppointmentApi.reducerPath]: patientAppointmentApi.reducer,
    [patientApi.reducerPath]: patientApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(videoApi.middleware)
      .concat(categoryApi.middleware)
      .concat(intervalApi.middleware)
      .concat(userApi.middleware)
      .concat(patientAppointmentApi.middleware)
      .concat(patientApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
