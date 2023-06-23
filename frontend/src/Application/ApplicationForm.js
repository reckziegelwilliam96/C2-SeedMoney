import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import Form from '../components/Form';
import SeedMoneyApi from '../SeedMoneyApi';

const ApplicationForm = () => {
    const { grantId } = useParams();
    const userId = useSelector((state) => state.user.user.id);
    const navigate = useNavigate();

    const fields = [
        { name: 'farmName', label: 'Farm Name', initialValue: '', type: 'text' },
        { name: 'farmSize', label: 'Farm Size (in acres)', initialValue: 0, type: 'number' },
        { name: 'farmLocation', label: 'Farm Location', initialValue: '', type: 'text' },
        { name: 'cropsGrown', label: 'Crops Grown', initialValue: '', type: 'multiselect', options: ['Corn', 'Wheat', 'Soybeans', 'Cotton', 'Other'] },
        { name: 'animalsRaised', label: 'Animals Raised', initialValue: '', type: 'multiselect', options: ['Chickens', 'Cows', 'Sheep', 'Goats', 'Other'] },
        { name: 'farmRevenue', label: 'Farm Annual Revenue', initialValue: 0, type: 'number', inputType: 'number' },
        { name: 'appProposal', label: 'Brief Description of Your Farm and Needs', initialValue: '', type: 'textarea' }
    ];

    const handleApplication = async (data) => {
        try {
            const applicationData = {
                userId: userId,
                grantId: Number(grantId),
                cropsGrown: Array.isArray(data.cropsGrown) ? data.cropsGrown.join(', ') : data.cropsGrown,
                animalsRaised: Array.isArray(data.animalsRaised) ? data.animalsRaised.join(', ') : data.animalsRaised,
                ...data
            };
            console.log(applicationData);
            const response = await SeedMoneyApi.createApplication(applicationData);
            if (response.status === 200) {
                setTimeout(() => navigate('/'), 0);
            } else {
                // Handle application error
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Form fields={fields} onSubmit={handleApplication} />
    );
};

export default ApplicationForm;
