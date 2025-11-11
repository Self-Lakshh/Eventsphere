import React, { useState } from "react";
import {
    Box, Typography, IconButton, Stack, Button, Dialog, DialogActions,
    DialogContent, DialogContentText, DialogTitle
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EventIcon from "@mui/icons-material/Event";
import apiClient from "../../lib/api";

const statusOptions = ["ongoing", "upcoming", "draft", "completed"];

function EventBar({ events, setEvents }) {
    const [selectedStatus, setSelectedStatus] = useState("ongoing");
    const [open, setOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleDeleteClick = (event_id) => {
        setSelectedEvent(event_id);
        setOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!selectedEvent) return;
        setLoading(true);
        try {
            await apiClient.delete(`/admin/events/${selectedEvent}`);

            setEvents((prevEvents) => prevEvents.filter(event => event.event_id !== selectedEvent));
            setOpen(false);
        } catch (error) {
            console.error("Error deleting event:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box width="100%">
            <Typography variant="h5" sx={{ color: "var(--text-color)", m: 2, fontWeight: "bold" }}>
                Active Events
            </Typography>

            <Box width="100%" sx={{
                backgroundColor: "var(--secondary-bg-color)",
                borderRadius: "10px",
                padding: 1,
                display: "flex",
                margin: "auto",
                mb: 2
            }}>
                <Stack direction="row" spacing={2}>
                    {statusOptions.map((status) => (
                        <Button
                            key={status}
                            variant="text"
                            onClick={() => setSelectedStatus(status)}
                            sx={{
                                color: selectedStatus === status ? "var(--btn-hover-color)" : "var(--text-color)",
                                fontWeight: selectedStatus === status ? "bold" : "normal",
                                "&:hover": { color: "var(--btn-hover-color)" }
                            }}
                        >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                        </Button>
                    ))}
                </Stack>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column" }}>
                {events.filter(event => event.event_status === selectedStatus).map(({ event_id, event_name, event_status }) => (
                    <Box key={event_id} sx={{ padding: 1, display: "flex", justifyContent: "space-between" }}>
                        <Stack direction="row" alignItems="center" spacing={1} flexGrow={1}>
                            <EventIcon />
                            <Box>
                                <Typography variant="subtitle1">{event_name}</Typography>
                                <Typography variant="body2">{event_status}</Typography>
                            </Box>
                        </Stack>
                        <Stack direction="row" spacing={1}>
                            <IconButton size="small">
                                <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton size="small" onClick={() => handleDeleteClick(event_id)}>
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </Stack>
                    </Box>
                ))}
            </Box>

            {/* Confirmation Dialog */}
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>Are you sure you want to delete this event?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="primary">Cancel</Button>
                    <Button onClick={handleConfirmDelete} color="error" disabled={loading}>
                        {loading ? "Deleting..." : "Delete"}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default EventBar;
