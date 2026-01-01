import React, { useContext } from 'react';
import { Button } from '@mui/material';
import { Link } from "react-router-dom";
import { AuthContext } from '../../Context/AuthProvider';

const RightNav = () => {
    const { user } = useContext(AuthContext);

    // אם המשתמש מחובר - אל תציג את הכפתורים האלו
    if (user) return null;

    return (
        <>
            <Button component={Link} to="/Login" variant="outlined" >Login</Button>
            <Button component={Link} to="/Register" variant="contained" >Register</Button>
        </>
    );
};

export default RightNav;