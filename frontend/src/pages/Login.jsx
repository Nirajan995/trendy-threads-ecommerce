import React, { useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { Button, CircularProgress, TextField } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { errorToast, successToast } from "../service/toastify.service";
import { useDispatch } from "react-redux";
import { login } from "../slice/loginSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const loginSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const { data } = await axios.post(
        import.meta.env.VITE_SERVER_URL + "/api/v1/auth/login",
        { email, password }
      );
      if (data.status) {
        //dispatch
        const loginData = {
          name: data.authData.name,
          email: data.authData.email,
          jwt: data.token,
          role: data.authData.role,
        };
        dispatch(login(loginData));
        navigate("/home");
        successToast("Login Successful");
        setLoading(false);
      }
    } catch (error) {
      errorToast(error.response.data.error);
      setLoading(false);
    }
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
