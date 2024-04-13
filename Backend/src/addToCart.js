const express = require("express");
const bodyParser = require("body-parser");
const cartItem = require("../models/cartData.js");
require("../public/db.js");

const app = express();

app.use(bodyParser.json());

app.get("/getCartItems", async (req, res) => {
  try {
    const cartItems = await cartItem.find();

    // Send the wishlist items as JSON response
    res.json(cartItems);
  } catch (err) {
    console.error("Error fetching wishlist items:", err);
    // Send an error response if there's an error
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/saveToCart", async (req, res) => {
  const newItem = req.body;

  try {
    // Check if an item with the same title already exists in the wishlist
    const existingItem = await cartItem.findOne({ title: newItem.title });
    if (existingItem) {
      // console.log("Item already exists in the cart:", existingItem);
      return res.status(200).send("Item with the same title already exists");
    }

    // Create a new wishlist item and save it to the database
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
    // Find the cart item by its index and remove it from the database
    const removedItem = await cartItem.findOneAndDelete({
      /* Add your query condition here */
    });

    if (!removedItem) {
      return res.status(404).json({ success: false, error: "Item not found" });
    }

    res.json({ success: true });
  } catch (err) {
    console.error("Error removing item from cart:", err);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

module.exports = app;
