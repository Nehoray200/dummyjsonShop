import React, { createContext, useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Cookies from 'js-cookie'; // 1. ייבוא הספרייה
import getDesignTokens from '../Theme/theme';

export const ColorModeContext = createContext({ toggleColorMode: () => { } });

export const ColorModeProvider = ({ children }) => {

    const [mode, setMode] = useState(() => {
        const savedMode = Cookies.get('theme_mode');
        return savedMode || 'light'; 
    });

    const [theme, setTheme] = useState(createTheme(getDesignTokens(mode)));

    useEffect(() => {
   
        const themeConfig = getDesignTokens(mode);
        const newTheme = createTheme(themeConfig);
        setTheme(newTheme);
        Cookies.set('theme_mode', mode, { expires: 1 }); 
        
    }, [mode]);

    const toggleColorMode = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

    return (
        <ColorModeContext.Provider value={{ toggleColorMode }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};