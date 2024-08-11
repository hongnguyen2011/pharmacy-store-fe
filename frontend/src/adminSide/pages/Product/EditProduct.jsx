import React from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import FormProduct from "./FormProduct";
import { toast } from "react-toastify";
import { editProductApi } from "../../../redux/slices/productSlice";

export default function EditProduct() {
  const { idProduct } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();

  const { name, price, description, category_id, image } = state;

  const initialValues = {
    imgProduct: image,
    name,
    price,
    description,
    category_id,
  };

  const editProduct = async (formData) => {
    await toast.success("The product has been successfully changed!");
    await dispatch(editProductApi(formData, navigate, idProduct));
  };
  return (
    <div className="container" style={{ padding: "0px 60px" }}>
      <h3 className=""> Edit Product</h3>
      <FormProduct initialData={initialValues} submitForm={editProduct} />
    </div>
  );
}
