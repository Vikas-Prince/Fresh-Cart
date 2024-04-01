const express = require("express");
const fs = require("fs");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

const staticDir = path.join(__dirname, "../../Frontend");

app.use(express.static(staticDir));
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.post("/register", (req, res) => {
  const { username, email, password, confirm_password } = req.body;

  if (!username || !email || !password || !confirm_password) {
    return res.status(400).send("All fields are required");
  }

  if (password !== confirm_password) {
    return res.status(400).send("Passwords do not match");
  }

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error hashing password");
    }

    const userData = {
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    };

    fs.readFile("../Json/registerData.json", "utf8", (err, data) => {
      if (err) {
        console.error(err);
        if (err.code === "ENOENT") {
          const users = [];
          fs.writeFile(
            "../Json/registerData.json",
            JSON.stringify(users) + "\n",
            (err) => {
              if (err) {
                console.error(err);
                return res.status(500).send("Error initializing file");
              }
              registerUser(userData, res, username);
            }
          );
        } else {
          return res.status(500).send("Error reading user data");
        }
      } else {
        registerUser(userData, res, username, data);
      }
    });
  });
});

function registerUser(userData, res, username, existingData = null) {
  let users = [];
  if (existingData) {
    try {
      users = JSON.parse(existingData);
    } catch (error) {
      console.error(error);
      return res.status(500).send("Error parsing user data");
    }
  }

  const { email } = userData;

  if (users.some((user) => user.email === email)) {
    return res.status(400).send("Email already registered");
  }
  users.push(userData);
  fs.writeFile("../Json/registerData.json", JSON.stringify(users), (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error writing to file");
    }
    res.redirect(`/home?username=${username}`);
  });
}

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Email and password are required");
  }

  fs.readFile("../Json/registerData.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error reading user data");
    }

    let users = [];
    if (data) {
      try {
        users = JSON.parse(data);
      } catch (error) {
        console.error(error);
        return res.status(500).send("Error parsing user data");
      }
    }

    const user = users.find((u) => u.email === email);
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Error comparing passwords");
        }
        if (result) {
          return res.redirect(`/home?username=${user.username}`);
        } else {
          return res.status(401).send("Incorrect password");
        }
      });
    } else {
      return res.status(404).send("User not found. Please register.");
    }
  });
});

module.exports = app;
