import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Container, Typography, List, ListItem } from "@mui/material";

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "2-digit",
        year: "numeric",
    }).format(date);
};

const EventList = ({ events = [] }) => {
    const navigate = useNavigate();

    // Sort events
    const sortedEvents = [...events].sort((a, b) => {
        if (a.event_status === "ongoing" && b.event_status !== "ongoing") return -1;
        if (a.event_status !== "ongoing" && b.event_status === "ongoing") return 1;
        return new Date(a.date) - new Date(b.date);
    });

    return (
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", py: 4, width: "100%" }}>
            <Container maxWidth={false} disableGutters sx={{ width: "95%", mx: "auto" }}>
                <Typography variant="h4" textAlign="flex-start" gutterBottom sx={{ py: 1 }}>
                    Events
                </Typography>
                <List sx={{ p: 0, width: "100%", display: "flex", flexDirection: "column", gap: 2, mx: "auto" }}>
                    {sortedEvents.map((event, index) => (
                        <ListItem
                            key={event.event_id || index}
                            divider
                            sx={{
                                px: 4,
                                py: 2,
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                width: "100%",
                                cursor: "pointer",
                                border: "1px solid var(--text-color)",
                                borderRadius: "8px",
                                mx: "auto",
                                ":hover": { opacity: 0.7 },
                            }}
                            onClick={() => navigate(`/event/${event.event_id}`)}
                        >
                            <Box sx={{ flex: 1, textAlign: "left" }}>
                                <Typography variant="h5" sx={{ color: "var(--text-color)" }}>
                                    {event.event_name}
                                </Typography>
                                <Typography variant="body2" sx={{ color: "var(--text-color)" }}>
                                    📅 {formatDate(event.date)}
                                </Typography>
                            </Box>
                            <Box sx={{ display: "flex", justifyContent: "center", minWidth: "120px" }}>
                                <Typography
                                    variant="body1"
                                    color={event.event_status === "ongoing" ? "success.main" : "gray"}
                                    sx={{ textAlign: "center" }}
                                >
                                    {event.event_status}
                                </Typography>
                            </Box>
                        </ListItem>
                    ))}
                </List>
            </Container>
        </Box>
    );
};

export default EventList;
