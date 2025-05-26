import React, { useEffect, useState } from "react";
import axios from "axios";
import EventBar from "../../components/admin/EventBar";

const ManageEvents = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get("http://40.81.232.21:2025/api/admin/events", {
                    headers: { "x-api-key": "admin-secret-key" }
                });
                setEvents(response.data);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        fetchEvents();
    }, []);

    return (
        <div style={{ padding: "16px" }}>
            <h2>Manage Events</h2>
            <EventBar events={events} setEvents={setEvents} />
        </div>
    );
};

export default ManageEvents;
