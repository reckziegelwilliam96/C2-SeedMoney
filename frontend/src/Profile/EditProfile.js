import React, { useEffect, useState } from "react";
// import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Form from '../components/Form';
import SeedMoneyApi from '../SeedMoneyApi';

function EditProfile({ setIsEditing }) {
  const userId = useSelector((state) => state.user.user.id)
  const farmId = useSelector((state) => state.farm.farm.id)
  const businessId = useSelector((state) => state.business.business.id)
  // const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [farmData, setFarmData] = useState(null);
  const [businessData, setBusinessData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const userRes = await SeedMoneyApi.getUser(userId);
      const farmRes = await SeedMoneyApi.getFarm(farmId);
      const businessRes = await SeedMoneyApi.getBusiness(businessId);
      setUserData(userRes);
      setFarmData(farmRes);
      setBusinessData(businessRes);
    }
    fetchData();
  }, [userId, farmId, businessId]);

  if (!userData || !farmData || !businessData) return <div>Loading...</div>;

  const fields = [
    { name: 'email', label: 'Email', initialValue: userData.email, type: 'input', inputType: 'email' },
    { name: 'size', label: 'Farm Size', initialValue: farmData.size, type: 'input', inputType: 'number' },
    { name: 'business_name', label: 'Business Name', initialValue: businessData.business_name, type: 'input' },
  ];

  async function handleSubmit(data) {
    await SeedMoneyApi.updateUser(userId, { ...userData, email: data.email });
    await SeedMoneyApi.updateFarm(userData.farmId, { ...farmData, size: data.size });
    await SeedMoneyApi.updateBusiness(userData.businessId, { ...businessData, business_name: data.business_name });
    setIsEditing(false);
  }

  return (
    <Form fields={fields} onSubmit={handleSubmit} />
  );
}

export default EditProfile;
