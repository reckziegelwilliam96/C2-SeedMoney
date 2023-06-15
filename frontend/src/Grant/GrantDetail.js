import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import SeedMoneyApi from '../SeedMoneyApi';

const GrantDetail = ({ grantId }) => {
  const [grant, setGrant] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

    useEffect(() => {
        async function getGrant(grantId) {
            setIsLoading(true);
            const grant = await SeedMoneyApi.getGrant(grantId);
            setGrant(grant);
            setIsLoading(false);
        } 
        getGrant(grantId);
    }, [grantId]);

  const handleApplyClick = () => {
    navigate(`/application/${grantId}`)
  };

  if (isLoading){
    return <p>Loading &hellip; </p>;
  }

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
