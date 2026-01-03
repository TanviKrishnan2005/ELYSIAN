const express = require("express");
const Order = require("./order.model");
const verifyToken = require("../middleware/verifyToken");
const verifyAdmin = require("../middleware/verifyAdmin");

const router = express.Router();

/* USER ROUTES (FIRST) */

// CREATE ORDER (USER)
router.post("/", verifyToken, async (req, res) => {
  try {
    const order = new Order({
      userId: req.userId,
      items: req.body.items,
      totalAmount: req.body.totalAmount,
      status: "pending",
    });

    await order.save();
    res.status(201).send(order);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Failed to create order" });
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
