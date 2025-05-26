import React, { useState, useEffect } from 'react';
import EventCard from '../../components/visitors/EventCard';
import axios from 'axios';

function AllEvents() {
    const [events, setEvents] = useState(() => {
        // Load events from localStorage if available
        const storedEvents = localStorage.getItem('allEvents');
        return storedEvents ? JSON.parse(storedEvents) : [];
    });

    useEffect(() => {
        const fetchAllEvents = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/fetch/events`, {
                    headers: { "x-api-key": import.meta.env.VITE_API_KEY }
                });
                const fetchedEvents = response.data.events || [];

                setEvents(fetchedEvents);
                console.log(fetchedEvents);
                localStorage.setItem('allEvents', JSON.stringify(fetchedEvents));
            } catch (error) {
                console.error("❌ Error Fetching Events:", error.response?.data || error.message);
            }
        };

        if (events.length === 0) {
            fetchAllEvents(); 
        }
    }, []);

    return (
        <div>
            <h1 style={{ textAlign: 'center', marginTop: '8px' }}>All Events</h1>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {events.length > 0 ? (
                    events.map(event => <EventCard key={event.event_id} event={event} />)
                ) : (
                    <p>No events available</p>
                )}
            </div>
        </div>
    );
}

export default AllEvents;
