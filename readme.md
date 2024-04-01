const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());

const cartFilePath = path.join(\_\_dirname, "../../frontend/cart/cart.json");

app.post("/saveToCart", (req, res) => {
const newItem = req.body;

fs.access(cartFilePath, fs.constants.F_OK, (err) => {
if (err) {
const initialData = [newItem];
fs.writeFile(cartFilePath, JSON.stringify(initialData), (err) => {
if (err) {
console.error("Error creating cart file:", err);
return res.status(500).json({ error: "Internal server error" });
}

        res.json({ message: "Item added to cart" });
      });
    } else {
      // If the file exists, read the existing data
      fs.readFile(cartFilePath, "utf8", (err, data) => {
        if (err) {
          console.error("Error reading cart data:", err);
          return res.status(500).json({ error: "Internal server error" });
        }

        let cartItems = [];
        if (data) {
          cartItems = JSON.parse(data);
        }

        // Check if an item with the same title already exists in the cart
        const existingItemIndex = cartItems.findIndex(
          (item) => item.title === newItem.title
        );
        if (existingItemIndex !== -1) {
          return res.send("Item with the same title already exists");
        } else {
          return res.send("Item added to cart");
        }

        // Add the new item to the cart
        cartItems.push(newItem);

        // Write the updated cart data back to the JSON file
        fs.writeFile(cartFilePath, JSON.stringify(cartItems), (err) => {
          if (err) {
            console.error("Error writing cart data:", err);
            return res.status(500).json({ error: "Internal server error" });
          }

          // Return a success response
          res.json({ message: "Item added to cart" });
        });
      });
    }

});
});

// Start the server
module.exports = app;
