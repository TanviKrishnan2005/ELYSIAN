const express = require("express");
const Order = require("./order.model");
const verifyToken = require("../middleware/verifyToken");
const verifyAdmin = require("../middleware/verifyAdmin");
const stripe = require("../config/stripe");

const router = express.Router();

/* USER ROUTES (FIRST) */

// CREATE ORDER (USER)
router.post("/", verifyToken, async (req, res) => {
  try {
    const order = new Order({
      userId: req.userId,
      items: req.body.items,
      totalAmount: req.body.totalAmount,
      paymentIntentId: req.body.paymentIntentId, // 🔥
      status: "pending",
      paymentStatus: "unpaid",
    });

    await order.save();
    res.status(201).send(order);
  } catch (error) {
    res.status(500).send({ message: "Failed to create order" });
  }
});



// 💳 CREATE STRIPE PAYMENT INTENT (USER)
router.post("/create-payment-intent", verifyToken, async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).send({ message: "Invalid amount" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // dollars → cents
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Stripe error:", error);
    res.status(500).send({ message: "Stripe payment failed" });
  }
});
 

// GET USER ORDERS (USER)  <<< MUST BE ABOVE :id
router.get("/my-orders", verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId })
      .sort({ createdAt: -1 });

    res.status(200).send(orders);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Failed to fetch user orders" });
  }
});

/* ADMIN ROUTES (AFTER) */

// GET ALL ORDERS (ADMIN)
router.get("/", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "email")
      .sort({ createdAt: -1 });

    res.status(200).send(orders);
  } catch (error) {
    res.status(500).send({ message: "Failed to fetch orders" });
  }
});

// UPDATE ORDER STATUS (ADMIN)  
router.patch("/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.status(200).send(order);
  } catch (error) {
    res.status(500).send({ message: "Failed to update order" });
  }
});

// GET SINGLE  ORDER (USER)
router.get("/my-orders/:id", verifyToken, async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!order) {
      return res.status(404).send({ message: "Order not found" });
    }

    res.status(200).send(order);
  } catch (error) {
    res.status(500).send({ message: "Failed to fetch order" });
  }
});

// GET SINGLE ORDER (ADMIN)
router.get("/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("userId", "email");

    if (!order) {
      return res.status(404).send({ message: "Order not found" });
    }

    res.status(200).send(order);
  } catch (error) {
    res.status(500).send({ message: "Failed to fetch order" });
  }
});




module.exports = router;
