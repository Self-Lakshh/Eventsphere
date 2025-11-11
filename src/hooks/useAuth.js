import Cookies from "js-cookie";
import { useState, useEffect } from "react";

/**
 * Custom hook for managing authentication state
 * Handles login, logout, and persistent auth tokens
 * 
 * @returns {Object} Auth state and methods
 * @returns {boolean} isAuthenticated - Whether user is logged in
 * @returns {string} userRole - Current user's role (admin, volunteer, etc.)
 * @returns {Function} login - Login function to set auth state
 * @returns {Function} logout - Logout function to clear auth state
 */
const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!Cookies.get("jwt_token"));
  const [userRole, setUserRole] = useState(() => {
    try {
      const sessionUser = JSON.parse(localStorage.getItem("sessionUser"));
      return sessionUser?.view_role?.toLowerCase() || "";
    } catch (error) {
      console.warn("Failed to parse sessionUser from localStorage:", error);
      return "";
    }
  });

  useEffect(() => {
    const token = Cookies.get("jwt_token");
    if (!token) {
      logout();
    }
  }, []);

  /**
   * Stores user data and JWT token on successful login
   * @param {Object} userData - User object from API response
   * @param {string} token - JWT token from API response
   */
  const login = (userData, token) => {
    try {
      localStorage.setItem("sessionUser", JSON.stringify(userData));
      Cookies.set("jwt_token", token, { expires: 1 });
      setIsAuthenticated(true);
      setUserRole(userData.view_role?.toLowerCase() || "");
    } catch (error) {
      console.error("Error saving auth data:", error);
    }
  };

  /**
   * Clears user data and JWT token on logout
   */
  const logout = () => {
    try {
      localStorage.removeItem("sessionUser");
      Cookies.remove("jwt_token");
      setIsAuthenticated(false);
      setUserRole("");
    } catch (error) {
      console.error("Error clearing auth data:", error);
    }
  };

  return { isAuthenticated, userRole, login, logout };
};

export default useAuth;
