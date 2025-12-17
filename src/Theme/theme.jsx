// src/theme/theme.js

const getDesignTokens = (mode) => ({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            // ============ מצב יום ============
            primary: { 
                main: '#124268', 
                contrastText: '#ffffff' 
            },
            secondary: {
                main: '#B0391F', 
                contrastText: '#fde8e3'
            },
            info: { 
                main: '#b27044', 
                contrastText: '#ffffff' // טקסט לבן קריא יותר על החום הזה
            },
            background: { 
                default: '#fffcf5', 
                paper: '#ffffff' 
            },
            text: {
                primary: '#252627', 
                // תיקון: אפור בינוני ליצירת היררכיה ברורה
                secondary: '#5e636e'  
            }
          }
        : {
            // ============ מצב לילה ============
            primary: { 
                main: '#85c9f4', 
                contrastText: '#000000' 
            },
            secondary: {
                main: '#eb6548', 
                contrastText: '#fef6ee'
            },
            info: {
                // הבהרתי טיפה את הזהב שיהיה בולט יותר על הרקע הכהה
                main: '#d4a276', 
                contrastText: '#000000'
            },
            background: { 
                default: '#212130', 
                paper: '#2b2c46' 
            },
            text: {
                primary: '#eeeef0', 
                // תיקון קריטי: אפור בהיר! אחרת לא רואים כלום
                secondary: '#aab0b8' 
            }
          }),
    },
    typography: {
      fontFamily: 'Segoe UI, sans-serif',
    },
});

export default getDesignTokens;