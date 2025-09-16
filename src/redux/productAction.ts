import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequestHandler } from "../api/productApi";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    return await apiRequestHandler({
      url: "https://dummyjson.com/products",
    });
  }
);
