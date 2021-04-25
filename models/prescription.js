const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    firstname: String,
    lastname: String,
    prescription: String,
    phone: String,
    orderId: String,
    isApproved: { type: String, default: false },
    isPublished: { type: String, default: false },
    isCompleted: { type: String, default: false },
  },
  { timestamps: true }
);

mongoose.model("prescription", eventSchema);
