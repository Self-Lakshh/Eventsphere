import React, { useState } from "react";
import { TextField, Button, Typography, Box, Snackbar, Alert } from "@mui/material";
import axios from "axios";

const Signup = () => {
    const [userData, setUserData] = useState({ username: "", email: "", password: "" });
    const [message, setMessage] = useState(null);

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const handleInputChange = (e) => setUserData({ ...userData, [e.target.name]: e.target.value });

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (!passwordRegex.test(userData.password)) {
            setMessage({ type: "error", text: "Password must be at least 8 characters long, include one uppercase letter, one number, and one special symbol." });
            return;
        }

        try {
            const response = await axios.post("http://40.81.232.21:2025/api/auth/register", userData, {
                headers: { "x-api-key": "visitor-key", "Content-Type": "application/json" },
            });

            if (response.data.success) {
                setMessage({ type: "success", text: "Signup successful! Please log in." });
                setUserData({ username: "", email: "", password: "" });
            } else {
                setMessage({ type: "error", text: response.data.message || "Signup failed. Try again." });
            }
        } catch (error) {
            setMessage({ type: "error", text: error.response?.data?.message || "Signup failed! Please try again." });
        }
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <Typography variant="h4" sx={{ fontWeight: 600 }}>Sign Up</Typography>
            <Box component="form" onSubmit={handleSignUp} sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%", maxWidth: 400 }}>
                <TextField fullWidth label="Username" name="username" onChange={handleInputChange} value={userData.username} required />
                <TextField fullWidth label="Email" name="email" type="email" onChange={handleInputChange} value={userData.email} required />
                <TextField fullWidth label="Password" name="password" type="password" onChange={handleInputChange} value={userData.password} required />
                <Button type="submit" variant="contained" sx={{ mt: 2, fontWeight: 600, backgroundColor: "var(--btn-color)", "&:hover": { backgroundColor: "var(--btn-color)" } }}>Sign Up</Button>
            </Box>

            <Snackbar open={!!message} autoHideDuration={4000} onClose={() => setMessage(null)}>
                <Alert onClose={() => setMessage(null)} severity={message?.type}>{message?.text}</Alert>
            </Snackbar>
        </Box>
    );
};

export default Signup;
