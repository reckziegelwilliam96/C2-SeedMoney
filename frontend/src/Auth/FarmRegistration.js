import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerFarm } from '../store/actions/farmActions';
import Form from '../components/Form';

const FarmRegistration = () => {
    const businessId = useSelector((state) => state.business.business.id);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const initialValues = {
        organicCertification: false,
        sustainabilityPractices: false,
        previousApplication: false,
        grantOutcome: false
      };

    const formFields = [
        {name: 'size', type: 'number', label: 'Size'},
        {name: 'yearsOfExperience', type: 'number', label: 'Years of Experience'},
        {name: 'typesOfCrops', type: 'multiselect', label: 'Types of Crops', options: ['Corn', 'Wheat', 'Soybeans', 'Cotton', 'Other']},
        {name: 'organicCertification', type: 'checkbox', label: 'Organic Certification'},
        {name: 'sustainabilityPractices', type: 'checkbox', label: 'Sustainability Practices'},
        {name: 'annualFarmRevenue', type: 'number', label: 'Annual Farm Revenue'},
        {name: 'profitability', type: 'number', label: 'Profitability'},
        {name: 'farmAddress', type: 'text', label: 'Farm Address'},
        {name: 'farmCity', type: 'text', label: 'Farm City'},
        {name: 'farmState', type: 'text', label: 'Farm State'},
        {name: 'farmZipCode', type: 'text', label: 'Farm Zip Code'},
        {name: 'filingStatus', type: 'text', label: 'Filing Status'},
        {name: 'taxFormsFiled', type: 'multiselect', label: 'Tax Forms Filed', options: ['1040', '1120', '1120S', '1065']},
        {name: 'previousApplication', type: 'checkbox', label: 'Previous Application'},
        {name: 'grantOutcome', type: 'checkbox', label: 'Grant Outcome'},
    ];

    const handleSubmit = (formData) => {
        dispatch(registerFarm({
            ...formData,
            businessId
        }));
        navigate('/');
    };

    return (
        <Form title="Register Ranch or Farm" fields={formFields} initialValues={initialValues} onSubmit={handleSubmit} submitButtonText="Register" />
    );
};

export default FarmRegistration;
