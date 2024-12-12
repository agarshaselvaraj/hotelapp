import React from "react";

const Testimonial = () => {
  const reviews = [
    {
      name: "Alice Johnson",
      review:
        "The booking process was incredibly easy, and the hotel staff went above and beyond to ensure our stay was perfect. I can't wait to book my next vacation through this platform!",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
      name: "Michael Lee",
      review:
        "The options provided were fantastic, and the location of the hotel was exactly as described. The customer service team was also very responsive to all my queries.",
      rating: 4,
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Sara Kim",
      review:
        "This platform made my trip planning stress-free. The recommendations were spot-on, and the exclusive discounts were a huge plus. Highly recommend to all travelers!",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/47.jpg",
    },
  ];

  return (
    <div className="bg-gray-100 py-12 px-6">
      <h2 className="text-3xl font-bold text-center mb-8">What Our Customers Say</h2>
      <div className="max-w-6xl mx-auto flex flex-nowrap overflow-x-auto space-x-8">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="bg-white shadow-md p-6 rounded-lg flex flex-col items-center text-center min-w-[250px]"
          >
            <img
              src={review.image}
              alt={review.name}
              className="w-20 h-20 rounded-full mb-4"
            />
            <h3 className="text-lg font-semibold mb-2">{review.name}</h3>
            <p className="text-gray-500 mb-4 text-sm">{review.review}</p>
            <p className="text-yellow-500 mb-2 text-sm">
              {"★".repeat(review.rating)}{" "}
              {"☆".repeat(5 - review.rating)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;

