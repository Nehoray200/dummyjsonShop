import { useState } from 'react';

const useForm = (fields, onSubmit) => {
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    
    // שינוי 1: במקום בוליאני, נשתמש במחרוזת שתחזיק את הודעת השגיאה
    const [formError, setFormError] = useState("");

    const handleChange = (event, fieldConfig) => {
        const { name, value } = event.target;
        setValues(prev => ({ ...prev, [name]: value }));

        // שינוי 2: אם המשתמש מתחיל לתקן, נעלים את ההודעה הכללית
        if (formError) setFormError("");

        let newErrorMessage = null;
        const validationRule = fieldConfig.valiData;

        if (validationRule) {
            let isValid = true;
            if (typeof validationRule === 'function') {
                isValid = validationRule(value);
            } else if (validationRule instanceof RegExp) {
                isValid = validationRule.test(value);
            }

            if (!isValid) {
                newErrorMessage = fieldConfig.errorMessage;
            }
        }
        setErrors(prev => ({ ...prev, [name]: newErrorMessage }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const hasErrors = Object.values(errors).some(error => error !== null);
        const missingRequired = fields.some(field => field.required && !values[field.name]);

        if (hasErrors || missingRequired) {
            // שינוי 3: קביעת הודעת הטקסט במקום true/false
            setFormError("Please fill in all mandatory fields and correct any errors");
            return;
        }

        if (onSubmit) {
            onSubmit(values);
        }
    };

    return {
        values,
        errors,
        formError, // מחזירים את הטקסט החוצה
        handleChange,
        handleSubmit
    };
};

export default useForm;