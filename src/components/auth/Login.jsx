import React, { useState } from "react";
import { TextField, Button, Typography, Box, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import apiClient from "../../lib/api";
import useAuth from "../../hooks/useAuth";

const Login = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [fieldErrors, setFieldErrors] = useState({});
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
        // Clear field error when user starts typing
        if (fieldErrors[name]) {
            setFieldErrors({ ...fieldErrors, [name]: "" });
        }
    };

    /**
     * Validates form inputs
     * @returns {boolean} True if form is valid
     */
    const validateForm = () => {
        const errors = {};

        if (!credentials.email) {
            errors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credentials.email)) {
            errors.email = "Please enter a valid email address";
        }

        if (!credentials.password) {
            errors.password = "Password is required";
        } else if (credentials.password.length < 6) {
            errors.password = "Password must be at least 6 characters";
        }

        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await apiClient.post('/auth/login', credentials);

            if (response.data.success) {
                const { token, user } = response.data;
                Cookies.set("jwt_token", token, { expires: 1 });
                localStorage.setItem("sessionUser", JSON.stringify(user));
                login(user, token);
                setCredentials({ email: "", password: "" });
                navigate(user.view_role === "admin" ? "/dashboard" : "/volunteer");
            } else {
                setError(response.data.message || "Login failed! Please try again.");
            }
        } catch (error) {
            console.error("Login Error:", error.response?.data || error.message);
            setError(error.response?.data?.message || "Login failed! Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <Typography variant="h4" sx={{ fontWeight: 600 }}>Login</Typography>
            <Box component="form" onSubmit={handleLogin} sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%", maxWidth: 400 }}>
                <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    onChange={handleInputChange}
                    value={credentials.email}
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
                    value={credentials.password}
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
                        "&:hover": { backgroundColor: "var(--btn-hover-color)" }
                    }}
                >
                    {loading ? "Signing in..." : "Sign In"}
                </Button>
            </Box>

            <Snackbar open={!!error} autoHideDuration={4000} onClose={() => setError(null)}>
                <Alert onClose={() => setError(null)} severity="error">{error}</Alert>
            </Snackbar>
        </Box>
    );
};

export default Login;
