import { useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../utils/UserContext.js";

function RightSideBar({ isOpen, onClose }) {
  const { loggedInUser, setUserDetails } = useContext(UserContext);
  const sidebarRef = useRef(); //  always called

  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]); //  always called

  //  Now safe to return early AFTER all hooks
  if (!isOpen || !loggedInUser) return null;

  const user = loggedInUser;

  return (
    <div
      ref={sidebarRef}
      className="mt-6 p-3 bg-slate-50 absolute right-4 top-14 z-50 shadow-xl w-72 rounded-md animate-slide-in"
    >
      <div className="flex p-2">
        <img
          src={user.AvatarUrl}
          alt="profile"
          className="rounded-full w-14 h-14"
        />
        <div className="px-3">
          <h1 className="font-semibold">{user.FullName}</h1>
          <h2 className="text-sm text-gray-600">{user.Email}</h2>
        </div>
      </div>

      <Link to={`/Channel/${user._id}`}>
        <p className="text-blue-500 ml-[74px] p-2 hover:underline">
          View Your Channel
        </p>
      </Link>

      <hr className="my-2" />
      <button
        onClick={() => {
          localStorage.removeItem("accessToken");
          setUserDetails(null);
          window.location.href = "/logIn";
        }}
        className="w-full text-left text-red-500 hover:underline p-2"
      >
        Sign Out
      </button>
    </div>
  );
}

export default RightSideBar;



