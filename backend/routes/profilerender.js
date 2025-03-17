const express = require("express");
const { Pool } = require("pg");
const router = express.Router();

// PostgreSQL Connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Get Profile Data
router.get("/profilerender", async (req, res) => {
  try {
    // Replace with the actual logic for fetching the logged-in user's ID
    const userId = req.session.userId;

    // Select only specific fields
    const result = await pool.query(
      "SELECT id,name, email, phone, address FROM users WHERE id = $1",
      [userId]
    );

    if (result.rows.length === 0) {
      console.log("No user found for ID:", userId);
      return res.status(404).json({ message: "User not found" });
    }

    console.log("Fetched Profile Data:", result.rows[0]);

    // Send only the selected fields to the client
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching profile data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
