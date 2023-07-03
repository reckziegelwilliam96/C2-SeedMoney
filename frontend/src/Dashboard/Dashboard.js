import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import SeedMoneyApi from '../SeedMoneyApi';
import { Typography, Grid } from '@mui/material';
import ApplicationCard from '../Profile/ApplicationCard';
import { getRecommendedApplications } from './Recommendations';
import { dashboardStyles } from './DashboardStyles';

const Dashboard = () => {
  const farmerData = useSelector(state => state.farm.farm);
  const [recommendedApplications, setRecommendedApplications] = useState([]);

  useEffect(() => {
    if (farmerData) {
      fetchRecommendedApplications();
    }
  }, [farmerData]);

  const fetchRecommendedApplications = async () => {
    try {
      const applications = await SeedMoneyApi.getApplications();
      const recommended = getRecommendedApplications(applications, farmerData);
      setRecommendedApplications(recommended);
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
              <ApplicationCard applicationData={application} />
            </Grid>
          ))
        ) : (
          <Typography variant="body1" sx={dashboardStyles.noApplications}>
            No recommended applications found.
          </Typography>
        )}
      </Grid>
    </div>
  );
};

export default Dashboard;
