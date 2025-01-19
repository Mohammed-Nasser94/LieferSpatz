import React, { useState } from "react";
import { useParams } from "react-router-dom";

const Restaurant = () => {
  const { id } = useParams();

  // Items with placeholder images and initial quantity
  const [items, setItems] = useState([
    {
      name: "Item 1",
      description: "Delicious item 1",
      price: 10,
      quantity: 0,
      image: "https://via.placeholder.com/100", // Placeholder image
    },
    {
      name: "Item 2",
      description: "Tasty item 2",
      price: 12,
      quantity: 0,
      image: "https://via.placeholder.com/100", // Placeholder image
    },
    {
      name: "Item 3",
      description: "Yummy item 3",
      price: 8,
      quantity: 0,
      image: "https://via.placeholder.com/100", // Placeholder image
    },
    {
      name: "Item 4",
      description: "Savory item 4",
      price: 15,
      quantity: 0,
      image: "https://via.placeholder.com/100", // Placeholder image
    },
    {
      name: "Item 5",
      description: "Flavorful item 5",
      price: 9,
      quantity: 0,
      image: "https://via.placeholder.com/100", // Placeholder image
    },
    {
      name: "Item 6",
      description: "Mouth-watering item 6",
      price: 14,
      quantity: 0,
      image: "https://via.placeholder.com/100", // Placeholder image
    },
    {
      name: "Item 7",
      description: "Appetizing item 7",
      price: 11,
      quantity: 0,
      image: "https://via.placeholder.com/100", // Placeholder image
    },
    {
      name: "Item 8",
      description: "Delightful item 8",
      price: 13,
      quantity: 0,
      image: "https://via.placeholder.com/100", // Placeholder image
    },
  ]);

  // Function to handle increment
  const handleIncrement = (index) => {
    setItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Function to handle decrement
  const handleDecrement = (index) => {
    setItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index && item.quantity > 0
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  return (
    <div className="container mt-5">
      <h4>Restaurant {parseInt(id) + 1}</h4>
      <div className="list-group mt-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div className="d-flex">
              {/* Item Image */}
              <img
                src={item.image}
                alt={item.name}
                className="me-3 rounded"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
              <div>
                <h6 className="mb-1">{item.name}</h6>
                <p className="mb-1 text-muted">{item.description}</p>
                <small className="text-muted">${item.price.toFixed(2)}</small>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <button
                className="btn btn-outline-secondary btn-sm me-2"
                onClick={() => handleDecrement(index)}
                disabled={items[index].quantity === 0}
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                className="btn btn-outline-secondary btn-sm ms-2"
                onClick={() => handleIncrement(index)}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Restaurant;
