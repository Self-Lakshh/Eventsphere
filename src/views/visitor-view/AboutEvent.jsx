import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
// components
import EventDetails from "../../components/visitors/EventDetails";

const AboutEvent = () => {
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const eventResponse = await axios.get(`${import.meta.env.VITE_BASE_URL}/fetch/event/${eventId}`, {
                    headers: { "x-api-key": import.meta.env.VITE_API_KEY }
                });
                setEvent(eventResponse.data.event);
                console.log("Event response:", eventResponse.data.event);

                const imagesResponse = await axios.get(`${import.meta.env.VITE_BASE_URL}/fetch/event/${eventId}/images`, {
                    headers: { "x-api-key": import.meta.env.VITE_API_KEY }
                });

                setImages(imagesResponse.data.images || []);
                console.log("Images response:", imagesResponse.data.images);
            } catch (error) {
                console.error("Error fetching event details:", error);
            }
        };

        fetchEventDetails();
    }, [eventId]);

    return (
        <>
            {event ? <EventDetails event={event} images={images} /> : <p>Loading event details...</p>}
        </>
    );
};

export default AboutEvent;
