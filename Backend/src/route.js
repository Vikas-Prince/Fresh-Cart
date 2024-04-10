const express = require("express");
const path = require("path");

const router = express.Router();

const staticDir = path.join(__dirname, "../../frontend");
// const farmerPath = path.join(__dirname, "../../frontend/farmer");
const cartPath = path.join(__dirname, "../../frontend/cart");
// const staticDir = path.join(__dirname, "../../frontend/src");

router.get("/", function (req, res) {
  res.sendFile(path.join(staticDir, "Index.html"));
});

router.get("/home", function (req, res) {
  res.sendFile(path.join(staticDir, "home.html"));
});

router.get("/products", function (req, res) {
  res.sendFile(path.join(staticDir, "products/productPage.html"));
});

router.use(express.static(cartPath));

router.get("/cart", function (req, res) {
  res.sendFile(path.join(cartPath, "cart.html"));
});

router.get("/cartData", function (req, res) {
  res.sendFile(path.join(staticDir, "cart/cart.json"));
});

router.get("/login", function (req, res) {
  res.sendFile(path.join(staticDir, "login/login.html"));
});

router.get("/register", function (req, res) {
  res.sendFile(path.join(staticDir, "login/signup.html"));
});

// router.use(express.static(staticDir));

router.get("/farmer", function (req, res) {
  res.sendFile(path.join(staticDir, "farmer/farmer.html"));
});

router.get("/farmerApp", function (req, res) {
  res.sendFile(path.join(staticDir, "farmer/farmerRegister.html"));
});

module.exports = router;
