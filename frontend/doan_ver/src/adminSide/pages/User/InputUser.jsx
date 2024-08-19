import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userSignupApi } from "../../../redux/slices/userSlice";
import FormUser from "./FormUser";
import { toast } from "react-toastify";
import { signupServices } from "../../../services/signupService";

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
        const result = await signupServices(formData);
        console.log(result);
        if (result.status === 200) {
            toast.success("Thêm tài khoản thành công!");
            navigate("/admin/users");
        } else {
            toast.error(result.message);
        }
    };
    return (
        <div className="container" style={{ padding: "0px 60px" }}>
            <h3 className=""> Thêm tài khoản</h3>
            <FormUser initialData={initialValues} submitForm={addUser} />
        </div>
    );
}
