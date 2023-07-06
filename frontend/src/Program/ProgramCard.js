import React from 'react';
import { styled } from '@mui/system';
import { Card, CardContent, CardActions, Button, Typography } from '@mui/material';

const ProgramCardContainer = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

const ProgramTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.2rem',
  marginBottom: theme.spacing(1),
}));

const ProgramDescription = styled(Typography)(({ theme }) => ({
  flex: '1 0 auto',
}));

const ProgramCard = ({ program }) => {
  return (
    <ProgramCardContainer>
      <CardContent>
        <ProgramTitle variant="h6" component="h3">
          {program.title}
        </ProgramTitle>
        <ProgramDescription variant="body1">
          {program.description}
        </ProgramDescription>
      </CardContent>
      <CardActions>
        <Button variant="contained" color="primary" href={program.link}>
          Learn More
        </Button>
      </CardActions>
    </ProgramCardContainer>
  );
};

export default ProgramCard;
