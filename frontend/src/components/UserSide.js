import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

function UserCard({ userData }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h7" component="div">User Profile</Typography>
        <Typography variant="body1">
          Name: {userData.first_name} {userData.last_name}
        </Typography>
        <Typography variant="body1">
          Email: {userData.email}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default UserCard;
