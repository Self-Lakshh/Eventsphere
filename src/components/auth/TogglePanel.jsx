import React from "react";
import { Box, Typography, Button } from "@mui/material";
import useLayout from "../../hooks/useLayout";

const TogglePanel = ({ isLoginMode, handleToggle }) => {
    const { isMobile } = useLayout();

    return (
        <Box className={`toggle-container ${isLoginMode ? "left-message" : "right-message"}`}>
            <Box sx={{ textAlign: "center", color: "white", width: isMobile ? "100%" : "auto", display: "flex", flexDirection: "column", gap: 2 }}>
                {isMobile ? (
                    <Typography variant="h5">
                        {isLoginMode ? "Sign up and join our community." : "Already have an account? Log in now."}
                    </Typography>
                ) : (
                    <>
                        <Typography variant="h4">{isLoginMode ? "New Here?" : "Welcome Back!"}</Typography>
                        <Typography>
                            {isLoginMode ? "Sign up and join our community." : "Already have an account? Log in now."}
                        </Typography>
                        <Button
                            variant="contained"
                            onClick={handleToggle}
                            sx={{ mt: 2, backgroundColor: "var(--light-text-color)", color: "var(--btn-color)", fontWeight: 600 }}
                        >
                            {isLoginMode ? "Sign Up" : "Sign In"}
                        </Button>
                    </>
                )}
            </Box>
        </Box>
    );
};

export default TogglePanel;
