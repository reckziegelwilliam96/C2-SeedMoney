import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { cardStyles } from './CardStyles';

function BusinessCard({ businessData }) {
  return (
    <Card sx={cardStyles.root}>
      <CardContent>
        <Typography variant="h5" component="div">Business Information</Typography>
        <Typography variant="body1" sx={{ marginBottom: cardStyles.root.marginBottom }}>
          Business Name: {businessData.business_name}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default BusinessCard;
