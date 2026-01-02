import {
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} from "../../../redux/features/orders/ordersApi";

const AdminOrders = () => {
  const { data: orders = [], isLoading } = useGetAllOrdersQuery();
  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  if (isLoading) return <p>Loading orders...</p>;

  const handleStatusChange = async (id, status) => {
    await updateOrderStatus({ id, status });
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

              <td className="border p-2">
                <span className="px-2 py-1 rounded bg-gray-200">
                  {order.status}
                </span>
              </td>

              <td className="border p-2">
                <select
                  value={order.status}
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
