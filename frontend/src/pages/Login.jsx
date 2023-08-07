import React, { useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { Button, CircularProgress, TextField } from "@material-ui/core";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentPass, setCurrPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const loginSubmitHandler = (e) => {
    e.preventDefault();
    if (currentPass !== password) {
      errorToast("Current pass and pass must be same");
    } else {
    }
    setLoading(true);

    //axios api post call here

    //after response-> setLoading(false)
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h1 className="mb-4">Sign In</h1>

          <Form onSubmit={loginSubmitHandler}>
            <TextField
              variant="outlined"
              type="email"
              placeholder="abc@gmail.com"
              className="mb-4"
              // margin="normal"
              required
              fullWidth
              id="email"
              name="email"
              label="Email Address"
              autoComplete="email"
              autoFocus
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <TextField
              variant="outlined"
              type="password"
              placeholder="************"
              className="mb-2"
              // margin="normal"
              required
              fullWidth
              id="password"
              name="password"
              label="Password"
              autoComplete="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <Button
              type="submit"
              variant="contained"
              className="mb-1"
              color="primary"
              fullWidth
              disabled={loading}
            >
              {loading ? <CircularProgress color="inherit" /> : <>Sign In</>}
            </Button>
          </Form>
          <Row>
            <Col>
              New Customer?
              <Link to={"/signup"}>Register</Link>
            </Col>
            <Col className="text-right">Forgot Password</Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
