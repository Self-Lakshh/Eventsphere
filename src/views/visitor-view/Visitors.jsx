import React, { useState, useEffect } from 'react';
import axios from 'axios';
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

    useEffect(() => {
        const fetchCurrentEvents = async () => {
            try {
                const res = await axios.get('http://40.81.232.21:2025/api/fetch/events/current', {
                    headers: { 'x-api-key': 'visitor-key' }
                });
                setEvents(res.data.events || []);
                // console.log("📅 Current Events:", res.data.events);
            } catch (error) {
                console.error("❌ Error Fetching Events:", error.response?.data || error.message);
            }
        };

        fetchCurrentEvents();
    }, []);

    return (
        <>
            <div style={{ marginTop: "16px", width: "15%", marginInline: "auto", borderBottom: "2.2px solid var(--secondary-btn-hover-color)", borderRadius: "50px" }}></div>


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
    );
}

export default Visitors;
