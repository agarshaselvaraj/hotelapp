// config/nodemailerConfig.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', // Change this if you're using a different email provider
  auth: {
    user: process.env.EMAIL, // Email from environment variables
    pass: process.env.EMAIL_PASSWORD, // Password from environment variables
  },
});

module.exports = transporter;
