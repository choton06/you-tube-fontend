import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faSearch,
  faMicrophone,
  faCircleUser,
  faBell,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./SideBar";
import RightSideBar from "./RightSideBar";
import UserContext from "../../utils/UserContext.js";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchText } from "../../utils/searchSlice";

function Header({
  LeftToggleSidebar,
  RightToggleSidebar,
  LeftToggleFun,
  RightToggleFun,
}) {
  const [searchText, setSearchTextState] = useState("");
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const { loggedInUser } = useContext(UserContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTextState(value);
    dispatch(setSearchText(value));
  };

  const handleSearch = () => {
    navigate("/");
    setShowMobileSearch(false);
  };

  const handleFocus = () => setIsSearchFocused(true);
  const handleBlur = () => setIsSearchFocused(false);

  return (
    <>
      <header
        className="
          bg-white dark:bg-zinc-900
          w-full shadow-sm flex items-center justify-between
          px-3 sm:px-6 py-2 sm:py-3
          fixed top-0 z-40
          min-h-[48px] sm:min-h-[56px]
        "
      >
        {/* Left: Hamburger + Logo */}
        <div className="flex items-center gap-3 sm:gap-6">
          <FontAwesomeIcon
            icon={faBars}
            className="p-2 hover:bg-slate-200 dark:hover:bg-zinc-800 text-base rounded-full cursor-pointer"
            onClick={LeftToggleFun}
          />
          <Link to="/" className="flex items-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
              alt="logo"
              width="90"
              height="30"
              className="sm:block object-contain"
            />
          </Link>
        </div>

        {/* Middle: Search (desktop) */}
        <div className="hidden sm:flex flex-1 justify-center max-w-[600px] px-2">
          <div
            className={`
              flex items-center 
              rounded-full overflow-hidden w-full
              ring-1 transition-colors duration-300
              ${
                isSearchFocused
                  ? "ring-blue-500 bg-white dark:bg-zinc-700 shadow-md"
                  : "ring-slate-300 dark:ring-zinc-600 bg-gray-100 dark:bg-zinc-800"
              }
            `}
          >
            <input
              type="text"
              placeholder="Search"
              className="
                h-10 pl-4 w-full
                text-sm text-black dark:text-white
                bg-transparent
                focus:outline-none
                transition-colors duration-300
              "
              value={searchText}
              onChange={handleInputChange}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              aria-label="Search videos"
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <button
              onClick={handleSearch}
              className={`
                px-4
                focus:outline-none focus:ring-2 focus:ring-blue-500
                transition-colors duration-300
                hover:bg-gray-200 dark:hover:bg-zinc-700
                ${isSearchFocused ? "animate-pulse" : ""}
              `}
              aria-label="Search"
              type="submit"
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </div>

        {/* Right icons */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Mobile search button */}
          {!showMobileSearch && (
            <button
              className="p-2 sm:hidden hover:bg-gray-200 dark:hover:bg-zinc-800 rounded-full"
              onClick={() => setShowMobileSearch(true)}
              aria-label="Open search"
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
          )}

          {/* Mic icon */}
          <button
            className="hidden sm:inline-flex ml-2 bg-slate-200 dark:bg-zinc-700 p-3 rounded-full hover:bg-slate-300 dark:hover:bg-zinc-600"
            aria-label="Voice search"
          >
            <FontAwesomeIcon icon={faMicrophone} />
          </button>

          {/* Upload */}
          <button
            className="hidden sm:inline-block p-2 hover:bg-gray-200 dark:hover:bg-zinc-800 rounded-full"
            aria-label="Upload video"
          >
            <FontAwesomeIcon icon={faUpload} />
          </button>

          {/* Bell */}
          <button
            className="hidden sm:inline-block p-2 hover:bg-gray-200 dark:hover:bg-zinc-800 rounded-full"
            aria-label="Notifications"
          >
            <FontAwesomeIcon icon={faBell} />
          </button>

          {/* Profile or Sign In */}
          {loggedInUser ? (
            <button
              className="ring-1 ring-slate-300 dark:ring-zinc-600 rounded-full p-1 hover:bg-gray-100 dark:hover:bg-zinc-800 transition"
              onClick={RightToggleFun}
              aria-label="User profile menu"
            >
              {loggedInUser.AvatarUrl ? (
                <img
                  src={loggedInUser.AvatarUrl}
                  alt="profile"
                  className="rounded-full w-8 h-8 object-cover"
                />
              ) : (
                <FontAwesomeIcon
                  icon={faCircleUser}
                  className="text-xl text-blue-600"
                />
              )}
            </button>
          ) : (
            <Link to="/logIn">
              <button
                className="ring-1 ring-slate-300 dark:ring-zinc-600 rounded-2xl py-1 px-3 text-blue-600 hover:bg-gray-100 dark:hover:bg-zinc-800 transition text-sm flex items-center"
                aria-label="Sign in"
              >
                <FontAwesomeIcon icon={faCircleUser} className="mr-1" />
                Sign in
              </button>
            </Link>
          )}
        </div>
      </header>

      {/* Mobile search bar overlay */}
      {showMobileSearch && (
        <div
          className="
            fixed top-0 left-0 right-0 z-50 bg-white dark:bg-zinc-900
            px-4 py-2 flex items-center gap-2 shadow-md min-h-[48px]
            sm:hidden
          "
        >
          <button
            onClick={() => setShowMobileSearch(false)}
            className="text-xl p-2 hover:bg-gray-200 dark:hover:bg-zinc-800 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Close search"
            type="button"
          >
            ←
          </button>
          <div
            className={`
              flex items-center rounded-full flex-1 overflow-hidden
              ring-1 transition-colors duration-300
              ${
                isSearchFocused
                  ? "ring-blue-500 bg-white dark:bg-zinc-700 shadow-md"
                  : "ring-slate-300 dark:ring-zinc-600 bg-gray-100 dark:bg-zinc-800"
              }
            `}
          >
            <input
              type="text"
              placeholder="Search"
              className="
                h-10 pl-4 w-full
                text-sm text-black dark:text-white
                bg-transparent
                focus:outline-none
                transition-colors duration-300
              "
              value={searchText}
              onChange={handleInputChange}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              autoFocus
              aria-label="Search videos"
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <button
              onClick={handleSearch}
              className={`
                px-4 hover:bg-gray-200 dark:hover:bg-zinc-700 transition
                focus:outline-none focus:ring-2 focus:ring-blue-500
                 duration-300
                ${isSearchFocused ? "animate-pulse" : ""}
              `}
              aria-label="Search"
              type="submit"
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </div>
      )}

      {/* Sidebars */}
      <Sidebar isOpen={LeftToggleSidebar} onClose={LeftToggleFun} />
      <RightSideBar isOpen={RightToggleSidebar} onClose={RightToggleFun} />
    </>
  );
}

export default Header;
















