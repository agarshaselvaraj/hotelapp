import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const SuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Speak "Payment Successful"
    const utterance = new SpeechSynthesisUtterance("Payment Successful");
    window.speechSynthesis.speak(utterance);

    // Navigate back to home after 5 seconds
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timer); // Cleanup on unmount
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <FaCheckCircle className="text-green-500 text-6xl animate-bounce" />
      <h2 className="text-3xl font-bold text-green-700 mt-4">
        Payment Successful
      </h2>
      <p className="text-gray-600 mt-2">Redirecting to homepage in 5 seconds...</p>
    </div>
  );
};

export default SuccessPage;
