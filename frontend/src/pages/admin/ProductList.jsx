import { Button, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { deleteData, getData, postData } from "../../service/axios.service";
import Loader from "../../components/Loader";
import { Col, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import ProductModal from "./forms/ProductModal";

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

const ProductList = () => {
  // const [name, setName] = useState("");
  // const [brand, setBrand] = useState("");
  // const [price, setPrice] = useState("");
  // const [category, setCategory] = useState("");
  // const [countInStock, setCountInStock] = useState("");
  // const [description, setDescription] = useState("");
  // const [productImage, setProductImage] = useState("");

  const [product, setProduct] = useState({
    name: "",
    brand: "",
    price: "",
    category: "",
    countInStock: "",
    description: "",
    productImage: "",
  });

  const [openForm, setOpenForm] = useState(false);

  const { jwt } = useSelector((state) => state.auth);

  const [products, setProducts] = useState({});

  const getProducts = async () => {
    const response = await getData("product");
    setProducts(response.data);
  };

  const deleteHandler = async (e, id) => {
    e.preventDefault();
    await deleteData(`product/${id}`, jwt);

    const filteredProds = products.results.filter((product) => {
      return product._id !== id;
    });

    setProducts((prev) => {
      return { ...prev, count: filteredProds.length, results: filteredProds };
    });
  };

  const addProductHandler = (e) => {
    e.preventDefault();
    setOpenForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(product);

    const formData = new FormData();

    formData.append("name", product.name);
    formData.append("brand", product.brand);
    formData.append("productImage", product.productImage);
    formData.append("price", product.price);
    formData.append("category", product.category);
    formData.append("countInStock", product.countInStock);
    formData.append("description", product.description);

    const response = await postData("product", formData, jwt);

    console.log(response);

    if (response.status) {
      setProducts((prev) => {
        return { ...prev, results: [response.data, ...prev.results] };
      });
      setOpenForm(false);
    }
  };

  function handleCloseForm() {
    setOpenForm(false);
  }

  const handleChange = (e) => {
    if (e.target.name === "productImage") {
      setProduct((prev) => {
        return { ...prev, [e.target.name]: e.target.files[0] };
      });
    } else {
      setProduct((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
      });
    }
  };

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      {products.status === "success" ? (
        <>
          <Row>
            <Col>
              <h2 className="text-center">Products {products.count}</h2>
            </Col>
            <Col className="text-right">
              <Button
                variant="contained"
                color="primary"
                onClick={(e) => addProductHandler(e)}
              >
                <i className="fas fa-plus me-2"></i>
                Add Product
              </Button>
            </Col>
          </Row>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr className="text-center">
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.results.map((product) => {
                return (
                  <tr key={product._id} className="text-center">
                    <td>
                      <img
                        className="rounded"
                        src={product.productImage}
                        alt={product.name}
                        width={"100"}
                        height={"50"}
                      />
                    </td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>
                      <Button
                        variant="outlined"
                        color="primary"
                        className="btn-sm"
                      >
                        <i className="fas fa-edit"></i>
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        className="btn-sm ms-1"
                        onClick={(e) => deleteHandler(e, product._id)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <ProductModal
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            openForm={openForm}
            handleCloseForm={handleCloseForm}
          />
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default ProductList;
