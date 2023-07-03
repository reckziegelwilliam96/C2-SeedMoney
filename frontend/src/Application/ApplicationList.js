import React from 'react';
import ApplicationCard from './ApplicationCard';
import { Grid } from '@mui/material';
import { applicationStyles } from '../ThemeStyles';

const ApplicationList = ({ applications }) => {
  return (
    <Grid container spacing={2}>
      {applications.map((application, index) => (
        <Grid item xs={12} sm={6} md={4} key={index} sx={applicationStyles.list.container}>
          <ApplicationCard applicationData={application} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ApplicationList;
