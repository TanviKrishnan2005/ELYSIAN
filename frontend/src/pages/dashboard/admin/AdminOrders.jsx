import {
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} from "../../../redux/features/orders/ordersApi";
import toast from "react-hot-toast";

const AdminOrders = () => {
  const { data: orders = [], isLoading, error } = useGetAllOrdersQuery();
  const [updateOrderStatus, { isLoading: updating }] =
    useUpdateOrderStatusMutation();

  if (isLoading) return <p>Loading orders...</p>;
  if (error) return <p className="text-red-500">Failed to load orders</p>;

  const handleStatusChange = async (orderId, status) => {
    try {
      await updateOrderStatus({ orderId, status }).unwrap();
      toast.success("Order status updated ✅");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update order ❌");
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
              <td className="border p-2">{order._id}</td>
              <td className="border p-2">
                {order.userId?.email || "N/A"}
              </td>
              <td className="border p-2">${order.totalAmount}</td>
              <td className="border p-2">{order.status}</td>
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
