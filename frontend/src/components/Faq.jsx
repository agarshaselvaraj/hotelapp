import React, { useState } from "react";

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const questions = [
    {
      question: "What is the check-in and check-out time?",
      answer: "Check-in time is from 2:00 PM and check-out time is until 11:00 AM.",
    },
    {
      question: "Is breakfast included in the room rates?",
      answer: "Yes, we offer complimentary breakfast with all room bookings.",
    },
    {
      question: "Can I cancel or modify my booking?",
      answer: "Yes, bookings can be canceled or modified up to 24 hours before the check-in date.",
    },
    {
      question: "Do you have free parking available?",
      answer: "Yes, we provide free parking for all our guests.",
    },
    {
      question: "Are pets allowed in the hotel?",
      answer: "Unfortunately, pets are not allowed in our hotel.",
    },
  ];

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-100 py-12 px-6">
      <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
      <div className="max-w-4xl mx-auto">
        {questions.map((item, index) => (
          <div key={index} className="mb-4">
            <div
              className="flex justify-between items-center bg-white shadow-md p-4 rounded-lg cursor-pointer"
              onClick={() => toggleAnswer(index)}
            >
              <h3 className="text-lg font-medium">{item.question}</h3>
              <span
                className={`transform transition-transform duration-300 ${
                  activeIndex === index ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </div>
            {activeIndex === index && (
              <div className="bg-gray-50 p-4 rounded-lg mt-2">
                <p className="text-gray-700">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
