import React, { useState, useEffect, useContext } from "react";
import profileImage from "../assets/profileimage.jpg";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Profile = () => {
  // State for profile information
  const [profileImagePreview, setProfileImagePreview] = useState(profileImage);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    user: {
      id: "",
      name: "",
      email: "",
      phone: "",
      address: ""
    }
  });
 const [errorMessage, setErrorMessage] = useState("");
  
  // State for all bookings fetched from backend
  const [bookings, setBookings] = useState([]);

 
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/profilerender", {
          credentials: "include",
        });
        if (!response.ok) throw new Error("Failed to fetch profile");
        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);
 
 console.log("Customer id",profile.user.id);
 console.log("Customer id",profile.id);
  useEffect(() => {
    const fetchBookings = async () => {
      try {
 
        const response = await fetch(`http://localhost:5000/api/bookings/customer/${profile.user.id}`, {
          method: "GET",
          credentials: "include", // Send session cookie
        });
        if (!response.ok) throw new Error("Failed to fetch bookings");
        const data = await response.json();
        setBookings(data); // Store all bookings in state
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
    fetchBookings();
  }, [profile.user.id]);

  // Derive past and upcoming bookings from all bookings
  const today = new Date();
  const pastBookings = bookings.filter(
    (booking) => new Date(booking.checkOutDate) < today
  );
  const upcomingBookings = bookings.filter(
    (booking) => new Date(booking.checkOutDate) >= today
  );

  // Handle profile info change
  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleProfilePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setErrorMessage("");
      setProfileImagePreview(URL.createObjectURL(file));
      const formData = new FormData();
      formData.append("profilePhoto", file);
      try {
        const response = await fetch("http://localhost:5000/api/uploadProfilePhoto", {
          method: "POST",
          body: formData,
        });
        if (!response.ok) {
          setErrorMessage("Failed to upload profile photo. Please try again.");
        }
      } catch (error) {
        setErrorMessage("An error occurred while uploading the photo.");
        console.error("Error uploading profile photo:", error);
      }
    } else {
      setErrorMessage("No file selected. Please choose a file to upload.");
    }
  };

  const handleSignOut = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="container mx-auto p-8">
      <div className="absolute top-4 right-4">
        <button
          onClick={handleSignOut}
          className="text-gray-700 border border-gray-300 py-2 px-4 rounded hover:bg-blue-500 hover:text-white transition-colors"
        >
          Sign Out
        </button>
      </div>

      {/* Profile Section */}
      <div className="flex justify-center flex-col items-center mb-8">
        <div className="w-24 h-24 rounded-full overflow-hidden shadow-lg">
          <img
            src={profileImagePreview || "https://via.placeholder.com/150"}
            alt="Profile"
            className="object-cover w-full h-full"
          />
        </div>
        <label
          htmlFor="file-upload"
          className="cursor-pointer text-blue-500 hover:underline mb-2"
        >
          Change Profile Photo
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleProfilePhotoUpload}
        />
        {errorMessage && (
          <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
        )}
        <h1 className="text-2xl font-bold mt-4">{profile.user.name}</h1>
        <p className="text-gray-600">{profile.user.email}</p>
      </div>

      <div className="space-y-4">
        {/* Edit Profile Form */}
        <div>
          <label className="block text-gray-700">Phone Number</label>
          <input
            type="text"
            name="phone"
            value={profile.user.phone}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Address</label>
          <input
            type="text"
            name="address"
            value={profile.user.address}
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
            {pastBookings.length > 0 ? (
              pastBookings.map((booking) => (
                <div key={booking._id} className="border p-4 rounded-lg shadow-md">
                  <h4 className="font-bold text-lg">{booking.hotel}</h4>
                  <p>{booking.location}</p>
                  <p>
                    Check-in: {booking.checkIn} | Check-out: {booking.checkOut}
                  </p>
                  <p className="text-green-500">Status: {booking.status}</p>
                </div>
              ))
            ) : (
              <p>No past bookings found.</p>
            )}
          </div>
        </div>

        {/* Upcoming Reservations */}
        <div className="mt-8">
          <h3 className="text-xl font-medium">Upcoming Reservations</h3>
          <div className="space-y-4">
            {upcomingBookings.length > 0 ? (
              upcomingBookings.map((booking) => (
                <div key={booking._id} className="border p-4 rounded-lg shadow-md">
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
              ))
            ) : (
              <p>No upcoming reservations found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
