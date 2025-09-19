import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import ProtectedLayout from "../pages/ProtectedLayout";
import Cart from "../pages/Cart";
import Login from "../pages/Auth/Login";
import ProductSorting from "../pages/ProductSorting";

import { ApiEndpoint } from "../enum";
import { authLoader } from "../utils/loaders";

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
        errorElement: <div>Something went wrong!</div>,
      },
      {
        path: ApiEndpoint.PRODUCT_SORTING,
        Component: ProductSorting,
      },
    ],
  },
]);
