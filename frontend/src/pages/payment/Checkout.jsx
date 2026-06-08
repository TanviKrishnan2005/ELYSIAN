import {
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";
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
      toast.error("Stripe is loading...");
      return;
    }

    setLoading(true);

    const cardElement = elements.getElement(CardElement);

    const { error, paymentIntent } =
      await stripe.confirmCardPayment(orderData.clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    try {
      await createOrder({
        items: orderData.items,
        totalAmount: orderData.totalAmount,
        paymentStatus: "paid",
        paymentIntentId: paymentIntent.id,
        paidAt: new Date().toISOString(),
      }).unwrap();

      dispatch(clearCart());

      toast.success("Payment successful 🎉");

      onSuccess();
    } catch (err) {
      console.error(err);
      toast.error("Order creation failed");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="border p-4 rounded">
        <CardElement />
      </div>

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-blue-600 text-white py-3 rounded"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

export default Checkout;