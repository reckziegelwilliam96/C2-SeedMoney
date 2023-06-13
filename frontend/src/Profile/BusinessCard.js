import React from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';

function BusinessCard({ businessData }) {
  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Business Information</CardTitle>
        <p>Business Name: {businessData.business_name}</p>
        <p>Business Address: {businessData.business_address}</p>
        <p>Tax ID: {businessData.tax_id}</p>
      </CardBody>
    </Card>
  );
}

export default BusinessCard;
