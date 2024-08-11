import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addProductToCartService,
  deleteCartItemService,
  getAllCartItemService,
} from "../../services/cartServices";

const initialState = {
  cartItems: [],
  totalAmount: 0,
  totalQuantity: 0,
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
        state.totalAmount = action.payload[0].Cart.total_cart;
        state.totalQuantity = action.payload.reduce(
          (total, item) => total + Number(item.quantity),
          0
        );
      })
      .addCase(getAllCartItemApi.rejected, (state, action) => {
        state.cartItems = [];
        state.totalAmount = 0;
        state.totalQuantity = 0;
      })
      .addCase(addProductToCartApi.fulfilled, (state, action) => {
        state.cartItems = action.payload;
        state.totalAmount = action.payload[0].Cart.total_cart;
        state.totalQuantity = action.payload.reduce(
          (total, item) => total + Number(item.quantity),
          0
        );
      })
      .addCase(deleteCartItemApi.fulfilled, (state, action) => {
        state.cartItems = action.payload;
        state.totalAmount = action.payload[0].Cart.total_cart;
        state.totalQuantity = action.payload.reduce(
          (total, item) => total + Number(item.quantity),
          0
        );
      })
      .addCase(deleteCartItemApi.rejected, (state, action) => {
        state.cartItems = [];
        state.totalAmount = 0;
        state.totalQuantity = 0;
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
    if (
      respone === "There are no products in the cart" ||
      respone === "You don't login"
    ) {
      return Promise.reject();
    }
    return respone.data;
  }
);

export const addProductToCartApi = createAsyncThunk(
  "cart/addProduct",
  async (dataCart) => {
    const responeAddProductToCart = await addProductToCartService(dataCart);
    const respone = await getAllCartItemService(dataCart.accessToken);
    return respone.data;
  }
);

export const deleteCartItemApi = createAsyncThunk(
  "cart/deleteProduct",
  async (dataCartDelete) => {
    console.log(dataCartDelete.accessToken);
    const responeDeleteProductToCart = await deleteCartItemService(
      dataCartDelete
    );
    const respone = await getAllCartItemService(dataCartDelete.accessToken);
    if (respone.data === undefined) {
      return Promise.reject();
    }
    return respone.data;
  }
);
