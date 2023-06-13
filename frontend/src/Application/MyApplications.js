import React, { useState, useEffect } from 'react';
import ApplicationList from './ApplicationList';

const MyApplications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    // fetch applications data from server here, 
    // setApplications(data)
  }, []);

  return (
    <div>
      <h1>My Applications</h1>
      <ApplicationList applications={applications} />
    </div>
  );
};

export default MyApplications;
