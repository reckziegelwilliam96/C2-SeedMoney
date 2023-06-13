import React from 'react';
import { Card, CardBody, CardTitle, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

const ApplicationCard = ({ application }) => {
  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">{application.name}</CardTitle>
        <Button tag={Link} to={`/applications/${application.id}`}>View Details</Button>
      </CardBody>
    </Card>
  );
};

export default ApplicationCard;
