import React from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentApplication, removeCurrentApplication } from '../store/actions/applicationActions';

const ApplicationCard = ({ application }) => {
  const currentApplication = useSelector(state => state.application.application);
  const dispatch = useDispatch();

  const handleClick = () => {
    if (currentApplication) {
      dispatch(removeCurrentApplication());
    }
    dispatch(setCurrentApplication(application));
  }

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">{application.farm_name}</CardTitle>
        <CardSubtitle className="mb-2 text-muted">Grant: {application.grant_name}</CardSubtitle>
        <CardSubtitle className="mb-2 text-muted">Status: {application.app_status}</CardSubtitle>
        <Button onClick={handleClick} tag={Link} to={`/applications/detail/${application.id}`}>View Details</Button>
      </CardBody>
    </Card>
  );
};

export default ApplicationCard;
