import React, { useState, useContext, useEffect, useMemo } from 'react';
import { Box, Container, Paper, Grid, Typography, Button } from '@mui/material';
import { AuthContext } from '../Context/AuthProvider';
import { ServerContext } from '../Context/ServerContext';
import { useNavigate } from 'react-router-dom';
import useForm from '../components/Form/useForm';
import FormField from '../components/Form/FormField';
import { profileFields } from '../components/Form/formFields';
import GlobalAlert from '../components/GlobalAlert';

const Profile = () => {
    const { localServer } = useContext(ServerContext);
    const { user, login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [alert, setAlert] = useState({ message: "", severity: "info" });

    const initialValues = useMemo(() => {
        if (!user) return {};
        return {
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            email: user.email || '',
            password: user.password || '',
            phone: user.phone || '',
            birthday: user.birthday ? user.birthday.split('T')[0] : '',
        };
    }, [user]);

    const handleSave = async (formData) => {
        try {
            // ניקוי התראות קודמות
            setAlert({ message: "", severity: "info" });

            await localServer.patch(`/users/user/${user.id}`, formData);
            const updatedUser = { ...user, ...formData };

            login(updatedUser);

            // 2. עדכון ה-state להודעת הצלחה
            setAlert({ message: "Profile updated successfully!", severity: "success" });

        } catch (error) {
            console.error(error);
            // 3. עדכון ה-state להודעת שגיאה
            setAlert({ message: error.response?.data || "Update failed", severity: "error" });
        }
    };

    const { values, errors, formError, handleChange, handleSubmit } = useForm(profileFields, handleSave, initialValues);

    useEffect(() => {
        if (!user) navigate('/login');
    }, [user, navigate]);

    if (!user) return null;

    return (
        <Box sx={{ backgroundColor: 'background.paper', minHeight: '100vh', py: 4 }}>
            <Container maxWidth="md">
                <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>

                    <Typography variant="h4" sx={{ mb: 1, fontWeight: 'bold', color: 'primary.main' }}>
                        My Profile
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                        Manage your account settings
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit} noValidate>
                        <Grid container spacing={3}>

                            {profileFields.map((field) => (
                                <FormField
                                    key={field.id}
                                    field={field}
                                    value={values[field.name] || ''}
                                    error={errors[field.name]}
                                    onChange={(e) => handleChange(e, field)}
                                />
                            ))}

                            <Grid size={{ xs: 12 }} sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                                <Button
                                    variant="outlined"
                                    color="inherit"
                                    onClick={() => window.location.reload()}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    sx={{ px: 4 }}
                                >
                                    Save Changes
                                </Button>
                            </Grid>

                        </Grid>
                    </Box>
                    <GlobalAlert
                        message={formError || alert.message}
                        severity={formError ? "error" : alert.severity}
                    />
                </Paper>
            </Container>
        </Box>
    );
};

export default Profile;