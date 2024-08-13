import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "antd";
export default function FormCategory(props) {
    const { initialData, submitForm } = props;
    const formik = useFormik({
        initialValues: {
            ...initialData,
        },

        validationSchema: Yup.object().shape({
            name: Yup.string().required(
                "Tên loại sản phẩm không được để trống!"
            ),
            slug: Yup.string().required("Hastag không được để trống!"),
        }),

        onSubmit: async (values) => {
            submitForm(values);
        },
    });

    const { values, errors, handleChange, handleSubmit } = formik;
    return (
        <div className="container mt-5" style={{ padding: "0px 60px" }}>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <h5 style={{ marginBottom: "10px" }} htmlFor="name_product">
                        Tên loại sản phẩm
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
                        Hastag loại sản phẩm
                    </h5>
                    <input
                        onChange={handleChange}
                        type="text"
                        className="form-control"
                        id="slug"
                        name="slug"
                        value={values.slug}
                    />
                    <span className="text-danger">{errors.slug}</span>
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
