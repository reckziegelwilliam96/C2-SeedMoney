import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import SeedMoneyApi from '../SeedMoneyApi';
import Form from '../components/Form';

const EditProfile = () => {
  const userId = useSelector((state) => state.user.user.id)
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [farmData, setFarmData] = useState(null);
  const [businessData, setBusinessData] = useState(null);
  const [farmId, setFarmId] = useState(null);
  const [businessId, setBusinessId] = useState(null);

  // Define form fields
  const userFields = [
    { name: 'first_name', label: 'First Name', type: 'text', required: true },
    { name: 'last_name', label: 'Last Name', type: 'text', required: true },
    { name: 'password', label: 'Password', type: 'password', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
  ];

  const businessFields = [
    { name: 'business_name', label: 'Business Name', type: 'text'},
    { name: 'business_address', label: 'Business Address', type: 'text'},
    { name: 'taxId', label: 'Tax ID', type: 'text'}
  ];

  const farmFields = [
    {name: 'size', type: 'number', label: 'Farm Size'},
    {name: 'years_of_experience', type: 'number', label: 'Years of Experience'},
    {name: 'types_of_crops', type: 'multiselect', label: 'Types of Crops', options: ['Corn', 'Wheat', 'Soybeans', 'Cotton', 'Other']},
    {name: 'organic_certification', type: 'checkbox', label: 'Organic Certification'},
    {name: 'sustainability_practices', type: 'checkbox', label: 'Sustainability Practices'},
    {name: 'annual_farm_revenue', type: 'number', label: 'Annual Farm Revenue'},
    {name: 'profitability', type: 'number', label: 'Profitability'},
    {name: 'farm_address', type: 'text', label: 'Farm Address'},
    {name: 'farm_city', type: 'text', label: 'Farm City'},
    {name: 'farm_state', type: 'text', label: 'Farm State'},
    {name: 'farm_zip_code', type: 'text', label: 'Farm Zip Code'},
    {name: 'filing_status', type: 'text', label: 'Filing Status'},
    {name: 'tax_forms_filed', type: 'multiselect', label: 'Tax Forms Filed', options: ['1040', '1120', '1120S', '1065']},
    {name: 'previous_application', type: 'checkbox', label: 'Previous Application'},
    {name: 'grant_outcome', type: 'checkbox', label: 'Grant Outcome'}
  ];

  // Fetching data
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const userDetails = await SeedMoneyApi.getUser(userId);
      const businessDetails = await SeedMoneyApi.getUserBusinesses(userId);      
      const farmDetails = await SeedMoneyApi.getUserFarms(userId);

      setUserData(userDetails);
      setFarmData(farmDetails[0]); // Assuming there's only one farm per user
      setBusinessData(businessDetails[0]); // Assuming there's only one business per user
      setFarmId(farmDetails[0].id);
      setBusinessId(businessDetails[0].id);
      setIsLoading(false);
    }

    fetchData();
  }, [userId]);

  const handleUserSubmit = async (values) => {
    const updatedUser = await SeedMoneyApi.updateUser(userId, values);
    setUserData(updatedUser);
  };

  const handleFarmSubmit = async (values) => {
    const updatedFarm = await SeedMoneyApi.updateFarm(farmId, values);
    setFarmData(updatedFarm);
  };

  const handleBusinessSubmit = async (values) => {
    const updatedBusiness = await SeedMoneyApi.updateBusiness(businessId, values);
    setBusinessData(updatedBusiness);
  };

  // If data has not been fetched yet, show loading text
  if (isLoading) return <p>Loading &hellip; </p>

  return (
    <div>
      <h2>Edit Profile</h2>

      <Form fields={userFields} onSubmit={handleUserSubmit} buttonText="Save User Changes" />
      <Form fields={farmFields} onSubmit={handleFarmSubmit} buttonText="Save Farm Changes" />
      <Form fields={businessFields} onSubmit={handleBusinessSubmit} buttonText="Save Business Changes" />
    </div>
  );
}

export default EditProfile;