import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const Order = () => {
  const location = useLocation();

  // Retrieve cart from state or default to an empty array
  const [cart, setCart] = useState(location.state?.selectedItems || []);
  const [instructions, setInstructions] = useState("");

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleRemove = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cart,
          instructions: instructions,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Order submitted successfully!");
        setCart([]);
        setInstructions("");
      } else {
        alert(`Error: ${result.message || "Failed to submit order"}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting your order.");
    }
  };

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Your Cart</h2>

      {cart.length > 0 ? (
        <>
          <div className="list-group mb-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <h5>{item.name}</h5>
                  <p>
                    ${item.price.toFixed(2)} x {item.quantity}
                  </p>
                </div>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleRemove(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mb-4">
            <h4>Total: ${calculateTotal().toFixed(2)}</h4>
          </div>

          <div className="mb-4">
            <label htmlFor="instructions" className="form-label">
              Special Instructions
            </label>
            <textarea
              id="instructions"
              className="form-control"
              rows="3"
              placeholder="Add any special instructions for the restaurant"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
            ></textarea>
          </div>

          <button className="btn btn-primary w-100" onClick={handleSubmit}>
            Submit Order
          </button>
        </>
      ) : (
        <h4 className="text-center text-muted">Your cart is empty!</h4>
      )}
    </div>
  );
};

export default Order;
