import React from 'react';
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentApplication, removeCurrentApplication } from '../store/actions/applicationActions';
import { cardStyles } from '../ThemeStyles';

const ApplicationCard = ({ applicationData }) => {
  const currentApplication = useSelector((state) => state.application.application);
  const dispatch = useDispatch();

  const handleClick = () => {
    if (currentApplication) {
      dispatch(removeCurrentApplication());
    }
    dispatch(setCurrentApplication(applicationData));
  };

  return (
    <Card sx={cardStyles.root}>
      <CardContent>
        <Typography variant="h5" component="div">Application #{applicationData.id}</Typography>
        <Typography variant="body1">{applicationData.app_proposal}</Typography>
      </CardContent>
      <CardActions>
        <Button onClick={handleClick} component={Link} to={`/applications/detail/${applicationData.id}`} variant="contained" sx={cardStyles.button}>
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default ApplicationCard;
