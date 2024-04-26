const express = require("express");
const bodyParser = require("body-parser");
const WishlistItem = require("../models/wishlist.js");
require("../public/db.js");

const app = express();

app.use(bodyParser.json());

app.get("/getWishlistItems", async (req, res) => {
  try {
    const wishlistItems = await WishlistItem.find();
    res.json(wishlistItems);
  } catch (err) {
    console.error("Error fetching wishlist items:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/saveToList", async (req, res) => {
  const newItem = req.body;

  try {
    const existingItem = await WishlistItem.findOne({ title: newItem.title });
    if (existingItem) {
      return res.status(200).send("Item already exists");
    }
    await WishlistItem.create(newItem);
    res.send("Item added to wishlist");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/saveToCart", async (req, res) => {
  const newItem = req.body;
  try {
    const existingItem = await WishlistItem.findOne({ title: newItem.title });
    if (existingItem) {
      return res.status(400).send("Item already exists");
    }
    await WishlistItem.create(newItem);
    res.send("Item added to wishlist");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/removeFromList", async (req, res) => {
  const itemId = req.body.index;
  try {
    const removedItem = await WishlistItem.findByIdAndDelete(itemId);
    if (!removedItem) {
      return res.status(404).json({ success: false, error: "Item not found" });
    }
    res.json({ success: true, message: "Item removed from Wishlist" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

module.exports = app;
