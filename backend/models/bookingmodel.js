const pool = require("../database"); // Import PostgreSQL connection

const BookingModel = {
  createBooking: async (bookingData) => {
    const {
      customerId,
      hotelId,
      hotelName,
      address,
      checkInDate,
      checkOutDate,
      guests,
      totalAmount,
      firstName,
      lastName,
      email,
      cardNumber,
    } = bookingData;

    const query = `
      INSERT INTO bookings 
      (customer_id, hotel_id, check_in_date, check_out_date, guests, total_amount)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const values = [customerId, hotelId, checkInDate, checkOutDate, guests, totalAmount];

    try {
      const result = await pool.query(query, values);
      return result.rows[0]; // Return the inserted booking
    } catch (error) {
      console.error("Error inserting booking:", error);
      throw error;
    }
  },

  getBookingById: async (id) => {
    const query = `SELECT * FROM bookings WHERE id = $1`;
    try {
      const result = await pool.query(query, [id]);
      return result.rows[0]; // Return the booking
    } catch (error) {
      console.error("Error fetching booking:", error);
      throw error;
    }
  },

  getAllBookings: async () => {
    const query = `SELECT * FROM bookings`;
    try {
      const result = await pool.query(query);
      return result.rows; // Return all bookings
    } catch (error) {
      console.error("Error fetching bookings:", error);
      throw error;
    }
  },

  // The updateBooking function is included inside the BookingModel object literal
  updateBooking: async (id, paymentStatus) => {
    
    const query = `
      UPDATE bookings 
      SET payment_status = $1
      WHERE id = $2
      RETURNING *;
    `;
    const values = [paymentStatus,  id];

    try {
      const result = await pool.query(query, values);
      return result.rows[0]; // Return the updated booking
    } catch (error) {
      console.error("Error updating booking:", error);
      throw error;
    }
  }
};

module.exports = BookingModel;
