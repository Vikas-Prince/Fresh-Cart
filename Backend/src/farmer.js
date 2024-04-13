const express = require("express");
const app = express();
const mongoose = require("mongoose");

// Importing the model for storing form data
const FormData = require("../models/farmerData.js");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Importing database connection
require("../public/db.js");

// Define a route to handle form submissions
app.post("/submit", async (req, res) => {
  const formData = req.body;

  try {
    // Create a new document in the FormData collection
    await FormData.create(formData);
    console.log("Form data stored successfully");
    res.send("success");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error storing form data");
  }
});

module.exports = app;
