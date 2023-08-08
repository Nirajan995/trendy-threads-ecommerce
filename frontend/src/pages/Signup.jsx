import React, { useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { Button, CircularProgress, TextField } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  errorToast,
  successToast,
  warningToast,
} from "../service/toastify.service";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const registerSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (password !== confirmPassword) {
        warningToast("Password and Confirm password must be same");
      } else {
        const { data } = await axios.post(
          import.meta.env.VITE_SERVER_URL + "/api/v1/auth/register",
          { name, email, password }
        );

        if (data.status) {
          navigate("/");
          successToast(data.message);
        }
        setLoading(false);
      }
    } catch ({ response }) {
      errorToast(response.data.error);
      setLoading(false);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h1 className="mb-4">Sign Up</h1>

          <Form onSubmit={registerSubmitHandler}>
            <TextField
              variant="outlined"
              type="name"
              placeholder="Nirajan"
              className="mb-4"
              // margin="normal"
              required
              fullWidth
              id="name"
              name="name"
              label="Name"
              autoComplete="name"
              autoFocus
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
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
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <TextField
              variant="outlined"
              type="password"
              placeholder="************"
              className="mb-4"
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
            <TextField
              variant="outlined"
              type="password"
              placeholder="************"
              className="mb-2"
              // margin="normal"
              required
              fullWidth
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm Password"
              autoComplete="confirmPassword"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
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
              {loading ? <CircularProgress color="inherit" /> : <>Sign up</>}
            </Button>
          </Form>
          <Row>
            <Col>
              New Customer?
              <Link to={"/"}>SignIn</Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
