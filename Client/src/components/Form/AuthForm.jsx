import React from 'react';
import { Grid, Box, Typography, Paper, Button } from '@mui/material';
import GlobalAlert from '../GlobalAlert';
import useForm from './useForm'; 
import FormField from './FormField'; 

const AuthForm = ({ title, fields, buttonText, onSubmit }) => {
    const { values, errors, formError, handleChange, handleSubmit } = useForm(fields, onSubmit);

    return (
        <Grid
            size={{ xs: 12, sm: 8, md: 5 }}
            component={Paper}
            elevation={6}
            square
            sx={{
                pt: 10,  
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'background.paper',
                color: 'text.primary',
                      overflowY: 'auto', // מאפשר גלילה אנכית רק בחלק הזה
            }}
        >
            <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                maxWidth: '450px' ,
            }}>
                <Typography component="h1" variant="h5" color="primary.main" sx={{ fontWeight: 'bold', mb: 3 }}>
                    {title}
                </Typography>

                <Box component="form" noValidate onSubmit={handleSubmit} >
                    <Grid container spacing={1.5}>
                        {fields.map((field, index) => (
                            <FormField
                                key={index}
                                field={field}
                                value={values[field.name] || ''}
                                error={errors[field.name]}
                                onChange={(e) => handleChange(e, field)}
                            />
                        ))}
                    </Grid>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 4, mb: 2, py: 1.5, fontSize: '1.1rem' }}
                        color="primary"
                    >
                        {buttonText}
                    </Button>
                </Box>
            </Box>

            <GlobalAlert message={formError} />
            
        </Grid>
    );
};

export default AuthForm;