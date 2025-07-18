// backend/middleware/index.js
const jwt = require("jsonwebtoken");

// Middleware to verify JWT token and attach user info to request
const ensureAuthenticated = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Store user data in request
    next();
  } catch (error) {
    return res.status(403).json({ error: "Invalid or expired token", details: error.message });
  }
};

module.exports = {
  ensureAuthenticated,
};
