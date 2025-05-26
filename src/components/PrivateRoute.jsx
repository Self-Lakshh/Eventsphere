import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ allowedRoles }) => {
    const { isAuthenticated, userRole } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(userRole)) {
        return <Navigate to={userRole === "admin" ? "/dashboard" : userRole === "volunteer" ? "/volunteer" : "/"} replace />;
    }

    return <Outlet />;
};

export default PrivateRoute;
