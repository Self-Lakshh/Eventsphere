import React, { useEffect, useState } from "react";
import apiClient from "../../lib/api";
import EventBar from "../../components/admin/EventBar";

const ManageEvents = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await apiClient.get('/admin/events');
                setEvents(response.data);
            } catch (error) {
                console.error("Error fetching events:", error);
                setEvents([]);
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
