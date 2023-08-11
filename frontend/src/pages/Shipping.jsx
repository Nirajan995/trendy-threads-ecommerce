import React, { useState } from "react";
import CheckoutStep from "../components/CheckoutStep";
import { Form } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { Button, TextField } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { addShippingAddress } from "../slice/productSlice";
import { useNavigate } from "react-router-dom";

const Shipping = () => {
  const { shippingAddress } = useSelector((state) => state.cart);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      address,
      city,
      postalCode,
      country,
    };

    dispatch(addShippingAddress(data));
    navigate("/payment");
  };

  return (
    <>
      <FormContainer>
        <CheckoutStep step1 />
        <Form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            type="text"
            margin="normal"
            required
            fullWidth
            id="address"
            name="address"
            label="Enter Address"
            autoComplete="address"
            autoFocus
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <TextField
            variant="outlined"
            type="text"
            margin="normal"
            required
            fullWidth
            id="city"
            name="city"
            label="Enter City"
            autoComplete="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <TextField
            variant="outlined"
            type="text"
            margin="normal"
            required
            fullWidth
            id="postalCode"
            name="postalCode"
            label="Enter Postal Code"
            autoComplete="postalCode"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
          <TextField
            variant="outlined"
            type="text"
            margin="normal"
            required
            fullWidth
            id="country"
            name="country"
            label="Enter country"
            autoComplete="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Continue
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default Shipping;
