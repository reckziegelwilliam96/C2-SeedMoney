import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';

const ApplicationDetail = ({ match }) => {
  const [application, setApplication] = useState(null);
  const applicationId = match.params.id;

  useEffect(() => {
    // fetch application data from server here based on applicationId
    // setApplication(data)
  }, [applicationId]);

  if (!application) return <p>Loading...</p>;

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">{application.name}</CardTitle>
        <CardSubtitle tag="h6" className="mb-2 text-muted">{application.status}</CardSubtitle>
        <CardText>{application.description}</CardText>
        {/* add more details as needed */}
      </CardBody>
    </Card>
  );
};

export default ApplicationDetail;
