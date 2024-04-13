const mongoose = require("mongoose");

const ordersDataSchema = new mongoose.Schema({
  firstName: String,
  LastName: String,
  mobileNumber: Number,
  state: String,
  district: String,
  pincode: Number,
  address: String,
  home: String,
  office: String,
});

const orderData = mongoose.model("ordersData", ordersDataSchema);

module.exports = orderData;
