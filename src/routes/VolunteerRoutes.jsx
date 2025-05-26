import React from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute"; // ✅ Fixed import
import VolunteerLayout from "../layouts/VolunteerLayout";
import Volunteer from "../views/volunteer-view/Volunteer";

const VolunteerRoutes = () => (
    <Routes>
        <Route element={<PrivateRoute allowedRoles={["volunteer"]} />}> {/* ✅ Fixed `allowedRoles` */}
            <Route element={<VolunteerLayout />}>
                <Route index element={<Volunteer />} /> {/* ✅ Corrected path */}
            </Route>
        </Route>
    </Routes>
);

export default VolunteerRoutes;
