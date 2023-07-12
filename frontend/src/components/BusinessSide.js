import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

function BusinessCard({ businessData }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h7" component="div">Business Profile</Typography>
        <Typography variant="body1">
          Name: {businessData.business_name}
        </Typography>
        <Typography variant="body1">
          Address: {businessData.business_address}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default BusinessCard;
