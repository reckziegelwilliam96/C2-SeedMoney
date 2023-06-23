import React from 'react';
import Form from '../components/Form';

const UserRegistration = ({onSubmit}) => {
    const fields = [
        {
            label: "First Name",
            type: "text",
            name: "firstName",
        },
        {
            label: "Last Name",
            type: "text",
            name: "lastName",
        },
        {
            label: "Password",
            type: "password",
            name: "password",
        },
        {
            label: "Email",
            type: "text",
            name: "email",
        }
    ];

    return <Form fields={fields} onSubmit={onSubmit} buttonText="Register" />;
};

export default UserRegistration;
