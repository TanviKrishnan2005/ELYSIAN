import { useFetchAllProductsQuery } from "../../../redux/features/products/productsApi";
import { useGetAllUsersQuery } from "../../../redux/features/auth/authApi";

const AdminDashboard = () => {
  const { data: productsData } = useFetchAllProductsQuery({});
  const { data: users } = useGetAllUsersQuery();

  const totalProducts = productsData?.products?.length || 0;
  const totalUsers = users?.length || 0;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="p-4 bg-white shadow rounded">
          <p className="text-sm text-gray-500">Total Products</p>
          <p className="text-xl font-bold">{totalProducts}</p>
        </div>

        <div className="p-4 bg-white shadow rounded">
          <p className="text-sm text-gray-500">All Users</p>
          <p className="text-xl font-bold">{totalUsers}</p>
        </div>

        <div className="p-4 bg-white shadow rounded">
          <p className="text-sm text-gray-500">All Orders</p>
          <p className="text-xl font-bold">0</p>
        </div>

        <div className="p-4 bg-white shadow rounded">
          <p className="text-sm text-gray-500">Total Earnings</p>
          <p className="text-xl font-bold">$0</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
