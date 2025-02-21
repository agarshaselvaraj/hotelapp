import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import whiteprofile from "../assets/whiteprofile.png";
import { motion } from "framer-motion";
import { LogIn, UserPlus,User } from "lucide-react";
const Banner = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <header className="bg-gradient-to-r from-blue-300 to-blue-600 shadow-md text-black h-16 flex justify-between items-center fixed top-0 left-0 w-full z-50 px-4 md:px-9">
      <h1 className=" text-xl md:text-3xl font-bold">RegalInn</h1>
      <div className="pr-2 md:pr-6">
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            
            <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200 }}
            onClick={() => navigate("/profile")}
            className="flex items-center space-x-2 
            bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 text-white py-2 px-4 md:py-2 md:px-5 rounded-lg text-xs md:text-sm font-semibold shadow-lg"
          >
            <User size={18} />
            <span>My Profile</span>
          </motion.button>
        ) : (
            <div className="flex flex-row items-center space-x-4 pl-6 md:pl-8">
              <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200 }}
        onClick={() => navigate("/sign-in")}
        className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-red-500
         hover:from-orange-600 hover:to-red-600 text-white py-2 px-4 md:py-2 md:px-5 rounded-lg text-xs md:text-sm font-semibold shadow-lg"
      >
        <LogIn size={18} />
        <span>Sign In</span>
      </motion.button>

      {/* Create Account Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
        onClick={() => navigate("/create-account")}
        className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-2 px-4 md:py-2 md:px-5 rounded-lg text-xs md:text-sm font-semibold shadow-lg"
      >
        <UserPlus size={18} />
        <span>Create Account</span>
      </motion.button>
    









            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Banner;
