import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import type { CartState, ProductType } from "../interface";

const initialState: CartState = {
  cart: [],
  totalAmount: 0,
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product: ProductType = action.payload;
      const existedProduct = state.cart.find((p) => p.id === product.id);
      if (existedProduct) {
        existedProduct.quantity += 1;
        state.totalAmount += Number(existedProduct.price);
        state.totalQuantity += 1;
        toast.success("Quantity increased!");
      } else {
        state.cart.push({ ...product, quantity: 1 });
        state.totalAmount += Number(product.price);
        state.totalQuantity += 1;
        toast.success("Product added to cart!");
      }
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      const removedProduct = state.cart.find((p) => p.id === productId);
      if (removedProduct) {
        state.totalQuantity -= removedProduct.quantity;
        state.totalAmount -= removedProduct.price * removedProduct.quantity;
      }
      state.cart = state.cart.filter((p) => p.id !== productId);
      toast.success("Product removed from cart!");
    },
    increaseQuantity: (state, action) => {
      const productId = action.payload;
      const updatedProduct = state.cart.find((p) => p.id === productId);
      if (updatedProduct) {
        updatedProduct.quantity += 1;
        state.totalAmount += updatedProduct.price;
        state.totalQuantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const productId = action.payload;
      const updatedProduct = state.cart.find((p) => p.id === productId);
      if (updatedProduct) {
        if (updatedProduct.quantity > 1) {
          updatedProduct.quantity -= 1;
          state.totalAmount -= updatedProduct.price;
          state.totalQuantity -= 1;
        } else {
          // remove product if quantity = 1
          state.cart = state.cart.filter((p) => p.id !== productId);
          state.totalAmount -= updatedProduct.price;
          state.totalQuantity -= 1;
        }
      }
    },
    clearCart: (state) => {
      state.cart = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
