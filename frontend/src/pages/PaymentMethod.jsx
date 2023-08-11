import React, { useState } from "react";
import CheckoutStep from "../components/CheckoutStep";
import FormContainer from "../components/FormContainer";
import { Col, Form, Row } from "react-bootstrap";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { addPaymentMethod } from "../slice/productSlice";
import { useNavigate } from "react-router-dom";

const PaymentMethod = () => {
  const payment = useSelector((state) => state.cart.paymentMethod);

  const [paymentMethod, setPaymentMethod] = useState(payment);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = () => {
    dispatch(addPaymentMethod(paymentMethod));
    navigate("/place-order");
  };
  return (
    <>
      <FormContainer>
        <CheckoutStep step2 />
        <h1 className="mb-4">Payment Method</h1>
        <Form onSubmit={submitHandler}>
          <FormControl component={"fieldset"}>
            <FormLabel component="legend" className="mb-4">
              Select method
            </FormLabel>
            <Row>
              <Col md={12}>
                <RadioGroup
                  name="paymentMethod"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <FormControlLabel
                    value="PayPal"
                    control={<Radio color="primary" />}
                    label="Paypal or credit card"
                  />
                </RadioGroup>
              </Col>
              <Col md={12}>
                <RadioGroup
                  name="paymentMethod"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <FormControlLabel
                    value="esewa"
                    control={<Radio color="primary" />}
                    label="Esewa"
                  />
                </RadioGroup>
              </Col>
            </Row>
          </FormControl>
          <Button
            className="mt-3"
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Continue
          </Button>
          <Button
            className="mt-3"
            variant="contained"
            onClick={() => navigate("/shipping")}
            fullWidth
          >
            Go Back
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default PaymentMethod;
