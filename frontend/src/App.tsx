import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { CustomAppBar } from "./features/app-bar/appBar";
import { lazy, Suspense } from "react";

const VideoList = lazy(() => import("./features/video/videoList"));
const VideoDetail = lazy(() => import("./features/video-detail/videoDetail"));

const router = createBrowserRouter([
  {
    element: (
      <>
        <CustomAppBar />
        <Outlet />
      </>
    ),
    children: [
      {
        path: "/",
        element: (
          <Suspense>
            <VideoList />
          </Suspense>
        ),
      },
      {
        path: "/video/:id",
        element: (
          <Suspense>
            <VideoDetail />
          </Suspense>
        ),
      },
    ],
  },
]);

export const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};
