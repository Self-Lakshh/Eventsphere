import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Import useNavigate
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import logo from '/assets/ndg_logo.jpg';

const SideBar = () => {
    const navigate = useNavigate(); // ✅ Use navigate instead of window.location
    const [selectedItem, setSelectedItem] = useState('Overview');

    const handleListItemClick = (item, path) => {
        setSelectedItem(item);
        navigate(path); // ✅ Navigate without reload
    };

    const userName = "Lakshya Chopra";
    const userInitials = userName.split(" ").map((name) => name[0]).join("");
    const avatarUrl = `https://ui-avatars.com/api/?name=${userInitials}&background=&color=fff`;

    const menuItems = [
        { label: 'Overview', path: '/dashboard' }, // ✅ Ensure correct paths
        { label: 'Manage Events', path: '/dashboard/manage-events' },
        { label: 'Loggings', path: '/dashboard/loggings' },
        { label: 'Manage Announcements', path: '/dashboard/manage-announcements'}
    ];

    return (
        <Drawer
            variant="permanent"
            anchor="left"
            sx={{
                '& .MuiDrawer-paper': {
                    backgroundColor: 'var(--secondary-color)',
                    color: 'var(--primary-color)',
                    width: 240,
                    display: 'flex',
                    position: 'relative',
                    minHeight: '100vh',
                    maxHeight: '100vh',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    paddingY: 2,
                },
            }}
        >
            <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', paddingX: 2 }}>
                    <img src={logo} alt="Logo" style={{ width: 48, height: 48, borderRadius: '15px' }} />
                    <Typography variant="h6" sx={{ ml: 2, color: 'var(--primary-color)' }}>
                        EventSphere
                    </Typography>
                </Box>
                <List sx={{ marginTop: 3 }}>
                    {menuItems.map(({ label, path }) => (
                        <ListItem
                            button
                            key={label}
                            onClick={() => handleListItemClick(label, path)} // ✅ Navigate without reload
                            sx={{
                                paddingLeft: 3,
                                '&::before': {
                                    content: '""',
                                    left: 0,
                                    top: 0,
                                    height: '100%',
                                    width: selectedItem === label ? '4px' : '0',
                                    backgroundColor: 'black',
                                    transition: 'width 0.3s ease-in-out',
                                    borderRadius: '2px',
                                },
                            }}
                        >
                            <ListItemText
                                primary={label}
                                primaryTypographyProps={{
                                    fontWeight: selectedItem === label ? 'bold' : 'normal',
                                }}
                            />
                        </ListItem>
                    ))}
                </List>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', padding: 2, gap: 2 }}>
                <Avatar sx={{ width: 64, height: 64 }} alt="User" src={avatarUrl} />
                <Box>
                    <Typography variant="subtitle1">{userName}</Typography>
                    <Typography variant="caption" color="var(--primary-color)">Admin</Typography>
                </Box>
            </Box>
        </Drawer>
    );
};

export default SideBar;
