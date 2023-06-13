// EditProfile.js
import React, { useEffect, useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function EditProfile() {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [farmData, setFarmData] = useState(null);
  const [businessData, setBusinessData] = useState(null);

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

  async function handleSubmit(event) {
    event.preventDefault();
    await axios.patch(`/api/users/${id}`, userData);
    await axios.patch(`/api/farms/${businessData.id}`, farmData);
    await axios.patch(`/api/businesses/${businessData.id}`, businessData);
  }

  function handleChange(event) {
    const {name, value} = event.target;
    if (name in userData) setUserData(oldData => ({...oldData, [name]: value}));
    else if (name in farmData) setFarmData(oldData => ({...oldData, [name]: value}));
    else if (name in businessData) setBusinessData(oldData => ({...oldData, [name]: value}));
  }

  if (!userData || !farmData || !businessData) return <div>Loading...</div>;

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Edit Profile</h2>
      <h3>User Data</h3>
      <FormGroup>
        <Label for="email">Email</Label>
        <Input type="email" name="email" id="email" value={userData.email} onChange={handleChange} />
      </FormGroup>
      {/* Add more form fields for userData... */}

      <h3>Farm Data</h3>
      <FormGroup>
        <Label for="size">Size</Label>
        <Input type="text" name="size" id="size" value={farmData.size} onChange={handleChange} />
      </FormGroup>
      {/* Add more form fields for farmData... */}

      <h3>Business Data</h3>
      <FormGroup>
        <Label for="business_name">Business Name</Label>
        <Input type="text" name="business_name" id="business_name" value={businessData.business_name} onChange={handleChange} />
      </FormGroup>
      {/* Add more form fields for businessData... */}
      
      <Button>Save Changes</Button>
    </Form>
  );
}

export default EditProfile;
