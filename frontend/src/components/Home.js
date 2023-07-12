// Home.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Typography, Button, Box, Container, Paper, ThemeProvider, Grid } from '@mui/material';
import Dashboard from '../Dashboard/Dashboard';
import Program from '../Program/Program';
import { Link } from 'react-router-dom';
import { theme } from './ThemeStyles'; // Please adjust this import path to where your theme is actually located
import SideColumn from './SideColumn';
import { HomeContainer, Title, Slogan, WelcomeMessage, ButtonContainer, MainContent } from './HomeStyles'; // import the styles

const Home = () => {
  const { user, token } = useSelector((state) => state.user);

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl">
        <HomeContainer>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <SideColumn />
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ padding: 3, width: '100%' }}>
                <Title>SeedMoney</Title>
                <Slogan>Plant tomorrow's financial seeds today.</Slogan>
                {token && user ? (
                  <>
                    <WelcomeMessage>Welcome back, {user?.first_name}</WelcomeMessage>
                    <hr />
                    <Program />
                  </>
                ) : (
                  <ButtonContainer>
                    <Button
                      variant="contained"
                      color="primary"
                      component={Link}
                      to="/login"
                    >
                      Log In
                    </Button>
                    <Button variant="contained" color="secondary" component={Link} to="/register">
                      Register
                    </Button>
                  </ButtonContainer>
                )}
              </Paper>
            </Grid>
            <Grid item xs={12} md={3}>
              <Paper elevation={3} sx={{ padding: 3, width: '100%' }}>
                {token && user ? (
                  <Dashboard />
                ) : (
                  <Typography variant="h6" className="title" style={{ fontSize: '1.5em', fontWeight: 'bold', color: theme.palette.primary.main }}>
                    Please log in or register to view your dashboard.
                  </Typography>
                )}
              </Paper>
            </Grid>
          </Grid>
        </HomeContainer>
      </Container>
    </ThemeProvider>
  );
};

export default Home;
