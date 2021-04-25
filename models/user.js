const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  username: String,
  phone: String,
  role: { type: String, default: "user" },
  email: { type: String, index: true, unique: true, required: true },
  password: { type: String, required: true },
  image_url: String,
});

mongoose.model("user", userSchema);
