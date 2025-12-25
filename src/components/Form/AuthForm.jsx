import React, { useState } from 'react';
import { Grid, Box, Typography, Paper, Button, TextField } from '@mui/material';
import PasswordField from './PasswordField';
import DateField from './DateField';
import GlobalAlert from '../GlobalAlert';

const AuthForm = ({ title, fields, buttonText, onSubmit }) => {
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const handleChange = (event, fieldConfig) => {
        const { name, value } = event.target;
        setValues(prev => ({ ...prev, [name]: value }));

        let newErrorMessage = null;
        const validationRule = fieldConfig.valiData;

        if (validationRule) {
            let isValid = true;
            if (typeof validationRule === 'function') {
                isValid = validationRule(value);
            } else if (validationRule instanceof RegExp) {
                isValid = validationRule.test(value);
            }

            if (!isValid) {
                newErrorMessage = fieldConfig.errorMessage;
            }
        }
        setErrors(prev => ({ ...prev, [name]: newErrorMessage }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const hasErrors = Object.values(errors).some(error => error !== null);
        const missingRequired = fields.some(field => field.required && !values[field.name]);

        if (hasErrors || missingRequired) {
            // פתיחת ההודעה אם יש שגיאות
            setOpenSnackbar(true);
            return;
        }

        if (onSubmit) {
            onSubmit(values);
        }
    };
    return (
        <Grid
            size={{ xs: 12, sm: 8, md: 5 }}
            component={Paper}
            elevation={6}
            square
            sx={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'background.paper',
                color: 'text.primary',
                overflow: 'hidden'
            }}
        >
            <Box sx={{ mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '450px' }}>

                <Typography component="h1" variant="h5" color="primary.main" sx={{ fontWeight: 'bold', mb: 3 }}>
                    {title}
                </Typography>

                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ width: '100%' }}>
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
                                    ) : field.type === 'date' ? (
                                        <DateField
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
                                            color="primary"
                                            sx={{
                                                '& .MuiFormHelperText-root': {
                                                    color: isError ? 'error.main' : 'text.secondary'
                                                }
                                            }}
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
                        sx={{ mt: 4, mb: 2, py: 1.5, fontSize: '1.1rem' }}
                        color="primary"
                    >
                        {buttonText}
                    </Button>
                </Box>
            </Box>
            <GlobalAlert
                message="Please fill in all mandatory fields and correct any errors"
                openSnackbar={openSnackbar}
                setOpenSnackbar={setOpenSnackbar}
            />        </Grid>
    );
};

export default AuthForm;