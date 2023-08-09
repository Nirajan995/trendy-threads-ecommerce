import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";

const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded" style={{ height: "400px" }}>
      <Card.Img src={product.productImage} className="h-50" />

      <Card.Body>
        <Card.Title as="div">
          <strong>{product.name}</strong>
        </Card.Title>
        <Card.Text as="div">
          <Rating
            value={product.averageRating}
            text={`${product.Reviews ? product.Reviews.length : 0} reviews`}
          />
        </Card.Text>
        <Card.Text as="h3">Price: ${product.price}</Card.Text>
        <Card.Text as="h6">Brand: {product.brand}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
