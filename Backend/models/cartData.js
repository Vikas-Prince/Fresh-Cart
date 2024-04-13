// models/Product.js
const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  imagePath: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: String, required: true },
});

const cart = mongoose.model("cartItems", cartSchema);

module.exports = cart;
