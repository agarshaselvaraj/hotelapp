import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { User, Mail, CalendarCheck, Users, MapPin, BedDouble } from "lucide-react";

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { hotel, startDate, endDate, guests, address } = location.state || {};

  // Calculate the number of nights
  const checkInDate = new Date(startDate);
  const checkOutDate = new Date(endDate);
  const nights = Math.max(1, (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));

  // User input states
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    cardNumber: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  // Handle booking confirmation
  const handleConfirmBooking = async (e) => {
    e.preventDefault();
    const userResponse = await fetch("http://localhost:5000/api/user", {
      method: "GET",
      credentials: "include", // Ensure cookies/session are sent
    });

    if (!userResponse.ok) {
      alert("User not authenticated. Please log in.");
      navigate("/sign-in");
      return;
    }

    const userData = await userResponse.json();
    const customerId = userData?.id;

    // Calculate total amount
    const totalAmount = hotel?.price_per_night * nights * (guests || 1);

    try {
      // Step 1: Save Booking Details in Database
      const bookingResponse = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerId,
          hotelId: hotel.hotel_id,
          checkInDate: startDate,
          checkOutDate: endDate,
          guests,
          totalAmount,
        }),
      });

      if (!bookingResponse.ok) {
        throw new Error("Failed to save booking details.");
      }

      const bookingData = await bookingResponse.json();
      const bookingId = bookingData.bookingId;

      const paymentresponse = await fetch("http://localhost:5000/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: totalAmount,
          customerId: customerId,
          email: userDetails.email,
          bookingId,
        }),
      });

      const data = await paymentresponse.json();

      if (paymentresponse.ok) {
        // Redirect to Razorpay checkout page
        navigate("/payment", {
          state: {
            orderId: data.orderId,
            amount: data.amount,
            bookingId,
            userDetails: {
              firstName: userDetails.firstName,
              lastName: userDetails.lastName,
              email: userDetails.email,
            },
          },
        });
      } else {
        alert("Payment initiation failed");
      }
    } catch (error) {
      console.error("Error initiating payment:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl flex flex-col sm:flex-row">
        {/* Booking Details Section */}
        <div className="w-full sm:w-1/2 p-4 border-b sm:border-r sm:border-b-0">
          <h2 className="text-2xl font-semibold mb-4">Your Booking Details</h2>
          <p>
            <MapPin className="inline-block mr-2 text-blue-500" />
            <strong>Location:</strong> {hotel?.name}, {hotel.address}
          </p>
          <div className="flex justify-between mt-4 space-x-1">
            <CalendarCheck className="inline-block text-blue-500" />
            <p>
              <strong>Check-in:</strong> {startDate}
            </p>
            <CalendarCheck className="inline-block text-blue-500" />
            <p>
              <strong>Check-out:</strong> {endDate}
            </p>
          </div>
          <div className="mt-4">
            <p>
              <BedDouble className="inline-block mr-2 text-blue-500" />
              <strong>Total length of stay:</strong>{" "}
              <span className="text-black-500">{nights} nights</span>
            </p>
          </div>
          <div className="mt-4">
            <p>
              <Users className="inline-block mr-2 text-blue-500" />
              <strong>Guests:</strong> {guests}
            </p>
          </div>
        </div>

        {/* Confirmation Section */}
        <div className="w-full sm:w-1/2 p-4">
          <h2 className="text-2xl font-semibold mb-4">Confirm Your Details</h2>
          <form onSubmit={handleConfirmBooking}>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                className="w-full sm:w-1/2 p-2 border rounded-md mb-2"
                value={userDetails.firstName}
                onChange={handleChange}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                className="w-full sm:w-1/2 p-2 border rounded-md mb-2"
                value={userDetails.lastName}
                onChange={handleChange}
              />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-2 border rounded-md mb-4"
              value={userDetails.email}
              onChange={handleChange}
            />

            <div className="bg-blue-100 p-3 rounded-md mb-4">
              <p className="font-semibold">
                Total Cost:{" "}
                <span className="text-blue-600">
                  ₹
                  {(
                    (hotel?.price_per_night || 0) *
                    ((new Date(endDate) - new Date(startDate)) /
                      (1000 * 60 * 60 * 24)) *
                    (guests || 1)
                  ).toFixed(2)}
                </span>
              </p>
              <p className="text-sm text-gray-600">Includes taxes and charges</p>
            </div>

            <div className="w-full flex justify-end">
              <button
                type="submit"
                className="w-full sm:w-1/3 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
              >
                Confirm Booking
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
