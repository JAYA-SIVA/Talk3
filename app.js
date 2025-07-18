const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parses incoming JSON requests

// Routes
app.use("/auth", require("./routes/auth"));
app.use("/admin", require("./routes/admin"));
app.use("/bookmarks", require("./routes/bookmarks"));
app.use("/chat", require("./routes/chat"));
app.use("/notification", require("./routes/notification"));
app.use("/reels", require("./routes/reels"));
app.use("/story", require("./routes/story"));
app.use("/talk", require("./routes/talk"));

// Test route
app.get("/", (req, res) => {
  res.send("🚀 Talk App API is running...");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
