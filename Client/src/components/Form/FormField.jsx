import React from 'react';
import { Grid, TextField } from '@mui/material';
import PasswordField from './PasswordField';
import DateField from './DateField';

const FormField = ({ field, value, error, onChange }) => {
    const isError = Boolean(error);

    if (field.type === 'password') {
        return (
            <Grid size={{ xs: 12, sm: field.width || 12 }}>
                <PasswordField
                    field={field}
                    value={value}
                    onChange={onChange}
                    error={isError}
                    helperText={error}
                />
            </Grid>
        );
    }

    if (field.type === 'date') {
        return (
            <Grid size={{ xs: 12, sm: field.width || 12 }}>
                <DateField
                    field={field}
                    value={value}
                    onChange={onChange}
                    error={isError}
                    helperText={error}
                />
            </Grid>
        );
    }

    return (
        <Grid size={{ xs: 12, sm: field.width || 12 }}>
            <TextField
                required={field.required}
                fullWidth
                id={field.id}
                label={field.label}
                name={field.name}
                type={field.type || 'text'}
                autoComplete={field.autoComplete}
                value={value}
                onChange={onChange}
                error={isError}
                helperText={error}
                color="primary"
                sx={{
                    '& .MuiFormHelperText-root': {
                        color: isError ? 'error.main' : 'text.secondary'
                    }
                }}
            />
        </Grid>
    );
};

export default FormField;