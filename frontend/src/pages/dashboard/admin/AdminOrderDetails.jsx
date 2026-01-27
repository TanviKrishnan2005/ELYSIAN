import { useParams } from "react-router-dom";
import { useGetOrderByIdQuery } from "../../../redux/features/orders/ordersApi";

const AdminOrderDetails = () => {
  const { id } = useParams();
  const { data: order, isLoading, error } = useGetOrderByIdQuery(id);

  if (isLoading) return <p className="p-6">Loading order...</p>;
  if (error) return <p className="p-6 text-red-500">Failed to load order</p>;
  if (!order) return <p className="p-6">Order not found</p>;

  return (
    <div className="p-6 max-w-4xl">
      <h2 className="text-2xl font-bold mb-6">Order Details</h2>

      {/* Order meta */}
      <div className="space-y-2 mb-6">
        <p>
          <strong>Order ID:</strong> {order._id}
        </p>

        <p>
          <strong>User:</strong> {order.userId?.email || "N/A"}
        </p>

        <p>
          <strong>Order Status:</strong>{" "}
          <span className="capitalize">{order.status}</span>
        </p>

        <p>
          <strong>Payment Status:</strong>{" "}
          <span
            className={`ml-2 px-2 py-1 rounded text-sm font-medium ${
              order.paymentStatus === "paid"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {order.paymentStatus}
          </span>
        </p>

        {order.paymentIntentId && (
          <p>
            <strong>Payment Intent:</strong> {order.paymentIntentId}
          </p>
        )}

        {order.paidAt && (
          <p>
            <strong>Paid At:</strong>{" "}
            {new Date(order.paidAt).toLocaleString()}
          </p>
        )}
      </div>

      {/* Items */}
      <div className="border rounded bg-white">
        {order.items.map((item, index) => (
          <div
            key={index}
            className="flex justify-between p-3 border-b text-sm"
          >
            <span>
              {item.name} × {item.quantity}
            </span>
            <span>${Number(item.price).toFixed(2)}</span>
          </div>
        ))}
      </div>

      {/* Total */}
      <p className="mt-6 text-lg font-bold">
        Total: ${Number(order.totalAmount).toFixed(2)}
      </p>
    </div>
  );
};

export default AdminOrderDetails;
