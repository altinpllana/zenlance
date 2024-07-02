const express = require("express");
const router = express.Router();
const fs = require("fs");

let userIdCounter = 1;

router.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Name, email, and password are required." });
  }

  const newUser = {
    id: userIdCounter++,
    name,
    email,
    password,
  };

  let users = [];
  try {
    users = JSON.parse(fs.readFileSync("users.json"));
  } catch (err) {
    console.error("Error reading users file:", err);
  }

  users.push(newUser);

  fs.writeFileSync("users.json", JSON.stringify(users));

  res
    .status(201)
    .json({ message: "User registered successfully.", user: newUser });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  let users = [];
  try {
    users = JSON.parse(fs.readFileSync("users.json"));
  } catch (err) {
    console.error("Error reading users file:", err);
    return res.status(500).json({ message: "Internal server error" });
  }

  const user = users.find(
    (user) => user.email === email && user.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password." });
  }

  res.status(200).json({
    message: "Login successful.",
    user: { email: user.email, name: user.name },
  });
});

module.exports = router;
