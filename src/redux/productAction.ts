import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequestHandler } from "../api/productApi";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ skip = 0, limit = 5 }: { skip: number; limit: number }) => {
    return await apiRequestHandler({
      url: `https://dummyjson.com/products?skip=${skip}&limit=${limit}`,
    });
  }
);
