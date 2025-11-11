import React, { useState } from "react";
import { TextField, Button, Typography, Box, Snackbar, Alert } from "@mui/material";
import apiClient from "../../lib/api";

const Signup = () => {
    const [userData, setUserData] = useState({ username: "", email: "", password: "" });
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [fieldErrors, setFieldErrors] = useState({});

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
        // Clear field error when user starts typing
        if (fieldErrors[name]) {
            setFieldErrors({ ...fieldErrors, [name]: "" });
        }
    };

    /**
     * Validates all form fields
     * @returns {boolean} True if all fields are valid
     */
    const validateForm = () => {
        const errors = {};

        if (!userData.username) {
            errors.username = "Username is required";
        } else if (userData.username.length < 3) {
            errors.username = "Username must be at least 3 characters";
        }

        if (!userData.email) {
            errors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
            errors.email = "Please enter a valid email address";
        }

        if (!userData.password) {
            errors.password = "Password is required";
        } else if (!passwordRegex.test(userData.password)) {
            errors.password = "Password must be at least 8 characters with 1 uppercase, 1 number, and 1 special character (@$!%*?&)";
        }

        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            const response = await apiClient.post('/auth/register', userData);

            if (response.data.success) {
                setMessage({ type: "success", text: "Signup successful! Please log in." });
                setUserData({ username: "", email: "", password: "" });
            } else {
                setMessage({ type: "error", text: response.data.message || "Signup failed. Try again." });
            }
        } catch (error) {
            setMessage({ type: "error", text: error.response?.data?.message || "Signup failed! Please try again." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <Typography variant="h4" sx={{ fontWeight: 600 }}>Sign Up</Typography>
            <Box component="form" onSubmit={handleSignUp} sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%", maxWidth: 400 }}>
                <TextField
                    fullWidth
                    label="Username"
                    name="username"
                    onChange={handleInputChange}
                    value={userData.username}
                    error={!!fieldErrors.username}
                    helperText={fieldErrors.username}
                    required
                />
                <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    onChange={handleInputChange}
                    value={userData.email}
                    error={!!fieldErrors.email}
                    helperText={fieldErrors.email}
                    required
                />
                <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type="password"
                    onChange={handleInputChange}
                    value={userData.password}
                    error={!!fieldErrors.password}
                    helperText={fieldErrors.password}
                    required
                />
                <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    sx={{
                        mt: 2,
                        fontWeight: 600,
                        backgroundColor: "var(--btn-color)",
                        "&:hover": { backgroundColor: "var(--btn-color)" }
                    }}
                >
                    {loading ? "Signing up..." : "Sign Up"}
                </Button>
            </Box>

            <Snackbar open={!!message} autoHideDuration={4000} onClose={() => setMessage(null)}>
                <Alert onClose={() => setMessage(null)} severity={message?.type}>{message?.text}</Alert>
            </Snackbar>
        </Box>
    );
};

export default Signup;
