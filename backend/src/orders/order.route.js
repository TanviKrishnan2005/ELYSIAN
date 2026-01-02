const express = require("express");
const Order = require("./order.model");
const verifyToken = require("../middleware/verifyToken");
const verifyAdmin = require("../middleware/verifyAdmin");

const router = express.Router();

// CREATE ORDER (USER – mock for now)
router.post("/", verifyToken, async (req, res) => {
  try {
    const order = new Order({
      userId: req.userId,
      items: req.body.items,
      totalAmount: req.body.totalAmount,
    });

    await order.save();
    res.status(201).send(order);
  } catch (error) {
    res.status(500).send({ message: "Failed to create order" });
  }
});

// GET ALL ORDERS (ADMIN)
router.get("/", verifyToken, verifyAdmin, async (req, res) => {
  const orders = await Order.find()
    .populate("userId", "email")
    .sort({ createdAt: -1 });

  res.status(200).send(orders);
});

// UPDATE ORDER STATUS (ADMIN)
router.patch("/:id", verifyToken, verifyAdmin, async (req, res) => {
  const { status } = req.body;

  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );

  res.status(200).send(order);
});

module.exports = router;
