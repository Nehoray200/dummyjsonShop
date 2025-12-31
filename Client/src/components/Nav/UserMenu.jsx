import React, { useState, useContext } from 'react';
import { IconButton, Menu, MenuItem, Avatar } from '@mui/material';
import { AuthContext } from '../../Context/AuthProvider'; // שים לב לנתיב

const UserMenu = () => {
    const { user, logout } = useContext(AuthContext);
    const [anchorEl, setAnchorEl] = useState(null);

    // אם אין משתמש, לא מציגים כלום
    if (!user) return null;

    const handleMenu = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const getUserInitial = () => {
        if (user?.name) return user.name[0].toUpperCase();
        if (user?.email) return user.email[0].toUpperCase();
        return 'U';
    };

    return (
        <div>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
            >
                <Avatar
                    sx={{
                        bgcolor: 'secondary.main',
                        width: 32,
                        height: 32,
                        fontSize: '1rem'
                    }}
                >
                    {getUserInitial()}
                </Avatar>
            </IconButton>
            
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                disableScrollLock={true}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={() => { handleClose(); logout(); }}>Logout</MenuItem>
            </Menu>
        </div>
    );
};

export default UserMenu;