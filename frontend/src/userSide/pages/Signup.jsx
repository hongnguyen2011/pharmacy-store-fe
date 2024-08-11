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
            address:""
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required("Required")
                .min(4, "Must be 4 characters or more"),
            address: Yup.string()
                .required("Required")
                .min(4, "Must be 4 characters or more"),
            email: Yup.string()
                .required("Required")
                .matches(
                    /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    "Please enter a valid email address"
                ),
            password: Yup.string()
                .required("Required")
                .matches(
                    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/,
                    "Password must be 7-19 characters and contain at least one letter, one number and a special character"
                ),
            confirmedPassword: Yup.string()
                .required("Required")
                .oneOf([Yup.ref("password"), null], "Password must match"),
            phone: Yup.string()
                .required("Required")
                .matches(
                    /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
                    "Must be a valid phone number"
                ),
        }),
        onSubmit: (values) => {
            const dataSignup = { ...values };
            delete dataSignup.confirmedPassword;

            const fectApiSignup = async () => {
                await dispatch(userSignupApi(dataSignup));
                const dataLogin = {
                    name: formik.values.name,
                    password: formik.values.password,
                };
                console.log(dataLogin);
                await dispatch(userLoginApi(dataLogin));
                toast.success("Signup successfully!");
                navigate("/home");
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
                            <h3 className="fw-food fs-4">Sign up</h3>
                            <Form style={{ marginTop: "20px" }} className="auth__form" onSubmit={formik.handleSubmit}>
                                <FormGroup className="form__group">
                                    <input
                                        type="text"
                                        id="name"
                                        placeholder="Enter your name"
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                    />
                                    {formik.errors.name && (
                                        <p className="errorMsg"> {formik.errors.name} </p>
                                    )}
                                </FormGroup>
                                <FormGroup className="form__group">
                                    <input
                                        type="email"
                                        id="email"
                                        placeholder="Enter your email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                    />
                                    {formik.errors.email && (
                                        <p className="errorMsg"> {formik.errors.email} </p>
                                    )}
                                </FormGroup>
                                <FormGroup className="form__group">
                                    <input
                                        type="text"
                                        id="password"
                                        placeholder="Enter your password"
                                        value={formik.password}
                                        onChange={formik.handleChange}
                                    />
                                    {formik.errors.password && (
                                        <p className="errorMsg"> {formik.errors.password} </p>
                                    )}
                                </FormGroup>
                                <FormGroup className="form__group">
                                    <input
                                        type="text"
                                        id="confirmedPassword"
                                        placeholder="Confirm your passworld"
                                        value={formik.values.confirmedPassword}
                                        onChange={formik.handleChange}
                                    />
                                    {formik.errors.confirmedPassword && (
                                        <p className="errorMsg">
                                            {" "}
                                            {formik.errors.confirmedPassword}{" "}
                                        </p>
                                    )}
                                </FormGroup>
                                <FormGroup className="form__group">
                                    <input
                                        type="text"
                                        id="phone"
                                        placeholder="Enter your phone"
                                        value={formik.values.phone}
                                        onChange={formik.handleChange}
                                    />
                                    {formik.errors.phone && (
                                        <p className="errorMsg"> {formik.errors.phone} </p>
                                    )}
                                </FormGroup>
                                <FormGroup className="form__group">
                                    <input
                                        type="text"
                                        id="address"
                                        placeholder="Enter your address"
                                        value={formik.values.address}
                                        onChange={formik.handleChange}
                                    />
                                    {formik.errors.address && (
                                        <p className="errorMsg"> {formik.errors.address} </p>
                                    )}
                                </FormGroup>
                                <button className="buy__btn auth__btn" type="submit">
                                    Sign up
                                </button>
                                <p>
                                    Create an account
                                    <Link to="/login"> Login</Link>
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
