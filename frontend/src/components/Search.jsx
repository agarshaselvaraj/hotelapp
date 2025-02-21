import React, { useState,useEffect } from "react";
import { useNavigate,useLocation  } from "react-router-dom";
const Search = () => {
  const [city, setcity] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [guests, setGuests] = useState(1);
  const navigate = useNavigate(); 
  const location = useLocation(); // Initialize useNavigate
  useEffect(() => {
    if (location.state) {
      const { city, startDate, endDate, guests } = location.state;
      setcity(city || "");
      setStartDate(startDate || "");
      setEndDate(endDate || "");
      setGuests(guests || 1);
    }
  }, [location.state]);
  const handleSearch = () => {
    if (!location || !startDate || !endDate) {
      alert("Please fill in all fields!");
      return;
    }
    navigate("/Searchpage", {
      state: {city, startDate, endDate, guests },
    });
  };
 
  return (
    <div className="bg-white shadow-lg rounded-lg px-6 py-4 flex flex-wrap items-center justify-center sm:justify-between gap-4 max-w-4xl mx-auto">
      {/* Location Input */}
      <div className="flex items-center border-b sm:border-none w-full sm:w-auto flex-1 max-w-xs">
        <input
          type="text"
          placeholder="Where are you going?"
          value={city}
          onChange={(e) => setcity(e.target.value)}
          className="w-full text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
        />
      </div>

      {/* Date Picker */}
      <div className="flex flex-col sm:flex-row items-center w-full sm:w-auto flex-1 gap-2 max-w-xs">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="text-sm text-gray-700 placeholder-gray-400 focus:outline-none w-full sm:w-auto"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="text-sm text-gray-700 placeholder-gray-400 focus:outline-none w-full sm:w-auto"
        />
      </div>

      {/* Guests Input */}
      <div className="flex items-center border-b sm:border-none w-full sm:w-auto flex-1 max-w-xs">
        <select
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          className="text-sm text-gray-700 placeholder-gray-400 focus:outline-none w-full sm:w-auto"
        >
          {[...Array(10).keys()].map((guestCount) => (
            <option key={guestCount + 1} value={guestCount + 1}>
              {guestCount + 1} {guestCount + 1 === 1 ? "guest" : "guests"}
            </option>
          ))}
        </select>
      </div>

      {/* Search Button */}
      <div className="w-full sm:w-auto max-w-xs">
        <button  onClick={handleSearch} className="bg-blue-600 text-white font-medium py-2 px-6 rounded-lg w-full sm:w-auto hover:bg-blue-700 transition-all">
          Search
        </button>
      </div>
    </div>
  );
};

export default Search;
