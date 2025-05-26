import React, { useState, useEffect } from "react";
import { Box, Typography, IconButton, Stack, Dialog, DialogTitle, DialogContent, DialogActions, Button, Link } from "@mui/material";
import CampaignIcon from "@mui/icons-material/Campaign";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

function AnnouncementBar() {
    const [announcements, setAnnouncements] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const response = await axios.get("http://40.81.232.21:2025/api/admin/announcements", {
                    headers: { "x-api-key": "admin-secret-key" }
                });
                setAnnouncements(response.data || []);
            } catch (error) {
                console.error("Error fetching announcements:", error.response?.data || error.message);
                setAnnouncements([]);
            }
        };
        fetchAnnouncements();
    }, []);

    const handleDeleteClick = (announcement_id) => {
        setSelectedAnnouncement(announcement_id);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedAnnouncement(null);
    };

    const handleConfirmDelete = async () => {
        if (!selectedAnnouncement) return;
        try {
            const response = await axios.delete(`http://40.81.232.21:2025/api/admin/announcements/${selectedAnnouncement}`, {
                headers: { "x-api-key": "admin-secret-key" }
            });

            setAnnouncements((prev) => prev.filter(a => a.announcement_id !== selectedAnnouncement));
            handleClose();
        } catch (error) {
            console.error("Error deleting announcement:", error.response?.data || error.message);
        }
    };

    return (
        <Box width="100%">
            <Typography variant="h6" fontWeight={600} sx={{ m: 2 }}>
                Announcements
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
                {announcements?.length > 0 ? (
                    announcements.map(({ announcement_id, message, link_url }) => (
                        <Box
                            key={announcement_id}
                            sx={{
                                width: "100%",
                                padding: 1,
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <Stack direction="row" alignItems="center" spacing={1} flexGrow={1}>
                                <Box sx={{ padding: 1, borderRadius: 1 }}>
                                    <CampaignIcon sx={{ color: "var(--secondary-color)" }} />
                                </Box>
                                <Box flexGrow={1} minWidth={0}>
                                    <Typography variant="subtitle1" fontWeight={600} noWrap>
                                        {message}
                                    </Typography>
                                    <Link href={link_url} target="_blank" rel="noopener" underline="hover">
                                        {link_url}
                                    </Link>
                                </Box>
                            </Stack>
                            <IconButton size="small" sx={{ "&:hover": { color: "var(--btn-hover-color)" } }} onClick={() => handleDeleteClick(announcement_id)}>
                                <DeleteIcon sx={{ color: "var(--secondary-color)" }} fontSize="small" />
                            </IconButton>
                        </Box>
                    ))
                ) : (
                    <Typography sx={{ m: 2, color: "gray" }}>No announcements available.</Typography>
                )}
            </Box>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>Are you sure you want to delete this announcement?</DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">Cancel</Button>
                    <Button onClick={handleConfirmDelete} variant="contained" sx={{ backgroundColor: "var(--btn-color)" }}>Delete</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default AnnouncementBar;
