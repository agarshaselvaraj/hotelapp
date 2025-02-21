const express = require("express");
const { getFilteredHotels } = require("../controller/hotelfilter");

const router = express.Router();

// Define the route for hotel search with filters
router.get("/hotelfilter", getFilteredHotels);

module.exports = router;
