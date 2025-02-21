const express = require("express");
const { viewhotels} = require("../controller/viewhotel");

const router = express.Router();

// Define the route for hotel search with filters
router.get("/hoteldetails/:id", viewhotels);

module.exports = router;
