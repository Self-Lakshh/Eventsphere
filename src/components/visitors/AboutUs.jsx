import React from 'react';
import { Box, Container, Typography, Grid, Card, CardMedia } from "@mui/material";

const AboutUs = ({ content }) => {
    return (
        <Box sx={{ py: 6 }}>
            <Container>
                <Box sx={{ textAlign: "center", mb: 3 }}>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: "bold",
                            display: "inline-block",
                            position: "relative",
                            pb: 1,
                            borderBottom: "3px solid var(--light-text-color)"
                        }}
                    >
                        About Us
                    </Typography>
                </Box>

                <Grid container spacing={4} alignItems="center">
                    <Grid item xs={12} sm={8} sx={{ pl: { xs: 4, sm: 10 }, textAlign: "left" }}>
                        <Typography variant="body1">
                            {content.description}
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sm={4} sx={{ pl: { xs: 0, sm: 3 } }}>
                        <Card sx={{ width: 200, height: 240, borderRadius: 2, mx: "auto", overflow: "hidden" }}>
                            <CardMedia
                                component="img"
                                image={content.logo}
                                alt="NDG Logo"
                                sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default AboutUs;