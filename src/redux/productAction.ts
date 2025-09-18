import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequestHandler } from "../api/productApi";

const API_URL = "https://dummyjson.com/products";

export const fetchCategoryLists = createAsyncThunk(
  "product/fetchCategoryLists",
  async () => {
    const response = await apiRequestHandler({
      url: `${API_URL}/category-list`,
    });
    return response;
  }
);

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({
    skip = 0,
    limit = 15,
    category,
    sortBy = "",
    order = "asc",
  }: {
    skip: number;
    limit: number;
    category?: string;
    sortBy?: string;
    order?: "asc" | "desc";
  }) => {
    let url = `${API_URL}?limit=${limit}&skip=${skip}`;

    if (category) {
      url = `${API_URL}/category/${category}?limit=${limit}&skip=${skip}`;
    }

    if (sortBy && order) {
      url = `${API_URL}?sortBy=${sortBy}&order=${order}&limit=${limit}&skip=${skip}`;
    }

    const response = await apiRequestHandler({ url });

    return {
      data: response.products,
      total: response.total,
    };
  }
);
