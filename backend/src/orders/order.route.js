const express = require("express");
const Order = require("./order.model");
const verifyToken = require("../middleware/verifyToken");
const verifyAdmin = require("../middleware/verifyAdmin");
const stripe = require("../config/stripe");

const router = express.Router();

/* =====================
   USER ROUTES
===================== */

// CREATE ORDER
router.post("/", verifyToken, async (req, res) => {
  try {
    const order = new Order({
      userId: req.userId,
      items: req.body.items,
      totalAmount: req.body.totalAmount,
      paymentIntentId: req.body.paymentIntentId,
      paymentStatus: "unpaid",
      status: "pending",
    });

    await order.save();
    res.status(201).send(order);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Failed to create order" });
  }
});

// MARK ORDER AS PAID
router.patch("/mark-paid/:id", verifyToken, async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        paymentStatus: "paid",
        status: "processing",
        paidAt: new Date(),
      },
      { new: true }
    );

    if (!order) {
      return res.status(404).send({ message: "Order not found" });
    }

    res.status(200).send(order);
  } catch (error) {
    res.status(500).send({ message: "Failed to update payment status" });
  }
});

// STRIPE PAYMENT INTENT
router.post("/create-payment-intent", verifyToken, async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).send({ message: "Invalid amount" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Stripe error:", error);
    res.status(500).send({ message: "Stripe error" });
  }
});

// USER ORDERS
router.get("/my-orders", verifyToken, async (req, res) => {
  const orders = await Order.find({ userId: req.userId }).sort({
    createdAt: -1,
  });
  res.status(200).send(orders);
});

/* =====================
   ADMIN ROUTES
===================== */

router.get("/", verifyToken, verifyAdmin, async (req, res) => {
  const orders = await Order.find()
    .populate("userId", "email")
    .sort({ createdAt: -1 });

  res.status(200).send(orders);
});

router.patch("/:id", verifyToken, verifyAdmin, async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );

  res.status(200).send(order);
});

router.get("/:id", verifyToken, verifyAdmin, async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "userId",
    "email"
  );
  res.status(200).send(order);
});

module.exports = router;
