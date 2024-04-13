// models/FormData.js
const mongoose = require("mongoose");

const farmerDataSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  mobileNumber: Number,
  cropCategory: String,
  relatedCrops: String,
  acre: Number,
  state: String,
  district: String,
  mandal: String,
  address: String,
});

const FormData = mongoose.model("farmerData", farmerDataSchema);

module.exports = FormData;
