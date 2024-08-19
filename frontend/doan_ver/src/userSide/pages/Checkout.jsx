import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Col, Container, Form, FormGroup, Row } from "reactstrap";

import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";

import { useFormik } from "formik";
import * as Yup from "yup";
import { } from "../../redux/slices/cartSlice";
import { VND } from "../../utils/convertVND";
import "../styles/checkout.css";
import Payment from "./Payment";
const Checkout = () => {
    const totalAmount = useSelector((state) => state.cart.total);
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))?.data;
    const [open, setOpen] = useState(false);
    const onSetOpen = () => {
        setOpen(!open);
    }
    const formik = useFormik({
        initialValues: {
            name: currentUser?.name,
            email: currentUser?.email,
            phone: currentUser?.phone,
            address: currentUser?.address,
        },
        validationSchema: Yup.object({
            number: Yup.string().required("Required"),
            address: Yup.string().required("Required"),
            city: Yup.string().required("Required"),
        }),
    });

    const handleSubmit = () => {
        onSetOpen();
    };
    return (
        <>
            <Helmet title="Checkout">
                <CommonSection title="Thanh toán" />
                <section>
                    <Container>
                        <Row>
                            <Col lg="8">
                                <h2
                                    className="mb-4 fw-bold"
                                    style={{ textAlign: "center" }}
                                >
                                    Thông tin cá nhân
                                </h2>
                                <Form className="billing__form">
                                    <FormGroup className="form__group">
                                        <input
                                            type="text"
                                            placeholder="Nhập tên của bạn"
                                            id="name"
                                            readOnly
                                            defaultValue={formik.values.name}
                                        />
                                    </FormGroup>
                                    <FormGroup className="form__group">
                                        <input
                                            type="eamil"
                                            placeholder="Nhập địa chỉ email"
                                            readOnly
                                            id="email"
                                            defaultValue={formik.values.email}
                                        />
                                    </FormGroup>
                                    <FormGroup className="form__group">
                                        <input
                                            type="number"
                                            placeholder="Nhập số điện thoại"
                                            id="phone"
                                            value={formik.values.phone}
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
                                </Form>
                            </Col>
                            <Col lg="4">
                                <div className="checkout__cart">
                                    <h4 style={{ marginTop: "10px" }}>
                                        Tổng cộng:{" "}
                                        <span>{VND.format(totalAmount)}</span>
                                    </h4>
                                    <button
                                        className="buy__btn auth__btn w-100"
                                        style={{ marginTop: "100px" }}
                                        onClick={handleSubmit}
                                    >
                                        Đặt hàng
                                    </button>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </Helmet>
            {
                open ? <Payment open={open} onSetOpen={onSetOpen} /> : <></>
            }
        </>
    );
};

export default Checkout;
