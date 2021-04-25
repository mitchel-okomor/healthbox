const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    full_name: { type: String, required: false },
    email: String,
    orderId: String,
    amount: { type: Number, required: false },
    quantity: Number,
    reference: { type: String, required: false },
    token: String,
  },
  { timestamps: true }
);

mongoose.model("payment", paymentSchema);
