import React, { useState } from 'react';
import FormErrors from './FormErrors';

const Form = ({ fields, onSubmit, buttonText }) => {
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});

    const handleChange = (event, name, type) => {
        if(type === "checkbox") {
            setValues(prevValues => ({
                ...prevValues,
                [name]: event.target.checked
            }));
        } else if(type === "multiselect") {
            setValues(prevValues => ({
                ...prevValues,
                [name]: [...event.target.options].filter(option => option.selected).map(option => option.value)
            }));
        } else if(type === "number") {
            setValues(prevValues => ({
                ...prevValues,
                [name]: Number(event.target.value)
            }));
        } else {
            setValues(prevValues => ({
                ...prevValues,
                [name]: event.target.value
            }));
        }
    };
    

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = validate(values, fields);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            onSubmit(values);
        }
    };

    const validate = (values, fields) => {
        let errors = {};
        fields.forEach(field => {
            if (field.required && (!values[field.name] || values[field.name] === '')) {
                errors[field.name] = `${field.label} is required.`;
            }
        });
        return errors;
    };

    return (
        <form onSubmit={handleSubmit}>
            <FormErrors errors={errors} />
            {fields.map(field => {
                switch(field.type) {
                    case 'multiselect':
                        return (
                            <label key={field.name}>
                                {field.label}:
                                <select multiple={true} value={values[field.name] || []} onChange={event => handleChange(event, field.name, field.type)}>
                                    {field.options.map(option => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                            </label>
                        );
                    case 'checkbox':
                        return (
                            <label key={field.name}>
                                <input 
                                    type={field.type}
                                    checked={values[field.name] || false}
                                    onChange={event => handleChange(event, field.name, field.type)}
                                />
                                {field.label}
                            </label>
                        );
                    default:
                        return (
                            <label key={field.name}>
                                {field.label}:
                                <input 
                                    type={field.type || 'text'}
                                    value={values[field.name] || ''}
                                    onChange={event => handleChange(event, field.name, field.type)}
                                />
                            </label>
                        );
                }
            })}
            <input type="submit" value={buttonText || 'Submit'} />
        </form>
    );
};

export default Form;
