
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBolt,
  faTv,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";

function MobileBottomBar() {
  const location = useLocation();

  const navItems = [
    { to: "/", icon: faHome, label: "Home" },
    { to: "/shorts", icon: faBolt, label: "Shorts" },
    { to: "/subscriptions", icon: faTv, label: "Subscriptions" },
    { to: "/user", icon: faCircleUser, label: "You" },
  ];

  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-[#0f0f0f] border-t border-gray-300 dark:border-[#272727] flex justify-around items-center py-2">
      {navItems.map((item) => (
        <Link
          to={item.to}
          key={item.label}
          className={`flex flex-col items-center text-xs text-gray-700 dark:text-gray-200 ${
            location.pathname === item.to ? "text-blue-600" : ""
          }`}
        >
          <FontAwesomeIcon icon={item.icon} className="text-lg" />
          <span className="text-[11px] mt-1">{item.label}</span>
        </Link>
      ))}
    </div>
  );
}

export default MobileBottomBar;
