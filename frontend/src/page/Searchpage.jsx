import React, { useState, useEffect } from "react";
import Banner from "../components/Banner";
import Search from "../components/Search";
import { useLocation } from "react-router-dom";
import { Slider } from "@mui/material";
import { useNavigate } from "react-router-dom"; 


const Searchpage = () => {
  const navigate = useNavigate(); 
  const location = useLocation();
  const state = location.state || {};
  const [city, setCity] = useState(state.city || ""); 
  const [startDate, setStartDate] = useState(state.startDate || "");
  const [endDate, setEndDate] = useState(state.endDate || "");
  const [guests, setGuests] = useState(state.guests || 1);
  const [showFilters, setShowFilters] = useState(false); // Mobile filter toggle
  const [price_per_night, setprice] = useState(500); // Budget filter
  const [hotels, setHotels] = useState([]); // Hotel data
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    parking: false,
    petfriendly: false,
    kitchen: false,
    airconditioner: false,
    meals: false,
    Wifi: false,
    TV: false,
    "swimming pool": false,
    "washing machine": false,
    balcony: false,
    oneStar: false,
    twoStar: false,
    threeStar: false,
    fourStar: false,
    fiveStar: false
  });
   // Error state
  console.log("Fetching hotels for:", city);
  
  console.log("City:", city);
  console.log("Start Date:", startDate);
  console.log("End Date:", endDate);
  // Fetch hotels based on location and budget
  const fetchHotels = async (city) => {
    
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:5000/api/hotelsearch?city=${city}&page=1&limit=10`
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
  const ratingMapping = {
    "onestar": 1.00,
    "twostar": 2.00,
    "threestar": 3.00,
    "fourstar": 4.00,
    "fivestar": 5.00,
  };const fetchHotelsWithFilters = async (city, filters) => {
      try {
        setLoading(true);
        // Extract amenities from filters
    const selectedFilters = Object.keys(filters).filter(
      (key) =>
        filters[key] &&
        !key.startsWith("rating_") // Exclude ratings
    );
    const payload = {
      city,
      page: 1,
      limit: 10,
      price_per_night,
      amenities: selectedFilters, // Send filters as an array
    };

    console.log("Fetching with filters:", payload);
        let filterParams = `?city=${city}&page=1&limit=10&price_per_night=${price_per_night}`;
    
        // Add selected filter options to the query string
        for (const filter in filters) {
          if (filters[filter]) {
            if (filter.startsWith('rating_')) {
              // For rating filters, extract the numeric value
              const ratingValue = filter.split('_')[1]; // e.g., '1', '2', etc.
              filterParams += `&rating=${ratingValue}`;
            } 
          }
        }
        if (selectedFilters.length > 0) {
          selectedFilters.forEach(amenity => {
            filterParams += `&amenities[]=${amenity}`;  // This sends amenities as an array
          });
        }
    
        console.log("Fetching with filters:", filterParams); // Debugging filter params
    
        const response = await fetch(`http://localhost:5000/api/hotelfilter${filterParams}`);
         // Check what the response looks like
         // Manually parse if it's valid JSON
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
    

     
      
  // Handle search submit from Search component
  // Function to handle the search
 
  const handleSearch = (searchLocation) => {
    setcity(searchLocation); // Update city state
    fetchHotels(searchLocation); // Fetch hotels immediately after setting location
  };
  const updateFilter = (id, checked) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [id]: checked,
    }));
  };
  const handleFilterChange = (e) => {
    const { id, checked } = e.target;
    const rating = ratingMapping[id.toLowerCase()];

    if (rating) {
      // If it's a rating checkbox, map to its numeric value
      updateFilter(`rating_${rating}`, checked);
    } else {
      // Otherwise, apply the filter normally
      updateFilter(id, checked);
    }
};

  


  // Effect to fetch hotels whenever the city changes
  useEffect(() => {
    if (city) fetchHotels(city);
  }, [city]);
 
  const handleShowResults = () => {
    fetchHotelsWithFilters(city, filters);
  };

  return (
    <>
      
      <div className="flex flex-col lg:flex-row pt-16">
     
      <Banner/>
     
        {/* Filters - Visible on the left for desktop, toggled for mobile */}
        <div className="lg:hidden bg-white shadow-lg p-4 rounded-xl">
    <button
      className="bg-blue-500 text-white py-1 px-2 rounded mb-4"
      onClick={() => setShowFilters(!showFilters)} // Toggle filter visibility
    >
      {showFilters ? "Hide Filters" : "Show Filters"}
    </button>
  </div>
  <div className={`lg:block ${showFilters ? '' : 'hidden'} sm:hidden bg-gray-100 p-4 lg:w-1/5`}>
  <div className="mb-5">
        <h3 className="font-semibold">Budget (per night)</h3>
        <div className="flex justify-between text-sm text-gray-600">
          <span>₹{price_per_night[0]}</span>
          <span>₹{price_per_night[1]}+</span>
        </div>
        <Slider
          value={price_per_night}
          onChange={(e) => setprice(e.target.value)}
          min={500}
          max={6000}
          valueLabelDisplay="auto"
        />
      </div>
          <div>
            <h2 className="font-bold">Facilities</h2>
            {/* Add your checkboxes for filters here */}
            
              <label className="flex items-center space-x-2 cursor-pointer">
  <input type="checkbox"id="parking"  checked={filters.parking}onChange={handleFilterChange} className="w-4 h-4 accent-blue-600 " />
  <span className="text-sm text-gray-700">Parking</span>
</label>
              <label className="flex items-center space-x-2 cursor-pointer">
  <input type="checkbox" id="petfriendly"checked={filters.petfriendly} onChange={handleFilterChange}className="w-4 h-4 accent-blue-600" />
  <span className="text-sm text-gray-700">Pet Friendly</span>
</label>
<label className="flex items-center space-x-2 cursor-pointer">
  <input type="checkbox" id="kitchen"checked={filters.kitchen}onChange={handleFilterChange} className="w-4 h-4 accent-blue-600" />
  <span className="text-sm text-gray-700">Kitchen</span>
</label>
<label className="flex items-center space-x-2 cursor-pointer">
  <input type="checkbox"id="airconditioner"checked={filters.airconditioner}onChange={handleFilterChange} className="w-4 h-4 accent-blue-600" />
  <span className="text-sm text-gray-700">Air Conditioning</span>
</label>   
<label className="flex items-center space-x-2 cursor-pointer">
  <input type="checkbox"id="meals"checked={filters.meals}onChange={handleFilterChange}className="w-4 h-4 accent-blue-600" />
  <span className="text-sm text-gray-700">All Meals</span>
</label> 
<label className="flex items-center space-x-2 cursor-pointer">
  <input type="checkbox"id="Wifi" checked={filters.Wifi}onChange={handleFilterChange}className="w-4 h-4 accent-blue-600" />
  <span className="text-sm text-gray-700">Free Wifi</span>
</label> 
<label className="flex items-center space-x-2 cursor-pointer">
  <input type="checkbox" id="TV"checked={filters.TV}onChange={handleFilterChange}className="w-4 h-4 accent-blue-600" />
  <span className="text-sm text-gray-700">TV</span>
</label> 
<label className="flex items-center space-x-2 cursor-pointer">
  <input type="checkbox" id="swimming pool"checked={filters["swimming pool"]}onChange={handleFilterChange}className="w-4 h-4 accent-blue-600" />
  <span className="text-sm text-gray-700">Swimming pool</span>
</label>       
<label className="flex items-center space-x-2 cursor-pointer">
  <input type="checkbox" id="washing machine"checked={filters["washing machine"]}onChange={handleFilterChange}className="w-4 h-4 accent-blue-600" />
  <span className="text-sm text-gray-700">Washing machine</span>
</label>         
<label className="flex items-center space-x-2 cursor-pointer">
  <input type="checkbox" id="washing machine"checked={filters["washing machine"]}onChange={handleFilterChange}className="w-4 h-4 accent-blue-600" />
  <span className="text-sm text-gray-700">Washing machine</span>
</label>  
<label className="flex items-center space-x-2 cursor-pointer">
  <input type="checkbox"  id="balcony"checked={filters.balcony} onChange={handleFilterChange}className="w-4 h-4 accent-blue-600" />
  <span className="text-sm text-gray-700">balcony</span>
</label>        
            </div>
            <div>
              <h2 className="pt-3 font-bold">Property Rating</h2>
              <div>
                <input type="checkbox" id="onestar" onChange={handleFilterChange} className='w-4 h-4 accent-blue-600'/>
                <label htmlFor="onestar"className="ml-2 cursor-pointer text-gray-700">1 Star</label>
              </div>
              <div>
                <input type="checkbox" id="twostar"onChange={handleFilterChange} className="w-4 h-4 accent-blue-600" />
                <label htmlFor="twostar"className="ml-2 cursor-pointer text-gray-700">2 Star</label>
              </div>
              <div>
                <input type="checkbox" id="threestar"onChange={handleFilterChange} className="w-4 h-4 accent-blue-600" />
                <label htmlFor="threestar"className="ml-2 cursor-pointer text-gray-700">3 Star</label>
              </div>
              <div>
                <input type="checkbox" id="fourstar"onChange={handleFilterChange}className="w-4 h-4 accent-blue-600" />
                <label htmlFor="fourstar"className="ml-2 cursor-pointer text-gray-700">4 Star</label>
              </div>
              <div>
                <input type="checkbox" id="fivestar"onChange={handleFilterChange} className="w-4 h-4 accent-blue-600 "/>
                <label htmlFor="fivestar"className="ml-2 cursor-pointer text-gray-700">5 Star</label>
              </div>
          </div>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-1 px-3 text-sm rounded w-full"
            onClick={handleShowResults}// Trigger fetch with filters
          >
            Show Results
          </button>
        </div>

        {/* Main Search Section */}
        <div className="flex-1 p-8 md:p-6">
        
          <Search
          city={city}
          startDate={startDate}
          endDate={endDate}
          guests={guests}
          onSearch={handleSearch} // Pass handleSearch to Search component
          setCity={setCity}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          setGuests={setGuests}
        />{/* Pass handleSearch to Search component */}
          {loading && <p>Loading hotels...</p>}
          {error && <p className="text-red-500">{error}</p>}
       
          <div className="grid grid-cols-1  gap-6 mt-6">
            {hotels.map((hotel) => (
               <div
               key={hotel.id}
               className="bg-white shadow-md rounded-lg flex flex-col md:flex-row h-auto  md:h-[250px] w-full max-w-3xl mx-auto "
             >
               {/* Image Section */}
               <div className=" w-full md:w-1/3">
                 <img
                   src={hotel.image || "https://via.placeholder.com/150"}
                   alt={hotel.name}
                   className="w-full h-48 md:h-60 object-cover text-3xl rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
                 />
               </div>
       
               {/* Content Section */}
               <div className="md:w-2/3 p-4 flex flex-col h-full">
                 <h2 className="text-lg md:text-xl font-bold">{hotel.name}</h2>
                 <p className="text-sm text-gray-600 mt-2 line-clamp-2">{hotel.description}</p>
                 <p className="text-sm text-yellow-500 mt-2">
                 ⭐Rating: {hotel.rating || "N/A"}
                 </p>
                 <div className="flex justify-between items-start mt-4">
  {/* Left side: Amenities list in a column */}
  <div className="flex flex-col space-y-1">
    {hotel.amenities.map((amenity, index) => (
      <span key={index} className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm flex items-center">
        ✅ {amenity}
      </span>
    ))}
  </div>
  
  {/* Right side: Button aligned at the bottom-right */}
  <div className="mt-auto flex items-end">
    <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium  
    py-2 px-4 rounded-lg transition duration-300"
    onClick={() => {
      console.log("Navigating to Viewhotel with ID:", hotel.hotel_id);
      navigate(`/Viewhotel/${hotel.hotel_id}`, {
        state: {
          startDate,
          endDate,
          guests,
        },});
    }}>
      View Details
    </button>
  </div>
</div>

 
          
                 </div>
                 </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default Searchpage