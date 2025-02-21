require("dotenv").config();

module.exports = {
  PAYTM_MID: process.env.PAYTM_MID,
  PAYTM_MKEY: process.env.PAYTM_MKEY,
  PAYTM_WEBSITE: "WEBSTAGING", // Use "DEFAULT" for production
  PAYTM_CHANNEL_ID: "WEB",
  PAYTM_INDUSTRY_TYPE: "Retail",
  CALLBACK_URL: "http://localhost:5000/api/payment/callback",
};
