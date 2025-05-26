import Cookies from "js-cookie";
import { useState, useEffect } from "react";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!Cookies.get("jwt_token"));
  const [userRole, setUserRole] = useState(() => {
    const sessionUser = JSON.parse(localStorage.getItem("sessionUser"));
    return sessionUser?.view_role?.toLowerCase() || "";
  });

  useEffect(() => {
    const token = Cookies.get("jwt_token");
    if (!token) {
      logout();
    }
  }, []); // ✅ Runs only on component mount

  const login = (userData, token) => {
    localStorage.setItem("sessionUser", JSON.stringify(userData));
    Cookies.set("jwt_token", token, { expires: 1 }); // ✅ Set expiry (1 day)
    setIsAuthenticated(true);
    setUserRole(userData.view_role.toLowerCase());
  };

  const logout = () => {
    localStorage.removeItem("sessionUser");
    Cookies.remove("jwt_token");
    setIsAuthenticated(false);
    setUserRole("");
  };

  return { isAuthenticated, userRole, login, logout };
};

export default useAuth;
