import React, { useState, useEffect, useCallback } from 'react';
import ApplicationList from './ApplicationList';
import { useSelector } from 'react-redux';
import SeedMoneyApi from '../SeedMoneyApi';
import { CircularProgress } from '@mui/material';

const MyApplications = () => {
  const id = useSelector((state) => state.user.user.id);
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getApplications = useCallback(async () => {
    setIsLoading(true);
    try {
      const applicationsData = await SeedMoneyApi.getUserApplications(id);
      setApplications(applicationsData);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching applications:', error);
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    getApplications();
  }, [getApplications]);

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <div>
      <ApplicationList applications={applications} />
    </div>
  );
};

export default MyApplications;
