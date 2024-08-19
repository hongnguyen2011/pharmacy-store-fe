import React, { useRef, useState } from "react";
import { Col, Row, Card, Form, Button } from "@themesberg/react-bootstrap";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { editProfileApi } from "../../../redux/slices/userSlice";
import icon from "../../../assets/images/user-icon.png";
import ChangePassword from "./ChangePassword";
export const GeneralInfoForm = () => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const imgReview = useRef(null);
    const [open, setOpen] = useState(false);
    const onOpen = () => {
        setOpen(!open);
    };
    const [image, setImage] = useState();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const showImgProduct = (fileToLoad) => {
        let fileReader = new FileReader();
        fileReader.onload = function (fileLoadEvent) {
            let srcData = fileLoadEvent.target.result;
            imgReview.current.src = srcData;
            imgReview.current.style.display = "block";
        };
        fileReader.readAsDataURL(fileToLoad);
    };
    const handleUpImage = async (e) => {
        showImgProduct(e.target.files[0]);
        let imgArr = [];
        const formData = new FormData();
        formData.append("file", e.target.files[0]);
        formData.append("upload_preset", "kpmcyaxr");
        formData.append("cloud_name", "df6mryfkp");
        const res = await fetch(
            "https://api.cloudinary.com/v1_1/df6mryfkp/image/upload",
            {
                method: "POST",
                body: formData,
            }
        );

        const result = await res.json();
        imgArr.push({
            public_id: result.public_id,
            url: result.secure_url,
        });
        setImage(imgArr[0].url);
    };
    const formik = useFormik({
        initialValues: {
            id: user.data.id,
            password: user.data.password,
            name: user.data.name,
            email: user.data.email,
            phone: user.data.phone,
            address: user.data.address,
            idRole: user.data.idRole,
            pathImg: user.data.pathImg,
        },

        onSubmit: async (values) => {
            var _image = "";
            if (image) {
                _image = image;
            } else {
                _image = values.pathImg;
            }
            let data = { ...values, pathImg: _image };

            const respon = await dispatch(editProfileApi(data));
            if (respon.payload.data.status === 200) {
                toast.success("Sửa thông tin thành công!");
                navigate("/profile");
            } else {
                toast.success("Sửa thông tin thất bại!");
            }
        },
    });
    const { values, handleChange, handleSubmit } = formik;
    return (
        <>
            <Col xs={12} xl={8}>
                <Card border="light" className="bg-white shadow-sm mb-4">
                    <Card.Body>
                        <h5 className="mb-4">Thông tin cá nhân</h5>
                        <Form onSubmit={handleSubmit}>
                            <Row>
                                <Col md={6} className="mb-3">
                                    <Form.Group id="emal">
                                        <Form.Label>Hình ảnh</Form.Label>
                                        <Form.Control
                                            required
                                            type="file"
                                            name="pathImg"
                                            accept=".jpg, .png"
                                            onChange={(event) =>
                                                handleUpImage(event)
                                            }
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6} className="mb-3">
                                    <Form.Group id="emal">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            required
                                            type="email"
                                            placeholder="name@company.com"
                                            value={values.email}
                                            disabled
                                            name="email"
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6} className="mb-3">
                                    <Form.Group id="name">
                                        <Form.Label>Họ và tên</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            placeholder="Nhập họ và tên"
                                            value={values.name}
                                            name="name"
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={6} className="mb-3">
                                    <Form.Group id="phone">
                                        <Form.Label>Số điện thoại</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            placeholder="09684883343"
                                            value={values.phone}
                                            name="phone"
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col sm={6} className="mb-3">
                                    <Form.Group id="address">
                                        <Form.Label>Địa chỉ</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            placeholder="Nhập địa chỉ"
                                            value={values.address}
                                            name="address"
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={6} className="mb-3">
                                    <Button
                                        variant="primary"
                                        style={{ backgroundColor: "#11376c" }}
                                        onClick={onOpen}
                                    >
                                        Thay đổi mật khẩu
                                    </Button>
                                </Col>
                                <Col sm={6} className="mb-3">
                                    <Button
                                        variant="primary"
                                        type="submit"
                                        style={{ backgroundColor: "#0a1d37" }}
                                    >
                                        Lưu
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>

            <Col xs={12} xl={4}>
                <Row>
                    <Col xs={12}>
                        <Card
                            border="light"
                            className="card__avatar text-center p-0 mb-4"
                        >
                            <div className="profile-cover rounded-top" />
                            <Card.Body className="pb-5 card_profile">
                                <Card.Img
                                    src={image ? image : icon}
                                    alt="Avatar"
                                    ref={imgReview}
                                    className="user-avatar large-avatar rounded-circle mx-auto mt-n7 mb-2"
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Col>
            {open ? <ChangePassword open={open} onOpen={onOpen} /> : <></>}
        </>
    );
};
