import React from 'react';
import { Snackbar, Alert,AlertTitle } from '@mui/material';

const GlobalAlert = ({ message, openSnackbar, setOpenSnackbar }) => {

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    return (
        <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
            <Alert

                onClose={handleCloseSnackbar}
                severity="error"
                variant="filled"
                sx={{ width: '100%' }}
            >
                <AlertTitle>Error</AlertTitle>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default GlobalAlert;