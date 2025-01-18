import React from "react";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        {/* Brand Name */}
        <Link className="navbar-brand" to="home">
          LieferSpatz
        </Link>

        {/* Flexbox to Align Items on the Right */}
        <div className="d-flex justify-content-end w-100">
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className="nav-link active me-3"
                aria-current="page"
                to="contactus"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
