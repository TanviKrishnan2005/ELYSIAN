const express = require("express");
const stripe = require("../config/stripe");
const Order = require("./order.model");

const router = express.Router();

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // ✅ PAYMENT SUCCESS
    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object;

      await Order.findOneAndUpdate(
        { paymentIntentId: paymentIntent.id },
        {
          paymentStatus: "paid",
          status: "processing",
        }
      );
    }

    res.json({ received: true });
  }
);

module.exports = router;
