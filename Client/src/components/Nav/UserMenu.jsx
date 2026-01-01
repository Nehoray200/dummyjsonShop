import React, { useState, useContext } from 'react';
import { IconButton, Menu, MenuItem, Avatar } from '@mui/material';
import { AuthContext } from '../../Context/AuthProvider';
import { useNavigate } from 'react-router-dom'; // 1. מחליפים את Link ב-useNavigate

const UserMenu = () => {
    const { user, logout } = useContext(AuthContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();

    const handleMenu = (event) => {
        if (!user) {
            navigate('/login'); 
        } else {
            setAnchorEl(event.currentTarget);
        }
    };

    const handleClose = () => setAnchorEl(null);

    const getUserInitial = () => {
        if (user?.firstName) return user.firstName[0].toUpperCase();
        return 'G'; 
    };

    return (
        <div>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu} 
                color="primary.main"
            >
                <Avatar
                    sx={{
                        // שינוי צבע קטן כדי לרמוז אם מחוברים או לא (אופציונלי)
                        bgcolor: user ? 'secondary.main' : 'grey.500', 
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
                <MenuItem onClick={()=> {handleClose(); navigate('/Profile')}}>Profile</MenuItem>
                <MenuItem onClick={() => { handleClose(); logout(); }}>Logout</MenuItem>
            </Menu>
        </div>
    );
};

export default UserMenu;