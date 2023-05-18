// GrantApplication.js
import React, { useState } from 'react';

function GrantApplication({ onSubmit }) {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        amount: "",
        deadline: "",
        eligibility: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(data => ({
            ...data,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input id="name" name="name" value={formData.name} onChange={handleChange} />

            <label htmlFor="description">Description</label>
            <input id="description" name="description" value={formData.description} onChange={handleChange} />

            <label htmlFor="amount">Amount</label>
            <input id="amount" name="amount" value={formData.amount} onChange={handleChange} />

            <label htmlFor="deadline">Deadline</label>
            <input id="deadline" name="deadline" value={formData.deadline} onChange={handleChange} />

            <label htmlFor="eligibility">Eligibility</label>
            <input id="eligibility" name="eligibility" value={formData.eligibility} onChange={handleChange} />

            <button type="submit">Submit</button>
        </form>
    );
}

export default GrantApplication;
