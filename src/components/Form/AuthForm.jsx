import React, { useState } from 'react';
import { Grid, Box, Typography, Paper, Button,TextField  } from '@mui/material'; // הסרתי את TextField שמיותר פה
import PasswordField from './PasswordField';
import DateField from './DateField';

const AuthForm = ({ title, fields, buttonText, onSubmit }) => {
    // ... (הלוגיקה של ה-State נשארת אותו דבר בדיוק) ...
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});

    const handleChange = (event, fieldConfig) => {
        // ... (העתק את ה-handleChange המתוקן ממקודם) ...
        const { name, value } = event.target;
        setValues(prev => ({ ...prev, [name]: value }));

        let newErrorMessage = null;
        if (fieldConfig.regex && !fieldConfig.regex.test(value)) {
            newErrorMessage = fieldConfig.errorMessage;
        }
        if (!newErrorMessage && fieldConfig.validate) {
            const isValid = fieldConfig.validate(value);
            if (!isValid) newErrorMessage = fieldConfig.errorMessage;
        }
        setErrors(prev => ({ ...prev, [name]: newErrorMessage }));
    };

    const handleSubmit = (event) => {
        // ... (העתק את ה-handleSubmit המתוקן ממקודם) ...
        event.preventDefault();
        const hasErrors = Object.values(errors).some(error => error !== null);
        const missingRequired = fields.some(field => field.required && !values[field.name]);

        if (hasErrors || missingRequired) {
            return;
        }
        if (onSubmit) onSubmit(values);
    };

    return (
        <Grid
            size={{ xs: 12, sm: 8, md: 5 }}
            component={Paper}
            elevation={6}
            square
            sx={{
                // שימוש בצבע הרקע מה-Theme (לבן ביום, כחול כהה בלילה)
                backgroundColor: 'background.paper',
                color: 'text.primary'
            }}
        >
            <Box sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                {/* שימוש בצבע הטקסט הראשי מה-Theme */}
                <Typography component="h1" variant="h5" color="primary.main" sx={{ fontWeight: 'bold' }}>
                    {title}
                </Typography>

                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
                    <Grid container spacing={2}>
                        {fields.map((field, index) => {
                            // ... (הלוגיקה של הרינדור נשארת זהה) ...
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
                                        // TextField רגיל - אוטומטית מקבל את ה-Theme
                                        // אבל נוסיף לו props כדי שיהיה מדויק
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

                                            // כאן הדפדפן ייקח את ה-Primary Color כשהשדה בפוקוס
                                            color="primary"

                                            sx={{
                                                // עיצוב הטקסט הקטן למטה (HelperText)
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
                        sx={{ mt: 3, mb: 2, py: 1.5, fontSize: '1.1rem' }}
                        disabled={Object.values(errors).some(e => e !== null)}
                        color="primary"
                    >
                        {buttonText}
                    </Button>
                </Box>
            </Box>
        </Grid>
    );
};

export default AuthForm;