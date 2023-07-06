import React, { useEffect, useState, useCallback } from 'react';
import { Typography } from '@mui/material';
import SeedMoneyApi from '../SeedMoneyApi';
import ProgramList from './ProgramList';

const Programs = () => {
    const [programs, setPrograms] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getPrograms = useCallback(async() => {
      try {
        setIsLoading(true);
        let programResponse =  SeedMoneyApi.getPrograms();
        let programData = await programResponse;
        setPrograms(programData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching programs:', error);
      }
    },[]);

    useEffect(()=> {
        getPrograms();
    }, [getPrograms]);

    if (isLoading) {
        return <p> Loading &hellip; </p>;
    }

  return (
    <div>
      <Typography variant="h5">
        Programs
      </Typography>
      <ProgramList programs={programs} />
    </div>
  );
};

export default Programs;
