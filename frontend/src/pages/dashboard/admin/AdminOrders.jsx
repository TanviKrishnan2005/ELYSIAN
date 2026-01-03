import { Link } from "react-router-dom";
import {
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} from "../../../redux/features/orders/ordersApi";

const AdminOrders = () => {
  const {
    data: orders = [],
    isLoading,
    error,
  } = useGetAllOrdersQuery();

  const [updateOrderStatus, { isLoading: updating }] =
    useUpdateOrderStatusMutation();

  if (isLoading) return <p>Loading orders...</p>;
  if (error) return <p className="text-red-500">Failed to load orders</p>;

  const handleStatusChange = async (orderId, status) => {
    try {
      await updateOrderStatus({ orderId, status }).unwrap();
      alert("Order status updated ✅");
    } catch (error) {
      console.error("Failed to update status:", error);
      alert("Failed to update order status ❌");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">All Orders</h2>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Order ID</th>
            <th className="border p-2">Customer</th>
            <th className="border p-2">Total</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Change Status</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              {/* ✅ CLICKABLE ORDER ID */}
              <td className="border p-2">
                <Link
                  to={`/dashboard/admin/orders/${order._id}`}
                  className="text-blue-600 underline"
                >
                  {order._id}
                </Link>
              </td>

              <td className="border p-2">
                {order.userId?.email || "N/A"}
              </td>

              <td className="border p-2">
                ${order.totalAmount}
              </td>

              <td className="border p-2">
                <span className="px-2 py-1 rounded bg-gray-200">
                  {order.status}
                </span>
              </td>

              <td className="border p-2">
                <select
                  value={order.status}
                  disabled={updating}
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                  className="border p-1"
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="completed">Completed</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrders;
