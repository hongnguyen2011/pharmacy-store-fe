import { createSlice } from "@reduxjs/toolkit";
import { getAllOrderService } from "../../services/orderServices";

const initialState = {
    listOrder: [],
    thongke: [],
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
            dispatch(getAllOrderAction(result.data.data));
        } catch (error) {
            console.log(error);
        }
    };
};
