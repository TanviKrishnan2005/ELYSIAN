import { useParams } from "react-router-dom";
import { useGetUserOrderByIdQuery } from "../../../redux/features/orders/ordersApi";

const OrderDetails = () => {
  const { id } = useParams();
  const { data: order, isLoading } = useGetUserOrderByIdQuery(id);

  if (isLoading) {
    return <p className="p-6">Loading order details...</p>;
  }

  if (!order) {
    return <p className="p-6">Order not found</p>;
  }

  return (
    <div className="p-6 max-w-3xl">
      <h2 className="text-2xl font-bold mb-4">Order Details</h2>

      <div className="border rounded-lg p-4 bg-white shadow">
        <p className="mb-2">
          <strong>Order ID:</strong> {order._id}
        </p>

        <p className="mb-2">
          <strong>Status:</strong>{" "}
          <span className="capitalize">{order.status}</span>
        </p>

        <p className="mb-4">
          <strong>Total:</strong> ${order.totalAmount.toFixed(2)}
        </p>

        <h3 className="font-semibold mb-2">Items</h3>

        <div className="space-y-3">
          {order.items.map((item, index) => (
            <div
              key={index}
              className="flex justify-between border-b pb-2"
            >
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
