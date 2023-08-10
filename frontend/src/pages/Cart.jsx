import {
  Card,
  FormControl,
  MenuItem,
  Select,
  makeStyles,
  Button,
} from "@material-ui/core";
import React, { useState } from "react";
import { Col, Image, ListGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
  selectEmpty: {
    padding: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(2),
    minWidth: 120,
  },
}));
const Cart = () => {
  const [qty, setQty] = useState(1);
  const cartItems = [
    {
      countInStock: 2,
      _id: "64d3693d5e5d6137f486fb9d",
      name: "Levi’s",
      productImage:
        "https://n.nordstrommedia.com/id/sr3/fa9733e8-7cbc-4475-b217-51ea291ec367.jpeg?h=365&w=240&dpr=2",
      brand: "Levi’s",
      price: 200,
      averageRating: 2.5,
      category: "Pants",
      description:
        "Levi’s is one of the most popular and top-selling jeans brand in the world. This veteran jeans brand has been able to create a distinctive place of its own in the merchandise industry as people associate it with a definite status symbol.",
      createdAt: "2023-08-09T10:23:57.051Z",
      __v: 0,
      Reviews: [],
      id: "64d3693d5e5d6137f486fb9d",
    },
    {
      countInStock: 1,
      _id: "64d3693d5e5d6137f486fb9e",
      name: "Wrangler",
      productImage:
        "https://images.wrangler.com/is/image/Wrangler/3W031PG-HERO?$KDP-XXLARGE$",
      brand: "Wrangler",
      price: 100,
      averageRating: 4.5,
      category: "Pants",
      description:
        "Wrangler is often described as a cool jeans brand because of superb fitting and stylish looks. It is designed by integrating both modern trends and vintage fashion. The in-demand jeans brand carries a “W” signature on its back pocket that gives it an individual, original and classy look.",
      createdAt: "2023-08-09T10:23:57.051Z",
      __v: 0,
      Reviews: [],
      id: "64d3693d5e5d6137f486fb9e",
    },
    {
      countInStock: 3,
      _id: "64d3693d5e5d6137f486fb9c",
      name: "Peter England Shirts",
      productImage:
        "https://static-01.daraz.com.np/p/948d9ba5590bce2b26a64c40a111198c.jpg",
      brand: "Peter England Shirts",
      price: 1000,
      averageRating: 3.5,
      category: "Shirt",
      description:
        "Peter England is one of the largest menswear brands in India known for its standardized fits, fashionable styles and superior quality. Peter England’s shirts are a blend of comfort and style that makes it a top men’s shirt brand.",
      createdAt: "2023-08-09T10:23:57.050Z",
      __v: 0,
      Reviews: [],
      id: "64d3693d5e5d6137f486fb9c",
    },
    {
      countInStock: 6,
      _id: "64d3693d5e5d6137f486fb9b",
      name: "Arrow Shirts",
      productImage:
        "https://cdn00.nnnow.com/web-images/large/styles/EJYQ3P2NAWK/1653996464426/1.jpg",
      brand: "Arrow Shirts",
      price: 600,
      category: "Shirt",
      averageRating: 5,
      description:
        "Arrow is one of the oldest brands when it comes to men's shirts and is owned by the PVH Company",
      createdAt: "2023-08-09T10:23:57.049Z",
      __v: 0,
      Reviews: [],
      id: "64d3693d5e5d6137f486fb9b",
    },
    {
      countInStock: 1,
      _id: "5d725a1b7b292f5f8ceff788",
      name: "Wrangler",
      productImage:
        "https://images.wrangler.com/is/image/Wrangler/3W031PG-HERO?$KDP-XXLARGE$",
      brand: "Wrangler",
      price: 100,
      averageRating: 4.5,
      category: "Pants",
      description:
        "Wrangler is often described as a cool jeans brand because of superb fitting and stylish looks. It is designed by integrating both modern trends and vintage fashion. The in-demand jeans brand carries a “W” signature on its back pocket that gives it an individual, original and classy look.",
      createdAt: "2023-08-09T10:22:42.960Z",
      __v: 0,
      Reviews: [],
      id: "5d725a1b7b292f5f8ceff788",
    },
    {
      countInStock: 3,
      _id: "5d713a66ec8f2b88b8f830b8",
      name: "Peter England Shirts",
      productImage:
        "https://static-01.daraz.com.np/p/948d9ba5590bce2b26a64c40a111198c.jpg",
      brand: "Peter England Shirts",
      price: 1000,
      averageRating: 3.5,
      category: "Shirt",
      description:
        "Peter England is one of the largest menswear brands in India known for its standardized fits, fashionable styles and superior quality. Peter England’s shirts are a blend of comfort and style that makes it a top men’s shirt brand.",
      createdAt: "2023-08-09T10:22:42.959Z",
      __v: 0,
      Reviews: [],
      id: "5d713a66ec8f2b88b8f830b8",
    },
    {
      countInStock: 2,
      _id: "5d725a037b292f5f8ceff787",
      name: "Levi’s",
      productImage:
        "https://n.nordstrommedia.com/id/sr3/fa9733e8-7cbc-4475-b217-51ea291ec367.jpeg?h=365&w=240&dpr=2",
      brand: "Levi’s",
      price: 200,
      averageRating: 2.5,
      category: "Pants",
      description:
        "Levi’s is one of the most popular and top-selling jeans brand in the world. This veteran jeans brand has been able to create a distinctive place of its own in the merchandise industry as people associate it with a definite status symbol.",
      createdAt: "2023-08-09T10:22:42.959Z",
      __v: 0,
      Reviews: [],
      id: "5d725a037b292f5f8ceff787",
    },
    {
      countInStock: 6,
      _id: "5d713995b721c3bb38c1f5d0",
      name: "Arrow Shirts",
      productImage:
        "https://cdn00.nnnow.com/web-images/large/styles/EJYQ3P2NAWK/1653996464426/1.jpg",
      brand: "Arrow Shirts",
      price: 600,
      category: "Shirt",
      averageRating: 0,
      description:
        "Arrow is one of the oldest brands when it comes to men's shirts and is owned by the PVH Company",
      createdAt: "2023-08-09T10:22:42.957Z",
      __v: 0,
      Reviews: [],
      id: "5d713995b721c3bb38c1f5d0",
    },
  ];
  const classes = useStyles();
  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length > 0 ? (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.id}>
                <Row>
                  <Col md={2}>
                    <Image
                      src={item.productImage}
                      alt={item.name}
                      fluid
                      rounded
                    />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.id}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <FormControl className={classes.formControl}>
                      <Select
                        defaultValue=""
                        onChange={(e) => setQty(e.target.value)}
                        label="Qty"
                        value={qty}
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <MenuItem key={x + 1} value={x + 1}>
                            {x + 1}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Col>
                  <Col md={2}>
                    <Button variant="danger">
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <div className="text-center">
            Your cart is empty. <Link to={"/home"}>Continue Shopping</Link>
          </div>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                SubTotal (
                {cartItems.reduce((acc, item) => acc + item.countInStock, 0)})
                items
              </h2>
              Total Price: $
              {cartItems.reduce(
                (acc, item) => acc + item.countInStock * item.price,
                0
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                variant="contained"
                color="primary"
                fullWidth
                disabled={cartItems.length === 0}
              >
                Proceed to Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default Cart;
