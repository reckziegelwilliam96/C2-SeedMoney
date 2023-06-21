import React from 'react';
import { Card, Button, CardTitle, CardText } from 'reactstrap';
import { Link } from 'react-router-dom';

const GrantCard = ({ grant }) => {
    return (
        <Card body>
            <CardTitle tag="h5">{grant.grant_name}</CardTitle>
            <CardText>{grant.program_description}</CardText>
            <Button tag={Link} to={`/grants/${grant.id}`}>
                View Details
            </Button>
        </Card>
    );
};

export default GrantCard;
