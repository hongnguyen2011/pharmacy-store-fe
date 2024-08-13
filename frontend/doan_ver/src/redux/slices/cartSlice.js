import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    addProductToCartService,
    deleteCartItemService,
    getAllCartItemService,
} from "../../services/cartServices";
const sumArray = (mang) => {
    if (mang === undefined) {
        return 0;
    }
    let sum = 0;
    mang.map(function (value) {
        sum += value.quantity * value.price;
    });
    return sum;
};
const initialState = {
    cartItems: [],
    total: 0
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        getCartItem: (state, action) => {
            state = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllCartItemApi.fulfilled, (state, action) => {
                
                state.cartItems = action.payload;
                state.total = sumArray(state.cartItems);
            })
            .addCase(getAllCartItemApi.rejected, (state, action) => {
                state.cartItems = [];
                state.total = 0;
            })
            .addCase(addProductToCartApi.fulfilled, (state, action) => {
                state.cartItems = action.payload;
                state.total = sumArray(state.cartItems);
            })
            .addCase(deleteCartItemApi.fulfilled, (state, action) => {
                state.cartItems = action.payload;
                state.total = sumArray(state.cartItems);

            })
            .addCase(deleteCartItemApi.rejected, (state, action) => {
                state.cartItems = [];
                state.total = 0;
            });
    },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;

export const getAllCartItemApi = createAsyncThunk(
    "cart/getAllCart",
    async (accessToken) => {
        const respone = await getAllCartItemService(accessToken);
        console.log(respone);
        if (respone.data === undefined) {
            return Promise.reject();
        }
        return respone.data;
    }
);

export const addProductToCartApi = createAsyncThunk(
    "cart/addProduct",
    async (dataCart) => {
        await addProductToCartService(dataCart);
        const respone = await getAllCartItemService(dataCart.accessToken);
        return respone.data;
    }
);

export const deleteCartItemApi = createAsyncThunk(
    "cart/deleteProduct",
    async (dataCartDelete) => {
        await deleteCartItemService(
            dataCartDelete.id
        );
        const respone = await getAllCartItemService(dataCartDelete.accessToken);
        return respone.data;
    }
);
