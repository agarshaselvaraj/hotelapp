// routes/emailRoutes.js
const express = require('express');
const { sendEmail } = require('../controller/emailController');

const router = express.Router();

// POST route to send an email
router.post('/send-email', sendEmail);

module.exports = router;
