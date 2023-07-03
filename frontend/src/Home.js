import React from 'react';
import { useSelector } from 'react-redux';
import { Typography, Button, Box, Container, Paper, ThemeProvider } from '@mui/material';
import { Link } from 'react-router-dom';
import { theme } from './ThemeStyles'; // Please adjust this import path to where your theme is actually located

const Home = () => {
    const { user, token } = useSelector((state) => state.user);

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="sm">
                <Box my={4}>
                    <Paper elevation={3} sx={{ padding: 3 }}>
                        <Typography variant="h4" gutterBottom>
                            SeedMoney
                        </Typography>
                        <Typography variant="subtitle1">
                            Plant tomorrow's financial seeds today..
                        </Typography>
                        {(token && user) ? (
                            <Typography variant="h6">Welcome back, {user?.first_name}</Typography>
                        ) : (
                            <Box mt={2}>
                                <Link to="/login" style={{ textDecoration: 'none' }}>
                                    <Button variant="contained" color="primary" sx={{ mr: 2 }}>
                                        Log In
                                    </Button>
                                </Link>
                                <Link to="/register" style={{ textDecoration: 'none' }}>
                                    <Button variant="contained" color="secondary">
                                        Register
                                    </Button>
                                </Link>
                            </Box>
                        )}
                    </Paper>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default Home;
