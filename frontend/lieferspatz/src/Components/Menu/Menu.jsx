import React, { useState } from "react";
import { useParams } from "react-router-dom";

export default function Menu() {
  const { restaurantId } = useParams(); // Extract restaurantId from the URL

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: null, // For the image file
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      image: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("description", formData.description);
      if (formData.image) {
        formDataToSend.append("image", formData.image); // Attach image file
      }

      const response = await fetch(
        `http://127.0.0.1:5000/restaurant/${restaurantId}/menu`,
        {
          method: "POST",
          body: formDataToSend, // Use FormData to send multipart/form-data
        }
      );

      const result = await response.json();
      if (response.ok) {
        alert("Menu item added successfully!");
        setFormData({ name: "", price: "", description: "", image: null }); // Reset form
        e.target.reset(); // Reset file input
      } else {
        alert(`Error: ${result.message || "Failed to add menu item"}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while adding the menu item. Please try again.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">Add Menu Item</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {/* Item Name */}
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Item Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter item name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Price */}
          <div className="mb-3">
            <label htmlFor="price" className="form-label">
              Price
            </label>
            <input
              type="number"
              className="form-control"
              id="price"
              placeholder="Enter item price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          {/* Description */}
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              rows="3"
              placeholder="Enter item description"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          {/* Image */}
          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Item Image
            </label>
            <input
              type="file"
              className="form-control"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-100">
            Add Item
          </button>
        </form>
      </div>
    </div>
  );
}
