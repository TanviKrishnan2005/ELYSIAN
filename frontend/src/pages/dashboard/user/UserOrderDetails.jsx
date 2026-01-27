import { useParams } from "react-router-dom";
import { useGetUserOrdersQuery } from "../../../redux/features/orders/ordersApi";

const UserOrderDetails = () => {
  const { id } = useParams();
  const { data: orders = [], isLoading } = useGetUserOrdersQuery();

  if (isLoading) return <p className="p-6">Loading order...</p>;

  const order = orders.find((o) => o._id === id);

  if (!order) {
    return <p className="p-6 text-red-500">Order not found</p>;
  }

  return (
    <div className="p-6 max-w-3xl">
      <h2 className="text-2xl font-bold mb-4">Order Details</h2>

      <p className="text-sm text-gray-500 mb-2">
        Order ID: {order._id}
      </p>

      {/* Payment Status */}
      <p className="mb-1">
        Payment Status:{" "}
        <span
          className={`font-semibold ${
            order.paymentStatus === "paid"
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {order.paymentStatus.toUpperCase()}
        </span>
      </p>

      {/* Paid Date */}
      {order.paidAt && (
        <p className="text-sm text-gray-500 mb-4">
          Paid on {new Date(order.paidAt).toLocaleString()}
        </p>
      )}

      {/* Items */}
      <div className="border rounded p-4 space-y-3 bg-white">
        {order.items.map((item, index) => (
          <div key={index} className="flex justify-between border-b pb-2">
            <span>
              {item.name} × {item.quantity}
            </span>
            <span>${Number(item.price).toFixed(2)}</span>
          </div>
        ))}
      </div>

      <p className="mt-4 font-bold">
        Total: ${Number(order.totalAmount).toFixed(2)}
      </p>
    </div>
  );
};

export default UserOrderDetails;
