import React,{useState} from 'react'
import {TextField, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const PasswordField = ({ field, value, onChange, error, helperText }) => {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    return (
        <TextField
            required={field.required}
            fullWidth
            id={field.id}
            label={field.label}
            name={field.name}
            value={value}         
            onChange={onChange}  
            error={error}         
            helperText={helperText} 
            type={showPassword ? 'text' : 'password'}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            onClick={handleClickShowPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    );
};

export default PasswordField