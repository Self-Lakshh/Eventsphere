import React from "react";
import { Routes, Route } from "react-router-dom";
import Visitors from "../views/visitor-view/Visitors";
import AllEvents from "../views/visitor-view/AllEvents";
import AboutEvent from "../views/visitor-view/AboutEvent";
import ContactUs from "../views/visitor-view/ContactUs";

const VisitorRoutes = () => (
    <Routes>
        <Route index element={<Visitors />} />
        <Route path="visitors" element={<Visitors />} />
        <Route path="allevents" element={<AllEvents />} />
        <Route path="event/:eventId" element={<AboutEvent />} />
        <Route path="contact-us" element={<ContactUs />} />
    </Routes>
);

export default VisitorRoutes;
