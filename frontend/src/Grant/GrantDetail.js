import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap';
import { useHistory } from 'react-router-dom';

const GrantDetail = ({ match }) => {
  const [grant, setGrant] = useState(null);
  const grantId = match.params.id;
  const history = useHistory();

  useEffect(() => {
    // fetch grant data from server here based on grantId
    // setGrant(data)
  }, [grantId]);

  const handleApplyClick = () => {
    // you can pass state to your route if needed
    history.push({
      pathname: `/apply/${grantId}`,
      state: { grant }
    });
  };

  if (!grant) return <p>Loading...</p>;

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">{grant.name}</CardTitle>
        <CardSubtitle tag="h6" className="mb-2 text-muted">{grant.status}</CardSubtitle>
        <CardText>{grant.description}</CardText>
        <Button onClick={handleApplyClick}>Apply</Button>
        {/* add more details as needed */}
      </CardBody>
    </Card>
  );
};

export default GrantDetail;
