import React, { useState } from "react";
import { Box, Paper, Typography } from "@mui/material";
import Login from "../components/auth/Login";
import Signup from "../components/auth/SignUp";
import TogglePanel from "../components/auth/TogglePanel";
import "../components/auth/auth.css";

import Navbar from '../components/visitors/Navbar';
import Headline from '../components/visitors/Headline';
import Footer from '../components/visitors/Footer';

import useLayout from "../hooks/useLayout";

const LoginPage = () => {
    const [isLoginMode, setIsLoginMode] = useState(true);
    const { isMobile } = useLayout();

    return (
        <>
            <Navbar />
            <Headline />
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "90vh", flexDirection: "column" }}>
                {isMobile ? (
                    <Paper elevation={5} className="auth-container" sx={{ width: 300, padding: 3, borderRadius: 2 }}>
                        {/* Wrapper Box to ensure stacking */}
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                            {isLoginMode ? <Login /> : <Signup />}

                            {/* Toggle message placed directly under the button */}
                            <Typography variant="body2" sx={{ fontWeight: "bold", textAlign: "center" }}>
                                {isLoginMode ? "Don't have an account?" : "Already have an account?"}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ fontWeight: "bold", cursor: "pointer", color: "var(--text-color)", "&:hover": { color: "var(--secondary-btn-color)" }, textDecoration: "none", textAlign: "center" }}
                                onClick={() => setIsLoginMode(!isLoginMode)}
                            >
                                {isLoginMode ? "Sign Up Now!.." : "Log In Now!.."}
                            </Typography>
                        </Box>
                    </Paper>
                ) : (
                    <Paper
                        elevation={5}
                        className={`auth-container ${isLoginMode ? "login-active" : "signup-active"}`}
                        sx={{ width: 750, height: 450, borderRadius: 2, display: "flex", overflow: "hidden", position: "relative" }}
                    >
                        <Box
                            className={`form-container ${isLoginMode ? "left-active" : "right-active"}`}
                            sx={{ width: "50%", display: "flex", justifyContent: "center", alignItems: "center", position: "absolute", height: "100%", transition: "transform 0.5s ease-in-out" }}
                        >
                            {isLoginMode ? <Login /> : <Signup />}
                        </Box>
                        <TogglePanel isLoginMode={isLoginMode} handleToggle={() => setIsLoginMode(!isLoginMode)} />
                    </Paper>
                )}
            </Box>
            <Footer />
        </>
    );
};

export default LoginPage;
