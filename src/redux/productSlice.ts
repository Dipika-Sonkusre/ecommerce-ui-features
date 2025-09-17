import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "./productAction";
import { showToast } from "../utils/toastHandler";
import type { ProductState } from "../interface";

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
  total: 0,
  skip: 0,
  limit: 5,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.total = action.payload.total;
        state.skip = action.payload.skip;
        state.limit = action.payload.limit;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch users";
        showToast(action.error.message || "Failed to fetch users", "error");
      });
  },
});

export const productReducer = productSlice.reducer;
