import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap';
import { useNavigate, useParams } from 'react-router-dom';
import SeedMoneyApi from '../SeedMoneyApi';

const GrantDetail = () => {
  const { grantId } = useParams();
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
    navigate(`/applications/${grantId}`)
  };

  if (isLoading){
    return <p>Loading &hellip; </p>;
  }

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">{grant.grant_name}</CardTitle>
        <CardSubtitle tag="h6" className="mb-2 text-muted">{grant.application_window}</CardSubtitle>
        <CardText>{grant.program_description}</CardText>
        <CardText>{grant.applicant_eligibility}</CardText>
        <CardText>{grant.eligible_area}</CardText>
        <CardText>{grant.use_of_funds}</CardText>
        <CardText>{grant.grant_terms}</CardText>
        <CardText>{grant.getting_started}</CardText>
        <CardText>{grant.contact_information}</CardText>
        <CardText>{grant.governing_law}</CardText>
        <CardText>{grant.program_id}</CardText>
        <Button onClick={handleApplyClick}>Apply</Button>
        {/* add more details as needed */}
      </CardBody>
    </Card>
  );

};

export default GrantDetail;
