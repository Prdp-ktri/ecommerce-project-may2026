import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function NewOrders() {
  const [orders, setOrders] = useState([]);
  const [sellerName, setSellerName] = useState("");

  useEffect(() => {
    // ✅ Get logged-in seller info
    const loggedInSeller = JSON.parse(localStorage.getItem("loggedInSeller"));
    if (!loggedInSeller) {
      toast.error("Please log in as a seller first!");
      return;
    }

    setSellerName(loggedInSeller.storeName);

    // ✅ Load seller-specific orders
    const sellerOrders = JSON.parse(localStorage.getItem("sellerOrders")) || {};
    const myOrders = sellerOrders[loggedInSeller.storeName] || [];
    setOrders(myOrders);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-teal-700 mb-4">
        New Orders for {sellerName}
      </h2>

      {orders.length === 0 ? (
        <p className="text-gray-500">No new orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm"
            >
              <p className="font-semibold">Order ID: {order.orderId}</p>
              <p>Buyer: {order.buyerName}</p>
              <p>
                Address: {order.address}, {order.state} - {order.pin}
              </p>
              <p>Total: ₹{order.totalCost}</p>
              <p>Payment: {order.paymentMethod}</p>
              <p>Status: {order.status}</p>
              <p className="text-sm text-gray-500">
                Placed on: {order.placedAt}
              </p>

              <div className="mt-3">
                <p className="font-medium">Items:</p>
                <ul className="list-disc ml-6">
                  {order.items.map((item, idx) => (
                    <li key={idx}>
                      {item.name} × {item.quantity} — ₹{item.price}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NewOrders;
