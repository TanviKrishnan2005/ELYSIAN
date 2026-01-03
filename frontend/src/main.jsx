import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import router from "./routers/router.jsx";
import { store } from "./redux/store.js";

import { Toaster } from "react-hot-toast";

import "./tailwind.css";
import "./App.css";
import "remixicon/fonts/remixicon.css";

// 🔑 Stripe public key
const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <Elements stripe={stripePromise}>
        <RouterProvider router={router} />
        <Toaster position="top-right" reverseOrder={false} />
      </Elements>
    </Provider>
  </StrictMode>
);
