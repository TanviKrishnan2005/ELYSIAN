import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import "./tailwind.css";
import "./App.css";
import "remixicon/fonts/remixicon.css";

import router from "./routers/router.jsx";
import { store } from "./redux/store.js";

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <Elements stripe={stripePromise}>
        <RouterProvider router={router} />
        <Toaster position="top-right" />
      </Elements>
    </Provider>
  </StrictMode>
);
