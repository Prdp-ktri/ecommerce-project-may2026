import React from "react";
import MiniOrderTracker from "./MiniOrderTracker";

function TrackingPage() {
  const orders = JSON.parse(localStorage.getItem("buyerOrders")) || [];

  if (orders.length === 0) {
    return (
      <div className="p-8 text-center text-gray-600">
        <h2 className="text-2xl font-semibold">No Orders Found</h2>
        <p className="mt-2">Place an order to start tracking.</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-teal-700 mb-8 text-center">
        Order Tracking Summary
      </h1>

      <div className="flex flex-wrap gap-6 justify-center">
        {orders.map((order) => (
          <MiniOrderTracker key={order.orderId} orderId={order.orderId} />
        ))}
      </div>
    </div>
  );
}

export default TrackingPage;
