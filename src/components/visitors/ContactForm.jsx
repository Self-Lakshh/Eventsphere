import React from 'react';
import {
    Box,
    TextField,
    Button,
    Container,
} from '@mui/material';

const ContactForm = () => {
    return (
        <Container
            maxWidth="sm"
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mb:2
            }}
        >
            <Box
                component="form"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3,
                    p: 4,
                    borderRadius: 2,
                    bgcolor: 'var(--secondary-bg-color)',
                    // border: '1px solid var(--text-color)',
                    width: '100%',
                    maxWidth: '800px',
                    boxShadow: 3,
                }}
            >
                <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                    <TextField
                        fullWidth
                        label="First Name"
                        name="firstName"
                    />
                    <TextField
                        fullWidth
                        label="Last Name"
                        name="lastName"
                    />
                </Box>

                <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                    <TextField
                        fullWidth
                        label="Mobile Number"
                        name="mobile"
                    />
                    <TextField
                        fullWidth
                        label="Your Email"
                        name="email"
                        type="email"
                    />
                </Box>

                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Write Your Message Here"
                    name="message"
                />

                <Button
                    type="submit"
                    variant="contained"
                    sx={{
                        bgcolor: "var(--btn-color)",
                        color: "var(--light-text-color)",
                        ":hover": {
                            bgcolor: "var(--btn-hover-color)",
                        },
                    }}>
                    Send Message
                </Button>
            </Box>
        </Container>
    );
};

export default ContactForm;
