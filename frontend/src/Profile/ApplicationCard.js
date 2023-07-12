import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { cardStyles } from '../components/CardStyles';

function ApplicationCard({ applicationData }) {
  return (
    <Card sx={cardStyles.root}>
      <CardContent>
        <Typography variant="h5" component="div">Application #{applicationData.id}</Typography>
        <Typography variant="body1" sx={{ marginBottom: cardStyles.root.marginBottom }}>
          Proposal: {applicationData.app_proposal}
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: cardStyles.root.marginBottom }}>
          Status: {applicationData.app_status}
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: cardStyles.root.marginBottom }}>
          Submission Date: {new Date(applicationData.app_submission_date).toLocaleDateString()}
        </Typography>
        {applicationData.app_response_date && (
          <Typography variant="body1" sx={{ marginBottom: cardStyles.root.marginBottom }}>
            Response Date: {new Date(applicationData.app_response_date).toLocaleDateString()}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

export default ApplicationCard;
