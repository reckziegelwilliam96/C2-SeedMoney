import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


const NavBar = ({onLogout, logoutKey}) => {
    const { user, token } = useSelector((state) => state.user);

  return (
    <Navbar color="light" light expand="md" key={logoutKey}>
      <NavbarBrand tag={Link} to="/">SeedMoney</NavbarBrand>
      <Nav className="ml-auto" navbar>
        {(!user && !token) ? (
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
              <NavLink onClick={onLogout} tag={Link} to="/">Logout</NavLink>
            </NavItem>
          </>
        )}
      </Nav>
    </Navbar>
  );
};

export default NavBar;
