import React from 'react';
import { Grid, Typography, Box, Divider } from "@mui/material";

const stats = [
    { number: 12, label: "Notable Guests" },
    { number: 200, label: "Participants" },
    { number: 69, label: "Events Hosted" },
];

const StatsDisplay = () => {
    return (
        <Box sx={{ pt: 6 }}>
            <Grid container spacing={4} justifyContent="center" wrap="nowrap">
                {stats.map((stat, index) => (
                    <Grid item xs={4} key={index}>
                        <Box display="flex" flexDirection="column" alignItems="center">
                            <Typography variant="h2" sx={{ fontWeight: 340, letterSpacing: 3 }}>{stat.number}</Typography>
                            <Typography variant="h6" sx={{ letterSpacing: 1 }}>{stat.label}</Typography>
                        </Box>
                    </Grid>
                ))}
            </Grid>
            <Divider sx={{ bgcolor: "var(--text-color)", mt: 6 }} />
        </Box>
    );
};

export default StatsDisplay;
