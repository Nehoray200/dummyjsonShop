import React, { useContext } from 'react';
import { Button } from '@mui/material'; 
import { Link } from "react-router-dom";
import { AuthContext } from '../../Context/AuthProvider';

const NavLinks = () => {
    const { user } = useContext(AuthContext);
    const buttonStyle = { color: 'primary.contrastText' };

    return (
        <>
            <Button component={Link} to="/" variant="text" sx={buttonStyle}>Home</Button>
            <Button component={Link} to="/Categories" variant="text" sx={buttonStyle}>Categories</Button>
            
            {!user && (
                <>
                    <Button component={Link} to="/Login" variant="text" sx={buttonStyle}>Login</Button>
                    <Button component={Link} to="/Register" variant="text" sx={buttonStyle}>Register</Button>
                </>
            )}
        </>
    );
};

export default NavLinks;