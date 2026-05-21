import React, { useEffect, useState } from "react";

function MiniOrderTracker({ orderId }) {
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const allOrders = JSON.parse(localStorage.getItem("buyerOrders")) || [];
    const foundOrder = allOrders.find((o) => o.orderId === orderId);
    if (!foundOrder) return;

    setOrder(foundOrder);
    setStatus(foundOrder.status);

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
        const newStatus = deliveryStages[index];
        setStatus(newStatus);

        // 🔄 Update order status in localStorage
        const updatedOrders = allOrders.map((o) =>
          o.orderId === orderId ? { ...o, status: newStatus } : o
        );
        localStorage.setItem("buyerOrders", JSON.stringify(updatedOrders));
      } else {
        clearInterval(interval);

        // ✅ Move order to deliveredOrders
        const remainingOrders = allOrders.filter((o) => o.orderId !== orderId);
        localStorage.setItem("buyerOrders", JSON.stringify(remainingOrders));

        const deliveredOrders =
          JSON.parse(localStorage.getItem("deliveredOrders")) || [];
        localStorage.setItem(
          "deliveredOrders",
          JSON.stringify([
            ...deliveredOrders,
            { ...foundOrder, status: "Delivered" },
          ])
        );
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [orderId]);

  if (!order) return null;

  return (
    <div className="bg-white shadow-md rounded-xl p-4 border-l-4 border-teal-500 w-full max-w-md">
      <p className="text-sm text-gray-600">
        <strong>Order ID:</strong> {order.orderId}
      </p>

      <div className="flex items-center mt-3 space-x-2">
        <div
          className={`h-3 w-3 rounded-full ${
            status === "Delivered"
              ? "bg-green-500"
              : "bg-yellow-400 animate-pulse"
          }`}
        ></div>
        <span className="font-medium text-gray-800">{status}</span>
      </div>

      <p className="text-gray-600 text-sm mt-2">
        <strong>Items:</strong> {order.items.length}
      </p>

      <p className="text-gray-800 font-semibold mt-1">
        Total: ₹{order.totalCost.toFixed(2)}
      </p>
    </div>
  );
}

export default MiniOrderTracker;
