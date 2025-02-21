const Razorpay = require("razorpay");
const { v4: uuidv4 } = require("uuid");
const db = require("../database");
require("dotenv").config();

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Generate Payment Order
exports.initiatePayment = async (req, res) => {
  try {
    console.log("Request Body:", req.body); // Debugging
    const { amount, customerId, email,cardno} = req.body;

    let ReceiptId = uuidv4(); // Generate unique order ID

    const options = {
      amount: amount * 100, // Razorpay requires amount in paisa (INR * 100)
      currency: "INR",
      receipt: ReceiptId,
      payment_capture: 1, // Auto-capture payment
    };

    const order = await razorpay.orders.create(options);
    console.log("Razorpay Order Response:", order);
    res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID, // Send key_id to frontend
    });
  } catch (error) {
    console.error("Razorpay Error:", error); 
    if (error.response) {
      console.error("Razorpay Error Details:", error.response.data);
    }
    res.status(500).json({ error: "Error creating Razorpay order", details: error.message });
  }
};

// Handle Razorpay Callback
exports.paymentCallback = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    // Verify payment signature
    const crypto = require("crypto");
    const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generated_signature = hmac.digest("hex");

    if (generated_signature === razorpay_signature) {
      // Payment successful, store details in the database
      await db.query(
        "INSERT INTO payments (order_id, amount, customer_id, status, transaction_id, payment_mode) VALUES ($1, $2, $3, $4, $5, $6)",
        [razorpay_order_id, "Success", "Completed", razorpay_payment_id, "Online"]
      );

      return res.redirect(`http://localhost:3000/success?orderId=${razorpay_order_id}`);
    } else {
      return res.status(400).send("Invalid signature. Payment verification failed.");
    }
  } catch (error) {
    console.error("Payment Verification Error:", error);
    res.status(500).send("Error verifying payment");
  }
};
