import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

function FarmCard({ farmData }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">Farm Information</Typography>
        <Typography variant="body1">
          Size: {farmData.size}
        </Typography>
        <Typography variant="body1">
          Farm Address: {farmData.farm_address}, {farmData.farm_city}, {farmData.farm_state}, {farmData.farm_zip_code}
        </Typography>
        <Typography variant="body1">
          Years of Experience: {farmData.years_of_experience}
        </Typography>
        <Typography variant="body1">
          Types of Crops: {farmData.types_of_crops}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default FarmCard;
