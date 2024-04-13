const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const db = require("../public/db");
const Order = require("../models/ordersData");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.post("/order", async (req, res) => {
  const formData = req.body;

  try {
    await Order.create(formData);
    console.log("Form data stored successfully");
    res.send("success");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error storing form data");
  }
});

module.exports = app;
