import React, { useEffect } from 'react';
import { useLocation,useNavigate  } from 'react-router-dom';
import { FaSpinner } from "react-icons/fa";
const PaymentWindow = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderId, currency,amount, userDetails,bookingId } = location.state || {};
  console.log("Booking ID:", bookingId);
  
  useEffect(() => {
    if (!orderId) return;

    const options = {
      key:import.meta.env.VITE_RAZORPAY_KEY_ID
     || "YOUR_RAZORPAY_KEY_ID", // Ensure this key is provided securely
      amount: amount, // amount in paise
      currency: currency,
      name: "Your Company Name",
      description: "Payment for booking",
      order_id: orderId,
      handler: async function (response) {
        let updateResponse;
        try {
         
           updateResponse = await fetch(`http://localhost:5000/api/bookings/${bookingId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              bookingId,         // ID from the booking we created earlier
              paymentStatus: "confirmed",
             
            }),
          });
        }
          catch (error) {
            console.error("Error updating booking status:", error);
          }
          


         
          const updatedBooking = await updateResponse.json();
          console.log("Booking updated with confirmed payment:", updatedBooking);
 // Fetch hotel details using hotelId
 let hotelDetails;
try {
  if (!updatedBooking.booking?.hotel_id) throw new Error("Hotel ID is undefined.");
  
  const hotelResponse = await fetch(
    `http://localhost:5000/api/hoteldetails/${updatedBooking.booking.hotel_id}`
  );

  if (!hotelResponse.ok) {
    throw new Error("Failed to fetch hotel details");
  }

  hotelDetails = await hotelResponse.json();
  console.log("Fetched Hotel Details:", hotelDetails);
} catch (error) {
  console.error("Error fetching hotel details:", error);
  return;
}


   

    // Extracting booking details and guest information
    const { check_in_date,check_out_date, guests } = updatedBooking?.booking || {};

    const {  name, address } = hotelDetails;
    // Logging details being sent in the email
    console.log("Sending email with the following details:");
    console.log("User Name:", userDetails?.firstName);
    console.log("User Email:", userDetails?.email);
    console.log("Hotel Name:", name);
    console.log("Hotel Address:", address);
    console.log("Booking Dates:", { check_in_date, check_out_date });
    console.log("Number of Guests:", guests);

    // Send confirmation email to the user
    const emailResponse = await fetch("http://localhost:5000/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userDetails?.email,
        subject: "Payment Confirmation - Booking Confirmed",
        text: `Dear ${userDetails?.firstName},\n\nYour payment has been 
        successfully processed for your booking at ${name}, 
        located in ${address}.\n\nBooking details:\nStart Date: ${check_in_date}\nEnd Date:
         ${check_out_date}\nGuests: ${guests}\n\nThank you for booking with us.`,
        html: `
          <p>Dear ${userDetails?.firstName},</p>
          <p>Your payment has been successfully processed for your booking at
           <strong>${name}</strong>, located in <strong>${address}</strong>.</p>
          <p><strong>Booking details:</strong></p>
          <p>Start Date: <strong>${check_in_date}</strong><br/>End Date: <strong>${check_in_date}</strong></p>
          <p><strong>Guests:</strong> ${guests}</p>
          <p>Thank you for booking with us!</p>
        `,
      }),
    });

    if (!emailResponse.ok) {
      console.error("Failed to send email");
    } else {
      console.log("Confirmation email sent successfully");
    }

        // Payment is successful. Razorpay will return these details.
        console.log("Payment successful:", response);
        navigate("/success", { state: response });
        // You should now verify the payment by sending these details to your backend.
        // For example:
        // fetch('/api/payment/verify', { method: 'POST', body: JSON.stringify(response) })
        //   .then(res => res.json())
        //   .then(data => { /* handle success */ });
      },
      prefill: {
        name: `${userDetails?.firstName} ${userDetails?.lastName}`,
        email: userDetails?.email,
        // Optionally, include contact number
      },
      notes: {
        // You can pass additional notes here if needed
      },
      theme: {
        color: "#3399cc"
      }
    };

    // Create the Razorpay instance and open the checkout widget
    const rzp = new window.Razorpay(options);
    rzp.open();
    
    // Optional: Handle checkout modal close event
    rzp.on('payment.failed', function (response) {
      console.error("Payment failed:", response);
      navigate("/failure", { state: response });
      // You can redirect the user or show an error message here.
    });
  }, [orderId, amount, currency, userDetails]);

  return (
    <div className="max-w-md mx-auto text-center mt-10">
     <h1 className="text-2xl font-semibold text-gray-700">Processing Payment...</h1>
     <p className="text-gray-500 mt-2">Please wait while we redirect you to the payment gateway.</p>
       {/* Loading Spinner */}
       <div className="mt-4 flex items-center justify-center">
          <FaSpinner className="text-blue-500 text-4xl animate-spin" />
        </div>
    </div>
  );
};

export default PaymentWindow; 