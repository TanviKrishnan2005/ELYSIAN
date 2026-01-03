import { NavLink, Outlet } from "react-router-dom";

const UserDashboard = () => {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-100 p-6">
        <h2 className="text-xl font-bold mb-6">User Dashboard</h2>

        <nav className="flex flex-col gap-4">
          <NavLink
            to="/dashboard/user/orders"
            className={({ isActive }) =>
              isActive
                ? "text-red-600 font-semibold"
                : "text-gray-700"
            }
          >
            My Orders
          </NavLink>
        </nav>
      </div>

      {/* Page content */}
      <div className="flex-1 p-6">
        <Outlet /> {/* 👈 THIS SHOWS UserOrders */}
      </div>
    </div>
  );
};

export default UserDashboard;
