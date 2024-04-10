const express = require("express");
const path = require("path");

const app = express();

const authenticateRouter = require("../src/authenticate");
const routeRouter = require("../src/route");
const addToCart = require("../src/addToCart");
const farmerData = require("../src/farmer");
const orders = require("../src/orders");

app.use(orders);
app.use(authenticateRouter);
app.use(routeRouter);
app.use(addToCart);
app.use(farmerData);

app.listen(3000, function () {
  console.log("Server listening on port 3000");
});
