import React from "react";


const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-400 py-4">
      <div className="max-w-3xl mx-auto px-4 flex flex-col items-center space-y-4 md:flex-row md:justify-between md:space-y-0">
        {/* About Section */}
        <div className="text-center md:text-left">
          <h3 className="text-sm font-semibold text-white">Hotel Booking</h3>
          <p className="text-xs mt-1">
            Seamless hotel booking for your perfect getaway.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <ul className="flex space-x-4 text-xs">
            <li>
              <a href="#popular" className="hover:text-white">
                Popular
              </a>
            </li>
            <li>
              <a href="#trending" className="hover:text-white">
                Trending
              </a>
            </li>
            <li>
              <a href="#faq" className="hover:text-white">
                FAQ
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-white">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-3">
          <a
            href="#"
            className="w-6 h-6 flex items-center justify-center bg-gray-700 rounded-full hover:bg-gray-600"
            aria-label="Facebook"
          >
            <i className="fab fa-facebook-f text-white text-xs"></i>
          </a>
          <a
            href="#"
            className="w-6 h-6 flex items-center justify-center bg-gray-700 rounded-full hover:bg-gray-600"
            aria-label="Twitter"
          >
            <i className="fab fa-twitter text-white text-xs"></i>
          </a>
          <a
            href="#"
            className="w-6 h-6 flex items-center justify-center bg-gray-700 rounded-full hover:bg-gray-600"
            aria-label="Instagram"
          >
            <i className="fab fa-instagram text-white text-xs"></i>
          </a>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 mt-3">
        © {new Date().getFullYear()} Hotel Booking. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
