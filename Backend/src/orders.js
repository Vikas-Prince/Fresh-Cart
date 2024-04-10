const express = require("express");
const fs = require("fs");
const app = express();
const path = require("path");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.post("/order", (req, res) => {
  const formData = req.body;
  const jsonData = JSON.stringify(formData, null, 2) + ",\n";

  let existingData = [];
  try {
    const data = fs.readFileSync("../Json/orders.json", "utf8");
    existingData = JSON.parse(data);
  } catch (err) {}

  existingData.push(formData);

  fs.writeFile(
    "../Json/orders.json",
    `[${existingData.map((obj) => JSON.stringify(obj, null, 2)).join(",\n")}]`,
    (err) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error storing form data");
        return;
      }
      console.log("Form data stored successfully");
      res.send("success");
    }
  );
});

module.exports = app;
