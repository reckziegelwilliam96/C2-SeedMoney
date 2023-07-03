import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { cardStyles } from '../ThemeStyles';

function FarmCard({ farmData }) {
  return (
    <Card sx={cardStyles.root}>
      <CardContent>
        <Typography variant="h5" component="div">Farm Information</Typography>
        <Typography variant="body1" sx={{ marginBottom: cardStyles.root.marginBottom }}>
          Size: {farmData.size}
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: cardStyles.root.marginBottom }}>
          Years of Experience: {farmData.years_of_experience}
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: cardStyles.root.marginBottom }}>
          Types of Crops: {farmData.types_of_crops}
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: cardStyles.root.marginBottom }}>
          Organic Certification: {farmData.organic_certification}
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: cardStyles.root.marginBottom }}>
          Sustainability Practices: {farmData.sustainability_practices}
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: cardStyles.root.marginBottom }}>
          Annual Farm Revenue: {farmData.annual_farm_revenue}
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: cardStyles.root.marginBottom }}>
          Profitability: {farmData.profitability}
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: cardStyles.root.marginBottom }}>
          Farm Address: {farmData.farm_address}, {farmData.farm_city}, {farmData.farm_state}, {farmData.farm_zip_code}
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: cardStyles.root.marginBottom }}>
          Filing Status: {farmData.filing_status}
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: cardStyles.root.marginBottom }}>
          Tax Forms Filed: {farmData.tax_forms_filed}
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: cardStyles.root.marginBottom }}>
          Previous Application: {farmData.previous_application}
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: cardStyles.root.marginBottom }}>
          Grant Outcome: {farmData.grant_outcome}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default FarmCard;
