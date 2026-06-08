import { useLocation, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Checkout from "./Checkout";

const stripePromise = loadStripe(
  
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
);
console.log(
  "STRIPE KEY:",
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
);

const StripeCheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { clientSecret, items, totalAmount } = location.state || {};
  console.log("CLIENT SECRET:", clientSecret);

 

  if (!clientSecret) {
  return <p>Loading payment...</p>;
}

  return (
  <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded shadow">
    <h2 className="text-2xl font-bold mb-6 text-center">
      Secure Payment
    </h2>

    <Elements stripe={stripePromise}>
      <Checkout
        orderData={{
          items,
          totalAmount,
          clientSecret,
        }}
        onSuccess={() => navigate("/dashboard/user/orders")}
      />
    </Elements>
  </div>
);
};

export default StripeCheckoutPage;
