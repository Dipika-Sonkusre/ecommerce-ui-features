import { createBrowserRouter } from "react-router";
import Dashboard from "../component/Dashboard";
import ProductSorting from "../component/ProductSorting";
import { ApiEndpoint } from "../enum";

export const router = createBrowserRouter([
  {
    path: ApiEndpoint.DASHBOARD,
    Component: Dashboard,
  },
  {
    path: ApiEndpoint.PRODUCT_SORTING,
    Component: ProductSorting,
  },
]);
