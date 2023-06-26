import React from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';
import { useSelector } from 'react-redux';

const ApplicationDetail = () => {
  const application = useSelector(state => state.application.application);

  return (
      <Card>
        <CardBody>
          <CardTitle tag="h5">Farm Name: {application.farm_name}</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">Status: {application.app_status}</CardSubtitle>
          <CardText>Location: {application.farm_location}</CardText>
          <CardText>Size: {application.farm_size}</CardText>
          <CardText>Revenue: {application.farm_revenue}</CardText>
          <CardText>Crops Grown: {application.crops_grown.join(', ')}</CardText>
          <CardText>Animals Raised: {application.animals_raised.join(', ')}</CardText>
          <CardText>Application Proposal: {application.app_proposal}</CardText>
          <CardText>Submission Date: {new Date(application.app_submission_date).toDateString()}</CardText>
          <CardText>Response Date: {application.app_response_date ? new Date(application.app_response_date).toDateString() : 'Not yet responded'}</CardText>
  
          <hr />
  
          <CardTitle tag="h5">Grant Details</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">{application.grant_name}</CardSubtitle>
          <CardText>Description: {application.program_description}</CardText>
        </CardBody>
      </Card>
  );
};

export default ApplicationDetail;
