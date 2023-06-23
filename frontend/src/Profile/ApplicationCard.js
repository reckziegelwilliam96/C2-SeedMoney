import React from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';

function ApplicationCard({ applicationData }) {
  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Application #{applicationData.id}</CardTitle>
        <p>Proposal: {applicationData.app_proposal}</p>
        <p>Status: {applicationData.app_status}</p>
        <p>Submission Date: {new Date(applicationData.app_submission_date).toLocaleDateString()}</p>
        {applicationData.app_response_date && <p>Response Date: {new Date(applicationData.app_response_date).toLocaleDateString()}</p>}
      </CardBody>
    </Card>
  );
}

export default ApplicationCard;
