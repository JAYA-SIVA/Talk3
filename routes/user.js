// routes/user.js

const express            = require("express");
const router             = express.Router();
const authMiddleware     = require("../middleware/auth");       // your JWT guard
const userController     = require("../controllers/userController");

// GET  /api/user/:username    → fetch profile
// PUT  /api/user/:username    → update profile
router.get("/:username", authMiddleware, userController.getProfile);
router.put("/:username", authMiddleware, userController.updateProfile);

module.exports = router;
