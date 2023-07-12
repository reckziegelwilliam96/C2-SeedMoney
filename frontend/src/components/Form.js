import React, { useState } from 'react';
import { Box, Typography, Button, Paper, Container, FormControl, InputLabel, Select, MenuItem, Checkbox, TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import FormErrors from './FormErrors';
import { formStyles } from './FormStyles';

const Form = ({ fields, onSubmit, buttonText }) => {
  const theme = useTheme();
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (event, name, type) => {
    if (type === 'checkbox') {
      setValues(prevValues => ({
        ...prevValues,
        [name]: event.target.checked
      }));
    } else if (type === 'multiselect') {
      const option = event.target.value;
      const isChecked = event.target.checked;
      if (option === 'Other' && isChecked) {
        setValues(prevValues => ({
          ...prevValues,
          [name]: prevValues[name]?.filter(value => value !== 'Other')
        }));
      } else if (isChecked) {
        setValues(prevValues => ({
          ...prevValues,
          [name]: [...(prevValues[name] || []), option]
        }));
      } else {
        setValues(prevValues => ({
          ...prevValues,
          [name]: prevValues[name]?.filter(value => value !== option)
        }));
      }
    } else if (type === 'number') {
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

  const handleInputChange = (event, name) => {
    const inputValue = event.target.value;
    setValues(prevValues => ({
      ...prevValues,
      [name]: prevValues[name]?.includes('Other') ? ['Other', inputValue] : [inputValue]
    }));
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
    <Container maxWidth="sm">
      <Paper sx={{ padding: formStyles.root.padding, marginTop: theme.spacing(4), backgroundColor: formStyles.root.backgroundColor, color: formStyles.root.color }}>
        <form onSubmit={handleSubmit}>
          <FormErrors errors={errors} />
          {fields.map(field => (
            <Box key={field.name} sx={{ marginBottom: theme.spacing(2) }}>
              <Typography variant="body1" sx={{ color: theme.palette.secondary.main }}>{field.label}:</Typography>
              {field.type === 'multiselect' ? (
                <Box>
                  {field.options.map(option => (
                    <label key={option}>
                      <Checkbox
                        checked={values[field.name]?.includes(option) || false}
                        onChange={event => handleChange(event, field.name, field.type)}
                        value={option}
                      />
                      <span style={{ color: theme.palette.secondary.main }}>{option}</span>
                    </label>
                  ))}
                  {values[field.name]?.includes('Other') && (
                    <TextField
                      value={values[field.name]?.filter(option => option !== 'Other').join(', ')}
                      onChange={event => handleInputChange(event, field.name)}
                      style={{ backgroundColor: formStyles.input.backgroundColor, borderColor: formStyles.input.borderColor }}
                    />
                  )}
                </Box>
              ) : field.type === 'checkbox' ? (
                <label>
                  <Checkbox
                    checked={values[field.name] || false}
                    onChange={event => handleChange(event, field.name, field.type)}
                  />
                  <span style={{ color: theme.palette.secondary.main }}>{field.label}</span>
                </label>
              ) : (
                <input
                  type={field.type || 'text'}
                  value={values[field.name] || ''}
                  onChange={event => handleChange(event, field.name, field.type)}
                  style={{ backgroundColor: formStyles.input.backgroundColor, borderColor: formStyles.input.borderColor }}
                />
              )}
            </Box>
          ))}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ backgroundColor: formStyles.button.backgroundColor, color: formStyles.button.color, borderRadius: formStyles.button.borderRadius, '&:hover': { backgroundColor: theme.palette.accent1.dark } }}
          >
            {buttonText || 'Submit'}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Form;
