import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";

import { Link, useNavigate } from "react-router-dom";
import { logout } from "../slice/loginSlice";
import { resetOrder } from "../slice/orderSlice";
import { resetCart } from "../slice/productSlice";

const NavbarComp = () => {
  const user = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
    dispatch(resetCart());
    dispatch(resetOrder());

    navigate("/");
  };
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
                  <Link onClick={logoutHandler} className="btn btn-light">
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
