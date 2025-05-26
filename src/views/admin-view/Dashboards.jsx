import React, { useEffect, useState } from "react";
import axios from "axios";
import useLayout from "../../hooks/useLayout";
import ActionCard from "../../components/admin/ActionCard";
import EventBar from "../../components/admin/EventBar";

const Dashboards = () => {
    const { isMobile } = useLayout();
    const [events, setEvents] = useState([]);
    const [eventOptions, setEventOptions] = useState([]);
    const [memberId, setMemberId] = useState(null);

    useEffect(() => {
        // Retrieve user session
        try {
            const userData = JSON.parse(localStorage.getItem("sessionUser"));
            if (userData?.member_id) setMemberId(userData.member_id);
        } catch (error) {
            console.error("Error parsing sessionUser from localStorage:", error);
        }

        // Fetch Events and populate dropdown
        const fetchEvents = async () => {
            try {
                const response = await axios.get("http://40.81.232.21:2025/api/admin/events", {
                    headers: { "x-api-key": "admin-secret-key" },
                });

                const filteredEvents = response.data.filter(event =>
                    ["ongoing", "upcoming", "draft"].includes(event.event_status)
                );

                setEvents(filteredEvents);
                setEventOptions(filteredEvents.map(event => ({
                    label: event.event_name, // Name displayed in dropdown
                    value: event.event_id    // ID sent in API
                })));
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        fetchEvents();
    }, []);

    // Handle Event Creation
    const handleCreateEvent = async (data) => {
        if (!memberId) return console.error("Member ID not found. Please log in.");

        try {
            const payload = {
                event_name: data.eventName,
                event_description: data.eventDescription,
                date: data.date,
                created_by: memberId
            };

            const response = await axios.post(
                "http://40.81.232.21:2025/api/admin/events",
                payload,
                {
                    headers: {
                        "x-api-key": "admin-secret-key",
                        "Content-Type": "application/json"
                    }
                }
            );

            // Update event list and dropdown options
            setEvents(prev => [...prev, response.data]);
            setEventOptions(prev => [...prev, { label: response.data.event_name, value: response.data.event_id }]);
        } catch (error) {
            console.error("Error creating event:", error);
        }
    };

    // Handle Announcement Creation
    const handleCreateAnnouncement = async (data) => {
        if (!memberId) return console.error("Member ID not found. Please log in.");

        try {
            const payload = {
                event_id: data.eventId, // Ensures correct event ID is sent
                message: data.message,
                link_url: data.linkUrl,
                created_by: memberId
            };

            await axios.post(
                "http://40.81.232.21:2025/api/admin/announcements",
                payload,
                {
                    headers: {
                        "x-api-key": "admin-secret-key",
                        "Content-Type": "application/json"
                    }
                }
            );

            console.log("Announcement Created Successfully");
        } catch (error) {
            console.error("Error creating announcement:", error);
        }
    };

    return (
        <div style={{ padding: "16px" }}>
            {isMobile ? (
                <>
                    <div className="d-flex flex-column mt-3" style={{ gap: "16px" }}>
                        <ActionCard
                            title="Create Event"
                            description="Add a new event"
                            buttonText="Create"
                            formFields={[
                                { label: "Event Name", name: "eventName", type: "text" },
                                { label: "Event Description", name: "eventDescription", type: "text" },
                                { label: "Date", name: "date", type: "date" }
                            ]}
                            onSubmit={handleCreateEvent}
                        />
                        
                        <ActionCard
                            title="Add Announcement"
                            description="Post an announcement"
                            buttonText="Post"
                            formFields={[
                                { label: "Event", name: "eventId", type: "select", options: eventOptions },
                                { label: "Message", name: "message", type: "text" },
                                { label: "Link URL", name: "linkUrl", type: "text" }
                            ]}
                            onSubmit={handleCreateAnnouncement}
                        />
                    </div>
                    <EventBar
                        events={events.map((event, index) => ({
                            event_id: event.event_id || `event-${index}`,
                            event_name: event.event_name,
                            event_status: event.event_status
                        }))}
                    />
                </>
            ) : (
                <div className="d-flex flex-column">
                    <div className="d-flex" style={{ gap: "16px" }}>
                        <ActionCard
                            title="Create Event"
                            description="Add a new event"
                            buttonText="Create"
                            formFields={[
                                { label: "Event Name", name: "eventName", type: "text" },
                                { label: "Event Description", name: "eventDescription", type: "text" },
                                { label: "Date", name: "date", type: "date" }
                            ]}
                            onSubmit={handleCreateEvent}
                        />
                        <ActionCard
                            title="Add Announcement"
                            description="Post an announcement"
                            buttonText="Post"
                            formFields={[
                                { label: "Event", name: "eventId", type: "select", options: eventOptions },
                                { label: "Message", name: "message", type: "text" },
                                { label: "Link URL", name: "linkUrl", type: "text" }
                            ]}
                            onSubmit={handleCreateAnnouncement}
                        />
                    </div>
                    <EventBar
                        events={events.map((event, index) => ({
                            event_id: event.event_id || `event-${index}`,
                            event_name: event.event_name,
                            event_status: event.event_status
                        }))}
                    />
                </div>
            )}
        </div>
    );
};

export default Dashboards;
