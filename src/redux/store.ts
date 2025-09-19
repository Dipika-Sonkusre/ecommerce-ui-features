import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./productSlice";
import { cartReducer } from "./cartSlice";
import { loginReducer } from "./authSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    login: loginReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
