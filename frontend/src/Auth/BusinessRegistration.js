import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerBusiness } from '../store/actions/businessActions';
import Form from '../components/Form';

const BusinessRegistration = () => {
    const userId = useSelector((state) => state.user.user.id);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fields = [
        {
            label: "Business Name",
            type: "text",
            name: "businessName",
        },
        {
            label: "Business Address",
            type: "text",
            name: "businessAddress",
        },
        {
            label: "Tax Id",
            type: "text",
            name: "taxId",
        },
    ];

    // Augment onSubmit to include userId
    const handleSubmit = (formData) => {
        dispatch(registerBusiness({
            ...formData,
            userId
        }));
        navigate('/');
    };

    return <Form fields={fields} onSubmit={handleSubmit} buttonText="Register" />;
};

export default BusinessRegistration;
