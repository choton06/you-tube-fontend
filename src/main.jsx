import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "../utils/AuthProvider";

import ErrorElement from "./Components/ErrorElement.jsx";

// Lazy-loaded components
const Home = lazy(() => import("./Components/Home.jsx"));
const SignUp = lazy(() => import("./Components/SignUp.jsx"));
const LogIn = lazy(() => import("./Components/LogIn.jsx"));
const VideoDetails = lazy(() => import("./Components/VideoDetails.jsx"));
const Channel = lazy(() => import("./Components/Channel.jsx"));
const CreateChannel = lazy(() => import("./Components/CreactChannel.jsx"));
const UploadVideo = lazy(() => import("./Components/UploadVideo.jsx"));
const EditChannel = lazy(() => import("./Components/EditChannel.jsx"));
const EditVideo = lazy(() => import("./Components/EditVideo.jsx"));

const appRoute = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorElement />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/signUp", element: <SignUp /> },
      { path: "/logIn", element: <LogIn /> },
      { path: "/video/:videoId", element: <VideoDetails /> },
      { path: "/Channel/:id", element: <Channel /> },
      { path: "/createchannel/:id", element: <CreateChannel /> },
      { path: "/uploadVideo/:channelId", element: <UploadVideo /> },
      { path: "/editchannel/:channelId", element: <EditChannel /> },
      { path: "/editvideo/:id", element: <EditVideo /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <Suspense fallback={<div className="text-center mt-20 text-xl">Loading...</div>}>
        <RouterProvider router={appRoute} />
      </Suspense>
    </AuthProvider>
  </StrictMode>
);

