// controllers/userController.js

const User = require("../models/User");

/**
 * GET /api/user/:username
 * Returns { _id, username, email, profileImageUrl, bio }
 */
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username })
                           .select("-password"); // hide password
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({
      _id:              user._id,
      username:         user.username,
      email:            user.email,
      profileImageUrl:  user.profile,    // your field name for image
      bio:              user.bio || ""
    });
  } catch (err) {
    console.error("getProfile error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

/**
 * PUT /api/user/:username
 * Body: { username, bio, profileImageUrl }
 * Returns updated { _id, username, email, profileImageUrl, bio }
 */
exports.updateProfile = async (req, res) => {
  try {
    const { username: newUsername, bio, profileImageUrl } = req.body;
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(404).json({ error: "User not found" });

    // apply changes
    if (newUsername)      user.username = newUsername;
    if (bio   !== undefined) user.bio      = bio;
    if (profileImageUrl)  user.profile  = profileImageUrl;

    await user.save();

    res.json({
      _id:             user._id,
      username:        user.username,
      email:           user.email,
      profileImageUrl: user.profile,
      bio:             user.bio || ""
    });
  } catch (err) {
    console.error("updateProfile error:", err);
    res.status(500).json({ error: "Update failed" });
  }
};
