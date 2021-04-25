const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    orderId: { type: String, required: true },
    cart: { type: Array, required: true },
    amount: { type: Number, required: true },
    ref: String,
    isPaid: { type: String, default: false },
  },
  { timestamps: true }
);

mongoose.model("order", orderSchema);
