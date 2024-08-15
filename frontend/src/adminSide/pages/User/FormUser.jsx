import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "antd";
import { getAllRoleService } from "../../../services/userService"
export default function FormUser(props) {
    const { initialData, submitForm } = props;
    const [roles, setRoles] = useState([]);
    const imgReview = useRef(null);
    const [image, setImage] = useState();
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
    useEffect(() => {
        const result = async () => {
            const respon = await getAllRoleService();
            if (respon.data.status === 200) {
                setRoles(respon.data.data);
            }
        }
        result();
    })
    const formik = useFormik({
        initialValues: {
            ...initialData,
        },


        validationSchema: Yup.object().shape({
            name: Yup.string()
                .required("Vui lòng nhập tên tài khoản")
                .min(4, "Phải có 4 ký tự trở lên"),
            address: Yup.string()
                .required("Vui lòng nhập địa chỉ")
                .min(4, "Phải có 4 ký tự trở lên"),
            email: Yup.string()
                .required("Vui lòng nhập email")
                .matches(
                    /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    "Vui lòng nhập địa chỉ email hợp lệ"
                ),
            password: Yup.string()
                .required("Vui lòng nhập mật khẩu")
                .matches(
                    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/,
                    "Mật khẩu phải có 7-19 ký tự và chứa ít nhất một chữ cái, một số và một ký tự đặc biệt"
                ),
            confirmedPassword: Yup.string()
                .required("Vui lòng nhập xác nhận mật khẩu")
                .oneOf([Yup.ref("password"), null], "Mật khẩu không khớp"),
            phone: Yup.string()
                .required("Vui lòng nhập số điện thoại")
                .matches(
                    /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
                    "Phải là một số điện thoại hợp lệ"
                ),
            idRole: Yup.string()
                .required("Vui lòng chọn role")
        }),

        onSubmit: async (values) => {
            var _image = "";
            if (image) {
                _image = image;
            } else {
                _image = values.pathImg;
            }
            let data = { ...values, pathImg: _image };
            delete data.confirmedPassword;
            submitForm(data);
        },
    });

    const showImgProduct = (fileToLoad) => {
        let fileReader = new FileReader();
        fileReader.onload = function (fileLoadEvent) {
            let srcData = fileLoadEvent.target.result;
            imgReview.current.src = srcData;
            imgReview.current.style.display = "block";
        };
        fileReader.readAsDataURL(fileToLoad);
    };

    const { values, errors, handleChange, handleSubmit } = formik;
    const styleImgReview = {
        display: values.pathImg ? "block" : "none",
        width: "240px",
    };
    return (
        <div className="container mt-5" style={{ padding: "0px 60px" }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <img
                    src={values.pathImg}
                    alt="img_product"
                    ref={imgReview}
                    style={styleImgReview}
                />
            </div>
            <form onSubmit={handleSubmit}>
                {/* Ảnh cá nhân */}
                <div className="form-group">
                    <h5 htmlFor="imgProduct" className="form-label">
                        Hình ảnh
                    </h5>
                    <input
                        className="form-control"
                        id="imgProduct"
                        name="pathImg"
                        type="file"
                        accept=".jpg, .png"
                        onChange={(event) => handleUpImage(event)}
                    />
                    <span className="text-danger">{errors.pathImg}</span>
                </div>
                {/* Tên  */}
                <div className="form-group">
                    <h5 style={{ marginBottom: "10px" }} htmlFor="name_product">
                        Tên tài khoản
                    </h5>
                    <input
                        onChange={handleChange}
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        aria-describedby="validationName"
                        value={values.name}
                    />
                    <span className="text-danger">{errors.name}</span>
                </div>
                {/* Email */}
                <div className="form-group">
                    <h5 style={{ marginBottom: "10px" }} htmlFor="email">
                        Email
                    </h5>
                    <input
                        onChange={handleChange}
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={values.email}
                    />
                    <span className="text-danger">{errors.email}</span>
                </div>
                {/* Mật khẩu */}
                <div className="form-group">
                    <h5 style={{ marginBottom: "10px" }} htmlFor="password">
                        Mật khẩu
                    </h5>
                    <input
                        onChange={handleChange}
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={values.password}
                    />
                    <span className="text-danger">{errors.password}</span>
                </div>
                {/* Xác nhận mật khẩu */}
                <div className="form-group">
                    <h5 style={{ marginBottom: "10px" }} htmlFor="confirmedPassword">
                        Xác nhận mật khẩu
                    </h5>
                    <input
                        onChange={handleChange}
                        type="password"
                        className="form-control"
                        id="confirmedPassword"
                        name="confirmedPassword"
                        value={values.confirmedPassword}
                    />
                    <span className="text-danger">{errors.confirmedPassword}</span>
                </div>
                {/* Địa chỉ */}
                <div className="form-group">
                    <h5 style={{ marginBottom: "10px" }} htmlFor="address">
                        Địa chỉ
                    </h5>
                    <input
                        onChange={handleChange}
                        type="text"
                        className="form-control"
                        id="address"
                        name="address"
                        value={values.address}
                    />
                    <span className="text-danger">{errors.address}</span>
                </div>
                {/* Số điện thoại */}
                <div className="form-group">
                    <h5 style={{ marginBottom: "10px" }} htmlFor="phone">
                        Số điện thoại
                    </h5>
                    <input
                        onChange={handleChange}
                        type="text"
                        className="form-control"
                        id="phone"
                        name="phone"
                        value={values.phone}
                    />
                    <span className="text-danger">{errors.phone}</span>
                </div>
                {/* Loại tài khoản */}
                <div className="form-group">
                    <h5 style={{ marginBottom: "10px" }} htmlFor="idRole">
                        Loại tài khoản
                    </h5>
                    <select
                        className="custom-select"
                        name="idRole"
                        onChange={handleChange}
                        value={values.idRole}
                    >
                        <option>Chọn loại tài khoản</option>
                        {roles.map((category, index) => {
                            return (
                                <option key={index} value={category.id}>
                                    {category.name}
                                </option>
                            );
                        })}
                    </select>
                    <span className="text-danger">{errors.idCategory}</span>
                </div>

                <Button
                    type="primary"
                    block
                    htmlType="submit"
                    style={{ fontSize: "16px" }}
                >
                    Lưu
                </Button>
            </form>
        </div>
    );
}
