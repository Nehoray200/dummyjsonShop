import React from 'react'
import {Grid,  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Link} from '@mui/material'
const FormsRegistration  = () => {
    return (
        <Grid
            size={{ xs: 12, sm: 8, md: 5 }}
            component={Paper}
            elevation={6}
            square
        >
            <Box
                sx={{
                    my: 8,
                    mx: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" noValidate sx={{ mt: 1 }}>
                    <TextField margin="normal" required fullWidth label="Email Address" />
                    <TextField margin="normal" required fullWidth label="Password" type="password" />
                    <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Sign In</Button>
                </Box>
            </Box>
        </Grid>
    )
}

export default FormsRegistration 