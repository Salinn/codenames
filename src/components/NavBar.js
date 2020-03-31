import React from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar"

const NavBar = () => {
 
  return (
    <Navbar className="mb-3" bg="dark" variant="dark">
      <Navbar.Brand href="#home">Names That Maybe Code</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Link to="/">Home</Link>&nbsp;
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
