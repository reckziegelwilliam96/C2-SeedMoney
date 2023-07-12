// SideColumn.js
import React from 'react';
import UserSide from './UserSide';
import FarmSide from './FarmSide';
import BusinessSide from './BusinessSide';
import { useSelector } from 'react-redux';
import { Typography, Button, Paper, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { theme } from './ThemeStyles';
import { SideColumnStyles } from './SideColumnStyles';

const SideColumn = () => {
  const userData = useSelector((state) => state.user.user);  
  const farmData = useSelector((state) => state.farm.farm);
  const businessData = useSelector((state) => state.business.business);

  return (
    userData ? (
      <SideColumnStyles as={Paper} elevation={3}>
        <Box mb={2}>
          <Typography variant="h6" className="title" style={{ fontSize: '1.5em', fontWeight: 'bold', color: theme.palette.primary.main }}>
            <UserSide userData={userData} />
          </Typography>
        </Box>
        {businessData ? (
        <Box mb={2}>
          <Typography variant="h6" className="title" style={{ fontSize: '1.5em', fontWeight: 'bold', color: theme.palette.primary.main }}>
            <BusinessSide businessData={businessData} />
          </Typography>
        </Box>
        ) : (
          <Box className="addBtn" style={{ marginTop: theme.spacing(2), marginBottom: theme.spacing(2) }}>
            <Button variant="contained" color="primary" component={Link} to="/addBusiness" style={{ backgroundColor: theme.palette.primary.main, '&:hover': { backgroundColor: theme.palette.primary.dark } }}>
              Add Business
            </Button>
          </Box>
        )}
        {farmData ? (
          <Box mb={2}>
            <Typography variant="h6" className="title" style={{ fontSize: '1.5em', fontWeight: 'bold', color: theme.palette.primary.main }}>
              <FarmSide farmData={farmData} />
            </Typography>
          </Box>
        ) : (
          businessData ? (
            <Box className="addBtn" style={{ marginTop: theme.spacing(2), marginBottom: theme.spacing(2) }}> {/* add marginBottom here */}
              <Button variant="contained" color="primary" component={Link} to="/addFarm" style={{ backgroundColor: theme.palette.primary.main, '&:hover': { backgroundColor: theme.palette.primary.dark } }}>
                Add Farm
              </Button>
            </Box>
          ) : (
            <Box mb={2}>
              <Typography variant="body2" style={{ fontSize: '1em', color: theme.palette.secondary.main }}>
                Please add a business before adding a farm.
              </Typography>
            </Box> 
          )
        )}
      </SideColumnStyles>
    ) : null
  );
};

export default SideColumn;
