import { createSlice } from "@reduxjs/toolkit";
import { getAllCategoryServices } from "../../services/categoryServices";

const initialState = {
  categories: [],
};

const categorySlice = createSlice({
  name: "categorySlice",
  initialState,
  reducers: {
    getAllCategoryAction: (state, action) => {
      state.categories = action.payload;
    },
  },
});

export const { getAllCategoryAction } = categorySlice.actions;

export default categorySlice.reducer;

// --action thunk-------------
export const getAllCategoryApi = () => {
  return async (dispatch) => {
    try {
      const result = await getAllCategoryServices();
      dispatch(getAllCategoryAction(result.data));
    } catch (error) {
      console.log(error.message);
    }
  };
};
