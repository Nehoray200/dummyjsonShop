
const mailCheck = /^[a-zA-Z0-9._%+-]+@(gmail|outlook|walla)\.(com|co\.il)$/
const passwordCheck = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/
const idCheck = (id) => {
    if (!id) return false;

    // קודם כל מוודאים שזה מספר ושזה 9 ספרות בדיוק
    // (אם תעודת הזהות קצרה מ-9 ספרות, המשתמש צריך להוסיף אפסים בהתחלה)
    if (!/^\d{9}$/.test(id)) return false;

    let sum = 0;

    for (let i = 0; i < 9; i++) {
        // המרת התו למספר
        let num = Number(id[i]);

        // הכפלה: מקום זוגי (אינדקס 0, 2...) כפול 1, מקום אי זוגי (אינדקס 1, 3...) כפול 2
        // הערה: i%2 יתן 0 או 1. נוסיף 1 ונקבל כופל של 1 או 2.
        let step = num * ((i % 2) + 1);

        // אם התוצאה גדולה מ-9, מחברים את הספרות שלה (למשל 12 הופך ל-3)
        // טריק מתמטי: לחסר 9 נותן את אותה תוצאה (12-9=3)
        if (step > 9) {
            step -= 9;
        }

        sum += step;
    }

    // המספר תקין אם הסכום הכולל מתחלק ב-10 ללא שארית
    return sum % 10 === 0;
};
const dataCheck = (value) => {
    if (!value) return false;
    const today = new Date();
    const birthDate = new Date(value);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age >= 21;
}
const phoneCheck = (value) => {
    if (!value) return false;
    const cleanNum = value.replace(/-/g, '')
    if (!/^\d+$/.test(cleanNum)) return false;
    if (!cleanNum.startsWith('05')) return false;
    return cleanNum.length === 10 || cleanNum.length === 8;
};


export const registerFields = [
    {
        id: 'firstName',
        label: 'First Name',
        name: 'firstName',
        width: 6,
        required: true
    },
    {
        id: 'lastname',
        label: 'Last Name',
        name: 'lastname',
        width: 6,
        required: true
    },
    {
        id: 'email',
        label: 'Email Address',
        name: 'email',
        required: true,
        valiData: mailCheck,
        errorMessage: 'Email is incorrect missing @ or .'
    },
    {
        id: 'password',
        label: 'Password',
        name: 'password',
        type: 'password',
        required: true,
        valiData: passwordCheck,
        errorMessage: "Minimum 8 characters, At least one uppercase letter(A- Z), At least one special character(e.g., !, @, #, $)"
    },
    {
        id: 'birthDate',
        label: 'Birth Date',
        name: 'birthDate',
        type: 'date',
        required: true,
        width: 6,
        errorMessage: 'You must be over 21 years old',
        valiData: dataCheck
    },
    {
        id: 'idcard',
        label: 'Id Card',
        name: 'idcard',
        width: 6,
        required: true,
        valiData: idCheck,
        errorMessage: 'Please enter a valid 9-digit ID number'
    },{
        id: 'phone',
        label: 'Phone Number',
        name: 'phone',
        width: 12,
        required: true,
        valiData: phoneCheck,
        errorMessage: 'Phone must start with 05 and contain 8 or 10 digits (digits and hyphens only)'
    }
];


export const loginFields = [
    {
        id: 'email',
        label: 'Email Address',
        name: 'email',
        required: true,
        valiData: mailCheck,
        errorMessage: 'Email is incorrect missing @ or .'
    },
    {
        id: 'password',
        label: 'Password',
        name: 'password',
        type: 'password',
        required: true,
        valiData: passwordCheck,
        errorMessage: "Minimum 8 characters, At least one uppercase letter(A- Z), At least one special character(e.g., !, @, #, $)"
    },
];
