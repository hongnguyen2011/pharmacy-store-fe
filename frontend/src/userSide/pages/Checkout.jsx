import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col, Form, FormGroup, Progress } from "reactstrap";

import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";

import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import "../styles/checkout.css";
import { toast } from "react-toastify";
import { createOrderService } from "../../services/orderServices";
import { useDispatch } from "react-redux";
import { getAllCartItemApi } from "../../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const totalQty = useSelector((state) => state.cart.totalQuantity);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const accessToken = JSON.parse(localStorage.getItem("token"));
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: currentUser.user_name,
      email: currentUser.email,
      number: "",
      address: "",
      city: "",
    },
    validationSchema: Yup.object({
      number: Yup.string().required("Required"),
      address: Yup.string().required("Required"),
      city: Yup.string().required("Required"),
    }),
  });

  const handleSubmit = () => {
    const errNumber =
      formik.values.number === "" ? "requirer" : formik.errors.number;
    const errAddress =
      formik.values.address === "" ? "requirer" : formik.errors.address;
    const errCity = formik.values.city === "" ? "requirer" : formik.errors.city;

    if (errNumber || errAddress || errCity) {
      toast.error("Invaild input order");
      return;
    }

    const dataCreateOrder = {
      name: formik.values.name,
      address: formik.values.address,
      number: formik.values.number,
      accessToken,
    };

    const fetchCreateOrderApi = async () => {
      setLoading(true);
      const responeOrder = await createOrderService(dataCreateOrder);
      await dispatch(getAllCartItemApi(accessToken));

      toast.success("Place an order sucessfully");
      setLoading(false);
      console.log(responeOrder.data);
      navigate("/order");
    };

    fetchCreateOrderApi();
  };
  return (
    <Helmet title="Checkout">
      {loading ? (
        <Progress animated value="100" className="progress"></Progress>
      ) : (
        ""
      )}
      <CommonSection title="Checkout" />
      <section>
        <Container>
          <Row>
            <Col lg="8">
              <h6 className="mb-4 fw-bold">Billing Information</h6>
              <Form className="billing__form">
                <FormGroup className="form__group">
                  <input
                    type="text"
                    placeholder="Enter your name"
                    id="name"
                    readOnly
                    defaultValue={formik.values.name}
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    type="eamil"
                    placeholder="Enter your email"
                    readOnly
                    id="email"
                    defaultValue={formik.values.email}
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    type="number"
                    placeholder="Phone number"
                    id="number"
                    value={formik.values.number}
                    onChange={formik.handleChange}
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    type="text"
                    placeholder="Street address"
                    id="address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    type="text"
                    placeholder="City"
                    id="city"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                  />
                </FormGroup>
              </Form>
            </Col>
            <Col lg="4">
              <div className="checkout__cart">
                <h6>
                  Toal Qty: <span>{totalQty} items</span>
                </h6>
                <h6>
                  Subtotal: <span>${totalAmount}</span>
                </h6>
                <h6>
                  Shipping: <br />
                  free shipping<span>$0</span>
                </h6>
                <h4>
                  Total Cost: <span>${totalAmount}</span>
                </h4>
                <button
                  className="buy__btn auth__btn w-100"
                  onClick={handleSubmit}
                >
                  Place an order
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Checkout;
