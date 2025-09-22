import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import ProtectedLayout from "../pages/ProtectedLayout";
import Cart from "../pages/Cart";
import Login from "../pages/Auth/Login";
import ProductSorting from "../pages/ProductSorting";
import UserProfile from "../pages/UserProfile";

import { ApiEndpoint } from "../enum";
import { authLoader, loginLoader } from "../utils/loaders";

import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: ApiEndpoint.HOME,
    Component: Home,
    children: [
      {
        index: true,
        Component: Dashboard,
        errorElement: <div>Something went wrong!</div>,
      },
      {
        Component: ProtectedLayout,
        loader: authLoader,
        children: [
          {
            path: ApiEndpoint.CART,
            Component: Cart,
            errorElement: <div>Something went wrong!</div>,
          },
        ],
      },
      {
        path: ApiEndpoint.AUTH_LOGIN,
        Component: Login,
        loader: loginLoader,
        errorElement: <div>Something went wrong!</div>,
      },
      {
        path: ApiEndpoint.USER_PROFILE,
        Component: UserProfile,
        errorElement: <div>Something went wrong!</div>,
        loader: authLoader,
      },
      {
        path: ApiEndpoint.PRODUCT_SORTING,
        Component: ProductSorting,
      },
    ],
  },
]);
