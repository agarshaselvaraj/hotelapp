// src/pages/Profile.jsx

import React, { useState } from "react";

const Profile = () => {
  // State for profile information
  const [profile, setProfile] = useState({
    avatar: "",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1234567890",
    address: "123 Main St, City, Country",
  });

  // State for bookings
  const [bookings] = useState([
    {
      id: 1,
      hotel: "Hotel California",
      location: "Los Angeles, USA",
      checkIn: "2024-12-01",
      checkOut: "2024-12-05",
      status: "Completed",
    },
    {
      id: 2,
      hotel: "The Grand Palace",
      location: "New York, USA",
      checkIn: "2025-01-15",
      checkOut: "2025-01-20",
      status: "Upcoming",
    },
  ]);

  // Handle profile info change
  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container mx-auto p-8">
      {/* Profile Section */}
      <div className="flex justify-center items-center mb-8">
        <div className="w-48 h-48 rounded-full overflow-hidden shadow-lg">
          {/* Avatar */}
          <img
            src={profile.avatar || "https://via.placeholder.com/150"}
            alt="Profile"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="ml-8">
          <h2 className="text-3xl font-bold">{profile.name}</h2>
          <p className="text-gray-500">{profile.email}</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Edit Profile Form */}
        <div>
          <label className="block text-gray-700">Phone Number</label>
          <input
            type="text"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Address</label>
          <input
            type="text"
            name="address"
            value={profile.address}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
          />
        </div>
      </div>

      <hr className="my-8" />

      {/* Booking History Section */}
      <div>
        <h2 className="text-2xl font-semibold">Booking History</h2>

        {/* Past Bookings */}
        <div className="mt-4">
          <h3 className="text-xl font-medium">Past Bookings</h3>
          <div className="space-y-4">
            {bookings
              .filter((booking) => booking.status === "Completed")
              .map((booking) => (
                <div key={booking.id} className="border p-4 rounded-lg shadow-md">
                  <h4 className="font-bold text-lg">{booking.hotel}</h4>
                  <p>{booking.location}</p>
                  <p>
                    Check-in: {booking.checkIn} | Check-out: {booking.checkOut}
                  </p>
                  <p className="text-green-500">Status: {booking.status}</p>
                </div>
              ))}
          </div>
        </div>

        {/* Upcoming Reservations */}
        <div className="mt-8">
          <h3 className="text-xl font-medium">Upcoming Reservations</h3>
          <div className="space-y-4">
            {bookings
              .filter((booking) => booking.status === "Upcoming")
              .map((booking) => (
                <div key={booking.id} className="border p-4 rounded-lg shadow-md">
                  <h4 className="font-bold text-lg">{booking.hotel}</h4>
                  <p>{booking.location}</p>
                  <p>
                    Check-in: {booking.checkIn} | Check-out: {booking.checkOut}
                  </p>
                  <p className="text-yellow-500">Status: {booking.status}</p>
                  <div className="mt-4 flex space-x-4">
                    <button className="bg-red-500 text-white py-2 px-4 rounded-md">
                      Cancel
                    </button>
                    <button className="bg-blue-500 text-white py-2 px-4 rounded-md">
                      Modify
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
