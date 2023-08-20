import { Button, Input, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import {
  deleteData,
  getData,
  postData,
  updateData,
} from "../../service/axios.service";
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
  const itemsPerPage = 8;
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    price: "",
    category: "",
    countInStock: "",
    description: "",
    productImage: "",
  });

  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState("");

  const [openForm, setOpenForm] = useState(false);

  const { jwt } = useSelector((state) => state.auth);
  const [itemOffset, setItemOffset] = useState(0);

  const [products, setProducts] = useState({});
  const [originalProduct, setOriginalProducts] = useState({});
  const [pageCount, setPageCount] = useState(0);

  let endOffset;
  let currentItems;

  const getProducts = async () => {
    const response = await getData("product");
    setProducts(response.data);
    paginate(response.data);
    setOriginalProducts(response.data);
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
    setEdit(false);

    setOpenForm(true);
  };

  function paginate(items) {
    endOffset = itemOffset + itemsPerPage;

    currentItems = items.results.slice(itemOffset, endOffset);

    let count = Math.ceil(items.results.length / itemsPerPage);

    setPageCount(count);

    setProducts((prev) => {
      return { ...prev, count: currentItems.length, results: currentItems };
    });
  }

  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * itemsPerPage) % originalProduct.results.length;

    console.log("newOffset", newOffset);
    setItemOffset(newOffset);
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    delete product["id"];
    delete product["_id"];
    delete product["createdAt"];

    const response = await updateData(`product/${editId}`, product, jwt);

    if (response.status) {
      setOpenForm(false);
      const updateProd = products.results.map((prod) => {
        return prod.id === editId ? response.data : prod;
      });

      setProducts((prev) => {
        return { ...prev, results: updateProd };
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", product.name);
    formData.append("brand", product.brand);
    formData.append("productImage", product.productImage);
    formData.append("price", product.price);
    formData.append("category", product.category);
    formData.append("countInStock", product.countInStock);
    formData.append("description", product.description);

    const response = await postData("product", formData, jwt);

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

  useEffect(() => {
    if (products.status) {
      const endOffset = itemOffset + itemsPerPage;

      let currItems = originalProduct.results.slice(itemOffset, endOffset);

      setProducts((prev) => {
        return { ...prev, results: currItems, count: currItems.length };
      });
      setPageCount(Math.ceil(originalProduct.results.length / itemsPerPage));
    }
  }, [itemOffset, itemsPerPage]);

  const editHandler = (e, product) => {
    e.preventDefault();
    setEdit(true);
    setEditId(product.id);
    setProduct(product);
    setOpenForm(true);
  };

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

  const searchProduct = (e) => {
    const searchedValue = e.target.value.toLowerCase();
    const searchedProduct = originalProduct.results.filter((product) => {
      return product.name.toLowerCase().includes(searchedValue);
    });
    setProducts((prev) => {
      return {
        ...prev,
        results: searchedProduct,
        count: searchedProduct.length,
      };
    });
  };

  useEffect(() => {
    getProducts();
  }, []);

  function returnDate(product) {
    return (
      new Date(product.createdAt).getFullYear() +
      "-" +
      new Date(product.createdAt).getMonth() +
      "-" +
      new Date(product.createdAt).getDate()
    );
  }
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
            <Col>
              <Input
                type="text"
                placeholder="Search by product"
                onChange={searchProduct}
              />
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
                <th>Created At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.results.length > 0 ? (
                products.results.map((product) => {
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
                      <td>{returnDate(product)}</td>
                      <td>
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={(e) => editHandler(e, product)}
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
                })
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
          <ProductModal
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleEdit={handleEdit}
            openForm={openForm}
            handleCloseForm={handleCloseForm}
            edit={edit}
            product={product}
          />
          <ReactPaginate
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={pageCount}
            previousLabel="< previous"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
          />
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default ProductList;
