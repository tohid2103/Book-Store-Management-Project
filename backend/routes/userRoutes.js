const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

// ✅ Register
router.post("/register", async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const newUser = new User({ name, email, phone, password });
    await newUser.save();

    res.status(201).json({ success: true, message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("❌ Error registering user:", error);
    res.status(500).json({ message: "Error registering user" });
  }
});

// ✅ Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ success: true, message: "Login successful", user });
  } catch (error) {
    console.error("❌ Error logging in:", error);
    res.status(500).json({ message: "Error logging in" });
  }
});

// ✅ Get all users (for IssueReturn dropdown)
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("❌ Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

module.exports = router;
