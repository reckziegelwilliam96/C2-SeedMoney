// SideColumn.js
import React from 'react';
import UserSide from './UserSide';
import FarmSide from './FarmSide';
import BusinessSide from './BusinessSide';
import { useSelector } from 'react-redux';
import { Typography, Button, Paper, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { SideColumnStyles } from './SideColumnStyles';

const SideColumn = () => {
  const userData = useSelector((state) => state.user.user);  
  const farmData = useSelector((state) => state.farm.farm);
  const businessData = useSelector((state) => state.business.business);

  return (
    userData ? (
      <SideColumnStyles as={Paper} elevation={3}>
        <Typography variant="h6" className="title">
          <UserSide userData={userData} />
        </Typography>
        {businessData ? (
          <Typography variant="body1">
            <BusinessSide businessData={businessData} />
          </Typography>
        ) : (
          <Box className="addBtn">
            <Button variant="contained" color="primary" component={Link} to="/addBusiness">
              Add Business
            </Button>
          </Box>
        )}
        {farmData ? (
          <Typography variant="body1">
            <FarmSide farmData={farmData} />
          </Typography>
        ) : (
          businessData ? (
            <Box className="addBtn">
              <Button variant="contained" color="primary" component={Link} to="/addFarm">
                Add Farm
              </Button>
            </Box>
          ) : (
            <Typography variant="body2">
              Please add a business before adding a farm.
            </Typography>
          )
        )}
      </SideColumnStyles>
    ) : null
  );
};

export default SideColumn;
