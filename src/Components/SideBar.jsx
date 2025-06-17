import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from "react-router-dom";
import {
  faHome,
  faBolt,
  faTv,
  faHistory,
  faFire,
  faMusic,
  faGamepad,
  faFilm,
  faNewspaper,
  faBroadcastTower,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import UserContext from "../../utils/UserContext";

function Sidebar({ isOpen, onClose }) {
  const { loggedInUser } = useContext(UserContext);
  const location = useLocation();

  const navItems = [
    { to: "/", icon: faHome, label: "Home" },
    { to: "/shorts", icon: faBolt, label: "Shorts" },
    { to: "/subscriptions", icon: faTv, label: "Subscriptions" },
    { to: "/user", icon: faCircleUser, label: "You" },
    { to: "/history", icon: faHistory, label: "History" },
  ];

  const exploreLinks = [
    { to: "/trending", icon: faFire, label: "Trending" },
    { to: "/music", icon: faMusic, label: "Music" },
    { to: "/gaming", icon: faGamepad, label: "Gaming" },
    { to: "/movies", icon: faFilm, label: "Movies" },
    { to: "/news", icon: faNewspaper, label: "News" },
    { to: "/live", icon: faBroadcastTower, label: "Live" },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full bg-white dark:bg-[#0f0f0f] shadow-md
          transition-all duration-300 ease-in-out
          ${isOpen ? "w-60" : "w-[72px] sm:w-[72px]"}
          sm:top-[60px] sm:h-[calc(100%-60px)]
          ${isOpen ? "block" : "hidden sm:block"}
        `}
      >
        <div className="py-4 overflow-y-auto h-full custom-scrollbar">
          <div className="flex flex-col gap-1 text-sm">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                onClick={() => {
                  if (window.innerWidth < 640) onClose();
                }}
                className={`flex items-center gap-4 px-4 py-3 hover:bg-gray-100 dark:hover:bg-[#272727] rounded-lg transition duration-200
                  ${!isOpen ? "justify-center" : ""}
                  ${location.pathname === item.to ? "bg-gray-200 dark:bg-[#383838]" : ""}
                `}
              >
                <FontAwesomeIcon icon={item.icon} className="text-lg" />
                {isOpen && <span className="whitespace-nowrap">{item.label}</span>}
              </Link>
            ))}

            <hr className="my-2 border-gray-300 dark:border-[#3f3f3f]" />

            {!loggedInUser && (
              <div className={`px-4 py-3 ${!isOpen ? "text-center" : ""}`}>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Sign in to like videos, comment, and subscribe.
                </p>
                <Link to="/logIn" onClick={onClose}>
                  <button className="mt-3 flex items-center gap-2 px-4 py-2 text-blue-600 border border-gray-300 rounded-full hover:bg-gray-100 dark:border-gray-500 dark:hover:bg-[#272727]">
                    <FontAwesomeIcon icon={faCircleUser} />
                    {isOpen && <span>Sign In</span>}
                  </button>
                </Link>
              </div>
            )}

            {isOpen && (
              <>
                <hr className="my-2 border-gray-300 dark:border-[#3f3f3f]" />
                <div className="px-4">
                  <h3 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
                    Explore
                  </h3>
                  <div className="flex flex-col gap-2">
                    {exploreLinks.map((item) => (
                      <Link
                        key={item.label}
                        to={item.to}
                        onClick={onClose}
                        className="flex items-center gap-4 px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#272727] rounded-lg"
                      >
                        <FontAwesomeIcon icon={item.icon} />
                        <span>{item.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;









