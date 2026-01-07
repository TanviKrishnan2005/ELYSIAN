import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useCreateOrderMutation } from "../../redux/features/orders/ordersApi";
import { useDispatch } from "react-redux";
import { clearCart } from "../../redux/features/cart/cartSlice";
import toast from "react-hot-toast";

const Checkout = ({ orderData, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();

  const [createOrder] = useCreateOrderMutation();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      toast.error(error.message || "Payment failed ❌");
      setLoading(false);
      return;
    }

    try {
      await createOrder(orderData).unwrap();
      dispatch(clearCart());
      toast.success("Payment successful 🎉 Order placed!");
      onSuccess();
    } catch (err) {
      console.error(err);
      toast.error("Order creation failed ❌");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      <button
        disabled={!stripe || loading}
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

export default Checkout;
