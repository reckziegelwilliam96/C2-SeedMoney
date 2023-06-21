import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import MultiSelect from '../MultiSelect'; 
import Checkbox from '../Checkbox'; 

const FarmRegistration = ({onSubmit}) => {
    const [size, setSize] = useState('');
    const [yearsOfExperience, setYearsOfExperience] = useState('');
    const [typesOfCrops, setTypesOfCrops] = useState([]);
    const [organicCertification, setOrganicCertification] = useState(false);
    const [sustainabilityPractices, setSustainabilityPractices] = useState(false);
    const [annualFarmRevenue, setAnnualFarmRevenue] = useState('');
    const [profitability, setProfitability] = useState('');
    const [farmAddress, setFarmAddress] = useState('');
    const [farmCity, setFarmCity] = useState('');
    const [farmState, setFarmState] = useState('');
    const [farmZipCode, setFarmZipCode] = useState('');
    const [filingStatus, setFilingStatus] = useState('');
    const [taxFormsFiled, setTaxFormsFiled] = useState([]);
    const [previousApplication, setPreviousApplication] = useState(false);
    const [grantOutcome, setGrantOutcome] = useState(false);
    const businessId = useSelector((state) => state.business.business.id);

    const cropChoices = ["Corn", "Wheat", "Soybeans", "Cotton"];
    const taxFormChoices = ["1040", "1120", "1120S", "1065"];

    const handleRegistration = async (e) => {
        e.preventDefault();
        try {
            const farmData = { 
                size: Number(size), 
                yearsOfExperience: Number(yearsOfExperience), 
                typesOfCrops, 
                organicCertification, 
                sustainabilityPractices, 
                annualFarmRevenue: Number(annualFarmRevenue), 
                profitability: Number(profitability), 
                farmAddress, 
                farmCity, 
                farmState, 
                farmZipCode, 
                filingStatus, 
                taxFormsFiled, 
                previousApplication, 
                grantOutcome, 
                businessId
            };
            onSubmit(farmData);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleRegistration}>
            <label>
                Size:
                <input type="number" value={size} onChange={(e) => setSize(e.target.value)} />
            </label>
            <label>
                Years of Experience:
                <input type="number" value={yearsOfExperience} onChange={(e) => setYearsOfExperience(e.target.value)} />
            </label>
            <label>
                Types of Crops:
                <MultiSelect choices={cropChoices} selectedChoices={typesOfCrops} setSelectedChoices={setTypesOfCrops} />
            </label>
            <label>
                Organic Certification:
                <Checkbox isChecked={organicCertification} setChecked={setOrganicCertification} />
            </label>
            <label>
                Sustainability Practices:
                <Checkbox isChecked={sustainabilityPractices} setChecked={setSustainabilityPractices} />
            </label>
            <label>
                Annual Farm Revenue:
                <input type="number" value={annualFarmRevenue} onChange={(e) => setAnnualFarmRevenue(e.target.value)} />
            </label>
            <label>
                Profitability:
                <input type="number" value={profitability} onChange={(e) => setProfitability(e.target.value)} />
            </label>
            <label>
                Farm Address:
                <input type="text" value={farmAddress} onChange={(e) => setFarmAddress(e.target.value)} />
            </label>
            <label>
                Farm City:
                <input type="text" value={farmCity} onChange={(e) => setFarmCity(e.target.value)} />
            </label>
            <label>
                Farm State:
                <input type="text" value={farmState} onChange={(e) => setFarmState(e.target.value)} />
            </label>
            <label>
                Farm Zip Code:
                <input type="text" value={farmZipCode} onChange={(e) => setFarmZipCode(e.target.value)} />
            </label>
            <label>
                Filing Status:
                <input type="text" value={filingStatus} onChange={(e) => setFilingStatus(e.target.value)} />
            </label>
            <label>
                Tax Forms Filed:
                <MultiSelect choices={taxFormChoices} selectedChoices={taxFormsFiled} setSelectedChoices={setTaxFormsFiled} />
            </label>
            <label>
                Previous Application:
                <Checkbox isChecked={previousApplication} setChecked={setPreviousApplication} />
            </label>
            <label>
                Grant Outcome:
                <Checkbox isChecked={grantOutcome} setChecked={setGrantOutcome} />
            </label>
            <input type="submit" value="Register" />
        </form>
    );
};

export default FarmRegistration;