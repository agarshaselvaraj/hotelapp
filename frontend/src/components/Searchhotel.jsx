import React, { useEffect, useState } from "react";

const HotelList = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/hotelsearch?city=Marthandam&page=1&limit=10"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch hotels");
        }
        const data = await response.json();
        setHotels(data.hotels);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  if (loading) return <p>Loading hotels...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {hotels.map((hotel) => (
        <div key={hotel.id} className="bg-white shadow-md rounded-lg p-4">
          <img
            src={hotel.image || "https://via.placeholder.com/150"}
            alt={hotel.name}
            className="w-full h-40 object-cover rounded-md"
          />
          <div className="mt-4">
            <h2 className="text-lg font-semibold">{hotel.name}</h2>
            <p className="text-sm text-gray-600">{hotel.description}</p>
            <p className="text-sm text-blue-500 mt-2">
              Rating: {hotel.rating || "N/A"}
            </p>
            <p className="text-sm text-gray-500">
              Amenities: {hotel.amenities.join(", ")}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HotelList;
