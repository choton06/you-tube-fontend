import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Components/Header";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import appStore from "../utils/appStore";
import { AuthProvider } from "../utils/AuthProvider";
import MobileBottomBar from "./Components/MobileBottomBar";

function App() {
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(true);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const location = useLocation();

  // Hide header on login/signup pages
  const hideHeader =
    location.pathname === "/signUp" || location.pathname === "/logIn";

  useEffect(() => {
    const handleResize = () => {
      // If on video details page, always hide sidebar by default
      if (location.pathname.startsWith("/video/")) {
        setIsLeftSidebarOpen(false);
      } else {
        setIsLeftSidebarOpen(window.innerWidth >= 640);
      }
    };

    handleResize(); // Run once on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [location.pathname]);

  const toggleLeftSidebar = () => {
    setIsLeftSidebarOpen((prev) => !prev);
  };

  const toggleRightSidebar = () => {
    setIsRightSidebarOpen((prev) => !prev);
  };

  return (
    <Provider store={appStore}>
      <AuthProvider>
        {!hideHeader && (
          <Header
            LeftToggleSidebar={isLeftSidebarOpen}
            RightToggleSidebar={isRightSidebarOpen}
            LeftToggleFun={toggleLeftSidebar}
            RightToggleFun={toggleRightSidebar}
          />
        )}
        <Outlet
          context={{
            isLeftSidebarOpen,
            isRightSidebarOpen,
            toggleLeftSidebar,
            toggleRightSidebar,
          }}
        />
        <MobileBottomBar />

           <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" // or "dark" for dark mode
      />
      </AuthProvider>
    </Provider>
  );
}

export default App;




