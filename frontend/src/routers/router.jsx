import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import CategoryPage from "../pages/category/CategoryPage";
import Search from "../pages/search/Search";
import ShopPage from "../pages/shop/ShopPage";
import SingleProducts from "../pages/shop/productDetails/SingleProducts";
import Login from "../components/Login";
import Register from "../components/Register";

import RequireAuth from "../components/protected/RequireAuth";
import RequireAdmin from "../components/protected/RequireAdmin";

import UserDashboard from "../pages/dashboard/user/UserDashboard";
import AdminLayout from "../pages/dashboard/admin/AdminLayout";
import AdminDashboard from "../pages/dashboard/admin/AdminDashboard";
import ManageItems from "../pages/dashboard/admin/ManageItems";
import AddProduct from "../pages/dashboard/admin/AddProduct";
import AllOrders from "../pages/dashboard/admin/AllOrders";
import EditProduct from "../pages/dashboard/admin/EditProduct";
import Users from "../pages/dashboard/admin/Users";
import AdminOrders from "../pages/dashboard/admin/AdminOrders";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },

      { path: "categories/:categoryName", element: <CategoryPage /> },
      { path: "search", element: <Search /> },
      { path: "shop", element: <ShopPage /> },
      { path: "shop/:id", element: <SingleProducts /> },

      // 🔐 DASHBOARD ROUTES (MOVED HERE)
      {
        path: "dashboard",
        children: [
          {
            element: <RequireAuth />,
            children: [
              { path: "user", element: <UserDashboard /> },
            ],
          },
          {
            element: <RequireAdmin />,
            children: [
              {
                path: "admin",
                element: <AdminLayout />,
                children: [
                  { index: true, element: <AdminDashboard /> },

                  { path: "manage-items", element: <ManageItems /> },
                  { path: "add-product", element: <AddProduct /> },
                  { path: "edit-product/:id", element: <EditProduct /> },
                  // { path: "orders", element: <AllOrders /> },
                  { path: "users", element: <Users /> },
                  { path: "orders", element: <AdminOrders /> },




                ],
              },
            ],
          },
        ],
      },
    ],
  },

  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  

]);

export default router;
