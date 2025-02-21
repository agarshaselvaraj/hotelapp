const express = require("express");
const { initiatePayment, paymentCallback } = require("../controller/paymentController");

const router = express.Router();

router.post("/payment", initiatePayment);
router.post("/payment/callback", paymentCallback);

module.exports = router;
