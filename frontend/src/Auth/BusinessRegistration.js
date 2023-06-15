import React, { useState } from 'react';
import axios from 'axios';
import { setBusiness } from '../store/actions/businessActions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 

const BusinessRegistration = () => {
    const [businessName, setBusinessName] = useState('');
    const [businessAddress, setBusinessAddress] = useState('');
    const [taxId, setTaxId] = useState('');
    const userId = useSelector(state => state.user.id); 
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleRegistration = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/businesses/register', { businessName, businessAddress, taxId, userId });
            if (response.status === 200) {
                dispatch(setBusiness(response.data.business))
                localStorage.setItem('businessId', response.data.business.id);
                navigate(`/register/business/${response.data.business.id}`);
            } else {
                // Handle registration error
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleRegistration}>
            <label>
                Business Name:
                <input type="text" value={businessName} onChange={(e) => setBusinessName(e.target.value)} />
            </label>
            <label>
                Business Address:
                <input type="text" value={businessAddress} onChange={(e) => setBusinessAddress(e.target.value)} />
            </label>
            <label>
                Tax Id:
                <input type="text" value={taxId} onChange={(e) => setTaxId(e.target.value)} />
            </label>
            <input type="submit" value="Register" />
        </form>
    );
};

export default BusinessRegistration;
