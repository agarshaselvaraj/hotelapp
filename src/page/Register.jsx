import React, { useState } from "react";
import { Link } from 'react-router-dom'; 
const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    altPhone: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess("Registration successful!");
        setError("");
        setFormData({
          name: "",
          email: "",
          phone: "",
          password: "",
          address: "",
          altPhone: "",
        });
      } else {
        const data = await response.json();
        setError(data.message || "Registration failed!");
      }
    } catch (err) {
      setError("An error occurred while registering.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 px-4">
      <form
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md sm:max-w-lg"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}

        {/* Name Field */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="name">
            Your name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="First and last name"
            required
          />
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Mobile Number Field */}
        <div className="mb-4 sm:flex sm:gap-4">
          {/* Password Field */}
          <div className="flex-1 mb-4 sm:mb-0">
          <label className="block text-gray-700 mb-2" htmlFor="phone">
            Mobile number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="IN +91"
            required
          />
        </div>

        {/* Password and Address Field (Horizontal on Large Screens) */}
        <div className="flex-1">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="At least 6 characters"
              required
            />
          </div>
        </div>
          {/* Address Field */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="address">
              Address
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your address"
              rows="3"
              required
            ></textarea>
          
        </div>

        {/* Alternate Phone Number Field */}
      

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition duration-200"
        >
          Verify mobile number
        </button>

        {/* Additional Links */}
        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/signin" className="text-blue-500 hover:underline">
          <Link to="/sign-in"> Sign in</Link>
           
          </a>
        </div>
      </form>
    </div>
  );
};

export default Register;
