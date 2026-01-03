import { createBrowserRouter } from "react-router-dom";
import App from "../App";

// Public pages
import Home from "../pages/Home/Home";
import CategoryPage from "../pages/category/CategoryPage";
import Search from "../pages/search/Search";
import ShopPage from "../pages/shop/ShopPage";
import SingleProducts from "../pages/shop/productDetails/SingleProducts";
import Login from "../components/Login";
import Register from "../components/Register";

// Auth guards
import RequireAuth from "../components/protected/RequireAuth";
import RequireAdmin from "../components/protected/RequireAdmin";

// User dashboard
import UserDashboard from "../pages/dashboard/user/UserDashboard";
import UserOrders from "../pages/dashboard/user/UserOrders";
import OrderDetails from "../pages/dashboard/user/OrderDetails";
import UserOrderDetails from "../pages/dashboard/user/UserOrderDetails";
// Admin dashboard
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
      // 🌐 PUBLIC ROUTES
      { index: true, element: <Home /> },
      { path: "categories/:categoryName", element: <CategoryPage /> },
      { path: "search", element: <Search /> },
      { path: "shop", element: <ShopPage /> },
      { path: "shop/:id", element: <SingleProducts /> },

      // 📊 DASHBOARD
      {
        path: "dashboard",
        children: [
          // 👤 USER DASHBOARD
          {
            element: <RequireAuth />,
            children: [
              {
                path: "user",
                element: <UserDashboard />,
                children: [
                  { path: "orders", element: <UserOrders /> },
                  { path: "user/orders/:id", element: <OrderDetails /> },
                  { path: "orders/:id", element: <UserOrderDetails />,},

                ],
              },
            ],
          },

          // 🛠 ADMIN DASHBOARD
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

  // 🔐 AUTH ROUTES
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
]);

export default router;
