import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Restaurant = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [items, setItems] = useState([
    {
      id: 1,
      name: "Item 1",
      description: "Delicious item 1",
      price: 10,
      quantity: 0,
      image: "https://via.placeholder.com/100",
    },
    {
      id: 2,
      name: "Item 2",
      description: "Tasty item 2",
      price: 12,
      quantity: 0,
      image: "https://via.placeholder.com/100",
    },
  ]);

  const handleIncrement = (index) => {
    setItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (index) => {
    setItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index && item.quantity > 0
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const selectedItems = items.filter((item) => item.quantity > 0);

  const handleSubmitOrder = () => {
    navigate("/order", { state: { selectedItems } });
  };

  return (
    <div className="container mt-5">
      <h4>Restaurant {parseInt(id) + 1}</h4>
      <div className="list-group mt-3">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div className="d-flex">
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
                disabled={item.quantity === 0}
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
      <div className="mt-4 text-end">
        <button
          className="btn btn-primary"
          onClick={handleSubmitOrder}
          disabled={selectedItems.length === 0}
        >
          Submit Order
        </button>
      </div>
    </div>
  );
};

export default Restaurant;
