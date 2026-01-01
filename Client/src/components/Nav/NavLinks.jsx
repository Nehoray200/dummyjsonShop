import React from 'react';
import { Button } from '@mui/material'; 
import { Link } from "react-router-dom";

const NavLinks = () => {

    return (
        <>
            <Button component={Link} to="/" variant="text" >Home</Button>
            <Button component={Link} to="/Categories" variant="text" >Categories</Button>
        </>
    );
};

export default NavLinks;