import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import SeedMoneyApi from '../SeedMoneyApi';
import { Typography, Grid } from '@mui/material';
import Grants from '../Grant/Grant';
import GrantList from '../Grant/GrantList';
import { getRecommendedApplications } from './Recommendations';
import { dashboardStyles } from './DashboardStyles';

const Dashboard = () => {
  const farmerData = useSelector(state => state.farm.farm);
  const [recommendedApplications, setRecommendedApplications] = useState([]);
  const [grants, setGrants] = useState([]);

  useEffect(() => {
    if (farmerData) {
      fetchRecommendedApplications();
    }
  }, [farmerData]);

  const fetchRecommendedApplications = async () => {
    try {
      const grants = await SeedMoneyApi.getGrants();
      const recommended = getRecommendedApplications(grants, farmerData);
      setRecommendedApplications(recommended);
      setGrants(grants);
    } catch (error) {
      console.error('Error fetching recommended applications:', error);
    }
  };

  return (
    <div>
      <Typography variant="h5" sx={dashboardStyles.title}>
        Recommended Applications
      </Typography>
      <Grid container spacing={2}>
        {recommendedApplications.length > 0 ? (
          recommendedApplications.map(application => (
            <Grid item xs={12} sm={6} md={4} key={application.id}>
              <Grants grants={application} />
            </Grid>
          ))
        ) : (
          <Typography variant="body1" sx={dashboardStyles.noApplications}>
            <GrantList grants={grants} />
          </Typography>
        )}
      </Grid>
    </div>
  );
};

export default Dashboard;
