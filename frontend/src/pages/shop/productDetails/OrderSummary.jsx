import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../../redux/features/cart/cartSlice";
import { useCreateOrderMutation } from "../../../redux/features/orders/ordersApi";
import { useNavigate } from "react-router-dom";

const OrderSummary = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    products,
    selectedItems,
    totalPrice,
    tax,
    taxRate,
    grandTotal,
  } = useSelector((state) => state.cart);

  const user = useSelector((state) => state.auth.user);

  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleCheckout = async () => {
    if (!user) {
      alert("Please login to place order");
      navigate("/login");
      return;
    }

    try {
      await createOrder({
        items: products.map((p) => ({
          productId: p._id,
          name: p.name,
          price: p.price,
          quantity: p.quantity,
        })),
        totalAmount: grandTotal,
      }).unwrap();

      dispatch(clearCart());
      alert("Order placed successfully ✅");
      navigate("/dashboard/user");
    } catch (error) {
  console.error("FULL CHECKOUT ERROR:", error);
  alert(error?.data?.message || "Failed to place order ❌");
}

  };

  return (
    <div className="bg-[#f4e5ec] mt-5 rounded">
      <div className="p-4 space-y-2">
        <h3 className="font-bold text-lg">Order Summary</h3>
        <p>Items: {selectedItems}</p>
        <p>Total: ${totalPrice.toFixed(2)}</p>
        <p>Tax ({taxRate * 100}%): ${tax.toFixed(2)}</p>
        <p className="font-bold">
          Grand Total: ${grandTotal.toFixed(2)}
        </p>
      </div>

      <div className="p-4 space-y-2">
        <button
          onClick={handleClearCart}
          className="w-full bg-red-500 text-white py-2 rounded"
        >
          Clear Cart
        </button>

        <button
          onClick={handleCheckout}
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          {isLoading ? "Placing Order..." : "CHECKOUT"}
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
