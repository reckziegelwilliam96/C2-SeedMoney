import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { theme } from '../ThemeStyles';
import { ThemeProvider } from '@mui/material/styles';

const NavBar = ({ onLogout, logoutKey }) => {
  const { user, token } = useSelector((state) => state.user);

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" color="primary" key={logoutKey}>
        <Toolbar>
          <Typography variant="h6" component={RouterLink} to="/" color="inherit" style={{ textDecoration: 'none', flexGrow: 1 }}>
            SeedMoney
          </Typography>
          {(!user && !token) ? (
            <>
              <Button color="inherit" component={RouterLink} to="/login">Login</Button>
              <Button color="inherit" component={RouterLink} to="/register">Register</Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={RouterLink} to="/grants">Find Grants</Button>
              <Button color="inherit" component={RouterLink} to="/applications">My Applications</Button>
              <Button color="inherit" component={RouterLink} to="/profile">Profile</Button>
              <Button color="inherit" onClick={onLogout} component={RouterLink} to="/">Logout</Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default NavBar;
