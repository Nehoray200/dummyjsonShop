import { useState, useEffect } from 'react';

// שינוי 1: הוספת פרמטר initialValues עם ברירת מחדל לאובייקט ריק
const useForm = (fields, onSubmit, initialValues) => {
    const [values, setValues] = useState(initialValues || {});
    const [errors, setErrors] = useState({});
    const [formError, setFormError] = useState("");

    // שינוי 2: עדכון הערכים כשה-initialValues משתנים (למשל כשהיוזר נטען מהשרת)
    useEffect(() => {
        // תיקון: נעדכן רק אם באמת התקבל אובייקט (למשל בפרופיל)
        if (initialValues) {
            setValues(prev => ({ ...prev, ...initialValues }));
        }
    }, [initialValues]);

    const handleChange = (event, fieldConfig) => {
        const { name, value } = event.target;
        setValues(prev => ({ ...prev, [name]: value }));

        if (formError) setFormError("");

        let newErrorMessage = null;
        // בדיקה שיש valiData לפני שמנסים להשתמש בו
        const validationRule = fieldConfig?.valiData;

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
        // בדיקה רק לשדות שמוגדרים כ-required
        const missingRequired = fields.some(field => field.required && !values[field.name]);

        if (hasErrors || missingRequired) {
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
        formError,
        handleChange,
        handleSubmit
    };
};

export default useForm;