const express = require("express");
const router = express.Router();
const BookingModel = require("../models/bookingmodel");
const pool = require("../database");

// Route to create a new booking
router.post("/bookings", async (req, res) => {
  try {
    const booking = await BookingModel.createBooking(req.body);
    res.status(201).json({ bookingId: booking.id });
  } catch (error) {
    console.error("Error inserting booking:", error);
    res.status(500).json({ error: "Error saving booking details" });
  }
});

// Route to get a booking by ID
router.get("/bookings/:id", async (req, res) => {
  try {
    const booking = await BookingModel.getBookingById(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.json(booking);
  } catch (error) {
    console.error("Error fetching booking:", error);
    res.status(500).json({ error: "Error retrieving booking details" });
  }
});

// Route to get all bookings
router.get("/bookings", async (req, res) => {
  try {
    const bookings = await BookingModel.getAllBookings();
    res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ error: "Error retrieving bookings" });
  }
});
// Route to update booking payment status to confirmed
router.put("/bookings/:id", async (req, res) => {
  const bookingId = req.params.id;
  const { paymentStatus } = req.body;

  try {
    // Assuming your BookingModel has an updateBooking method
    const updatedBooking = await BookingModel.updateBooking(bookingId,
      paymentStatus);
    if (!updatedBooking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.json({
      message: "Booking updated successfully",
      booking: updatedBooking,
    });
  } catch (error) {
    console.error("Error updating booking:", error);
    res.status(500).json({ error: "Error updating booking details" });
  }
});
// Route to get bookings by customer ID
router.get("/bookings/customer/:customerId", async (req, res) => {
  const { customerId } = req.params;

  try {
    const query = `SELECT * FROM bookings WHERE customer_id = $1`;
    const result = await pool.query(query, [customerId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "No bookings found for this customer" });
    }

    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ error: "Error retrieving customer bookings" });
  }
});


module.exports = router;
