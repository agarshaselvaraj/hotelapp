import React from "react";
import { useLocation } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import {useEffect} from "react";

const SuccessPage = () => {
  const location = useLocation();
  useEffect(() => {
    const utterance = new SpeechSynthesisUtterance("Payment Successful");
    // Optionally customize the voice, rate, pitch, etc.
    window.speechSynthesis.speak(utterance);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <FaCheckCircle className="text-green-500 text-6xl animate-bounce" />
      <h2 className="text-3xl font-bold text-green-700 mt-4">
        Payment Successful
      </h2>
      
      
    </div>
  );
};

export default SuccessPage;
