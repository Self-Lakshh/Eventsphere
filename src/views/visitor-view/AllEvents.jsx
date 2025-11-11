import React, { useState, useEffect } from 'react';
import EventCard from '../../components/visitors/EventCard';
import apiClient from '../../lib/api';

function AllEvents() {
    const [events, setEvents] = useState(() => {
        // Load events from localStorage if available
        const storedEvents = localStorage.getItem('allEvents');
        return storedEvents ? JSON.parse(storedEvents) : [];
    });
    const [loading, setLoading] = useState(events.length === 0);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAllEvents = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await apiClient.get('/fetch/events');
                const fetchedEvents = response.data.events || [];
                setEvents(fetchedEvents);
                localStorage.setItem('allEvents', JSON.stringify(fetchedEvents));
            } catch (error) {
                console.error("❌ Error Fetching Events:", error.response?.data || error.message);
                setError(error.response?.data?.message || "Failed to load events");
            } finally {
                setLoading(false);
            }
        };

        if (events.length === 0) {
            fetchAllEvents();
        }
    }, []);

    return (
        <div>
            <h1 style={{ textAlign: 'center', marginTop: '8px' }}>All Events</h1>

            {error && (
                <div style={{
                    backgroundColor: "#ffebee",
                    color: "#c62828",
                    padding: "12px",
                    margin: "16px",
                    borderRadius: "8px",
                    textAlign: "center"
                }}>
                    {error}
                </div>
            )}

            {loading ? (
                <div style={{ textAlign: "center", padding: "40px" }}>
                    <p>Loading events...</p>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {events.length > 0 ? (
                        events.map(event => <EventCard key={event.event_id} event={event} />)
                    ) : (
                        <p>No events available</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default AllEvents;
