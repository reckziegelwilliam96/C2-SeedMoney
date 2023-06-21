import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import SeedMoneyApi from '../SeedMoneyApi';

const ApplicationForm = () => {
    const { grantId } = useParams();
    const userId = useSelector((state) => state.user.user.id);

    const navigate = useNavigate();

    const [farmName, setFarmName] = useState("");
    const [farmSize, setFarmSize] = useState(0);
    const [farmLocation, setFarmLocation] = useState("");
    const [cropsGrown, setCropsGrown] = useState("");
    const [animalsRaised, setAnimalsRaised] = useState("");
    const [farmRevenue, setFarmRevenue] = useState(0);
    const [appProposal, setAppProposal] = useState("");


    const handleApplication = async (e) => {
        e.preventDefault();
        try {
            console.log({
                userId,
                grantId: Number(grantId),
                farmName,
                farmSize: Number(farmSize),
                farmLocation,
                cropsGrown,
                animalsRaised,
                farmRevenue: Number(farmRevenue),
                appProposal
            });
            
            const applicationData = {
                userId: userId, // ensure to use the exact keys as required by the backend
                grantId: Number(grantId),
                farmName: farmName,
                farmSize: Number(farmSize),
                farmLocation: farmLocation,
                cropsGrown: cropsGrown,
                animalsRaised: animalsRaised,
                farmRevenue: Number(farmRevenue),
                appProposal: appProposal
            };
            // Include grantId in the request body
            // Assume that userId is available in the state or props or however you've managed authentication
            const response = await SeedMoneyApi.createApplication(applicationData);
            if (response.status === 200) {
                // Application successful
                setTimeout(() => navigate('/'), 0);
                // You might want to clear the form or provide some feedback here
            } else {
                // Handle application error
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleApplication}>
            <label>
                Farm Name: 
                <input type="text" name="farmName" value={farmName} onChange={(e) => setFarmName(e.target.value)} required />
            </label>
            <label>
                Farm Size (in acres):
                <input type="number" name="farmSize" value={farmSize} onChange={(e) => setFarmSize(e.target.value)} required />
            </label>
            <label>
                Farm Location:
                <input type="text" name="farmLocation" value={farmLocation} onChange={(e) => setFarmLocation(e.target.value)} required />
            </label>
            <label>
                Crops Grown:
                <input type="text" name="cropsGrown" value={cropsGrown} onChange={(e) => setCropsGrown(e.target.value)} required />
            </label>
            <label>
                Animals Raised:
                <input type="text" name="animalsRaised" value={animalsRaised} onChange={(e) => setAnimalsRaised(e.target.value)} required />
            </label>
            <label>
                Farm Annual Revenue:
                <input type="number" name="farmRevenue" value={farmRevenue} onChange={(e) => setFarmRevenue(e.target.value)} required />
            </label>
            <label>
                Brief Description of Your Farm and Needs:
                <textarea name="appProposal" value={appProposal} onChange={(e) => setAppProposal(e.target.value)} required />
            </label>
            <button type="submit">Apply</button>
        </form>
    );
};

export default ApplicationForm;
