import React, { useState } from 'react';
import { useSelector } from 'react-redux'; 

const BusinessRegistration = ({onSubmit}) => {
    const [businessName, setBusinessName] = useState('');
    const [businessAddress, setBusinessAddress] = useState('');
    const [taxId, setTaxId] = useState('');
    const userId = useSelector((state) => state.user.user.id);

    const handleRegistration = async (e) => {
        e.preventDefault();
        try {
            const businessData = { businessName, businessAddress, taxId, userId };
            onSubmit(businessData);
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