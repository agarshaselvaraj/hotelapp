import React from "react";
import goa1 from "../assets/goa1.webp";
import goa3 from "../assets/goa3.jpg";
import goa2 from "../assets/goa1.jpg";
import manali1 from "../assets/manali.jpg";
import manali2 from "../assets/manali3.webp";
import manali3 from "../assets/manali2.jpg";
import resort1 from "../assets/resortt.jpg";
import resort2 from "../assets/resort3.jpg";
import resort3 from "../assets/resort.jpg";

const Trending = () => {
  const destinations = [
    {
      title: "Best Hotels in Goa",
      images: [goa1, goa2, goa3],
    },
    {
      title: "Hill View Hotels in Manali",
      images: [manali1, manali2, manali3],
    },
    {
      title: "Luxury Resorts in Mumbai",
      images: [resort1, resort2, resort3],
    },
  ];

  return (
    <div className="p-6 bg-[#F5F5F5]">
      <h2 className="text-xl md:text-2xl font-semibold mb-8 text-left">
        Trending Getaways
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {destinations.map((destination, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center transform transition-all duration-500 hover:translate-y-[-10px] hover:shadow-2xl hover:bg-gradient-to-r hover:from-indigo-400 hover:to-pink-400 hover:scale-105"
          >
            <div className="grid grid-cols-3 gap-2 mb-4">
              {destination.images.map((image, idx) => (
                <img
                  key={idx}
                  src={image}
                  alt={`${destination.title} ${idx + 1}`}
                  className="w-full h-24 object-cover rounded-lg transform transition-transform duration-500 hover:blur-sm hover:scale-105"
                />
              ))}
            </div>
            <h3 className="text-lg font-medium text-center text-black transition-all duration-500 transform hover:translate-x-4 hover:text-white">
              {destination.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trending;

