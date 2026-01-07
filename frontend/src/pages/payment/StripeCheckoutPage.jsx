import { useLocation, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Checkout from "./Checkout";

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
);

const StripeCheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { clientSecret, items, totalAmount } = location.state || {};

  if (!clientSecret || !items || !totalAmount) {
    navigate("/dashboard/user/orders");
    return null;
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Secure Payment
      </h2>

      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <Checkout
          orderData={{ items, totalAmount }}
          onSuccess={() => navigate("/dashboard/user/orders")}
        />
      </Elements>
    </div>
  );
};

export default StripeCheckoutPage;
