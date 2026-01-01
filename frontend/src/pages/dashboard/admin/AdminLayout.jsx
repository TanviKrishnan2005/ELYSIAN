import { Outlet, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/features/auth/authSlice";

const AdminLayout = () => {
  const dispatch = useDispatch();

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-100 p-6">
  <h2 className="text-xl font-semibold mb-6">Admin</h2>

  <nav className="flex flex-col space-y-4 text-sm font-medium">
    <NavLink
      to="/dashboard/admin"
      className={({ isActive }) =>
        isActive ? "text-red-600" : "text-gray-700"
      }
    >
      Dashboard
    </NavLink>

    <NavLink to="/dashboard/admin/manage-items">
      Manage Items
    </NavLink>

    <NavLink to="/dashboard/admin/orders">
      All Orders
    </NavLink>

    <NavLink to="/dashboard/admin/add-product">
      Add Product
    </NavLink>
  </nav>
</aside>


      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
