const express = require("express");
const router = express.Router();

router.get("/user", (req, res) => {
  if (!req.session || !req.session.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  res.json(req.session.user); // Send the stored session user details
});

module.exports = router;
