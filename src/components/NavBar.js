import React from "react";
import { useAuth0 } from "../react-auth0-spa";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar"

const NavBar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const loggedIn = isAuthenticated && (
        <span>
          <Link to="/">Home</Link>&nbsp;
          <Link to="/profile">Profile</Link>
        </span>
      )
  const loginButton = !isAuthenticated && (
        <button onClick={() => loginWithRedirect({})}>Log in</button>
      )
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">Names That Maybe Code</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        {loginButton}
        {loggedIn}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
