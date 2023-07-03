import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { NavLink as RouterNavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { theme } from '../ThemeStyles';
import { ThemeProvider } from '@mui/material/styles';

const NavBar = ({ onLogout, logoutKey }) => {
  const { user, token } = useSelector((state) => state.user);
  const location = useLocation();

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" color="primary" key={logoutKey}>
        <Toolbar>
          <Typography variant="h6" component={RouterNavLink} to="/" color={theme.palette.accent1.main} style={{ textDecoration: 'none', flexGrow: 1 }}>
            SeedMoney
          </Typography>
          {(!user && !token) ? (
            <>
              <Button color="inherit" component={RouterNavLink} to="/login" activeClassName="activeLink">Login</Button>
              <Button color="inherit" component={RouterNavLink} to="/register" activeClassName="activeLink">Register</Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={RouterNavLink} to="/grants" activeClassName="activeLink" className={location.pathname === '/grants' ? 'activeLink' : ''}>Find Grants</Button>
              <Button color="inherit" component={RouterNavLink} to="/applications" activeClassName="activeLink" className={location.pathname === '/applications' ? 'activeLink' : ''}>My Applications</Button>
              <Button color="inherit" component={RouterNavLink} to="/profile" activeClassName="activeLink" className={location.pathname === '/profile' ? 'activeLink' : ''}>{user.first_name}'s Profile`</Button>
              <Button color="inherit" onClick={onLogout} component={RouterNavLink} to="/" exact activeClassName="activeLink" className={location.pathname === '/' ? 'activeLink' : ''}>Logout</Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default NavBar;
