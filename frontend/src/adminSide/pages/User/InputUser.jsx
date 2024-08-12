import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userSignupApi } from "../../../redux/slices/userSlice";
import FormUser from "./FormUser";
import { toast } from "react-toastify";

export default function InputProduct() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const initialValues = {
        email: "",
        password: "",
        name: "",
        address: "",
        phone: "",
        idRole: "",
        pathImg: "",
        confirmedPassword: "",
    };

    const addUser = async (formData) => {
        const result = await dispatch(userSignupApi(formData));
        console.log(result);
        if (result.payload.status === 200) {
            toast.success("Thêm tài khoản thành công!");
            navigate("/admin/users");
        } else {
            toast.error("Thêm tài khoản thất bại!");
        }
    };
    return (
        <div className="container" style={{ padding: "0px 60px" }}>
            <h3 className=""> Thêm tài khoản</h3>
            <FormUser initialData={initialValues} submitForm={addUser} />
        </div>
    );
}
