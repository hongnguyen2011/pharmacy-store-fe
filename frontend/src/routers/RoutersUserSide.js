import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";

import Home from "../userSide/pages/Home";
import Shop from "../userSide/pages/Shop";
import Cart from "../userSide/pages/Cart";
import ProductDetails from "../userSide/pages/ProductDetails";
import Checkout from "../userSide/pages/Checkout";
import Login from "../userSide/pages/Login";
import Signup from "../userSide/pages/Signup";
import Order from "../userSide/pages/Order";
import { OrderDetail } from "../userSide/components/UI/OrderDetail";
import Profile from "../userSide/pages/Profile/Profile";
import HomeAdmin from "../adminSide/HomeAdmin";

const Routers = () => {
  return (
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="home" element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="shop/:id" element={<ProductDetails />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="order" element={<Order />} />
        <Route path="order/:id" element={<OrderDetail />} />
        <Route path="profile" element={<Profile />} />
       
        
      </Routes>
  );
};

export default Routers;
