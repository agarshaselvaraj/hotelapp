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
    
      id: "",
      name: "",
      email: "",
      phone: "",
      address: ""
    
  });
 const [errorMessage, setErrorMessage] = useState("");
  
  // State for all bookings fetched from backend
  const [bookings, setBookings] = useState({ past: [], upcoming: [] });

  console.log("Executing profile page");
  useEffect(() => {
    console.log("Profile useEffect is running...");
    const fetchProfile = async () => {
      console.log("starting profilerendering ....");
      try {
        const response = await fetch("http://localhost:5000/api/profilerender", {
          credentials: "include",
        });
        if (!response.ok) throw new Error("Failed to fetch profile");
        const data = await response.json();
        console.log("Fetching profile details");
        console.log("Fetched profile data:", data); // Debug API respons
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);
  const fetchBookings = async () => {
    if (!profile.id) return;  // Prevent unnecessary calls
    try {
      const response = await fetch(
        `http://localhost:5000/api/bookings/customer/${profile.id}`,
        { credentials: "include" }
      );
      if (!response.ok) throw new Error("Failed to fetch bookings");
  
      let bookingsData = await response.json();
  
      const bookingsWithHotelDetails = await Promise.all(
        bookingsData.map(async (booking) => {
          try {
            const hotelRes = await fetch(
              `http://localhost:5000/api/hoteldetails/${booking.hotel_id}`
            );
            if (!hotelRes.ok) throw new Error("Failed to fetch hotel details");
            const hotelData = await hotelRes.json();
            return {
              ...booking,
              hotel: hotelData.name,
              location: hotelData.city,
              address: hotelData.address,
            };
          } catch (error) {
            console.error("Error fetching hotel details:", error);
            return booking;
          }
        })
      );
  
      const today = new Date();
      setBookings({
        past: bookingsWithHotelDetails.filter(
          (booking) => new Date(booking.check_in_date) < today
        ),
        upcoming: bookingsWithHotelDetails.filter(
          (booking) => new Date(booking.check_out_date) >= today
        ),
      });
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };
  
  // Fetch bookings only when profile ID changes
  useEffect(() => {
    fetchBookings();
  }, [profile.id]);

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
        <h1 className="text-2xl font-bold mt-4">{profile.name}</h1>
        <p className="text-gray-600">{profile.email}</p>
      </div>

      <div className="space-y-4">
        {/* Edit Profile Form */}
        <div>
          <label className="block text-gray-700 flex space-x-1">
            Phone Number<svg xmlns="http://www.w3.org/2000/svg" height="22px"
           viewBox="0 -960 960 960" width="22px" fill="#808080"><path d="M760-480q0-117-81.5-198.5T480-760v-80q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-480h-80Zm-160 0q0-50-35-85t-85-35v-80q83 0 141.5 58.5T680-480h-80Zm198 360q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z"/></svg></label>
          <input
            type="text"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700 flex">Address
            <svg xmlns="http://www.w3.org/2000/svg" height="22px" 
            viewBox="0 -960 960 960" width="22px" fill="#808080"><path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/></svg></label>
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
            {bookings.past.length > 0 ? (
              bookings.past.map((booking) => (
                <div key={booking._id} className="border border-blue-500 shadow-blue-300 p-4 rounded-lg 
                shadow-md  flex flex-col space-y-1 items-start">
                  <h4 className="font-bold text-lg  w-full ">
                    
   {booking.hotel}</h4>
                  <p className="blue flex items-center w-full">{booking.location}</p>
                  <p className="flex items-center w-full">
                 
  Check-in: {new Date(booking.check_in_date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })} |
  Check-out: {new Date(booking.check_out_date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
</p>
<p className="flex items-center w-full">
  <span className="text-black">Status: </span>
  <span className={booking.payment_status === "confirmed" ? "text-green-500" : "text-red-500"}>
    {booking.payment_status === "confirmed" ? "Confirmed ✅" : "Cancelled ❌"}
  </span>
</p>

                 
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
            {bookings.upcoming.length > 0 ? (
              bookings.upcoming.map((booking) => (
                <div key={booking._id} className="border  border-blue-500 shadow-blue-300 p-4 rounded-lg shadow-md">
                  <h4 className="font-bold text-lg">{booking.hotel}</h4>
                  <p>{booking.location}</p>
                  <p>
  Check-in: {new Date(booking.check_in_date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })} |
  Check-out: {new Date(booking.check_out_date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
</p>
<p className="flex items-center w-full">
  <span className="text-black">Status: </span>
  <span className={booking.payment_status === "confirmed" ? "text-green-500" : "text-red-500"}>
    {booking.payment_status === "confirmed" ? "Confirmed ✅" : "Cancelled ❌"}
  </span>
</p>
                {/* 
                <div className="mt-4 flex space-x-4">
                 <button  className="bg-red-500 text-white py-2 px-4 rounded-md">
                      Cancel
                   </button>
                    <button className="bg-blue-500 text-white py-2 px-4 rounded-md">
                      Modify
                    </button>
                  </div>*/}
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