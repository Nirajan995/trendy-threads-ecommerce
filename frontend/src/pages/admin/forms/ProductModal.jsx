import {
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  makeStyles,
} from "@material-ui/core";
import React from "react";
import { Button, Col, Form, Image, Modal, Row } from "react-bootstrap";

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(2),
    minWidth: 330,
    top: 6,
    left: -4,
  },
}));
const ProductModal = ({
  openForm,
  handleCloseForm,
  handleChange,
  handleSubmit,
  handleEdit,
  edit,
  product,
}) => {
  const classes = useStyles();
  return (
    <Modal show={openForm} centered size="lg">
      <Modal.Header>
        <Modal.Title>{edit ? "Update Product" : "Add Product"}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Container>
            {edit && (
              <Row className="mb-2">
                <Col md={6}>
                  <Form.Label>Product Image</Form.Label>
                  <Image
                    src={product.productImage}
                    width={"100"}
                    height={"100"}
                  />
                </Col>
              </Row>
            )}
            <Row>
              <Col cs={12} md={6}>
                <TextField
                  variant="outlined"
                  type="text"
                  margin="normal"
                  required
                  fullWidth
                  autoFocus
                  name="name"
                  label="Product Name"
                  id="name"
                  value={product.name}
                  onChange={handleChange}
                />
              </Col>
              <Col cs={12} md={6}>
                <TextField
                  variant="outlined"
                  type="text"
                  margin="normal"
                  required
                  fullWidth
                  name="brand"
                  label="Product brand"
                  id="brand"
                  value={product.brand}
                  onChange={handleChange}
                />
              </Col>
            </Row>
            <Row>
              <Col cs={12} md={6}>
                <TextField
                  variant="outlined"
                  type="number"
                  margin="normal"
                  required
                  fullWidth
                  name="price"
                  label="Product Price"
                  value={product.price}
                  id="price"
                  onChange={handleChange}
                />
              </Col>
              <Col cs={12} md={6}>
                <TextField
                  variant="outlined"
                  type="number"
                  margin="normal"
                  required
                  fullWidth
                  name="countInStock"
                  value={product.countInStock}
                  label="Count In Stock"
                  id="countInStock"
                  onChange={handleChange}
                />
              </Col>
            </Row>
            <Row>
              {!edit && (
                <Col cs={12} md={6}>
                  <TextField
                    variant="outlined"
                    type="file"
                    margin="normal"
                    required
                    fullWidth
                    name="productImage"
                    id="file"
                    onChange={handleChange}
                  />
                </Col>
              )}
              <Col cs={12} md={6}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel>Category</InputLabel>
                  <Select
                    label="Category"
                    name="category"
                    value={product.category}
                    onChange={handleChange}
                  >
                    <MenuItem value="Shirt">T-Shirt</MenuItem>
                    <MenuItem value="Pants">Pants</MenuItem>
                    <MenuItem value="Vest">Vest</MenuItem>
                  </Select>
                </FormControl>
              </Col>
            </Row>
            <Row>
              <Col cs={12} md={12}>
                <TextField
                  variant="outlined"
                  type="text"
                  margin="normal"
                  required
                  fullWidth
                  name="description"
                  id="description"
                  label="Description"
                  multiline
                  value={product.description}
                  minRows={"5"}
                  onChange={handleChange}
                />
              </Col>
            </Row>
          </Container>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="mr-2"
          onClick={edit ? handleEdit : handleSubmit}
        >
          {edit ? "Update" : "Submit"}
        </Button>
        <Button variant="contained" color="secondary" onClick={handleCloseForm}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductModal;
