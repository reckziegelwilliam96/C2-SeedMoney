import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from './store/actions/userActions';

const NavBar = () => {
    const user = useSelector(state => {
        console.log('User State:', state.user);
        return state.user;
      });
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <Navbar color="light" light expand="md">
      <NavbarBrand tag={Link} to="/">SeedMoney</NavbarBrand>
      <Nav className="ml-auto" navbar>
        {user === null ? (
          <>
            <NavItem>
              <NavLink tag={Link} to="/login">Login</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/register">Register</NavLink>
            </NavItem>
          </>
        ) : (
          <>
            <NavItem>
              <NavLink tag={Link} to="/grants">Find Grants</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/applications">My Applications</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/profile">Profile</NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={handleLogout} tag={Link} to="/logout">Logout</NavLink>
            </NavItem>
          </>
        )}
      </Nav>
    </Navbar>
  );
};

export default NavBar;
