import React from 'react';
import { Card, CardContent, CardActions, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { cardStyles } from '../ThemeStyles';

const GrantCard = ({ grant }) => {
  return (
    <Card sx={cardStyles.root}>
      <CardContent>
        <Typography variant="h5" component="div">{grant.grant_name}</Typography>
        <Typography variant="body1">{grant.program_description}</Typography>
      </CardContent>
      <CardActions>
        <Button component={Link} to={`/grants/${grant.id}`} variant="contained" sx={cardStyles.button}>
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default GrantCard;
