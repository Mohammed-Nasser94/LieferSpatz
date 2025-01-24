import React, { useState } from "react";

export default function SignupCustomer() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    address: "",
    zip_code: "",
    password: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/customer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Customer registered successfully!");
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while registering. Please try again.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">Customer Sign Up</h2>
        <form onSubmit={handleSubmit}>
          {/* First Name */}
          <div className="mb-3">
            <label htmlFor="first_name" className="form-label">
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              id="first_name"
              placeholder="Enter your first name"
              value={formData.first_name}
              onChange={handleChange}
            />
          </div>

          {/* Last Name */}
          <div className="mb-3">
            <label htmlFor="last_name" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              id="last_name"
              placeholder="Enter your last name"
              value={formData.last_name}
              onChange={handleChange}
            />
          </div>

          {/* Address */}
          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="address"
              placeholder="Enter your address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          {/* Zip Code */}
          <div className="mb-3">
            <label htmlFor="zip_code" className="form-label">
              Zip Code
            </label>
            <input
              type="text"
              className="form-control"
              id="zip_code"
              placeholder="Enter your zip code"
              value={formData.zip_code}
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-100">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
