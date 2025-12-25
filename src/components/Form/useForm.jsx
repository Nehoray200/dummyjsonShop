import React,{useState} from 'react'

const useForm = (fields,onSubmit) => {
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleChange = (event, fieldConfig) => {
        const { name, value } = event.target;
        setValues(prev => ({ ...prev, [name]: value }));

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
            setOpenSnackbar(true);
            return;
        }

        if (onSubmit) {
            onSubmit(values);
        }
    };
   return {
        values,
        errors,
        openSnackbar,
        setOpenSnackbar,
        handleChange,
        handleSubmit
    };
  
}

export default useForm