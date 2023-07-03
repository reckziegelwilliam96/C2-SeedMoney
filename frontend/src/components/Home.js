import React from 'react';
import { useSelector } from 'react-redux';
import { Typography, Button, Box, Container, Paper, ThemeProvider } from '@mui/material';
import Dashboard from '../Dashboard/Dashboard';
import { Link } from 'react-router-dom';
import { theme } from '../ThemeStyles'; // Please adjust this import path to where your theme is actually located

const Home = () => {
  const { user, token } = useSelector((state) => state.user);

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        <Box my={4} display="flex" flexDirection="column" alignItems="center">
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
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Home;
