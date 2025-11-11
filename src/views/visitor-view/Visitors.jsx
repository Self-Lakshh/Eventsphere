import React, { useState, useEffect } from 'react';
import apiClient from '../../lib/api';
import EventCarousel from '../../components/visitors/EventCarousel';
import Sponsors from '../../components/visitors/Sponsors';
import EventList from '../../components/visitors/EventList';
import Statistics from '../../components/visitors/Statistics';
import AboutUs from '../../components/visitors/AboutUs';


const sponsorData = [
    { id: 1, image: "/assets/sponsors/sponsor1.png" },
    { id: 2, image: "/assets/sponsors/sponsor2.png" },
    { id: 3, image: "/assets/sponsors/sponsor3.png" },
    { id: 4, image: "/assets/sponsors/sponsor4.png" },
    { id: 5, image: "/assets/sponsors/sponsor5.png" },
    { id: 6, image: "/assets/sponsors/sponsor2.png" },
    { id: 7, image: "/assets/sponsors/sponsor3.png" },
    { id: 8, image: "/assets/sponsors/sponsor4.png" }
];


const aboutusData = [
    {
        description: "At Nexio Event Sphere, we bring people together to create unforgettable experiences. From planning and organizing events to providing opportunities for individuals to participate and contribute, we ensure every event is successful and enjoyable. Whether you’re an organizer or a participant, Nexio Event Sphere is your go-to platform for seamless event management and memorable gatherings.",
        logo: '/assets/ndg_logo.jpg'
    }
];

function Visitors() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCurrentEvents = async () => {
            try {
                setLoading(true);
                setError(null);
                const res = await apiClient.get('/fetch/events/current');
                setEvents(res.data.events || []);
            } catch (error) {
                console.error("❌ Error Fetching Events:", error.response?.data || error.message);
                setError(error.response?.data?.message || "Failed to load events. Please try again.");
                setEvents([]);
            } finally {
                setLoading(false);
            }
        };

        fetchCurrentEvents();
    }, []);

    return (
        <>
            <div style={{ marginTop: "16px", width: "15%", marginInline: "auto", borderBottom: "2.2px solid var(--secondary-btn-hover-color)", borderRadius: "50px" }}></div>

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
                <>
                    <div className='mt-3'>
                        <EventCarousel events={events} />
                    </div>
                    <Statistics />
                    <AboutUs content={aboutusData[0]} />
                    <div className='mt-3'>
                        <Sponsors sponsors={sponsorData} />
                    </div>
                    <EventList events={events} />
                </>
            )}
        </>
    );
}

export default Visitors;
