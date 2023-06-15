import React, { useEffect, useState } from "react";
import { Button } from 'reactstrap';
import { useSelector } from 'react-redux';
import axios from 'axios';
import EditProfile from './EditProfile';
import UserCard from './UserCard';
import FarmCard from './FarmCard';
import BusinessCard from './BusinessCard';

function Profile() {
  const user = useSelector(state => state.userReducer.user);
  const [farmData, setFarmData] = useState(null);
  const [businessData, setBusinessData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      const businessRes = await axios.get(`/api/businesses/${user.business_id}`, config);
      const farmRes = await axios.get(`/api/farms/${user.business_id}`, config);
      setBusinessData(businessRes.data);
      setFarmData(farmRes.data);
    }
    fetchData();
  }, [user.business_id]);

  if (isEditing) return <EditProfile user={user} farmData={farmData} businessData={businessData} setIsEditing={setIsEditing} />;

  if (!user || !farmData || !businessData) return <div>Loading...</div>;

  return (
    <div>
      <UserCard userData={user} />
      <FarmCard farmData={farmData} />
      <BusinessCard businessData={businessData} />
      <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
    </div>
  );
}

export default Profile;
