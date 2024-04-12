import { VideoList } from "./features/video/videoList";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { VideoDetail } from "./features/video-detail/videoDetail";
import { CustomAppBar } from "./features/app-bar/appBar";

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
        element: <VideoList />,
      },
      {
        path: "/video/:youtubeId",
        element: <VideoDetail />,
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
