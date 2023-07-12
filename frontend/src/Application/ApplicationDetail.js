import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { cardStyles } from '../components/CardStyles';

const ApplicationDetail = () => {
  const application = useSelector((state) => state.application.application);

  return (
    <Card sx={cardStyles.root}>
      <CardContent>
        <Typography variant="h5" component="div">Application #{application.id}</Typography>
        <Typography variant="h6">Status: {application.app_status}</Typography>
        <Typography variant="body1">Proposal: {application.app_proposal}</Typography>
        <Typography variant="body1">Location: {application.farm_location}</Typography>
        <Typography variant="body1">Size: {application.farm_size}</Typography>
        <Typography variant="body1">Revenue: {application.farm_revenue}</Typography>
        <Typography variant="body1">Crops Grown: {application.crops_grown.join(', ')}</Typography>
        <Typography variant="body1">Animals Raised: {application.animals_raised.join(', ')}</Typography>
        <Typography variant="body1">Application Proposal: {application.app_proposal}</Typography>
        <Typography variant="body1">
          Submission Date: {new Date(application.app_submission_date).toDateString()}
        </Typography>
        <Typography variant="body1">
          Response Date:{' '}
          {application.app_response_date
            ? new Date(application.app_response_date).toDateString()
            : 'Not yet responded'}
        </Typography>

        <hr />

        <Typography variant="h5" component="div">Grant Details</Typography>
        <Typography variant="h6">
          {application.grant_name}
        </Typography>
        <Typography variant="body1">Description: {application.program_description}</Typography>
      </CardContent>
    </Card>
  );
};

export default ApplicationDetail;