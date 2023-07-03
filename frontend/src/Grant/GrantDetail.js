import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardSubtitle, CardContent, Typography, Button, CircularProgress, CardActions } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setCurrentApplication, removeCurrentApplication } from '../store/actions/applicationActions';
import SeedMoneyApi from '../SeedMoneyApi';
import { cardStyles } from '../ThemeStyles';

const GrantDetail = () => {
  const { grantId } = useParams();
  const [grant, setGrant] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    async function getGrant() {
      setIsLoading(true);
      try {
        const grantData = await SeedMoneyApi.getGrant(grantId);
        setGrant(grantData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching grant:', error);
        setIsLoading(false);
      }
    }
    getGrant();
  }, [grantId]);

  const handleApplyClick = () => {
    dispatch(removeCurrentApplication());
    dispatch(setCurrentApplication(grant));
    navigate(`/applications/form/${grantId}`);
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Card sx={cardStyles.root}>
      <CardContent>
        <Typography variant="h5" component="div">{grant.grant_name}</Typography>
        <Typography variant="h6">{grant.program_description}</Typography>
        <Typography variant="body1">{grant.application_window}</Typography>
        <Typography variant="body1">{grant.program_description}</Typography>
        <Typography variant="body1">{grant.applicant_eligibility}</Typography>
        <Typography variant="body1">{grant.eligible_area}</Typography>
        <Typography variant="body1">{grant.use_of_funds}</Typography>
        <Typography variant="body1">{grant.grant_terms}</Typography>
        <Typography variant="body1">{grant.getting_started}</Typography>
        <Typography variant="body1">{grant.contact_information}</Typography>
        <Typography variant="body1">{grant.governing_law}</Typography>
        <Typography variant="body1">{grant.program_id}</Typography>
      </CardContent>
      <CardActions>
        <Button onClick={handleApplyClick} variant="contained" sx={cardStyles.button}>
          Apply
        </Button>
      </CardActions>
    </Card>
  );
};

export default GrantDetail;


