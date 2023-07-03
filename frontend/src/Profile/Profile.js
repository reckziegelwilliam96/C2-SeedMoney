import React, { useEffect, useState } from 'react';
import { Button, Card, CardContent, Typography, Grid, useTheme, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import SeedMoneyApi from '../SeedMoneyApi';
import UserCard from './UserCard';
import FarmCard from './FarmCard';
import BusinessCard from './BusinessCard';
import ApplicationCard from './ApplicationCard';

function Profile() {
  const navigate = useNavigate();
  const theme = useTheme();

  const userId = useSelector((state) => state.user.user.id);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const [farmData, setFarmData] = useState([]);
  const [businessData, setBusinessData] = useState([]);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const userDetails = await SeedMoneyApi.getUser(userId);
        const farmDetails = await SeedMoneyApi.getUserFarms(userId);
        const businessDetails = await SeedMoneyApi.getUserBusinesses(userId);
        const userApplications = await SeedMoneyApi.getUserApplications(userId);

        setUserData(userDetails);
        setFarmData(farmDetails);
        setBusinessData(businessDetails);
        setApplications(userApplications);
        setIsLoading(false);
      } catch (error) {
        setError(error);
      }
    }

    fetchData();
  }, [userId]);

  if (error) return <div>Error: {error.message}</div>;
  if (isLoading) return <CircularProgress />;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card sx={{ backgroundColor: theme.palette.accent1.main, boxShadow: theme.shadows[1] }}>
          <CardContent>
            <Typography variant="h6" component="div">Profile</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <UserCard userData={userData} />
      </Grid>
      {farmData.map((farm, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <FarmCard farmData={farm} />
        </Grid>
      ))}
      {businessData.map((business, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <BusinessCard businessData={business} />
        </Grid>
      ))}
      {applications.map((application, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <ApplicationCard applicationData={application} />
        </Grid>
      ))}
      <Grid item xs={12}>
        <Button onClick={() => navigate(`/profile/${userId}`)}>Edit Profile</Button>
      </Grid>
    </Grid>
  );
}

export default Profile;
