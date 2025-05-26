import { Box, Typography, Divider } from "@mui/material";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Headline = () => {
    const [notifications, setNotifications] = useState([]);
    const [startScroll, setStartScroll] = useState(false);

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const res = await axios.get('http://40.81.232.21:2025/api/fetch/announcements/latest', {
                    headers: { 'x-api-key': 'visitor-key' }
                });
                setNotifications(res.data || []);
            } catch (error) {
                console.error("❌ Error Fetching Announcements:", error);
            }
        };

        fetchAnnouncements();
    }, []);

    useEffect(() => {
        if (notifications.length > 0) {
            const timer = setTimeout(() => {
                setStartScroll(true);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [notifications]);

    return (
        <>
            <Box sx={{ backgroundColor: "var(--secondary-bg-color)", py: 1 }}>
                <Box sx={{ textAlign: "center", position: "relative", height: "30px", overflow: "hidden" }}>
                    <Box
                        sx={{
                            display: "flex",
                            width: "max-content",
                            animation: startScroll ? "scrollText 25s linear infinite" : "none",
                            gap: "50px",
                            "@keyframes scrollText": {
                                "0%": { transform: "translateX(0%)" },
                                "100%": { transform: "translateX(-100%)" },
                            },
                        }}
                    >
                        {notifications.map((notification, index) => (
                            <Typography key={index} variant="body1" sx={{ whiteSpace: "nowrap", color: "var(--text-color)" }}>
                                <a href={notification.link_url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "inherit" }}>
                                    {notification.message}
                                </a>
                            </Typography>
                        ))}
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default Headline;
