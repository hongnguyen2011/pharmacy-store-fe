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
import {} from "../../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { getAllCartItemApi } from "../../redux/slices/cartSlice";
import { VND } from "../../utils/convertVND";
import { getAllOrderApi } from "../../redux/slices/orderSlice";
const Checkout = () => {
    const totalAmount = useSelector((state) => state.cart.total);
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))?.data;
    const accessToken = JSON.parse(localStorage.getItem("token"));
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: currentUser.name,
            email: currentUser.email,
            phone: currentUser.phone,
            address: currentUser.address,
        },
        validationSchema: Yup.object({
            number: Yup.string().required("Required"),
            address: Yup.string().required("Required"),
            city: Yup.string().required("Required"),
        }),
    });

    const handleSubmit = () => {
        const fetchCreateOrderApi = async () => {
            setLoading(true);
            const responeOrder = await createOrderService();
            if (responeOrder.status == 200) {
                toast.success("Đặt hàng thành công!");
                await dispatch(getAllCartItemApi(accessToken));
                await dispatch(getAllOrderApi());
                navigate("/order");
            } else {
                toast.error("Đặt hàng thất bại!");
            }
            setLoading(false);
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
    );
};

export default Checkout;
