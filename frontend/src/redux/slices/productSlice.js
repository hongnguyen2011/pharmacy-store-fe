import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addProductService,
  changeStatusProductService,
  editProductService,
  getAllProductService,
  getDetailService,
} from "../../services/productService";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
  },
  extraReducers: (builder) => {
    builder.addCase(getAllProductsApi.fulfilled, (state, action) => {
      state.products = action.payload;
    });
  },
});

export const getAllProductsApi = createAsyncThunk(
  "product/getAllProducts",
  async () => {
    const respone = await getAllProductService();
    return respone.data;
  }
);

export const addProductApi = (formData, navigate) => {
  return async (dispatch) => {
    try {
      const result = await addProductService(formData);

      await dispatch(getAllProductsApi());
      navigate("/admin/products");
    } catch (error) {
      console.log(error);
    }
  };
};

export const editProductApi = (formData, navigate, id) => {
  return async (dispatch) => {
    try {
      const result = await editProductService(formData, id);

      console.log("data", result.data);
      dispatch(getAllProductsApi());
      navigate("/admin/products");
    } catch (error) {
      console.log(error);
    }
  };
};

export const changeStatusProductApi = (idProduct, status_number) => {

  return async (dispatch) => {
    try {
      const result = await changeStatusProductService(idProduct, status_number);

      console.log("data", result.data);
      dispatch(getAllProductsApi());
    } catch (error) {
      console.log(error);
    }
  };
};
