const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

/* =========================
  STRIPE WEBHOOK FIRST
   ========================= */
const stripeWebhook = require("./src/orders/stripe.webhook");

// ⚠️ RAW BODY ONLY FOR STRIPE
app.use("/api/stripe", stripeWebhook);

/* =========================
   NORMAL MIDDLEWARE
   ========================= */
app.use(express.json({ limit: "25mb" }));
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

/* =========================
   ROUTES
   ========================= */
const authRoutes = require("./src/users/user.route");
const productRoutes = require("./src/products/products.route");
const reviewRoutes = require("./src/reviews/reviews.router");
const orderRoutes = require("./src/orders/order.route");

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/orders", orderRoutes);

/* =========================
   DATABASE
   ========================= */
async function main() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("✅ Connected to MongoDB Atlas");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }

  app.get("/", (req, res) => {
    res.send("Elysian server running...");
  });
}

main();

/* =========================
   START SERVER
   ========================= */
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
