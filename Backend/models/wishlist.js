// models/Product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  imagePath: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: String, required: true },
});

const Product = mongoose.model("wishlistItems", productSchema);

module.exports = Product;
