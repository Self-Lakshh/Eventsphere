import React, { useState, useEffect } from "react";
import { Box, Typography, MobileStepper } from "@mui/material";

const EventCarousel = ({ events }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        if (!events?.length) return;
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev === events.length - 1 ? 0 : prev + 1));
        }, 5000);
        return () => clearInterval(interval);
    }, [events]);

    if (!events?.length) {
        return <Typography>No Events Available</Typography>;
    }

    const commonImageStyles = {
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRadius: "8px",
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center"
            sx={{ width: "85vw", height: "45vh", mt: 6, margin: "0 auto", position: "relative", overflow: "visible", borderRadius: "12px", bgcolor: "var(--secondary-bg-color)" }}>
            {/* Main Image */}
            <Box sx={{
                ...commonImageStyles,
                width: "100%",
                height: "100%",
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                backgroundImage: `url(${events[activeIndex]?.event_image || ''})`,
                zIndex: 2,
            }} />

            {/* Event Info */}
            <Box sx={{ position: "absolute", bottom: 10, left: 10, color: "var(--light-text-color)", p: 1, borderRadius: 1, zIndex: 3 }}>
                <Typography variant="h4" sx={{ whiteSpace: "nowrap" }}>
                    {events[activeIndex]?.event_name || 'No Name'}
                </Typography>
                <Typography variant="body2">
                    {new Date(events[activeIndex]?.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    }) || 'No Date'}
                </Typography>
            </Box>

            {/* Previous Image */}
            <Box sx={{
                ...commonImageStyles,
                position: "absolute",
                left: "-23%",
                top: "50%",
                transform: "translateY(-50%)",
                width: "20%",
                height: "80%",
                cursor: "pointer",
                opacity: 0.5,
                backgroundImage: `url(${events[(activeIndex - 1 + events.length) % events.length]?.event_image || ''})`,
            }}
                onClick={() => setActiveIndex((prev) => (prev === 0 ? events.length - 1 : prev - 1))} />

            {/* Next Image */}
            <Box sx={{
                ...commonImageStyles,
                position: "absolute",
                right: "-23%",
                top: "50%",
                transform: "translateY(-50%)",
                width: "20%",
                height: "80%",
                cursor: "pointer",
                opacity: 0.5,
                backgroundImage: `url(${events[(activeIndex + 1) % events.length]?.event_image || ''})`,
            }}
                onClick={() => setActiveIndex((prev) => (prev === events.length - 1 ? 0 : prev + 1))} />

            {/* Stepper */}
            <Box sx={{ position: "absolute", bottom: 10, width: "100%", display: "flex", justifyContent: "center" }}>
                <MobileStepper
                    variant="dots"
                    steps={events.length}
                    position="static"
                    activeStep={activeIndex}
                    sx={{
                        bgcolor: "transparent",
                        transform: "translateY(40px)",
                        '& .MuiMobileStepper-dot': {
                            backgroundColor: 'var(--secondary-bg-color)',
                        },
                        '& .MuiMobileStepper-dotActive': {
                            backgroundColor: 'var(--text-color)',
                        }
                    }}
                    nextButton={null}
                    backButton={null}
                />
            </Box>
        </Box>
    );
};

export default EventCarousel;