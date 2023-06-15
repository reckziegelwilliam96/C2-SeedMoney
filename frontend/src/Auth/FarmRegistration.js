import React, { useState } from 'react';
import axios from 'axios';
import { setFarm } from '../store/actions/farmActions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MultiSelect from '../MultiSelect'; 
import Checkbox from '../Checkbox'; 

const FarmRegistration = () => {
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
    const businessId = localStorage.getItem('businessId');
    const dispatch = useDispatch(); 
    const navigate = useNavigate();

    const cropChoices = ["Corn", "Wheat", "Soybeans", "Cotton"];
    const taxFormChoices = ["1040", "1120", "1120S", "1065"];

    const handleRegistration = async (e) => {
        e.preventDefault();
        try {

            const response = await axios.post('http://localhost:3000/farms/register', { size, yearsOfExperience, typesOfCrops, organicCertification, sustainabilityPractices, annualFarmRevenue, profitability, farmAddress, farmCity, farmState, farmZipCode, filingStatus, taxFormsFiled, previousApplication, grantOutcome, businessId });
            if (response.status === 200) {
                dispatch(setFarm(response.data.farm));
                localStorage.setItem('farmId', response.data.farm.id);
                navigate('/')
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