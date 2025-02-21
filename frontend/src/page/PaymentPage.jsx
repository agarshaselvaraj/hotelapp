import React from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { orderId, amount, currency, status, receipt, createdAt, userDetails,bookingId } = location.state || {};
  
  console.log("Booking ID:", bookingId);
  
  // Convert timestamp to readable date
  const formattedDate = createdAt ? new Date(createdAt * 1000).toLocaleString() : "N/A";
  useEffect(() => {
    // Set a timeout to redirect after 5 seconds (5000 milliseconds)
    const timer = setTimeout(() => {
      // Navigate to your desired page (e.g., '/booking-details')
      // You can pass the details along in the state if needed
      navigate('/window', { state: { orderId, amount, currency, userDetails,bookingId } });
    }, 10000);

    // Cleanup the timer if the component unmounts
    return () => clearTimeout(timer);
  }, [navigate, orderId, amount, currency, userDetails,bookingId]);

  return (<div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
    <h2 className="text-2xl font-semibold mb-4 text-center text-blue-500">Payment Summary</h2>
    
    {/* User Details Section */}
    <div className="border-b border-gray-200 pb-4 mb-4">
      <h3 className="text-lg font-medium">User Details</h3>
      <p><strong>Name:</strong> {userDetails?.firstName} {userDetails?.lastName}</p>
      <p><strong>Email:</strong> {userDetails?.email}</p>
    </div>

    {/* Payment Details Section */}
    <div className="border-t border-gray-200 pt-4">
      <h3 className="text-lg font-medium">Payment Details</h3>
      <p><strong>Order ID:</strong> {orderId}</p>
      <p><strong>Total Amount:</strong> {currency} {(amount / 100).toFixed(2)}</p>
      <p><strong>Payment Status:</strong> <span className="text-blue-500">{status}</span></p>
      <p><strong>Receipt ID:</strong> {receipt}</p>
      <p><strong>Created At:</strong> {formattedDate}</p>
    </div>
  </div>
);
};

export default PaymentPage; 
    