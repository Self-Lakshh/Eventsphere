import React from "react";
import { Card, CardContent, CardMedia, Typography, Button, Grid, Box } from "@mui/material";
import { Link } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn"
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const EventCard = ({ event }) => {
    if (!event) return null;

    const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <Card sx={{ display: "flex", backgroundColor: "var(--secondary-bg-color)", borderRadius: "16px", padding: 2, width: "90%", m: 2 }}>
            <Grid container spacing={2} alignItems="center">
                {/* Left Section: Event Details */}
                <Grid item xs={12} md={8} sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <CardContent>
                        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
                            {event.event_name}
                        </Typography>
                        
                        {/* Date & Venue Below Title */}
                        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                <CalendarMonthIcon sx={{ fontSize: 16 }} />
                                <Typography variant="body2">{formattedDate}</Typography>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                <LocationOnIcon sx={{ fontSize: 16 }} />
                                <Typography variant="body2">{event.venue}</Typography>
                            </Box>
                        </Box>

                        <Typography
                            variant="body1"
                            sx={{
                                display: "-webkit-box",
                                WebkitBoxOrient: "vertical",
                                WebkitLineClamp: 3,
                                overflow: "hidden",
                                lineHeight: "1.5rem",
                                maxHeight: "4.5rem",
                                mb: 2,
                            }}
                        >
                            {event.event_description}
                        </Typography>
                        <Button component={Link} to={`/event/${event.event_id}`} size="medium" sx={{ mt: 2, color: "var(--secondary-btn-color)", "&:hover": { color: "var(--secondary-btn-hover-color)", fontWeight: "bold" } }}>
                            View More
                        </Button>
                    </CardContent>
                </Grid>

                {/* Right Section: Event Image */}
                <Grid item xs={12} md={4} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Box
                        sx={{
                            width: "90%",
                            height: "240px",
                            borderRadius: "16px",
                            overflow: "hidden",
                            position: "relative",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <CardMedia
                            component="img"
                            image={event.event_image}
                            alt={event.event_name}
                            sx={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                borderRadius: "16px",
                            }}
                        />
                        <Typography
                            variant="body1"
                            sx={{
                                position: "absolute",
                                bottom: 8,
                                left: 8,
                                color: "var(--light-text-color)",
                                padding: "4px 8px",
                                borderRadius: "4px",
                            }}
                        >
                            {event.event_status}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Card>
    );
};

export default EventCard;
