import React from "react";
import Card from "./Card";
import keralaImage from '../assets/kerala.jpg';
import kashmirImage from '../assets/kashmir.jpg';
import goaImage from '../assets/goa.jpg';
import bangaloreImage from '../assets/bangalore.jpg';

const destinations = [
    { id: 1, title: "Kerala", image: keralaImage },
    { id: 2, title: "Kashmir", image: kashmirImage },
    { id: 3, title: "Goa", image: goaImage },
    { id: 4, title: "Bangalore", image: bangaloreImage },
];

const PopularDestinations = () => {
  return (
    <section className="py-8 px-4 mx-12 bg-gray-50">
      <h2 className="text-2xl font-bold text-left mb-6">Popular Destinations</h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {destinations.map((destination) => (
          <div
            key={destination.id}
            className="transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:opacity-90"
          >
            <Card key={destination.id} title={destination.title} image={destination.image} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularDestinations;

