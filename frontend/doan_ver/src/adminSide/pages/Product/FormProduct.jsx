import { Button, Select } from "antd";
import { useFormik } from "formik";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
export default function FormProduct(props) {
    const { initialData, submitForm } = props;
    const navigate = useNavigate();
    const categories = useSelector((state) => state.category.categories);
    const user = JSON.parse(localStorage.getItem("currentUser"))?.data;
    const imgReview = useRef(null);
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
            ...initialData,
        },

        validationSchema: Yup.object().shape({
            name: Yup.string().required("Tên sản phẩm không được để trống!"),

            price: Yup.string().required("Giá sản phẩm không được để trống!"),
            quantity: Yup.string().required(
                "Giá sản phẩm không được để trống!"
            ),
            detail: Yup.string().required(
                "Chi tiết sản phẩm không được để trống!"
            ),
            idCategory: Yup.string().required(
                "Loại sản phẩm không được để trống!"
            ),
        }),

        onSubmit: async (values) => {
            var _image = "";
            if (image) {
                _image = image;
            } else {
                _image = values.pathImg;
            }
            let data = { ...values, pathImg: _image, idUser: user.id, type };
            delete data.slug;
            delete data.categoryName;
            submitForm(data);
        },
    });
    const { values, errors, handleChange, handleSubmit } = formik;
    const [type, setType] = useState(values.type);
    const [image, setImage] = useState();

    const showImgProduct = (fileToLoad) => {
        let fileReader = new FileReader();
        fileReader.onload = function (fileLoadEvent) {
            let srcData = fileLoadEvent.target.result;
            imgReview.current.src = srcData;
            imgReview.current.style.display = "block";
        };
        fileReader.readAsDataURL(fileToLoad);
    };

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
                <div className="form-group">
                    <h5 htmlFor="imgProduct" className="form-label">
                        Hình ảnh sản phẩm
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

                <div className="form-group">
                    <h5 style={{ marginBottom: "10px" }} htmlFor="name_product">
                        Tên sản phẩm
                    </h5>
                    <input
                        onChange={handleChange}
                        type="text"
                        className="form-control"
                        id="name_product"
                        name="name"
                        aria-describedby="validationName"
                        value={values.name}
                    />
                    <span className="text-danger">{errors.name}</span>
                </div>

                <div className="form-group">
                    <h5 style={{ marginBottom: "10px" }} htmlFor="price">
                        Giá sản phẩm
                    </h5>
                    <input
                        onChange={handleChange}
                        type="text"
                        className="form-control"
                        id="price"
                        name="price"
                        value={values.price}
                    />
                    <span className="text-danger">{errors.price}</span>
                </div>
                <div className="form-group">
                    <h5 style={{ marginBottom: "10px" }} htmlFor="price">
                        Số lượng sản phẩm
                    </h5>
                    <input
                        onChange={handleChange}
                        type="text"
                        className="form-control"
                        id="quantity"
                        name="quantity"
                        value={values.quantity}
                    />
                    <span className="text-danger">{errors.quantity}</span>
                </div>
                <div className="form-group">
                    <h5 style={{ marginBottom: "10px" }} htmlFor="type">
                        Chi tiết sản phẩm
                    </h5>
                    <textarea
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"
                        name="detail"
                        onChange={handleChange}
                        value={values.detail}
                    ></textarea>
                    <span className="text-danger">{errors.detail}</span>
                </div>
                <div className="form-group">
                    <h5 style={{ marginBottom: "10px" }} htmlFor="description">
                        Kiểu sản phẩm
                    </h5>
                    <Select
                        placeholder="Chọn kiểu sản phẩm"
                        onChange={(value) => setType(value)}
                        filterOption={(input, option) =>
                            (option?.label ?? "")
                                .toLowerCase()
                                .includes(input.toLowerCase())
                        }
                        value={type}
                        options={[
                            {
                                value: "Hộp",
                                label: "Hộp",
                            },
                            {
                                value: "Chai",
                                label: "Chai",
                            },
                            {
                                value: "Miếng",
                                label: "Miếng",
                            },
                            {
                                value: "Tuýt",
                                label: "Tuýt",
                            },
                        ]}
                    />
                </div>

                <div className="form-group">
                    <h5 style={{ marginBottom: "10px" }} htmlFor="idCategory">
                        Loại sản phẩm
                    </h5>
                    <select
                        className="custom-select"
                        name="idCategory"
                        onChange={handleChange}
                        value={values.idCategory}
                    >
                        <option>Chọn loại sản phẩm</option>
                        {categories.map((category, index) => {
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
