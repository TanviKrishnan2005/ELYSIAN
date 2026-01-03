import { Link } from "react-router-dom";
import { useGetUserOrdersQuery } from "../../../redux/features/orders/ordersApi";

const UserOrders = () => {
  const { data: orders = [], isLoading, error } = useGetUserOrdersQuery();

  if (isLoading) {
    return <p className="p-6">Loading your orders...</p>;
  }

  if (error) {
    return (
      <p className="p-6 text-red-500">
        Failed to load orders
      </p>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="p-6 text-center">
        <p className="text-lg">You have no orders yet 🛒</p>
        <p className="text-sm text-gray-500 mt-2">
          Start shopping to see your orders here
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>

      <div className="space-y-6">
        {orders.map((order) => (
          <Link
            key={order._id}
            to={`/dashboard/user/orders/${order._id}`}
            className="block border rounded-lg p-5 shadow-sm bg-white hover:bg-gray-50 transition"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="font-semibold">
                  Order ID:{" "}
                  <span className="text-gray-600">{order._id}</span>
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
                  order.status === "completed"
                    ? "bg-green-100 text-green-700"
                    : order.status === "processing"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {order.status}
              </span>
            </div>

            {/* Items preview */}
            <div className="divide-y">
              {order.items.slice(0, 2).map((item, index) => (
                <div
                  key={index}
                  className="py-2 flex justify-between text-sm"
                >
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span>${Number(item.price).toFixed(2)}</span>
                </div>
              ))}

              {order.items.length > 2 && (
                <p className="text-sm text-gray-500 mt-2">
                  +{order.items.length - 2} more item(s)
                </p>
              )}
            </div>

            {/* Footer */}
            <div className="mt-4 flex justify-between items-center">
              <p className="font-semibold">
                Total: ${Number(order.totalAmount).toFixed(2)}
              </p>
              <span className="text-sm text-blue-600 font-medium">
                View Details →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UserOrders;
