// Profile.js
import React, { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, Button } from 'reactstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import EditProfile from './EditProfile';

function Profile() {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [farmData, setFarmData] = useState(null);
  const [businessData, setBusinessData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const userRes = await axios.get(`/api/users/${id}`);
      const businessRes = await axios.get(`/api/businesses/${userRes.data.business_id}`);
      const farmRes = await axios.get(`/api/farms/${userRes.data.business_id}`);
      setUserData(userRes.data);
      setBusinessData(businessRes.data);
      setFarmData(farmRes.data);
    }
    fetchData();
  }, [id]);

  if (isEditing) return <EditProfile userData={userData} farmData={farmData} businessData={businessData} setIsEditing={setIsEditing} />;

  if (!userData || !farmData || !businessData) return <div>Loading...</div>;

  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">User Profile</CardTitle>
          <p>Name: {userData.first_name} {userData.last_name}</p>
          <p>Email: {userData.email}</p>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Farm Information</CardTitle>
          <p>Size: {farmData.size}</p>
          <p>Years of Experience: {farmData.years_of_experience}</p>
          <p>Types of Crops: {farmData.types_of_crops}</p>
          <p>Organic Certification: {farmData.organic_certification}</p>
          <p>Sustainability Practices: {farmData.sustainability_practices}</p>
          <p>Annual Farm Revenue: {farmData.annual_farm_revenue}</p>
          <p>Profitability: {farmData.profitability}</p>
          <p>Farm Address: {farmData.farm_address}, {farmData.farm_city}, {farmData.farm_state}, {farmData.farm_zip_code}</p>
          <p>Filing Status: {farmData.filing_status}</p>
          <p>Tax Forms Filed: {farmData.tax_forms_filed}</p>
          <p>Previous Application: {farmData.previous_application}</p>
          <p>Grant Outcome: {farmData.grant_outcome}</p>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Business Information</CardTitle>
          <p>Business Name: {businessData.business_name}</p>
          <p>Business Address: {businessData.business_address}</p>
          <p>Tax ID: {businessData.tax_id}</p>
        </CardBody>
      </Card>
      <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
    </div>
  );
}

export default Profile;
