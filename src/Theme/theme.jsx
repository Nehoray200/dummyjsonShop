// src/theme/theme.js

const getDesignTokens = (mode) => ({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            // ============ מצב יום (לפי התמונה ששלחת) ============
            primary: { 
                main: '#124268', // הכחול צי הכהה (Primary)
                contrastText: '#ffffff' 
            },
            secondary: {
                main: '#B0391F', // הכתום-חמרה (Secondary)
            },
            info: { 
                main: '#b27044', // הבז'/זהב (Accent)
                contrastText: '#10375C' // טקסט כהה על הבז'
            },
            background: { 
                default: '#fffcf5', // שמנת/לבן שבור (Background)
                paper: '#ffffff'    // כרטיסים בלבן נקי
            },
            text: {
                primary: '#252627', // שחור כמעט מוחלט (Text)
                secondary: '#313335ff' 
            }
          }
        : {
            // ============ מצב לילה (מותאם) ============
            primary: { 
                // במצב לילה אי אפשר כחול כהה, אז לקחתי תכלת-פלדה בהיר
                main: '#85c9f4', 
                contrastText: '#000000' 
            },
            secondary: {
                // במקום חמרה כהה, כתום-פסטל בהיר
                main: '#fab6a7', 
            },
            info: {
                // הבז' נשאר דומה כי הוא בהיר וטוב
                main: '#c0844f', 
                contrastText: '#000000'
            },
            background: { 
                // שחור רך (לא פחם, יותר לכיוון כחול-לילה עמוק מאוד)
                default: '#212130', 
                paper: '#2b2c46'    
            },
            text: {
                primary: '#eeeef0', // לבן רך
                secondary: '#252627' 
            }
          }),
    },
    typography: {
      fontFamily: 'Segoe UI, sans-serif',
    },
});

export default getDesignTokens;