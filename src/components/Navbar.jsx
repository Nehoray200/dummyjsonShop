import React, { useState, useContext } from 'react';
import { AppBar, Box, Toolbar, Button, IconButton, Menu, MenuItem, useTheme } from '@mui/material';
import { ColorModeContext } from '../Context/ColorModeContext';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Link } from "react-router-dom";

const Navbar = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const { toggleColorMode } = useContext(ColorModeContext)
    const theme = useTheme();
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ zIndex: 1100 }}>
            <AppBar
                position="static"
                sx={{
                    bgcolor: 'primary', // קביעת צבע הרקע
                    color: 'text'        // חשוב: קביעת צבע הטקסט (אחרת הוא עלול להישאר לבן)
                }}
                enableColorOnDark
            >
                <Toolbar variant="dense" sx={{ justifyContent: "flex-start", gap: "10px" }}>                    <Button component={Link} to="/" variant="text" color="inherit">Home</Button>
                    <Button component={Link} to="/Categories" variant="text" color="inherit">Categories</Button>
                    <Button component={Link} to="/Login" variant="text" color="inherit">Login</Button>
                    <Button component={Link} to="/Register" variant="text" color="inherit">Register</Button>
                    <Box sx={{ flexGrow: 1 }} />
                    <IconButton onClick={toggleColorMode} color="inherit">
                        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                    </IconButton>
                    <div>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle sx={{ fontSize: 30 }} />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            disableScrollLock={true}
                        >
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={handleClose}>My account</MenuItem>
                            <MenuItem onClick={handleClose}>Logout</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>

            </AppBar>
        </Box>
    );
}

export default Navbar