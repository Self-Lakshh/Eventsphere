import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import useAuth from "../hooks/useAuth";

const AutoLogin = () => {
    const navigate = useNavigate();
    const { login, logout, isAuthenticated } = useAuth();
    const hasFetched = useRef(false); // ✅ Prevents duplicate API calls

    useEffect(() => {
        const token = Cookies.get("jwt_token");

        if (!token) {
            logout(); // ✅ Call logout only once
            return;
        }

        // Prevent multiple API calls
        if (hasFetched.current) return;
        hasFetched.current = true;

        const autoLogin = async () => {
            try {
                const response = await axios.get("http://40.81.232.21:2025/api/auth/auto-login", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "x-api-key": "visitor-key",
                    },
                });

                if (response.data.user) {
                    const user = response.data.user;
                    login(user, token);

                    const roleRedirect = {
                        admin: "/dashboard",
                        volunteer: "/volunteer",
                    };

                    navigate(roleRedirect[user.view_role] || "/", { replace: true });
                } else {
                    logout();
                }
            } catch (error) {
                logout();
            }
        };

        autoLogin();
    }, [login, logout, navigate]);

    return null; 
};

export default AutoLogin;
