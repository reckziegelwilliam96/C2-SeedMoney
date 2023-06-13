import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <Navbar color="light" light expand="md">
      <NavbarBrand tag={Link} to="/">SeedMoney</NavbarBrand>
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink tag={Link} to="/login">Login</NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to="/register">Register</NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to="/profile">Profile</NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default NavBar;