import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import whiteprofile from "../assets/whiteprofile.png";

const Banner = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const navigate = useNavigate(); // Initialize the navigate function

  const handleLogin = () => {
    setIsLoggedIn(true); // Simulate login (you can enhance this with real login logic)
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // Simulate logout
  };

  return (
    <header className="bg-[rgba(104,213,238,1)] text-black h-16 flex justify-between items-center fixed top-0 left-0 w-full z-50 px-4 md:px-9">
      <h1 className="text-lg md:text-2xl font-bold">RegalInn</h1>

      <div className="pr-2 md:pr-6">
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            // Show My Profile button if logged in
            <div className="flex items-center space-x-2 border border-gray-300 rounded-lg px-4 py-2">
              <img
                src={whiteprofile}
                alt="Profile"
                className="w-6 h-6 md:w-8 md:h-8 rounded-full"
              />
              <button
                className="text-xs md:text-sm"
                onClick={handleLogout}
              >
                My Profile
              </button>
            </div>
          ) : (
            // Show Sign In / Create Account buttons in a single row
            <div className="flex flex-row items-center space-x-4">
              <button
                className="bg-blue-500 text-white py-1 px-3 md:py-2 md:px-4 rounded-lg text-xs md:text-sm"
                onClick={() => navigate("/sign-in")} // Navigate to Sign In page
              >
                Sign In
              </button>
              <button
                className="bg-green-500 text-white py-1 px-3 md:py-2 md:px-4 rounded-lg text-xs md:text-sm"
                onClick={() => navigate("/create-account")} // Navigate to Create Account page
              >
                Create Account
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Banner;
