import React from 'react';
import ApplicationCard from './ApplicationCard';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import { applicationStyles } from './ApplicationStyles';
import { theme } from '../components/ThemeStyles';

const ApplicationList = ({ applications }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card sx={{ backgroundColor: theme.palette.accent1.main, boxShadow: theme.shadows[1] }}>
          <CardContent>
            <Typography variant="h6" component="div">My Applications</Typography>
          </CardContent>
        </Card>
      </Grid>
      {applications.map((application, index) => (
        <Grid item xs={12} sm={6} md={4} key={index} sx={applicationStyles.list.container}>
          <ApplicationCard applicationData={application} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ApplicationList;
