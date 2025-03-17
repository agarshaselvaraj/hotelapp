import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaTimesCircle } from "react-icons/fa";

const FailurePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Speech synthesis
    const utterance = new SpeechSynthesisUtterance("Payment Failed. Please try again.");
    window.speechSynthesis.speak(utterance);

    // Redirect after 5 seconds
    const timeout = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timeout); // Cleanup function
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <FaTimesCircle className="text-red-500 text-6xl animate-bounce" />
      <h2 className="text-3xl font-bold text-red-700 mt-4">
        Payment Failed
      </h2>
      <p className="text-lg text-gray-600 mt-2">Redirecting to Home in 5 seconds...</p>
    </div>
  );
};

export default FailurePage;
