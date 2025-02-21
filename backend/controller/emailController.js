const transporter = require('../nodemailerConfig');
const sendEmail = async (req, res) => {
  console.log("Received body:", req.body);
  const { email, subject, text, html } = req.body;

  // Validate email
  if (!email) {
    return res.status(400).json({ error: 'Recipient email is required' });
  }

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,  // Ensure this is not undefined or empty
    subject: subject || 'No Subject',  // Set a default subject
    text: text || 'No Content',  // Set a default message
    html: html || '',  // Optional HTML content
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully!');
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Error sending email' });
  }
};
module.exports={sendEmail};