const express = require("express");
const app = express();
const mongoose = require("mongoose");

const FormData = require("../models/farmerData.js");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

require("../public/db.js");

app.post("/submit", async (req, res) => {
  const formData = req.body;

  try {
    await FormData.create(formData);
    console.log("Form data stored successfully");
    res.send("success");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error storing form data");
  }
});

module.exports = app;
