const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Import Routes
const bookRoutes = require("./routes/bookRoutes");
const userRoutes = require("./routes/userRoutes");
const issueRoutes = require("./routes/issueRoutes"); 

// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/books", bookRoutes);
app.use("/api/users", userRoutes);
app.use("/api/issue", issueRoutes); 

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ Database Connection Error:", err));

// Root Route
app.get("/", (req, res) => {
  res.send("📚 Library Management System Backend is Running!");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
