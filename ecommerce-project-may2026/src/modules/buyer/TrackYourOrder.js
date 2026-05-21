import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function TrackYourOrder() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const allOrders = JSON.parse(localStorage.getItem("buyerOrders")) || [];
    const foundOrder = allOrders.find((o) => o.orderId === orderId);
    if (!foundOrder) {
      toast.warn("Order not found!");
      navigate("/");
      return;
    }

    setOrder(foundOrder);
    setStatus(foundOrder.status);

    // 🆕 Simulate delivery updates
    const deliveryStages = [
      "Order Placed",
      "Packed by Seller",
      "Shipped",
      "Out for Delivery",
      "Delivered",
    ];
    let index = deliveryStages.indexOf(foundOrder.status);
    const interval = setInterval(() => {
      index++;
      if (index < deliveryStages.length) {
        setStatus(deliveryStages[index]);
      } else {
        clearInterval(interval);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [orderId, navigate]);

  if (!order) return null;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-teal-700 mb-8 text-center">
        Track Your Order
      </h1>

      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6 border-t-4 border-teal-500">
        <p className="text-gray-700 text-lg">
          <span className="font-semibold">Order ID:</span> {order.orderId}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Placed On:</span> {order.placedAt}
        </p>

        <div className="mt-4 p-4 bg-teal-50 border border-teal-200 rounded-lg">
          <h2 className="text-lg font-semibold text-teal-700 mb-2">
            Delivery Details
          </h2>
          <p>{order.buyerName}</p>
          <p>{order.address}</p>
          <p>
            {order.state}, {order.pin}
          </p>
          <p>
            <strong>Payment:</strong> {order.paymentMethod}
          </p>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold text-orange-600 mb-2">
            Order Status:
          </h2>
          <div className="flex items-center space-x-3">
            <div
              className={`h-4 w-4 rounded-full ${
                status === "Delivered"
                  ? "bg-green-500"
                  : "bg-yellow-400 animate-pulse"
              }`}
            ></div>
            <span className="font-medium text-gray-800 text-lg">{status}</span>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Ordered Items:
          </h2>
          <ul className="divide-y">
            {order.items.map((item, idx) => (
              <li key={idx} className="py-2 flex justify-between text-gray-700">
                <span>{item.name}</span>
                <span>
                  {item.quantity} × ₹{item.price}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 flex justify-between items-center border-t pt-4">
          <span className="text-xl font-bold text-gray-800">
            Total: ₹{order.totalCost.toFixed(2)}
          </span>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default TrackYourOrder;
