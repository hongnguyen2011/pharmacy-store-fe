import React from "react";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { Link } from "react-router-dom";
import "../styles/signup.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { signupServices } from "../../services/signupService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { userLoginApi, userSignupApi } from "../../redux/slices/userSlice";

const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: "",
            name: "",
            phone: "",
            password: "",
            confirmedPassword: "",
            address: "",
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required("Required")
                .min(4, "Phải có 4 ký tự trở lên"),
            address: Yup.string()
                .required("Required")
                .min(4, "Phải có 4 ký tự trở lên"),
            email: Yup.string()
                .required("Required")
                .matches(
                    /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    "Vui lòng nhập địa chỉ email hợp lệ"
                ),
            password: Yup.string()
                .required("Required")
                .matches(
                    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/,
                    "Mật khẩu phải có 7-19 ký tự và chứa ít nhất một chữ cái, một số và một ký tự đặc biệt"
                ),
            confirmedPassword: Yup.string()
                .required("Required")
                .oneOf([Yup.ref("password"), null], "Mật khẩu không khớp"),
            phone: Yup.string()
                .required("Required")
                .matches(
                    /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
                    "Phải là một số điện thoại hợp lệ"
                ),
        }),
        onSubmit: (values) => {
            const dataSignup = { ...values };
            delete dataSignup.confirmedPassword;

            const fectApiSignup = async () => {
                const response = await dispatch(userSignupApi(dataSignup));
                if (response.payload.status == 200) {
                    const dataLogin = {
                        email: formik.values.email,
                        password: formik.values.password,
                    };
                    await dispatch(userLoginApi(dataLogin));
                    toast.success("Đăng ký thành công!");
                    navigate("/home");
                } else {
                    toast.error("Đăng ký thất bại!");
                }
            };

            fectApiSignup();
        },
    });

    return (
        <Helmet title="Signup">
            <section>
                <Container>
                    <Row>
                        <Col lg="6" className="m-auto text-center">
                            <h3 className="fw-food fs-4">Đăng Ký</h3>
                            <Form
                                style={{ marginTop: "20px" }}
                                className="auth__form"
                                onSubmit={formik.handleSubmit}
                            >
                                <FormGroup className="form__group">
                                    <input
                                        type="text"
                                        id="name"
                                        placeholder="Nhập tên của bạn"
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                    />
                                    {formik.errors.name && (
                                        <p className="errorMsg">
                                            {" "}
                                            {formik.errors.name}{" "}
                                        </p>
                                    )}
                                </FormGroup>
                                <FormGroup className="form__group">
                                    <input
                                        type="email"
                                        id="email"
                                        placeholder="Nhập email của bạn"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                    />
                                    {formik.errors.email && (
                                        <p className="errorMsg">
                                            {" "}
                                            {formik.errors.email}{" "}
                                        </p>
                                    )}
                                </FormGroup>
                                <FormGroup className="form__group">
                                    <input
                                        type="password"
                                        id="password"
                                        placeholder="Nhập mật khẩu của bạn"
                                        value={formik.password}
                                        onChange={formik.handleChange}
                                    />
                                    {formik.errors.password && (
                                        <p className="errorMsg">
                                            {" "}
                                            {formik.errors.password}{" "}
                                        </p>
                                    )}
                                </FormGroup>
                                <FormGroup className="form__group">
                                    <input
                                        type="password"
                                        id="confirmedPassword"
                                        placeholder="Xác nhận mật khẩu của bạn"
                                        value={formik.values.confirmedPassword}
                                        onChange={formik.handleChange}
                                    />
                                    {formik.errors.confirmedPassword && (
                                        <p className="errorMsg">
                                            {" "}
                                            {
                                                formik.errors.confirmedPassword
                                            }{" "}
                                        </p>
                                    )}
                                </FormGroup>
                                <FormGroup className="form__group">
                                    <input
                                        type="text"
                                        id="phone"
                                        placeholder="Nhập số điện thoại của bạn"
                                        value={formik.values.phone}
                                        onChange={formik.handleChange}
                                    />
                                    {formik.errors.phone && (
                                        <p className="errorMsg">
                                            {" "}
                                            {formik.errors.phone}{" "}
                                        </p>
                                    )}
                                </FormGroup>
                                <FormGroup className="form__group">
                                    <input
                                        type="text"
                                        id="address"
                                        placeholder="Nhập địa chỉ của bạn"
                                        value={formik.values.address}
                                        onChange={formik.handleChange}
                                    />
                                    {formik.errors.address && (
                                        <p className="errorMsg">
                                            {" "}
                                            {formik.errors.address}{" "}
                                        </p>
                                    )}
                                </FormGroup>
                                <button
                                    className="buy__btn auth__btn"
                                    type="submit"
                                >
                                    Đăng ký
                                </button>
                                <p>
                                    Bạn đã có tài khoản ?
                                    <Link to="/login"> Đăng nhập</Link>
                                </p>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Helmet>
    );
};

export default Signup;
