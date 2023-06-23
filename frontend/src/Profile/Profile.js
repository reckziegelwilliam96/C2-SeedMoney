import React, { useEffect, useState } from "react";
import { Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import SeedMoneyApi from '../SeedMoneyApi';
import UserCard from './UserCard';
import FarmCard from './FarmCard';
import BusinessCard from './BusinessCard';
import ApplicationCard from './ApplicationCard';

function Profile() {
  const navigate = useNavigate();


  const userId = useSelector((state) => state.user.user.id)
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const [farmData, setFarmData] = useState(null);
  const [businessData, setBusinessData] = useState(null);
  const [applications, setApplications] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const userDetails = await SeedMoneyApi.getUser(userId);
        const farmDetails = await SeedMoneyApi.getUserFarms(userId);
        const businessDetails = await SeedMoneyApi.getUserBusinesses(userId);      
        const userApplications = await SeedMoneyApi.getApplications(userId);

        console.log("Data fetched");
        setUserData(userDetails);
        setFarmData(farmDetails);
        setBusinessData(businessDetails);
        setApplications(userApplications);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data", error.message);
        setError(error);
      }
    }

    fetchData();
  }, [userId]);

  if (error) return <div>Error: {error.message}</div>;
  if (isLoading) return <div>Loading...</div>;


  console.log("User Data:", userData); // Debug
  console.log("Farm Data:", farmData); // Debug
  console.log("Business Data:", businessData); // Debug
  console.log("Applications Data:", applications); // Debug
  return (
    <div>
      <UserCard userData={userData} />
      {farmData.map((farm, idx) => <FarmCard key={idx} farmData={farm} />)}
      {businessData.map((business, idx) => <BusinessCard key={idx} businessData={business} />)}
      {applications.map((application, idx) => <ApplicationCard key={idx} applicationData={application} />)}
      <Button onClick={() => navigate(`profile/edit`)}>Edit Profile</Button>
    </div>
  );
}

export default Profile;
