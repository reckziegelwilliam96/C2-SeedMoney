// Home.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Typography, Button, Box, Container, Paper, ThemeProvider, Grid } from '@mui/material';
import Dashboard from '../Dashboard/Dashboard';
import Program from '../Program/Program';
import { Link } from 'react-router-dom';
import { theme } from './ThemeStyles'; // Please adjust this import path to where your theme is actually located
import SideColumn from './SideColumn';


const Home = () => {
  const { user, token } = useSelector((state) => state.user);

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl">
        <Box my={4} display="flex" flexDirection="column" alignItems="center">
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <SideColumn />
            </Grid>
            <Grid item xs={12} md={8}>
              <Paper elevation={3} sx={{ padding: 3, width: '100%', maxWidth: 400 }}>
                <Typography variant="h4" gutterBottom align="center">
                  SeedMoney
                </Typography>
                <Typography variant="subtitle1" align="center" sx={{ marginBottom: 2 }}>
                  Plant tomorrow's financial seeds today.
                </Typography>
                {token && user ? (
                  <>
                    <Typography variant="h6" align="center">
                      Welcome back, {user?.first_name}
                    </Typography>
                    <hr />
                    <Dashboard />
                    <hr />
                    <Program />
                  </>
                ) : (
                  <Box mt={2} display="flex" justifyContent="center">
                    <Button
                      variant="contained"
                      color="primary"
                      component={Link}
                      to="/login"
                      sx={{ marginRight: 2 }}
                    >
                      Log In
                    </Button>
                    <Button variant="contained" color="secondary" component={Link} to="/register">
                      Register
                    </Button>
                  </Box>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Home;
