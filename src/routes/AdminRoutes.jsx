import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboards from "../views/admin-view/Dashboards";
import ManageEvents from "../views/admin-view/ManageEvents";
import Loggings from "../views/admin-view/Loggings";
import ManageAnnouncements from "../views/admin-view/ManageAnnouncements";

const AdminRoutes = () => (
    <Routes>
        <Route index element={<Dashboards />} />  {/* ✅ Loads for /dashboard */}
        <Route path="manage-events" element={<ManageEvents />} />
        <Route path="loggings" element={<Loggings />} />
        <Route path="manage-announcements" element={<ManageAnnouncements />} />
        <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
);

export default AdminRoutes;
