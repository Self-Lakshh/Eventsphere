import React from "react";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import logo from "/assets/ndg_logo.jpg";

const AdminNavbar = ({ onToggleSidebar }) => {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 2,
                backgroundColor: "var(--secondary-color)",
                borderBottom: "1px solid var(--border-color)",
            }}
        >
            {/* Left - Logo & Title */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar src={logo} alt="Org Logo" sx={{ width: 48, height: 48 }} />
                <Typography variant="h6" color="var(--primary-color)">
                    EventSphere
                </Typography>
            </Box>

            {/* Right - Sidebar Toggle */}
            <IconButton onClick={onToggleSidebar}>
                <MenuIcon sx={{ color: "var(--primary-color)" }} />
            </IconButton>
        </Box>
    );
};

export default AdminNavbar;
