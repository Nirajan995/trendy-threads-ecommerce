import React from "react";

import { useSelector } from "react-redux";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";

import { Link } from "react-router-dom";

const NavbarComp = () => {
  const user = useSelector((state) => state.auth);
  return (
    <header>
      <Navbar bg="dark" variant="dark" collapseOnSelect expand="lg">
        <Container>
          <Link to="/home">
            <Navbar.Brand>Trendy Threads</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {/* Search Box */}
            <Nav className="ms-auto">
              <Link to={""}>
                <i className="fas fa-shopping-cart mt-3 me-2"></i>
              </Link>
              {user.isLoggedIn ? (
                <NavDropdown title={user.name} id="username">
                  <Link to={"/profile"}>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </Link>
                  <Link to={"/"}>
                    <NavDropdown.Item>Logout</NavDropdown.Item>
                  </Link>
                </NavDropdown>
              ) : (
                <>
                  <Link>
                    <Nav.Link>
                      <i className="fas fa-user"></i> Sign In
                    </Nav.Link>
                  </Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default NavbarComp;
