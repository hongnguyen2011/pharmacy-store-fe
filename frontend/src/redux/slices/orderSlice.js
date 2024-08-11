import { createSlice } from "@reduxjs/toolkit";
import { changeStatusOrderService, getAllOrderService } from "../../services/orderServices";

const initialState = {
  listOrder: [],
};

const orderSlice = createSlice({
  name: "orderSlice",
  initialState,
  reducers: {
    getAllOrderAction: (state, action) => {
      state.listOrder = action.payload;
    },
  },
});

export const { getAllOrderAction } = orderSlice.actions;

export default orderSlice.reducer;

// ---action thunk
export const getAllOrderApi = () => {
  return async (dispatch) => {
    try {
      const result = await getAllOrderService();
      dispatch(getAllOrderAction(result.data));
    } catch (error) {
      console.log(error);
    }
  };
};


export const changeStatusOrderApi = (idOrder,status_order) => {
  return async (dispatch) => {
    try {
      const result = await changeStatusOrderService(idOrder,status_order);
      console.log(result.data);
      dispatch(getAllOrderApi());
    } catch (error) {
      console.log(error);
    }
  };
};
