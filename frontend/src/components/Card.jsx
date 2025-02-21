import React from "react";

const Card = ({ title, image }) => {
  return (
    
    <div className="bg-white rounded-lg shadow-md overflow-hidden ">
      <img src={image} alt={title} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="text-sm sm:text-xl font-medium text-gray-800 text-center">{title}</h3>
      </div>
    </div>
  
  );
};
export default Card;