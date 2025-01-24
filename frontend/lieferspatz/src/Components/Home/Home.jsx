import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const defaultLogo =
    "https://thumbs.dreamstime.com/z/einfaches-restaurant-logo-design-template-restaurantlogodesign-139794464.jpg";

  const restaurants = [
    {
      name: "Restaurant 1",
      distance: "2 km",
      rating: 4.5,
      logo: "https://via.placeholder.com/150",
    },
    {
      name: "Restaurant 2",
      distance: "2.5 km",
      rating: 4.0,
      logo: "",
    },
    {
      name: "Restaurant 3",
      distance: "2.7 km",
      rating: 4.2,
      logo: "https://via.placeholder.com/150",
    },
    {
      name: "Restaurant 4",
      distance: "3 km",
      rating: 4.8,
      logo: "",
    },
    {
      name: "Restaurant 5",
      distance: "3.2 km",
      rating: 4.1,
      logo: "https://via.placeholder.com/150",
    },
    {
      name: "Restaurant 6",
      distance: "3.5 km",
      rating: 4.3,
      logo: "",
    },
    {
      name: "Restaurant 7",
      distance: "3.8 km",
      rating: 4.0,
      logo: "https://via.placeholder.com/150",
    },
    {
      name: "Restaurant 8",
      distance: "4 km",
      rating: 4.7,
      logo: "",
    },
    {
      name: "Restaurant 9",
      distance: "4.2 km",
      rating: 4.4,
      logo: "https://via.placeholder.com/150",
    },
  ];

  const handleImageError = (e) => {
    e.target.src = defaultLogo;
  };

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <h4 className="fw-bold">Available Restaurants Nearby</h4>
      </div>

      {/* Grid layout for restaurants */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
        {restaurants.map((restaurant, index) => (
          <div key={index} className="col">
            <div className="card shadow-sm h-100">
              <Link to={`/restaurant/${index}`}>
                <img
                  src={restaurant.logo || defaultLogo}
                  alt="Restaurant Logo"
                  className="card-img-top"
                  style={{ height: "150px", objectFit: "cover" }}
                  onError={handleImageError} // Dynamically replace broken images
                />
              </Link>
              <div className="card-body">
                <h5 className="card-title">
                  <Link
                    to={`/restaurant/${index}`}
                    className="text-decoration-none text-dark"
                  >
                    {restaurant.name}
                  </Link>
                </h5>
                <p className="card-text">
                  Distance:{" "}
                  <span className="fw-bold">{restaurant.distance}</span>
                </p>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-warning">
                    {"★".repeat(Math.floor(restaurant.rating))}
                    {restaurant.rating % 1 ? "☆" : ""}
                  </span>
                  <Link
                    to={`/restaurant/${index}`}
                    className="btn btn-primary btn-sm"
                  >
                    Visit
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
