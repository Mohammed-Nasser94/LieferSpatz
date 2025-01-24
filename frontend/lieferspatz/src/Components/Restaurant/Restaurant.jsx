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
    },
    {
      id: 2,
      name: "Item 2",
      description: "Tasty item 2",
      price: 12,
      quantity: 0,
    },
    {
      id: 3,
      name: "Item 3",
      description: "Savory item 3",
      price: 15,
      quantity: 0,
    },
    {
      id: 4,
      name: "Item 4",
      description: "Mouthwatering item 4",
      price: 8,
      quantity: 0,
    },
    {
      id: 5,
      name: "Item 5",
      description: "Juicy item 5",
      price: 18,
      quantity: 0,
    },
    {
      id: 6,
      name: "Item 6",
      description: "Crispy item 6",
      price: 20,
      quantity: 0,
    },
    {
      id: 7,
      name: "Item 7",
      description: "Fresh item 7",
      price: 25,
      quantity: 0,
    },
    {
      id: 8,
      name: "Item 8",
      description: "Hearty item 8",
      price: 30,
      quantity: 0,
    },
    {
      id: 9,
      name: "Item 9",
      description: "Spicy item 9",
      price: 14,
      quantity: 0,
    },
    {
      id: 10,
      name: "Item 10",
      description: "Tangy item 10",
      price: 16,
      quantity: 0,
    },
    {
      id: 11,
      name: "Item 11",
      description: "Sweet item 11",
      price: 22,
      quantity: 0,
    },
    {
      id: 12,
      name: "Item 12",
      description: "Flaky item 12",
      price: 28,
      quantity: 0,
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
      <h4 className="mb-4">Restaurant {parseInt(id) + 1}</h4>

      {/* Grid layout for items */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
        {items.map((item, index) => (
          <div key={item.id} className="col">
            <div className="card h-100 shadow-sm">
              <img
                src={
                  item.image && item.image.trim() !== ""
                    ? item.image
                    : "/imgs/5672638.png"
                }
                alt={item.name}
                className="card-img-top"
                style={{ height: "150px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text text-muted">{item.description}</p>
                <p className="card-text fw-bold">${item.price.toFixed(2)}</p>
              </div>
              <div className="card-footer d-flex justify-content-between align-items-center">
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
