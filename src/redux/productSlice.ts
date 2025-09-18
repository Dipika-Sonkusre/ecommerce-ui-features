import { createSlice } from "@reduxjs/toolkit";
import { fetchCategoryLists, fetchProducts } from "./productAction";
import { showToast } from "../utils/toastHandler";
import type { ProductState } from "../interface";

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
  total: 0,
  skip: 0,
  limit: 15,
  selectedCategory: "",
  categoryLists: [],
  sortBy: "",
  order: "asc",
  searchProduct: "",
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setSkip: (state, action) => {
      state.skip = action.payload;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
      state.skip = 0;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setOrder: (state, action) => {
      state.order = action.payload;
    },
    setSearchProduct: (state, action) => {
      state.searchProduct = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.data;
        state.total = action.payload.total;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products";
        showToast(action.error.message || "Failed to fetch products", "error");
      })
      .addCase(fetchCategoryLists.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoryLists.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryLists = action.payload;
      })
      .addCase(fetchCategoryLists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch category lists";
        showToast(
          action.error.message || "Failed to fetch category lists",
          "error"
        );
      });
  },
});

export const {
  setSelectedCategory,
  setLimit,
  setSkip,
  setSortBy,
  setOrder,
  setSearchProduct,
} = productSlice.actions;
export const productReducer = productSlice.reducer;
