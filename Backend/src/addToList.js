const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());

const cartFilePath = path.join(
  __dirname,
  "../../frontend/wishlist/wishlist.json"
);

app.post("/saveToList", (req, res) => {
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
          res.send("Item added to wishList");
        });
      });
    }
  });
});

app.post("/removeFromList", (req, res) => {
  const indexToRemove = req.body.index;
  // Read cart data from cart.json
  fs.readFile(cartFilePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ success: false, error: "Internal Server Error" });
      return;
    }

    let cartData = JSON.parse(data);
    if (indexToRemove >= 0 && indexToRemove < cartData.length) {
      // Remove item from cart data
      cartData.splice(indexToRemove, 1);
      // Write updated cart data back to cart.json
      fs.writeFile(cartFilePath, JSON.stringify(cartData), (err) => {
        if (err) {
          console.error(err);
          res
            .status(500)
            .json({ success: false, error: "Internal Server Error" });
          return;
        }
        res.json({ success: true });
      });
    } else {
      res.status(400).json({ success: false, error: "Invalid index" });
    }
  });
});

// Start the server
module.exports = app;
