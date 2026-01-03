import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../../redux/features/cart/cartSlice";
import { useCreateOrderMutation } from "../../../redux/features/orders/ordersApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

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
  } = useSelector((store) => store.cart);

  const user = useSelector((store) => store.auth.user);

  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.success("Cart cleared 🧹");
  };

  const handleCheckout = async () => {
    if (!user) {
      toast.error("Please login to place order");
      navigate("/login");
      return;
    }

    try {
      await createOrder({
        items: products,
        totalAmount: grandTotal,
      }).unwrap();

      dispatch(clearCart());
      toast.success("Order placed successfully 🎉");
      navigate("/dashboard/user/orders");
    } catch (error) {
      console.error(error);
      toast.error("Failed to place order ❌");
    }
  };

  return (
    <div className="bg-[#f4e5ec] mt-5 rounded text-base">
      <div className="px-6 py-4 space-y-3">
        <h2 className="text-xl font-bold">Order Summary</h2>

        <p>Selected Items: {selectedItems}</p>
        <p>Total Price: ${totalPrice.toFixed(2)}</p>
        <p>Tax ({taxRate * 100}%): ${tax.toFixed(2)}</p>

        <h3 className="font-bold text-lg">
          Grand Total: ${grandTotal.toFixed(2)}
        </h3>
      </div>

      <div className="px-6 pb-6 space-y-3">
        <button
          onClick={handleClearCart}
          className="w-full bg-red-500 px-3 py-2 text-white rounded-md"
        >
          Clear Cart
        </button>

        <button
          onClick={handleCheckout}
          disabled={isLoading}
          className="w-full bg-blue-600 px-3 py-2 text-white rounded-md"
        >
          {isLoading ? "Placing Order..." : "Checkout"}
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
