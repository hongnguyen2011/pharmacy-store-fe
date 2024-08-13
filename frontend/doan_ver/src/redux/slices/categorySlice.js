import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllCategoryServices, editCategoryService, addCategoryService } from "../../services/categoryServices";

export const categorySlice = createSlice({
    name: "category",
    initialState: {
        categories: [],
    },
    extraReducers: (builder) => {
        builder.addCase(getAllCategoryApi.fulfilled, (state, action) => {
            state.categories = action.payload;
        });
    },
});
// Lấy danh sách loại sản phẩm
export const getAllCategoryApi = createAsyncThunk(
    "category/getAllCategory",
    async () => {
        const respone = await getAllCategoryServices();
        return respone.data;
    }
);
//Thêm mới một sản phẩm
export const addCategoryApi = (formData, navigate) => {
    return async (dispatch) => {
        try {
            const result = await addCategoryService(formData);

            await dispatch(getAllCategoryApi());
            navigate("/admin/categories");
        } catch (error) {
            console.log(error);
        }
    };
};
//Chỉnh sửa loại sản phẩm
export const editCategorytApi = (formData, navigate) => {
    return async (dispatch) => {
        try {
            const result = await editCategoryService(formData);
            dispatch(getAllCategoryApi());
            navigate("/admin/categories");
        } catch (error) {
            console.log(error);
        }
    };
};
