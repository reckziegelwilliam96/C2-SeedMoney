import React from 'react';
import GrantCard from './GrantCard';
import { Grid } from '@mui/material';
import { listStyles } from '../components/ListStyles';

const GrantList = ({ grants }) => {
  return (
    <Grid container spacing={2}>
      {grants.map((grant, index) => (
        <Grid item xs={12} s={4} m={6} key={index} {...listStyles.container}>
          <GrantCard grant={grant} />
        </Grid>
      ))}
    </Grid>
  );
};

export default GrantList;
