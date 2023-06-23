import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../store/actions/userActions';
import Form from '../components/Form';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formFields = [
        {name: 'email', type: 'email', label: 'Email'},
        {name: 'password', type: 'password', label: 'Password'},
    ];

    const handleLogin = async (formData) => {
        try {
            await dispatch(login(formData));
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Form fields={formFields} onSubmit={handleLogin} buttonText="Login" />
    );
};

export default Login;
