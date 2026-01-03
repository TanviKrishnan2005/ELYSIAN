import { Outlet, NavLink } from "react-router-dom";

const UserLayout = () => {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-100 p-6">
        <NavLink to="/dashboard/user">Dashboard</NavLink><br />
        <NavLink to="/dashboard/user/orders">Orders</NavLink><br />
        <NavLink to="/dashboard/user/profile">Profile</NavLink>
      </aside>

      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;
