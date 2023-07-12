import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import Form from '../components/Form';
import SeedMoneyApi from '../SeedMoneyApi';

const ApplicationForm = () => {
    const { grantId } = useParams();
    const userId = useSelector((state) => state.user.user.id);
    const navigate = useNavigate();
    const [formSubmitted, setFormSubmitted] = useState(false);

    const fields = [
        { name: 'farmName', label: 'Farm Name', initialValue: '', type: 'text' },
        { name: 'farmSize', label: 'Farm Size (in acres)', initialValue: 0, type: 'number' },
        { name: 'farmLocation', label: 'Farm Location', initialValue: '', type: 'text' },
        { name: 'cropsGrown', label: 'Crops Grown', initialValue: '', type: 'multiselect', options: ['Corn', 'Wheat', 'Soybeans', 'Cotton', 'Other'] },
        { name: 'animalsRaised', label: 'Animals Raised', initialValue: '', type: 'multiselect', options: ['Chickens', 'Cows', 'Sheep', 'Goats', 'Other'] },
        { name: 'farmRevenue', label: 'Farm Annual Revenue', initialValue: 0, type: 'number', inputType: 'number' },
        { name: 'appProposal', label: 'Brief Description of Your Farm and Needs', initialValue: '', type: 'textarea' }
    ];

    if (formSubmitted) {
        navigate('/');
    }

    const handleApplication = async (data) => {
        try {
            setFormSubmitted(false);
            const applicationData = {
                userId: userId,
                grantId: Number(grantId),
                cropsGrown: Array.isArray(data.cropsGrown) ? data.cropsGrown.join(', ') : data.cropsGrown,
                animalsRaised: Array.isArray(data.animalsRaised) ? data.animalsRaised.join(', ') : data.animalsRaised,
                ...data
            };
            await SeedMoneyApi.createApplication(applicationData);
            setFormSubmitted(true);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Form title="Grant Application" fields={fields} onSubmit={handleApplication} buttonText="Apply for Grant"/>
    );
};

export default ApplicationForm;
