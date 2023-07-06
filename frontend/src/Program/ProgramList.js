import React from 'react';
import ProgramCard from './ProgramCard';
import { Grid } from '@mui/material';

const ProgramList = ({ programs }) => {
  return (
    <Grid container spacing={2}>
      {programs.map((program) => (
        <Grid item key={program.id}>
          <ProgramCard program={program} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProgramList;
