import React, { useState, useEffect } from 'react';
import { Snackbar, Alert, AlertTitle } from '@mui/material';

const GlobalAlert = ({ message, severity = "error" }) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        // אם יש הודעה - נפתח את ההתראה
        if (message) {
            setOpen(true);
        }
    }, [message]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <Snackbar
            open={open}
            autoHideDuration={4000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
            <Alert
                onClose={handleClose}
                severity={severity}
                variant="filled"
                sx={{ width: '100%' }}
            >
                <AlertTitle>{severity === 'error' ? 'Error' : 'Info'}</AlertTitle>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default GlobalAlert;