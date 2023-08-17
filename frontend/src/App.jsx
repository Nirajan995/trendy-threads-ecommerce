import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import ProductDetals from "./components/ProductDetals";
import Cart from "./pages/Cart";
import Shipping from "./pages/Shipping";
import PaymentMethod from "./pages/PaymentMethod";
import PlaceOrder from "./pages/PlaceOrder";
import Order from "./pages/Order";
import Success from "./pages/Success";
import ProductList from "./pages/admin/ProductList";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetals />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/payment" element={<PaymentMethod />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/order/:orderId" element={<Order />} />
        <Route path="/success" element={<Success />} />
        <Route path="/admin/products" element={<ProductList />} />
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
