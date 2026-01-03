import { createBrowserRouter } from "react-router-dom";
import App from "../App";

// Public
import Home from "../pages/Home/Home";
import CategoryPage from "../pages/category/CategoryPage";
import Search from "../pages/search/Search";
import ShopPage from "../pages/shop/ShopPage";
import SingleProducts from "../pages/shop/productDetails/SingleProducts";
import Login from "../components/Login";
import Register from "../components/Register";

// Guards
import RequireAuth from "../components/protected/RequireAuth";
import RequireAdmin from "../components/protected/RequireAdmin";

// User
import UserLayout from "../pages/dashboard/user/UserLayout";
import UserDashboard from "../pages/dashboard/user/UserDashboard";
import UserOrders from "../pages/dashboard/user/UserOrders";
import UserOrderDetails from "../pages/dashboard/user/UserOrderDetails";
import UserProfile from "../pages/dashboard/user/UserProfile";
import EditProfile from "../pages/dashboard/user/EditProfile";

// Admin
import AdminLayout from "../pages/dashboard/admin/AdminLayout";
import AdminDashboard from "../pages/dashboard/admin/AdminDashboard";
import ManageItems from "../pages/dashboard/admin/ManageItems";
import AddProduct from "../pages/dashboard/admin/AddProduct";
import EditProduct from "../pages/dashboard/admin/EditProduct";
import Users from "../pages/dashboard/admin/Users";
import AdminOrders from "../pages/dashboard/admin/AdminOrders";
import AdminOrderDetails from "../pages/dashboard/admin/AdminOrderDetails";

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

      {
        path: "dashboard",
        children: [
          {
            element: <RequireAuth />,
            children: [
              {
                path: "user",
                element: <UserLayout />,
                children: [
                  { index: true, element: <UserDashboard /> },
                  { path: "orders", element: <UserOrders /> },
                  { path: "orders/:id", element: <UserOrderDetails /> },
                  { path: "profile", element: <UserProfile /> },
                  { path: "profile/edit", element: <EditProfile /> }, // ✅ FIX
                ],
              },
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
                  { path: "users", element: <Users /> },
                  { path: "orders", element: <AdminOrders /> },
                  { path: "orders/:id", element: <AdminOrderDetails /> },
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
