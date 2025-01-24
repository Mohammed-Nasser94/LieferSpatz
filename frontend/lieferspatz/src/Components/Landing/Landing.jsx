import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="d-flex flex-column">
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
