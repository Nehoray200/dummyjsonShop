import React, { useContext } from 'react';
import { AppBar, Box, Toolbar } from '@mui/material';
import { AuthContext } from '../../Context/AuthProvider';
import NavLinks from './NavLinks';
import ThemeToggle from './ThemeToggle';
import UserMenu from './UserMenu';
import RightNav from './RightNav'; // הייבוא החדש

const Navbar = () => {
    const { user } = useContext(AuthContext);

    return (
        <Box sx={{ zIndex: 1100 }}>
            <AppBar
                position="static"
                sx={{
                    bgcolor: 'background.paper',
                    color: 'text.primary'
                }}
                enableColorOnDark
            >
                <Toolbar variant="dense" sx={{ justifyContent: "flex-start", gap: "10px" }}>
                    
                    {/* צד שמאל: ניווט */}
                    <NavLinks />
                    
                    {/* המרווח שדוחף הכל ימינה */}
                    <Box sx={{ flexGrow: 1 }} />
                    
                    {/* צד ימין: אלמנטים שונים */}
                    <ThemeToggle />
                    
                    {/* כפתורי התחברות (יופיעו רק אם אין משתמש) */}
                    <RightNav />

                    {user && <UserMenu />}
                    
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Navbar;