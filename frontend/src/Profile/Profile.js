import React, { useEffect, useState } from 'react';
import { Button, Card, CardContent, Typography, Grid, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import SeedMoneyApi from '../SeedMoneyApi';
import UserCard from './UserCard';
import FarmCard from './FarmCard';
import BusinessCard from './BusinessCard';
import ApplicationCard from './ApplicationCard';
import { useTheme } from '@mui/material/styles';
import { ProfileStyles as classes } from './ProfileStyles';

function Profile() {
  const theme = useTheme();
  const navigate = useNavigate();

  const userId = useSelector((state) => state.user.user.id);
  const farm = useSelector((state) => state.farm.farm);
  const business = useSelector((state) => state.business.business);
  const application = useSelector((state) => state.application.application);

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
        setUserData(userDetails);
  
        // Only fetch farm and business details if the user has a farm and business
        if (farm) {
          const farmDetails = await SeedMoneyApi.getUserFarms(userId);
          setFarmData(farmDetails);
        }
  
        if (business) {
          const businessDetails = await SeedMoneyApi.getUserBusinesses(userId);
          setBusinessData(businessDetails);
        }
        if (application) {
          const userApplications = await SeedMoneyApi.getUserApplications(userId);
          setApplications(userApplications);
        }

        setIsLoading(false);
      } catch (error) {
        setError(error);
      }
    }
  
    fetchData();
  }, [userId, farm, business, application]);
  

  if (error) return <div>Error: {error.message}</div>;
  if (isLoading) return <CircularProgress />;

  return (
    <Grid container spacing={2} style={classes.root}>
      <Grid item xs={12} style={classes.gridItem}>
        <Card style={classes.card}>
          <CardContent style={classes.cardContent}>
            <Typography variant="h6" component="div" style={classes.title}>Profile</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} style={classes.gridItem}>
        <UserCard userData={userData} />
      </Grid>
      {farm && farmData.length > 0 ? (
        farmData.map((farm, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} style={classes.gridItem}>
            <FarmCard farmData={farm} />
          </Grid>
        ))
      ) : (
        <Grid item xs={12} style={classes.gridItem}>
          <Button onClick={() => navigate(`/addFarm`)} style={classes.button}>Add Farm</Button>
        </Grid>
      )}
      {business && businessData.length > 0 ? (
        businessData.map((business, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} style={classes.gridItem}>
            <BusinessCard businessData={business} />
          </Grid>
        ))
      ) : (
        <Grid item xs={12} style={classes.gridItem}>
          <Button onClick={() => navigate(`/addBusiness`)} style={classes.button}>Add Business</Button>
        </Grid>
      )}
      {applications.map((application, index) => (
        <Grid item xs={12} sm={6} md={4} key={index} style={classes.gridItem}>
          <ApplicationCard applicationData={application} />
        </Grid>
      ))}
      <Grid item xs={12} style={classes.gridItem}>
        <Button onClick={() => navigate(`/profile/${userId}`)} style={classes.button}>Edit Profile</Button>
      </Grid>
    </Grid>
  );
}

export default Profile;
