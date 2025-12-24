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
        regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        errorMessage: 'Email is incorrect missing @ or .'
    },
    {
        id: 'password',
        label: 'Password',
        name: 'password',
        type: 'password',
        required: true,
        regex: /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/,
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
        validate: (value) => {
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

    },
    {
        id: 'idcard',
        label: 'Id Card',
        name: 'idcard',
        width: 6,
        required: true,
        regex: /^\d{9}$/,
        errorMessage: 'Please enter a valid 9-digit ID number'

    },


];

export const loginFields = [
    {
        id: 'email',
        label: 'Email Address',
        name: 'email',
        required: true,
        regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        errorMessage: 'Email is incorrect missing @ or .'
    },
    {
        id: 'password',
        label: 'Password',
        name: 'password',
        type: 'password',
        required: true,
        regex: /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/,
        errorMessage: "Minimum 8 characters, At least one uppercase letter(A- Z), At least one special character(e.g., !, @, #, $)"
    },
];
