import React from 'react';
import { useSelector } from 'react-redux';
import Form from '../components/Form';

const BusinessRegistration = ({onSubmit}) => {
    const userId = useSelector((state) => state.user.user.id);

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
        onSubmit({
            ...formData,
            userId
        });
    };

    return <Form fields={fields} onSubmit={handleSubmit} buttonText="Register" />;
};

export default BusinessRegistration;
