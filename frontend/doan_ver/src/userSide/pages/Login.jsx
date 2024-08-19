import React from "react";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col, Form, FormGroup, Progress } from "reactstrap";
import { Link } from "react-router-dom";
import "../styles/login.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { userLoginApi } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .required()
                .min(4)
                .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
            password: Yup.string().required(),
            // .matches(
            //   /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/
            // ),
        }),
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        let data = undefined;
        formik.values.email && formik.values.password
            ? formik.errors.email || formik.errors.password
                ? toast.error("Email hoặc passworld không hợp lệ!")
                : (data = formik.values)
            : toast.error("Email hoặc passworld không hợp lệ!");
        const fectLoginApi = async () => {
            const respon = await dispatch(userLoginApi(data));
            if (respon.payload.accessToken === undefined) {
                toast.error(
                    "Đăng nhập thất bại! Vui lòng kiểm tra email hoặc mật khẩu."
                );
            } else {
                await navigate("/home");
                toast.success("Đăng nhập thành công!");
            }
        };

        if (data !== undefined) fectLoginApi();
    };

    return (
        <Helmet title="login">
            <section>
                <Container>
                    <Row>
                        <Col lg="6" className="m-auto text-center">
                            <h3
                                className="fw-food fs-4"
                                style={{ marginBottom: "20px" }}
                            >
                                Đăng Nhập
                            </h3>
                            <Form
                                className="auth__form"
                                onSubmit={handleSubmit}
                            >
                                <FormGroup className="form__group">
                                    <input
                                        type="email"
                                        name="email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        placeholder="Nhập email của bạn"
                                    />
                                </FormGroup>
                                <FormGroup className="form__group">
                                    <input
                                        type="password"
                                        name="password"
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        placeholder="Nhập mật khẩu của bạn"
                                    />
                                </FormGroup>
                                <button className="buy__btn auth__btn">
                                    Đăng nhập
                                </button>
                                <p>
                                    Bạn có muốn đăng ký tài khoản mới không?
                                    <Link to="/signup"> Đăng ký</Link>
                                </p>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Helmet>
    );
};

export default Login;
