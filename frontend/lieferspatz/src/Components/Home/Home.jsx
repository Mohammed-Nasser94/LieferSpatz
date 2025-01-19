import React from "react";

import { Link } from "react-router-dom";

const Home = () => {
  const restaurants = [
    {
      name: "Restaurant 1",
      distance: "2 km",
      rating: 4.5,
      logo: "https://via.placeholder.com/50",
    },
    {
      name: "Restaurant 2",
      distance: "2.5 km",
      rating: 4.0,
      logo: "https://via.placeholder.com/50",
    },
    {
      name: "Restaurant 3",
      distance: "2.7 km",
      rating: 4.2,
      logo: "https://via.placeholder.com/50",
    },
    {
      name: "Restaurant 4",
      distance: "3 km",
      rating: 4.8,
      logo: "https://via.placeholder.com/50",
    },
    {
      name: "Restaurant 5",
      distance: "3.2 km",
      rating: 4.1,
      logo: "https://via.placeholder.com/50",
    },
    {
      name: "Restaurant 6",
      distance: "3.5 km",
      rating: 4.3,
      logo: "https://via.placeholder.com/50",
    },
    {
      name: "Restaurant 7",
      distance: "3.8 km",
      rating: 4.0,
      logo: "https://via.placeholder.com/50",
    },
    {
      name: "Restaurant 8",
      distance: "4 km",
      rating: 4.7,
      logo: "https://via.placeholder.com/50",
    },
    {
      name: "Restaurant 9",
      distance: "4.2 km",
      rating: 4.4,
      logo: "https://via.placeholder.com/50",
    },
  ];

  return (
    <div className="container mt-5">
      <div className="text-center mb-3">
        <h5>Available Restaurants Nearby</h5>
      </div>

      <div className="list-group">
        {restaurants.map((restaurant, index) => (
          <div
            key={index}
            className="list-group-item d-flex align-items-center justify-content-between"
          >
            <div className="d-flex align-items-center">
              <img
                src={restaurant.logo}
                alt="Logo"
                className="rounded me-3"
                style={{ width: "50px", height: "50px" }}
              />
              <div>
                <h6 className="mb-0">
                  <Link
                    to={`/restaurant/${index}`}
                    className="text-decoration-none"
                  >
                    {restaurant.name}
                  </Link>
                </h6>
                <small>{restaurant.distance}</small>
              </div>
            </div>

            <div className="d-flex align-items-center">
              <span className="me-3 text-warning">
                {"★".repeat(Math.floor(restaurant.rating))}
                {restaurant.rating % 1 ? "☆" : ""}
              </span>
              <button className="btn btn-primary">Open</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
