import React from 'react';
import ApplicationCard from './ApplicationCard';

const ApplicationList = ({ applications }) => {
  console.log(applications)
  return (
    <div>
      {applications && applications.map(application => (
        <ApplicationCard key={application.id} application={application} />
      ))}
    </div>
  );
};

export default ApplicationList;