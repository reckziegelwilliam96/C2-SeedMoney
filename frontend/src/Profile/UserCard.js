import React from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';

function UserCard({ userData }) {
  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">User Profile</CardTitle>
        <p>Name: {userData.first_name} {userData.last_name}</p>
        <p>Email: {userData.email}</p>
      </CardBody>
    </Card>
  );
}

export default UserCard;
