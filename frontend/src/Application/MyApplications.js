import React, { useState, useEffect, useCallback } from 'react';
import ApplicationList from './ApplicationList';
import { useSelector } from 'react-redux';
import SeedMoneyApi from '../SeedMoneyApi';


const MyApplications = () => {
  const { id } = useSelector(state => state.user.id)
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getApplications = useCallback(async() => {
    setIsLoading(true);
    let applicationsPromise = SeedMoneyApi.getApplications(id)
    let applicationsData = await applicationsPromise;
    setApplications(applicationsData.applications);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    getApplications();
  }, [getApplications]);

  if (isLoading) {
    return <p> Loading &hellip; </p>;
  }

  return (
    <div>
      <h1>My Applications</h1>
      <ApplicationList applications={applications} />
    </div>
  );
};

export default MyApplications;
