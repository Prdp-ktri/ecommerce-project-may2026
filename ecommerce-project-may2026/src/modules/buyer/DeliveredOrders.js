import React, { useEffect, useState } from "react";

function DeliveredOrders() {
  const [deliveredOrders, setDeliveredOrders] = useState([]);

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem("deliveredOrders")) || [];
    setDeliveredOrders(orders);
  }, []);

  if (deliveredOrders.length === 0) {
    return (
      <div className="p-8 text-center text-gray-600">
        <h2 className="text-2xl font-semibold">No Delivered Orders Yet</h2>
        <p className="mt-2">Delivered orders will appear here automatically.</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-green-700 mb-8 text-center">
        Delivered Orders
      </h1>

      <div className="flex flex-wrap gap-6 justify-center">
        {deliveredOrders.map((order) => (
          <div
            key={order.orderId}
            className="bg-white shadow-md rounded-xl p-4 border-l-4 border-green-500 w-full max-w-md"
          >
            <p className="text-sm text-gray-600">
              <strong>Order ID:</strong> {order.orderId}
            </p>
            <p className="text-gray-600 mt-1">
              <strong>Delivered On:</strong> {order.placedAt}
            </p>
            <p className="text-gray-800 font-semibold mt-2">
              Total: ₹{order.totalCost.toFixed(2)}
            </p>
            <p className="text-green-600 font-medium mt-1">✅ Delivered</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DeliveredOrders;
