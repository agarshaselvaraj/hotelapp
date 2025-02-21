import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";


const Signin = () => {
  const { login } = useContext(AuthContext); // Access login function
  const navigate = useNavigate();

  // State for form data, success, and error messages
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data Before Sending:", formData); // Debugging Step


    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Login response:", data); 

      if (response.ok) {
        setSuccess("Sign in successful!");
        setError("");
        login(data.token); // Call AuthContext login with the token
        navigate("/"); // Redirect to the home page
      } else {
        setError(data.message || "Invalid credentials!");
      }
    } catch (err) {
      setError("An error occurred while signing in.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        className="bg-white p-8 rounded-lg shadow-md w-96"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">
          <span className="flex items-center gap-2">
    <AiOutlineMail className="text-gray-500 text-lg" />
    Email
  </span>
          </label>
        
          
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            required
          />
        
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="password">
          <span className="flex items-center gap-2">
    <AiOutlineLock className="text-gray-500 text-lg" />
    Password
  </span>
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Sign In
        </button>

        <p className="text-gray-600 text-sm mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/create-account" className="text-blue-500 hover:underline">
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signin;
