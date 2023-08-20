import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import Filter from "../components/Filter";
import { Container, Input } from "@material-ui/core";

const Home = () => {
  const [products, setProducts] = useState({});
  const [orginalProduct, setorginalProduct] = useState({});
  const [sort, setSort] = useState([]);
  const [filters, setFilters] = useState({});
  const getProducts = async () => {
    try {
      const { data } = await axios.get(
        import.meta.env.VITE_SERVER_URL + "/api/v1/product"
      );
      setProducts(data.data);
      const allCategories = data.data.results.map((result) => {
        return result.category;
      });
      const categories = [...new Set(allCategories)];
      let obj = {
        type: "",
        data: [],
      };
      const newProduct = categories.map((category) => {
        const product = data.data.results.filter(
          (result) => result.category === category
        );
        obj = {
          type: category,
          data: product,
        };
        return obj;
      });

      setorginalProduct(data.data);
    } catch (error) {}
  };

  [
    {
      type: "Vest",
      data: [],
    },
    {
      type: "Pants",
      data: [],
    },
  ];

  const handleSort = (value) => {
    sort.includes(value)
      ? setSort(sort.filter((srt) => srt !== value))
      : setSort((prevState) => {
          return [...prevState, value];
        });
  };

  const handleFilters = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  const fetchFilteredProducts = async () => {
    const { data } = await axios.get(
      import.meta.env.VITE_SERVER_URL + "/api/v1/product",
      {
        params: {
          ...filters,
        },
      }
    );
    setProducts(data.data);
    setorginalProduct(data.data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    fetchFilteredProducts();
  }, [filters]);

  useEffect(() => {
    handleFilters("sort", sort.join(","));
  }, [sort]);

  const searchProduct = (value) => {
    const searcValue = value.toLowerCase();
    const searchedProds = orginalProduct.results.filter((result) => {
      return (
        result.name.toLowerCase().includes(searcValue) ||
        result.brand.toLowerCase().includes(searcValue)
      );
    });

    setProducts((prev) => {
      return {
        ...prev,
        results: searchedProds,
      };
    });
  };

  return (
    <Container>
      {products.status === "success" ? (
        <>
          <div className="search-btn">
            <Input
              type="text"
              placeholder="Search Products here"
              onChange={(e) => searchProduct(e.target.value)}
            />
          </div>
          <div className="clearfix">
            <span className="float-start">
              <h1>Latest Product ({products.results.length})</h1>
            </span>
            <span className="float-end">
              <Filter
                sort={sort}
                handleSort={handleSort}
                handleFilters={handleFilters}
              />
            </span>
          </div>
          <Row>
            {products.results.length === 0 ? (
              <h3 className="text-center">No Products Found</h3>
            ) : (
              products.results.map((product) => {
                return (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                  </Col>
                );
              })
            )}
          </Row>
        </>
      ) : (
        <Loader />
      )}
    </Container>
  );
};

export default Home;
