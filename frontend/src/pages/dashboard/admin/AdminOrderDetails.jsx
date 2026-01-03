import { useParams } from "react-router-dom";
import { useGetOrderByIdQuery } from "../../../redux/features/orders/ordersApi";

const AdminOrderDetails = () => {
  const { id } = useParams();
  const { data: order, isLoading } = useGetOrderByIdQuery(id);

  if (isLoading) return <p>Loading order...</p>;
  if (!order) return <p>Order not found</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Order Details</h2>

      <p><strong>Order ID:</strong> {order._id}</p>
      <p><strong>User:</strong> {order.userId?.email}</p>
      <p><strong>Status:</strong> {order.status}</p>

      <div className="mt-6 border rounded">
        {order.items.map((item, index) => (
          <div
            key={index}
            className="flex justify-between p-3 border-b text-sm"
          >
            <span>{item.name} × {item.quantity}</span>
            <span>${item.price}</span>
          </div>
        ))}
      </div>

      <p className="mt-4 font-bold">
        Total: ${order.totalAmount}
      </p>
    </div>
  );
};

export default AdminOrderDetails;
