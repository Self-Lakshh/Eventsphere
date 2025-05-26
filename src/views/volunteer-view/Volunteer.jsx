import React from 'react';
import { Container, Typography } from '@mui/material';

function Volunteer() {
    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                Volunteer Page
            </Typography>
            <Typography variant="body1">
                Welcome to the volunteer dashboard. Here you can manage your volunteer activities.
            </Typography>
        </Container>
    );
}

export default Volunteer; 