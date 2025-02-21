const express = require("express");
const multer = require("multer");
const { addHotel } = require("../controller/Hotelcontroller");

const router = express.Router();

// Multer configuration for memory storage
const storage = multer.memoryStorage(); // Store files in memory as Buffers
const upload = multer({ storage }); // Configure Multer with memory storage

// Route for adding hotels
router.post("/hotels", upload.array("images", 3), addHotel);

module.exports = router;
