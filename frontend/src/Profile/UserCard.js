import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { cardStyles } from '../ThemeStyles';

function UserCard({ userData }) {
  return (
    <Card sx={cardStyles.root}>
      <CardContent>
        <Typography variant="h5" component="div">User Profile</Typography>
        <Typography variant="body1" sx={{ marginBottom: cardStyles.root.marginBottom }}>
          Name: {userData.first_name} {userData.last_name}
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: cardStyles.root.marginBottom }}>
          Email: {userData.email}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default UserCard;
