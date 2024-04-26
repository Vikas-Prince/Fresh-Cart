const express = require("express");
const bodyParser = require("body-parser");
const cartItem = require("../models/cartData.js");
require("../public/db.js");

const app = express();

app.use(bodyParser.json());

app.get("/getCartItems", async (req, res) => {
  try {
    const cartItems = await cartItem.find();
    res.json(cartItems);
  } catch (err) {
    console.error("Error fetching wishlist items:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/saveToCart", async (req, res) => {
  const newItem = req.body;

  try {
    const existingItem = await cartItem.findOne({ title: newItem.title });
    if (existingItem) {
      return res.status(200).send("Item already exists");
    }
    await cartItem.create(newItem);
    res.send("Item added to Cart");
  } catch (err) {
    console.error("Error while adding item to cart:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/removeFromCart", async (req, res) => {
  const index = req.body.index;

  try {
    const removedItem = await cartItem.findOneAndDelete({});

    if (!removedItem) {
      return res.status(404).json({ success: false, error: "Item not found" });
    }
    res.json({
      success: true,
      message: "Item removed from Cart",
    });
  } catch (err) {
    console.error("Error removing item from cart:", err);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

module.exports = app;
