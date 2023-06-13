import React from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';

function FarmCard({ farmData }) {
  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Farm Information</CardTitle>
        <p>Size: {farmData.size}</p>
        <p>Years of Experience: {farmData.years_of_experience}</p>
        <p>Types of Crops: {farmData.types_of_crops}</p>
        <p>Organic Certification: {farmData.organic_certification}</p>
        <p>Sustainability Practices: {farmData.sustainability_practices}</p>
        <p>Annual Farm Revenue: {farmData.annual_farm_revenue}</p>
        <p>Profitability: {farmData.profitability}</p>
        <p>Farm Address: {farmData.farm_address}, {farmData.farm_city}, {farmData.farm_state}, {farmData.farm_zip_code}</p>
        <p>Filing Status: {farmData.filing_status}</p>
        <p>Tax Forms Filed: {farmData.tax_forms_filed}</p>
        <p>Previous Application: {farmData.previous_application}</p>
        <p>Grant Outcome: {farmData.grant_outcome}</p>
      </CardBody>
    </Card>
  );
}

export default FarmCard;
