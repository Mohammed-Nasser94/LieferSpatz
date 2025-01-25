import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundColor: "white",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        className="d-flex flex-column align-items-center"
        style={{ position: "relative", zIndex: 1 }}
      >
        {/* Logo with Larger Width, Full Coverage, and Hover Effect */}
        <div
          style={{
            width: "300px", // Increased width for full visibility
            height: "300px", // Matching height for square
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "20px",
            borderRadius: "16px", // Slightly rounded corners
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Subtle shadow
            transition: "transform 0.3s ease, box-shadow 0.3s ease", // Smooth hover animation
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)"; // Zoom in slightly
            e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.3)"; // Enhance shadow
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)"; // Reset zoom
            e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)"; // Reset shadow
          }}
        >
          <img
            src="/imgs/logo.jpeg"
            alt="Logo"
            style={{
              width: "100%", // Full width of the container
              height: "100%", // Full height of the container
              objectFit: "contain", // Ensure full image is visible
            }}
          />
        </div>

        {/* Welcome message */}
        <h1
          className="mb-4"
          style={{ fontSize: "2rem", fontWeight: "bold", color: "#343a40" }}
        >
          Welcome to Lieferspatz
        </h1>

        {/* Login Button */}
        <Link
          className="btn btn-primary mb-3"
          to="/login"
          style={{
            fontSize: "1.25rem",
            padding: "0.75rem 2rem",
            borderRadius: "8px",
            transition: "background-color 0.3s ease, transform 0.2s ease",
            width: "200px",
            textAlign: "center",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#007bff")}
        >
          Login
        </Link>

        {/* Sign Up Button */}
        <Link
          to="/signup"
          className="btn btn-secondary"
          style={{
            fontSize: "1.25rem",
            padding: "0.75rem 2rem",
            borderRadius: "8px",
            transition: "background-color 0.3s ease, transform 0.2s ease",
            width: "200px",
            textAlign: "center",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#545b62")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#6c757d")}
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
