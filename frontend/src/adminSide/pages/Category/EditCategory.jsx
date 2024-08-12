import React from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import FormCategory from "./FormCategory";
import { toast } from "react-toastify";
import { editCategorytApi } from "../../../redux/slices/categorySlice";

export default function EditProduct() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { state } = useLocation();
    const editProduct = async (data) => {
        await toast.success("Chỉnh sửa loại sản phẩm thành công!");
        await dispatch(editCategorytApi(data, navigate));
    };
    return (
        <div className="container" style={{ padding: "0px 60px" }}>
            <h2 className="">Chỉnh sửa sản phẩm</h2>
            <FormCategory initialData={state} submitForm={editProduct} />
        </div>
    );
}
