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

      <p className="mb-4">
        Status:{" "}
        <span className="font-medium capitalize">{order.status}</span>
      </p>

      <div className="border rounded p-4 space-y-3 bg-white">
        {order.items.map((item, index) => (
          <div
            key={index}
            className="flex justify-between border-b pb-2"
          >
            <span>
              {item.name} × {item.quantity}
            </span>
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

export default UserOrderDetails;
