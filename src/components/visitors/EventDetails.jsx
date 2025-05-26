import React, { useState } from "react";
import { Card, CardContent, CardMedia, Typography, Box, Grid, Modal, IconButton, Link } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LocationOnIcon from "@mui/icons-material/LocationOn"
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const EventDetails = ({ event }) => {
    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");

    const formattedDate = new Date(event.event_date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const handleOpen = (image) => {
        setSelectedImage(image);
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    if (!event) return <Typography variant="h5">Event not found</Typography>;

    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", padding: 2 }}>
            <Card sx={{ backgroundColor: "var(--secondary-bg-color)", borderRadius: "16px", padding: 2, width: "90%", maxWidth: "1200px", m: 2 }}>
                <Grid container spacing={2} sx={{ mb: 2 }} direction={{ xs: "column-reverse", md: "row" }}>
                    <Grid item xs={12} md={8}>
                        <CardContent>
                            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
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
                                    <Typography variant="body2">{event.event_venue}</Typography>
                                </Box>
                            </Box>
                            <Typography variant="body1" sx={{ mt: 2 }}>
                                {event.event_description}
                            </Typography>

                            {/* Promotional Links */}
                            {event.event_links && event.event_links.length > 0 && (
                                <Box sx={{ mt: 2 }}>
                                    <Typography variant="body1" sx={{ mb: 1 ,fontWeight: "bold" }}>
                                        Useful Links
                                    </Typography>
                                    {event.event_links.map((link, index) => (
                                        <Box key={index} sx={{ mb: 1 }}>
                                            <Typography variant="body1">
                                                <Link href={link.link_url} target="_blank" rel="noopener noreferrer" sx={{
                                                    color: "var(--secondary-btn-color)", textDecoration: "none", wordBreak: "break-word"}}>
                                                    {link.placeholder}
                                                </Link>
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>
                            )}
                        </CardContent>
                    </Grid>
                    <Grid item xs={12} md={4} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Box
                            sx={{
                                width: "100%",
                                maxWidth: "300px",
                                height: "280px",
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
                                image={event.event_thumbnail || "/placeholder.jpg"}
                                alt={event.event_name}
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    borderRadius: "16px",
                                }}
                            />
                            <Typography
                                variant="caption"
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

                {/* Image Gallery */}
                <Box sx={{ padding: 2 }}>
                    <Typography variant="h4" sx={{ textAlign: "center", mb: 2 }}>
                        Gallery
                    </Typography>
                    <Grid container spacing={2}>
                        {event.event_other_images && event.event_other_images.length > 0 ? (
                            event.event_other_images.map((image, index) => (
                                <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={index} onClick={() => handleOpen(image.image_link)} sx={{ cursor: "pointer" }}>
                                    <CardMedia
                                        component="img"
                                        image={image.image_link}
                                        alt={`Gallery image ${index + 1}`}
                                        sx={{ width: "100%", height: "180px", borderRadius: "8px", objectFit: "cover" }}
                                    />
                                </Grid>
                            ))
                        ) : (
                            <Typography variant="body2" sx={{ px: 2 }}>
                                No additional images available.
                            </Typography>
                        )}
                    </Grid>
                </Box>
            </Card>

            {/* Image Modal with Close Button */}
            <Modal open={open} onClose={handleClose} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Box
                    sx={{
                        position: "relative",
                        width: { xs: "90vw", md: "80vw" },
                        height: { xs: "90vh", md: "80vh" },
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        outline: "none",
                    }}
                >
                    {/* Close Button Inside Modal */}
                    <IconButton
                        onClick={handleClose}
                        sx={{
                            position: "absolute",
                            top: 10,
                            right: 10,
                            backgroundColor: "rgba(0, 0, 0, 0.6)",
                            color: "var(--light-text-color)",
                            "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.8)" },
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <CardMedia
                        component="img"
                        image={selectedImage}
                        alt="Selected Gallery Image"
                        sx={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                            borderRadius: "8px",
                            boxShadow: 3,
                            objectFit: "contain",
                        }}
                    />
                </Box>
            </Modal>
        </Box>
    );
};

export default EventDetails;
