import { useEffect, useState } from "react";
import UserContext from "./UserContext";

export const AuthProvider = ({ children }) => {
  const [loggedInUser, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("accessToken"); // ✅ fixed key
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("http://localhost:3000/user/me", {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Bearer instead of JWT
          },
        });

        if (!res.ok) throw new Error("Unauthorized");

        const userData = await res.json();
        setUserDetails(userData);
      } catch (err) {
        console.error("Auth fetch failed:", err.message);
        localStorage.removeItem("accessToken"); // ✅ clear on fail
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ loggedInUser, setUserDetails, loading }}>
      {children}
    </UserContext.Provider>
  );
};




