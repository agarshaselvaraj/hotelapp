import React, { useState } from "react";
import Banner from "../components/Banner";

const HotelForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    address: "",
    rating: "",
    price_per_night: "",
    room_type: "",
    amenities: [],
    description: "",
    images: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleArrayChange = (name, value) => {
    setFormData({ ...formData, [name]: value.split(",") });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    // Check if total number of images (already uploaded + newly uploaded) exceeds 3
    if (formData.images.length + files.length > 3) {
      alert("You can only upload a total of up to 3 images.");
      return;
    }

    // Add the new files to the images array
    setFormData({ ...formData, images: [...formData.images, ...files] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare FormData object
    const formDataObj = new FormData();
    for (const [key, value] of Object.entries(formData)) {
      if (Array.isArray(value)) {
        // Convert array into a string to send with FormData
        formDataObj.append(key, value.join(","));
      } else {
        formDataObj.append(key, value);
      }
    }

    // Append images to FormData
    formData.images.forEach((file) => {
      formDataObj.append("images", file);
    });

    try {
      const response = await fetch("http://localhost:5000/api/hotels", {
        method: "POST",
        body: formDataObj, // Send formData directly (no need to set Content-Type)
      });

      if (response.ok) {
        alert("Hotel details uploaded successfully!");
      } else {
        alert("Failed to upload hotel details.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Banner />
      <div className="pt-16">
        <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow-md">
          <h1 className="text-2xl font-bold mb-6">Add Hotel Details</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Hotel Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none"
                required
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Rating</label>
              <input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none"
                step="0.5"
                min="0"
                max="5"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Price Per Night</label>
              <input
                type="number"
                name="price_per_night"
                value={formData.price_per_night}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Room Type</label>
              <input
                type="text"
                name="room_type"
                value={formData.room_type}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none"
                placeholder="e.g., Single, Double, Suite"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Amenities</label>
              <input
                type="text"
                name="amenities"
                value={formData.amenities.join(",")}
                onChange={(e) => handleArrayChange("amenities", e.target.value)}
                className="w-full px-3 py-2 border rounded focus:outline-none"
                placeholder="Separate with commas (e.g., Wi-Fi, Breakfast)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Images</label>
              <input
                type="file"
                multiple
                onChange={handleImageUpload}
                className="w-full px-3 py-2 border rounded focus:outline-none"
              />
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  {`You have uploaded ${formData.images.length}/3 images.`}
                </p>
                <div className="flex space-x-2 mt-2">
                  {formData.images.map((image, index) => (
                    <img
                      key={index}
                      src={URL.createObjectURL(image)} // Use object URLs for image previews
                      alt={`Preview ${index}`}
                      className="w-24 h-24 object-cover rounded mr-2"
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="grid place-items-center">
              <button
                type="submit"
                className="w-1/3 bg-blue-500 text-white py-2 rounded text-center justify-center hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default HotelForm;
