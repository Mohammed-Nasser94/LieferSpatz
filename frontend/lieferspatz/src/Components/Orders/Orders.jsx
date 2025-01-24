import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Orders() {
  const { customerId } = useParams(); // Extract customerId from the URL
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch orders for the customer
  const getOrders = async (customerId) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/customer/${customerId}/orders`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch orders");
      }

      // Sort orders: Ongoing orders first, then completed/canceled, sorted chronologically
      const sortedOrders = data.sort((a, b) => {
        if (a.status === "ongoing" && b.status !== "ongoing") return -1;
        if (a.status !== "ongoing" && b.status === "ongoing") return 1;
        return new Date(a.date) - new Date(b.date); // Sort by date chronologically
      });

      return sortedOrders;
    } catch (err) {
      throw new Error(err.message);
    }
  };

  // Effect to load orders when component mounts or customerId changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedOrders = await getOrders(customerId);
        setOrders(fetchedOrders);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [customerId]);

  if (loading) return <div>Loading orders...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Order History</h2>
      <div className="list-group">
        {orders.map((order) => (
          <div
            key={order.id}
            className={`list-group-item ${
              order.status === "ongoing"
                ? "list-group-item-warning"
                : order.status === "completed"
                ? "list-group-item-success"
                : "list-group-item-danger"
            }`}
          >
            <h5>Order #{order.id}</h5>
            <p>Date: {new Date(order.date).toLocaleString()}</p>
            <p>Status: {order.status}</p>
            <p>Total: ${order.total.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
