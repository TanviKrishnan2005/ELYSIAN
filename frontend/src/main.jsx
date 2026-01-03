import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./tailwind.css";
import "./App.css";

import { RouterProvider } from "react-router-dom";
import router from "./routers/router.jsx";

import "remixicon/fonts/remixicon.css";

import { Provider } from "react-redux";
import { store } from "./redux/store.js";

import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster position="top-right" reverseOrder={false} />
    </Provider>
  </StrictMode>
);
