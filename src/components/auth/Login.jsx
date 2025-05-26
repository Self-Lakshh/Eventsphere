import React, { useState } from "react";
import { TextField, Button, Typography, Box, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const Login = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleInputChange = (e) => setCredentials({ ...credentials, [e.target.name]: e.target.value });

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://40.81.232.21:2025/api/auth/login", credentials, {
                headers: { "x-api-key": "visitor-key", "Content-Type": "application/json" },
            });

            if (response.data.success) {
                const { token, user } = response.data;
                Cookies.set("jwt_token", token, { expires: 1 });
                localStorage.setItem("sessionUser", JSON.stringify(user));
                login(user, token);
                setCredentials({ email: "", password: "" }); // Reset form fields
                navigate(user.view_role === "admin" ? "/dashboard" : "/volunteer");
            } else {
                setError(response.data.message || "Login failed! Please try again.");
            }
        } catch (error) {
            console.error("Login Error:", error.response?.data || error.message);
            setError(error.response?.data?.message || "Login failed! Please check your credentials.");
        }
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <Typography variant="h4" sx={{ fontWeight: 600 }}>Login</Typography>
            <Box component="form" onSubmit={handleLogin} sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%", maxWidth: 400 }}>
                <TextField fullWidth label="Email" name="email" type="email" onChange={handleInputChange} value={credentials.email} required />
                <TextField fullWidth label="Password" name="password" type="password" onChange={handleInputChange} value={credentials.password} required />
                <Button type="submit" variant="contained" sx={{ mt: 2, fontWeight: 600, backgroundColor: "var(--btn-color)", "&:hover": { backgroundColor: "var(--btn-hover-color)" } }}>
                    Sign In
                </Button>
            </Box>

            <Snackbar open={!!error} autoHideDuration={4000} onClose={() => setError(null)}>
                <Alert onClose={() => setError(null)} severity="error">{error}</Alert>
            </Snackbar>
        </Box>
    );
};

export default Login;
