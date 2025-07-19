// app.js

const express   = require("express");
const dotenv    = require("dotenv");
const cors      = require("cors");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express
const app = express();

// ─── Middleware ─────────────────────────────────────────────────────
app.use(cors());
app.use(express.json()); // parse JSON

// ─── API Router ────────────────────────────────────────────────────
const apiRouter = express.Router();

// existing routes under /api
apiRouter.use("/auth",         require("./routes/auth"));
apiRouter.use("/admin",        require("./routes/admin"));
apiRouter.use("/bookmarks",    require("./routes/bookmarks"));
apiRouter.use("/chat",         require("./routes/chat"));
apiRouter.use("/notification", require("./routes/notification"));
apiRouter.use("/reels",        require("./routes/reels"));
apiRouter.use("/story",        require("./routes/story"));
apiRouter.use("/talk",         require("./routes/talk"));

// new user profile routes
apiRouter.use("/user", require("./routes/user"));

// mount all at /api
app.use("/api", apiRouter);

// ─── Health check ───────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.send("🚀 Talk App API is running...");
});

// ─── Start server ───────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
