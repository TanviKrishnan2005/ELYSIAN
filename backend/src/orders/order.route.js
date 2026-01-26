const express = require("express");
const Order = require("./order.model");
const verifyToken = require("../middleware/verifyToken");
const verifyAdmin = require("../middleware/verifyAdmin");
const stripe = require("../config/stripe");

const router = express.Router();

/* ============================
   CREATE ORDER (AFTER PAYMENT)
============================ */
router.post("/", verifyToken, async (req, res) => {
  try {
    const order = new Order({
      userId: req.userId,
      items: req.body.items,
      totalAmount: req.body.totalAmount,

      paymentStatus: req.body.paymentStatus || "unpaid",
      paymentIntentId: req.body.paymentIntentId,
      paidAt: req.body.paidAt,

      status: "pending",
    });

    await order.save();
    res.status(201).send(order);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Order creation failed" });
  }
});

/* ============================
   STRIPE PAYMENT INTENT
============================ */
router.post("/create-payment-intent", verifyToken, async (req, res) => {
  try {
    const { amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).send({ message: "Stripe error" });
  }
});

/* ============================
   USER ORDERS
============================ */
router.get("/my-orders", verifyToken, async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).send({ message: "User not authenticated" });
    }

    const orders = await Order.find({ userId: req.userId })
      .sort({ createdAt: -1 });

    res.status(200).send(orders);
  } catch (error) {
    console.error("❌ my-orders error:", error);
    res.status(500).send({ message: "Failed to fetch user orders" });
  }
});


router.get("/my-orders/:id", verifyToken, async (req, res) => {
  const order = await Order.findOne({
    _id: req.params.id,
    userId: req.userId,
  });
  res.send(order);
});

/* ============================
   ADMIN
============================ */
router.get("/", verifyToken, verifyAdmin, async (req, res) => {
  const orders = await Order.find().populate("userId", "email");
  res.send(orders);
});

router.patch("/:id", verifyToken, verifyAdmin, async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  res.send(order);
});

module.exports = router;
