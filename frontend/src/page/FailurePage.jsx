import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaTimesCircle } from "react-icons/fa";

const FailurePage = () => {
  const location = useLocation();
  
  useEffect(() => {
    const utterance = new SpeechSynthesisUtterance("Payment Failed. Please try again.");
    // Optionally customize the voice, rate, pitch, etc.
    window.speechSynthesis.speak(utterance);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <FaTimesCircle className="text-red-500 text-6xl animate-bounce" />
      <h2 className="text-3xl font-bold text-red-700 mt-4">
        Payment Failed
      </h2>
      <p className="text-lg text-gray-600 mt-2">Please try again.</p>
    </div>
  );
};

export default FailurePage;
