import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProductApi } from "../../../redux/slices/productSlice";
import FormProduct from "./FormProduct";
import { toast } from "react-toastify";

export default function InputProduct() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const initialValues = {
        name: "",
        price: "",
        detail: "",
        idCategory: "",
        pathImg: "",
    };

    const addProduct = async (formData) => {
        await toast.success("Thêm sản phẩm thành công!");
        await dispatch(addProductApi(formData, navigate));
    };
    return (
        <div className="container" style={{ padding: "0px 60px" }}>
            <h3 className=""> Thêm sản phẩm</h3>
            <FormProduct initialData={initialValues} submitForm={addProduct} />
        </div>
    );
}
