import React from 'react';
import { Box, Typography, IconButton } from "@mui/material";
import { GitHub, YouTube, Instagram, Facebook, LinkedIn } from "@mui/icons-material";

const Footer = () => {
    return (
        <Box
            sx={{
                backgroundColor: "var(--secondary-bg-color)",
                color: "var(--text-color)",
                display: "flex",
                minWidth: "100%",
                justifyContent: "space-between",
                alignItems: "center",
                px: { xs: 2, sm: 4 },
                py: 1,
                flexWrap: 'wrap',
                gap: 1,
            }}
            className="sticky-bottom"
        >
            <Box>
                <IconButton component="a" href="https://github.com" target="_blank" sx={{ color: "var(--text-color)" }}>
                    <GitHub />
                </IconButton>
                <IconButton component="a" href="https://youtube.com" target="_blank" sx={{ color: "var(--text-color)" }}>
                    <YouTube />
                </IconButton>
                <IconButton component="a" href="https://instagram.com" target="_blank" sx={{ color: "var(--text-color)" }}>
                    <Instagram />
                </IconButton>
                <IconButton component="a" href="https://facebook.com" target="_blank" sx={{ color: "var(--text-color)" }}>
                    <Facebook />
                </IconButton>
                <IconButton component="a" href="https://linkedin.com" target="_blank" sx={{ color: "var(--text-color)" }}>
                    <LinkedIn />
                </IconButton>
            </Box>
            <Typography variant="body2" sx={{ whiteSpace: 'nowrap' }}>
                Get Help
            </Typography>
        </Box>
    );
};

export default Footer;
