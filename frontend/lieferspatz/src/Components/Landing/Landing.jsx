import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="d-flex flex-column">
        <Link className="btn btn-primary mb-2" to="/login">
          Login
        </Link>

        <Link to="/signup" className="btn btn-secondary">
          Sign Up
        </Link>
      </div>
    </div>
  );
}
