import React, { useState } from "react";
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    Container,
    Button,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    Divider,
    Avatar,
} from "@mui/material";
import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

const styles = {
    appBar: { 
        backgroundColor: "var(--secondary-color)", 
        height: "64px", 
        width: "100%" 
    },
    container: { 
        height: "100%", 
        width: "100%" 
    },
    toolbar: { 
        height: "100%", 
        width: "100%", 
        display: "flex", 
        justifyContent: "space-between" 
    },
    logoSection: { 
        display: "flex", 
        alignItems: "center", 
        gap: "8px" 
    },
    logoImage: { 
        width: "48px", 
        height: "48px", 
        borderRadius: "50%" 
    },
    logoText: { 
        fontWeight: 700, 
        color: "var(--text-color)", 
        textDecoration: "none" 
    },
    desktopNav: { 
        display: { xs: "none", md: "flex" }, 
        gap: 3 
    },
    navButton: {
        color: "var(--text-color)", 
        fontSize: "14px", 
        fontWeight: 600, 
        textTransform: "uppercase",
        transition: "color 0.3s ease", 
        "&:hover": { borderBottom: "3px solid var(--btn-hover-color)" },
    },
    activeNavButton: { 
        color: "var(--btn-hover-color)", 
        fontWeight: "bold", 
        borderBottom: "3px solid var(--btn-hover-color)" 
    },
    loginButton: {
        backgroundColor: "var(--btn-color)", 
        color: "var(--light-text-color)", 
        textTransform: "uppercase",
        fontWeight: 600, 
        borderRadius: "4px", 
        "&:hover": { backgroundColor: "var(--btn-hover-color)" },
    },
    menuButton: { 
        display: { xs: "block", md: "none" }, 
        color: "var(--text-color)", 
        transition: "0.3s" 
    },
    drawer: { 
        width: 250, 
        backgroundColor: "var(--secondary-color)", 
        height: "100%", 
        paddingTop: "16px" 
    },
    drawerNavButton: {
        textAlign: "center", 
        fontWeight: 600, 
        color: "var(--text-color)", 
        textTransform: "uppercase",
        fontSize: "14px", 
        width: "100%", 
        "&:hover": { borderRight: "4px solid var(--btn-hover-color)", 
        color: "var(--btn-hover-color)" },
    },
    activeDrawerNavButton: { 
        borderRight: "4px solid var(--btn-hover-color)", 
        color: "var(--btn-hover-color)" 
    },
};

const Navbar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const isCurrentPath = (path) => location.pathname === path;

    return (
        <AppBar position="static" sx={styles.appBar}>
            <Container maxWidth="xl" sx={styles.container}>
                <Toolbar disableGutters sx={styles.toolbar}>
                    <Box sx={styles.logoSection}>
                        <Avatar alt="Logo" src="/assets/ndg_logo.jpg" sx={styles.logoImage} />
                        <Typography variant="h6" component="a" href="#" sx={styles.logoText}>
                            EventSphere
                        </Typography>
                    </Box>
                    <Box sx={styles.desktopNav}>
                        <Button onClick={() => navigate("/")} sx={{ ...styles.navButton, ...(isCurrentPath("/") && styles.activeNavButton) }}>
                            HOME
                        </Button>
                        <Button onClick={() => navigate("/allevents")} sx={{ ...styles.navButton, ...(isCurrentPath("/allevents") && styles.activeNavButton) }}>
                            ALL EVENTS
                        </Button>
                        <Button onClick={() => navigate("/contact-us")} sx={{ ...styles.navButton, ...(isCurrentPath("/contact-us") && styles.activeNavButton) }}>
                            CONTACT US
                        </Button>
                    </Box>
                    <Button variant="contained" onClick={() => navigate("/login")} sx={{ ...styles.loginButton, display: { xs: "none", md: "flex" } }}>
                        LOGIN
                    </Button>
                    <IconButton sx={styles.menuButton} onClick={() => setDrawerOpen(!drawerOpen)}>
                        {drawerOpen ? <CloseIcon /> : <MenuIcon />}
                    </IconButton>
                </Toolbar>
            </Container>

            <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <Box sx={styles.drawer} role="presentation">
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                        <List sx={{ width: "100%" }}>
                            <ListItem disablePadding sx={{ display: "flex", justifyContent: "center" }}>
                                <ListItemButton
                                    onClick={() => { setDrawerOpen(false); navigate("/"); }}
                                    sx={{ ...styles.drawerNavButton, ...(isCurrentPath("/") && styles.activeDrawerNavButton), justifyContent: "center" }}
                                >
                                    HOME
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding sx={{ display: "flex", justifyContent: "center" }}>
                                <ListItemButton
                                    onClick={() => { setDrawerOpen(false); navigate("/allevents"); }}
                                    sx={{ ...styles.drawerNavButton, ...(isCurrentPath("/allevents") && styles.activeDrawerNavButton), justifyContent: "center" }}
                                >
                                    ALL EVENTS
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding sx={{ display: "flex", justifyContent: "center" }}>
                                <ListItemButton
                                    onClick={() => { setDrawerOpen(false); navigate("/contact-us"); }}
                                    sx={{ ...styles.drawerNavButton, ...(isCurrentPath("/contact-us") && styles.activeDrawerNavButton), justifyContent: "center" }}
                                >
                                    CONTACT US
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </Box>
                    <Divider sx={{ width: "100%", mb: 2, borderBottomWidth: "2px" }} />
                    <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
                        <Button
                            variant="contained"
                            onClick={() => { setDrawerOpen(false); navigate("/login"); }}
                            sx={{ ...styles.loginButton, width: "70%" }}
                        >
                            LOGIN
                        </Button>
                    </Box>
                </Box>
            </Drawer>

        </AppBar>
    );
};

export default Navbar;