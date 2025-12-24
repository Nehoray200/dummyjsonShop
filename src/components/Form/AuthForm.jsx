import React, { useState } from 'react';
import { Grid, Box, Typography, Paper, TextField, Button, IconButton, InputAdornment } from '@mui/material';
import PasswordField from './PasswordField'

const AuthForm = ({ title, fields, buttonText, onSubmit }) => {
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});

    const handleChange = (event, fieldConfig) => {
        const { name, value } = event.target;
        setValues({
            ...values,
            [name]: value
        });

        if (fieldConfig.regex) {
            const isValid = fieldConfig.regex.test(value);

            setErrors({
                ...errors,
                [name]: isValid ? null : fieldConfig.errorMessage
            });
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const hasErrors = Object.values(errors).some(error => error !== null);
        if (hasErrors) {
            alert("יש לתקן את השגיאות בטופס");
            return;
        }

        if (onSubmit) {
            onSubmit(values);
        }
    };



    return (
        <Grid size={{ xs: 12, sm: 8, md: 5 }} component={Paper} elevation={6} square>
            <Box sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5">{title}</Typography>

                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
                    <Grid container spacing={2}>

                        {fields.map((field, index) => {
                            const currentValue = values[field.name] || '';
                            const currentError = errors[field.name];
                            const isError = Boolean(currentError);
                            return (
                                <Grid key={index} size={{ xs: 12, sm: field.width || 12 }}>
                                    {field.type === 'password' ? (
                                        <PasswordField
                                            field={field}
                                            value={currentValue}
                                            onChange={(e) => handleChange(e, field)}
                                            error={isError}
                                            helperText={currentError}
                                        />
                                    ) : (
                                        <TextField
                                            required={field.required}
                                            fullWidth
                                            id={field.id}
                                            label={field.label}
                                            name={field.name}
                                            type={field.type || 'text'}
                                            autoComplete={field.autoComplete}
                                            value={currentValue}
                                            onChange={(e) => handleChange(e, field)}
                                            error={isError}
                                            helperText={currentError}
                                        />
                                    )}
                                </Grid>
                            );
                        })}

                    </Grid>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={Object.values(errors).some(e => e !== null)}
                    >
                        {buttonText}
                    </Button>
                </Box>
            </Box>
        </Grid>
    );
};

export default AuthForm;