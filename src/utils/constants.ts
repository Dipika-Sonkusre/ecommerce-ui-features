import type { CartState, LoginState, ProductState } from "../interface";

export const tableColumns = [
  "id",
  "title",
  "brand",
  "category",
  "price",
  "rating",
  "stock",
];

export const errorMessages: Record<number, string> = {
  401: "Unauthorized. Please log in again.",
  403: "Forbidden. You do not have permission.",
  404: "Requested resource not found.",
  500: "Server is currently unavailable. Please try later.",
};

export const authInitialState: LoginState = {
  userProfile: null,
  error: null,
  isLoading: false,
  loggedIn: false,
};


export const cartInitialState: CartState = {
  cart: [],
  totalAmount: 0,
  totalQuantity: 0,
};

export const productInitialState: ProductState = {
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