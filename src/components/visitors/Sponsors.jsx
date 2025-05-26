import React from 'react';
import { Box, Container, Card, CardMedia, Typography } from "@mui/material";

// Sponsors Component

function Sponsors({ sponsors }) {
    return (
        <Box sx={{ py: 4 }}>
            <Container>
                <Box
                    sx={{
                        display: "flex",
                        overflow: "hidden",
                        position: "relative",
                        width: "100%",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            animation: `scroll ${sponsors.length * 5}s linear infinite`,
                            gap: 2,
                            width: "max-content",
                            "@keyframes scroll": {
                                "0%": { transform: "translateX(0%)" },
                                "100%": { transform: "translateX(-100%)" },
                            },
                        }}
                    >
                        {sponsors.map((sponsor, index) => (
                            <Card
                                key={index}
                                sx={{
                                    minWidth: 180,
                                    height: 80,
                                    boxShadow: 3,
                                    borderRadius: 2,
                                    flexShrink: 0,
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    image={sponsor.image}
                                    alt="Sponsor Logo"
                                    sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                                />
                            </Card>
                        ))}
                    </Box>
                </Box>

                {/* Title */}
                <Typography
                    variant="subtitle1"
                    align="center"
                    sx={{ mt: 2, letterSpacing: 10, textTransform: "uppercase" }}
                >
                    Sponsors
                </Typography>
            </Container>
        </Box>
    );
}

export default Sponsors;
