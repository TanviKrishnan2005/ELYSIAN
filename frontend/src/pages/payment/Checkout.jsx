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

    if (!stripe || !elements) {
      toast.error("Stripe not ready yet");
      return;
    }

    setLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      toast.error(error.message || "Payment failed ❌");
      setLoading(false);
      return;
    }

    try {
      await createOrder({
        ...orderData,
        paymentStatus: "paid",
        paymentIntentId: paymentIntent.id,
        paidAt: new Date().toISOString(),
      }).unwrap();

      dispatch(clearCart());
      toast.success("Payment successful 🎉");
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

      {/* 🔥 THIS BUTTON WAS YOUR PROBLEM */}
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

export default Checkout;
