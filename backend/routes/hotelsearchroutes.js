const express = require("express");
const {getHotels} = require("../controller/hotelsearch");

const router = express.Router();

router.get("/hotelsearch", getHotels);

module.exports = router;