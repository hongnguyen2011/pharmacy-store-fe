import React, { useState } from "react";
import { Container, Row, Col, Progress } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";

import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { motion } from "framer-motion";
import "../styles/cart.css";
import { Link } from "react-router-dom";
import { deleteCartItemApi } from "../../redux/slices/cartSlice";
import { toast } from "react-toastify";

const Cart = () => {
  const [loadingDelete, setLoadingDelete] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const subTotal = useSelector((state) => state.cart.totalAmount);
  const accessToken = JSON.parse(localStorage.getItem("token"));
  const dispatch = useDispatch();
  const removeProductFromCart = (id) => {
    const dataCartDelete = {
      id,
      accessToken,
    };
    console.log(dataCartDelete);
    const fetchRemoveProductFromCartApi = async () => {
      setLoadingDelete(true);
      await dispatch(deleteCartItemApi(dataCartDelete));
      setLoadingDelete(false);
      toast.success("Delete sucessfully!");
    };

    fetchRemoveProductFromCartApi();
  };

  return (
    <Helmet title="Cart">
      {loadingDelete ? (
        <Progress animated value="100" className="progress"></Progress>
      ) : (
        ""
      )}
      <CommonSection title="Shopping Cart" />
      <section>
        <Container>
          <Row>
            <Col lg="9">
              {cartItems.length === 0 ? (
                <h2 className="fs-4 text-center">No item added to the cart</h2>
              ) : (
                <table className="table bordered">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item, index) => (
                      <Tr
                        item={item}
                        key={index}
                        onRemoveProductFromCart={removeProductFromCart}
                      />
                    ))}
                  </tbody>
                </table>
              )}
            </Col>
            <Col lg="3">
              <div>
                <h6 className="d-flex align-items-center justify-content-between">
                  Subtotal
                  <span className="fs-4 fw-bold">{subTotal} VND</span>
                </h6>
              </div>
              <p className="fs-6 mt-2">
                taxes and shipping will calculate in checkout
              </p>
              <div>
                <button className="buy__btn w-100 ">
                  <Link to="/checkout">Checkout</Link>
                </button>
                <button className="buy__btn w-100 mt-3">
                  <Link to="/shop">Continue Shopping</Link>
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

const Tr = (props) => {
  const { item, onRemoveProductFromCart } = props;

  return (
    <tr>
      <td>
        <img src={item.Product.image} alt="#" />
      </td>
      <td>{item.Product.name}</td>
      <td>{item.Product.price}</td>
      <td>{item.quantity}</td>
      <td>
        <motion.span
          whileTap={{ scale: 1.2 }}
          onClick={() => onRemoveProductFromCart(item.id)}
        >
          <i className="ri-delete-bin-line"></i>
        </motion.span>
      </td>
    </tr>
  );
};
export default Cart;
