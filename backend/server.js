const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const cloudinary = require('cloudinary').v2;
const session = require("express-session");

require("dotenv").config();
const app = express();
app.use(cors({
  origin: "http://localhost:5173", // Replace with your frontend URL
  credentials: true, // Allow cookies & authentication headers
}));
app.use(cookieParser());
// Debugging: Log cookies before session
app.use((req, res, next) => {
  console.log("Cookies before session:", req.cookies);
  next();
});
app.use(
  session({
    secret: "your-secret-key", // Change this to a strong secret
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set to true in production with HTTPS
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);
// Debugging: Log session data
app.use((req, res, next) => {
  console.log("Session Data:", req.session);
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));





cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const authfile = require("./routes/auth");
const profilephoto = require("./routes/profile");
const profilerender = require("./routes/profilerender");
const hotelRoutes = require("./routes/hotelroutes");
const hotelsearch=require("./routes/hotelsearchroutes");
const hotelfilter=require("./routes/hotelfilterroutes");
const hoteldetail=require("./routes/viewdetails");
const paymentRoutes = require("./routes/paymentRoutes");
const authsess= require("./routes/authRoutes");
const book=require("./routes/bookingroutes");
const emailRoutes = require('./routes/emailRoutes');


// Middleware


// Routes
app.use("/api", authfile);
app.use("/api", authsess);
app.use("/api", profilephoto);
app.use("/api/", profilerender);
app.use("/api", hotelRoutes);
app.use("/api",hotelsearch);
app.use("/api",hotelfilter);
app.use("/api",hoteldetail)
app.use("/api", paymentRoutes);
app.use("/api",book);
app.use('/api', emailRoutes);
// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
