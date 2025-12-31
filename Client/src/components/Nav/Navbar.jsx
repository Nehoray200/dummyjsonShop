import React from 'react';
import { AppBar, Box, Toolbar } from '@mui/material';
import NavLinks from './NavLinks';      // תוודא שהנתיבים נכונים
import ThemeToggle from './ThemeToggle';
import UserMenu from './UserMenu';

const Navbar = () => {
    return (
        <Box sx={{ zIndex: 1100 }}>
            <AppBar
                position="static"
                sx={{
                    bgcolor: 'primary.main',
                    color: 'text.primary'
                }}
                enableColorOnDark
            >
                <Toolbar variant="dense" sx={{ justifyContent: "flex-start", gap: "10px" }}>
                    
                    {/* כפתורי הניווט */}
                    <NavLinks />

                    {/* דוחף את האלמנטים הבאים לצד ימין */}
                    <Box sx={{ flexGrow: 1 }} />

                    {/* כפתור מצב לילה */}
                    <ThemeToggle />

                    {/* תפריט משתמש ואווטאר */}
                    <UserMenu />

                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Navbar;