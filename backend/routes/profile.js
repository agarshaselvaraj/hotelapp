const express = require("express");
const multer = require("multer");
const pool = require("../database");
 // Auth middleware
 const authenticateUser = require("../middleware/authenticateUser");
const router = express.Router();

// Configure Multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

// Upload Profile Photo (requires authentication)
router.post("/uploadProfilePhoto", authenticateUser,upload.single("profilePhoto"), async (req, res) => {
 
  console.log("Route hit");
  try {
    const { file } = req;

    if (!file) {
      return res.status(400).send("No file uploaded");
    }

    const userId = req.user.id; // Get user ID from auth middleware
    const profilePhoto = file.buffer;
    const profilePhotoType = file.mimetype;

    const query = `
      UPDATE users
      SET profile_photo = $1, profile_photo_type = $2
      WHERE id = $3
      RETURNING id;
    `;
    const values = [profilePhoto, profilePhotoType, userId];

    const result = await pool.query(query, values);

    if (result.rowCount === 0) {
      return res.status(404).send("User not found");
    }

    res.status(200).send("Profile photo uploaded successfully");
  } catch (error) {
    console.error("Error uploading profile photo:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Retrieve Profile Photo (requires authentication)
router.get("/profilePhoto", authenticateUser, async (req, res) => {
  try {
    const userId = req.user.id; // Get user ID from auth middleware

    const query = `
      SELECT profile_photo, profile_photo_type
      FROM users
      WHERE id = $1;
    `;
    const result = await pool.query(query, [userId]);

    if (result.rowCount === 0) {
      return res.status(404).send("User not found");
    }

    const { profile_photo, profile_photo_type } = result.rows[0];

    if (!profile_photo) {
      return res.status(404).send("No profile photo available");
    }

    res.set("Content-Type", profile_photo_type);
    res.send(profile_photo);
  } catch (error) {
    console.error("Error retrieving profile photo:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
