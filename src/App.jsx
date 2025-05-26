import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Routes 
import VisitorRoutes from "./routes/VisitorRoutes";
import VolunteerRoutes from "./routes/VolunteerRoutes";
import AdminRoutes from "./routes/AdminRoutes";

// Layouts  
import VisitorLayout from "./layouts/VisitorLayout";
import VolunteerLayout from "./layouts/VolunteerLayout";
import AdminLayout from "./layouts/AdminLayout";

// Components
import PrivateRoute from "./components/PrivateRoute";
import LoginPage from "./views/LoginPage";
import AutoLogin from "./components/AutoLogin";
// Hooks
import useAuth from "./hooks/useAuth";

function App() {
    const { isAuthenticated, userRole } = useAuth();

    return (
        <Router>
            <AutoLogin />
            <Routes>
                {/* ✅ Public Visitor Routes */}
                <Route element={<VisitorLayout />}>
                    <Route path="/*" element={<VisitorRoutes />} />
                </Route>

                {/* ✅ Authentication Page */}
                <Route path="/login" element={<LoginPage />} />

                {/* 🔐 Protected Volunteer Routes */}
                <Route element={<PrivateRoute isAuthenticated={isAuthenticated} allowedRoles={["volunteer"]} />}>
                    <Route element={<VolunteerLayout />}>
                        <Route path="/volunteer/*" element={<VolunteerRoutes />} />
                    </Route>
                </Route>

                {/* 🔐 Protected Admin Routes */}
                <Route element={<PrivateRoute isAuthenticated={isAuthenticated} allowedRoles={["admin"]} />}>
                    <Route element={<AdminLayout />}>
                        <Route path="/dashboard/*" element={<AdminRoutes />} />
                    </Route>
                </Route>

                {/* 🔄 Redirect Unknown Routes */}
                <Route path="*" element={<Navigate to={isAuthenticated ? (userRole === "admin" ? "/dashboard" : "/volunteer") : "/"} />} />
            </Routes>
        </Router>
    );
}

export default App;
