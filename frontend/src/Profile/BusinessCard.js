import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { cardStyles } from '../ThemeStyles';

function BusinessCard({ businessData }) {
  return (
    <Card sx={cardStyles.root}>
      <CardContent>
        <Typography variant="h5" component="div">Business Information</Typography>
        <Typography variant="body1" sx={{ marginBottom: cardStyles.root.marginBottom }}>
          Business Name: {businessData.business_name}
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: cardStyles.root.marginBottom }}>
          Business Address: {businessData.business_address}
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: cardStyles.root.marginBottom }}>
          Tax ID: {businessData.tax_id}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default BusinessCard;
