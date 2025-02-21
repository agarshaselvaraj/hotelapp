import React, { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import { useLocation } from "react-router-dom";
import "swiper/css/pagination";
import { 
  Wifi, 
  Waves, 
  ParkingCircle, 
  Utensils, 
  Bath, 
  Wind, 
  Coffee, 
  Tv, 
  Dog, 
 Droplet,
  Snowflake, 
  Home 
} from "lucide-react";

const HotelDetails = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const { startDate, endDate, guests } = location.state || {};
  const navigate = useNavigate();
  const [nights, setNights] = useState(1);
  const facilityIcons = {
    "Parking": <ParkingCircle size={20} className="mr-2 text-blue-500" />,
    "Pet Friendly": <Dog size={20} className="mr-2 text-blue-500" />,
    "Kitchen": <Utensils size={20} className="mr-2 text-blue-500" />,
    "Air Conditioning": <Snowflake size={20} className="mr-2 text-blue-500" />,
    "All Meals": <Utensils size={20} className="mr-2 text-blue-500" />,
    "Free Wifi": <Wifi size={20} className="mr-2 text-blue-500" />,
    "TV": <Tv size={20} className="mr-2 text-blue-500" />,
    "Swimming pool": <Waves size={20} className="mr-2 text-blue-500" />,
    "Washing machine": <Droplet size={20} className="mr-2 text-blue-500" />,
    "Balcony": <Home size={20} className="mr-2 text-blue-500" />
  };
  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/hoteldetails/${id}`);
        const data = await response.json();

        if (response.ok) {
          setHotel(data);
        } else {
          setError(data.message || 'Failed to fetch hotel details');
        }
      } catch (error) {
        setError('Server Error');
      } finally {
        setLoading(false);
      }
    };

    fetchHotelDetails();
  }, [id]);

  if (loading) return <div>Loading hotel details...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-blue-800 font-serif">{hotel.name}</h1>
      <p className="text-lg"><strong></strong> {hotel.address}, {hotel.city}</p>
      

{/* Hotel Images in a Single Row */}
<div className="my-6 flex gap-4 overflow-x-auto">
  {hotel.images.length > 0 ? (
    hotel.images.map((img, index) => (
      <img 
        key={index}
        src={img} 
        alt={`Hotel Pic ${index + 1}`} 
        className="w-[300px] h-[200px] object-cover rounded-lg shadow-md"
      />
    ))
  ) : (
    <p className="text-center text-gray-500">No images available</p>
  )}
</div>

 
    
   

      {/* Facilities Available */}
      <h2 className="text-xl font-semibold mt-4">Facilities Available</h2>
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
  {hotel.amenities.map((facility, index) => (
    <div key={index} className="flex items-center bg-gray-100 p-3 rounded-lg shadow-sm">
      {facilityIcons[facility] } {/* Default icon if not mapped */}
      <span className="text-sm font-medium">{facility}</span>
    </div>
  ))}
</div>

      {/* Description */}
      <h2 className="text-xl font-semibold mt-4"></h2>
      <p className="text-md">{hotel.description}</p>

      {/* Room Type & Price */}
      <div className="mt-4">
        <p className="text-lg"><strong>Room Type:</strong> {hotel.room_type}</p>
        <p className="text-lg"><strong>Price per night:</strong> ${hotel.price_per_night}</p>
      </div>
     

      {/* Book Now Button */}
      <button className="mt-4 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg"
        onClick={() => navigate("/book", { state: { hotel, startDate, endDate, guests } })}>Book Now</button>
    </div>
  );
};

export default HotelDetails;
