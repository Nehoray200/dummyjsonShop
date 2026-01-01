import React, { useContext, useEffect } from 'react'
import { Box, Container, Paper, Grid, TextField, Button, Typography } from '@mui/material';
import { AuthContext } from '../Context/AuthProvider'
import { ServerContext } from '../Context/ServerContext'
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { localServer } = useContext(ServerContext);
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (!user)
            navigate('/login')
    }, [user, navigate])


    if (!user) return null;


    const formatLabel = (str) => {
        const result = str.replace(/([A-Z])/g, " $1");
        return result.charAt(0).toUpperCase() + result.slice(1);
    }

    return (
        <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', py: 4 }}>
            <Container maxWidth="md">
                <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>

                    <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
                        Personal Information
                    </Typography>

                    <Grid container spacing={2}>
                        
                        {/* התיקון כאן: */}
                        {Object.entries(user).map(([key, value]) => {

                            return (
                                <Grid item xs={12} sm={6} key={key}>
                                    <TextField
                                        fullWidth
                                        label={formatLabel(key)} // הופך firstName ל-First Name
                                        defaultValue={value} // מציג את הערך הנוכחי
                                        InputProps={{
                                            readOnly: true, // אופציונלי: אם אתה רוצה שזה יהיה לקריאה בלבד כרגע
                                        }}
                                        variant="outlined"
                                    />
                                </Grid>
                            );
                        })}

                        <Grid item xs={12} sx={{ mt: 2, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                            <Button variant="outlined">Discard</Button>
                            <Button variant="contained">Save Changes</Button>
                        </Grid>

                    </Grid>
                </Paper>
            </Container>
        </Box>
    );
};

export default Profile;