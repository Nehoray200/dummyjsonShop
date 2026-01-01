
const mailCheck = /^[a-zA-Z0-9._%+-]+@(gmail|outlook|walla)\.(com|co\.il)$/
const passwordCheck = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/
const idCheck = (id) => {
    if (!id) return false;
    if (!/^\d{9}$/.test(id)) return false;

    let sum = 0;

    for (let i = 0; i < 9; i++) {
        let num = Number(id[i]);
        let step = num * ((i % 2) + 1);
        if (step > 9) {
            step -= 9;
        }
        sum += step;
    }
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
        id: 'lastName',
        label: 'Last Name',
        name: 'lastName',
        width: 6,
        required: true
    },{
        id: 'email',
        label: 'Email Address',
        name: 'email',
        required: true,
        width: 12,
        valiData: mailCheck,
        errorMessage: 'Email is incorrect missing @ or .'
    },
    {
        id: 'password',
        label: 'Password',
        name: 'password',
        type: 'password',
        width: 12,
        required: true,
        valiData: passwordCheck,
        errorMessage: "Minimum 8 characters, At least one uppercase letter(A- Z), At least one special character(e.g., !, @, #, $)"
    },
    {
        id: 'id',
        label: 'Id Card',
        name: 'id',
        width: 12,
        required: true,
        valiData: idCheck,
        errorMessage: 'Please enter a valid 9-digit ID number'
    },
    {
        id: 'birthday',
        label: 'Birth Date',
        name: 'birthday',
        type: 'date',
        required: true,
        width: 5,
        errorMessage: 'You must be over 21 years old',
        valiData: dataCheck
    },
    , {
        id: 'phone',
        label: 'Phone Number',
        name: 'phone',
        width: 7,
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

export const profileFields = [
    {
        id: 'firstName',
        label: 'First Name',
        name: 'firstName',
        width: 6,
        required: true
    },
    {
        id: 'lastName',
        label: 'Last Name',
        name: 'lastName',
        width: 6,
        required: true
    },
    {
        id: 'email',
        label: 'Email Address',
        name: 'email',
        width: 12,
        required: true,
        valiData: mailCheck, 
        errorMessage: 'Invalid email address'
    },
    {
        id: 'password',
        label: 'Password',
        name: 'password',
        type: 'password',
        width: 12,
        required: true,
        valiData: passwordCheck,
        errorMessage: "Minimum 8 characters, At least one uppercase letter(A- Z), At least one special character(e.g., !, @, #, $)"
    },
    {
        id: 'phone',
        label: 'Phone Number',
        name: 'phone',
        width: 6,
        required: true,
        valiData: phoneCheck,
        errorMessage: 'Invalid phone number'
    },
    {
        id: 'birthday',
        label: 'Date of Birth',
        name: 'birthday',
        type: 'date', 
        width: 6,
        required: true,
        valiData: dataCheck, 
        errorMessage: 'Must be valid age'
    },
];