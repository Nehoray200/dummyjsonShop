import React from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useTheme } from '@mui/material/styles';

const DateField = ({ field, value, onChange, error, helperText }) => {
    const theme = useTheme();

    const handleCalendarClick = () => {
        const inputElement = document.getElementById(field.id);
        if (inputElement && typeof inputElement.showPicker === 'function') {
            inputElement.showPicker();
        }
    };

    return (
        <TextField
            required={field.required}
            fullWidth
            id={field.id}
            label={field.label}
            name={field.name}
            type="date"
            value={value}
            onChange={onChange}
            error={error}
            helperText={helperText}            
            InputLabelProps={{ shrink: true }}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={handleCalendarClick} edge="end">
                            <CalendarTodayIcon color="background" />
                        </IconButton>
                    </InputAdornment>
                )
            }}

            sx={{
                colorScheme: theme.palette.mode,
                '& .MuiInputBase-input::-webkit-calendar-picker-indicator': {
                    display: 'none',
                    WebkitAppearance: 'none'
                }
            }}
        />
    );
};

export default DateField;