import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addCategoryApi } from "../../../redux/slices/categorySlice";
import FormCategory from "./FormCategory";
import { toast } from "react-toastify";

export default function InputCategory() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const initialValues = {
        name: "",
        slug: "",
    };

    const addCategory = async (formData) => {
        await toast.success("Thêm loại sản phẩm thành công!");
        await dispatch(addCategoryApi(formData, navigate));
    };
    return (
        <div className="container" style={{ padding: "0px 60px" }}>
            <h3 className=""> Thêm sản phẩm</h3>
            <FormCategory
                initialData={initialValues}
                submitForm={addCategory}
            />
        </div>
    );
}
