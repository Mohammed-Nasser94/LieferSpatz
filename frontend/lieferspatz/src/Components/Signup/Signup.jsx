import React from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <h2 className="mb-4">Sign Up</h2>
        <div className="d-grid gap-3">
          <Link to="/signupcustomer" className="btn btn-primary btn-lg">
            Sign Up as Customer
          </Link>

          <Link to="/signupowner" className="btn btn-secondary btn-lg">
            Sign Up as Restaurant Owner
          </Link>
        </div>
      </div>
    </div>
  );
}
