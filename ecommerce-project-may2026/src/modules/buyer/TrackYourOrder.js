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

  if (!order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-orange-950 to-slate-900 flex items-center justify-center text-white">
        <div className="text-center">
          <div className="text-7xl mb-4">📦</div>
          <h2 className="text-3xl font-bold text-orange-300">
            Loading Order...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-orange-950 to-slate-900 text-white pt-32 px-6 pb-10 relative overflow-hidden">
      ```
      {/* Background Glow Effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl"></div>
      {/* Header */}
      <div className="relative z-10 text-center mb-10">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-orange-300 via-yellow-300 to-orange-500 bg-clip-text text-transparent mb-3">
          Track Your Order
        </h1>

        <p className="text-gray-300 text-lg">
          Follow your shipment journey in real time.
        </p>
      </div>
      {/* Main Tracking Card */}
      <div className="relative z-10 w-full">
        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          {/* Order Info */}

          <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-8">
            <div>
              <p className="text-orange-300 text-sm">Order ID</p>

              <p className="text-xl font-bold text-white break-all">
                {order.orderId}
              </p>
            </div>

            <div>
              <p className="text-orange-300 text-sm">Placed On</p>

              <p className="text-lg font-semibold text-white">
                {order.placedAt}
              </p>
            </div>
          </div>

          {/* Progress Section */}

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-orange-300 mb-5">
              Shipping Status
            </h2>

            <div className="bg-slate-800/70 rounded-2xl p-5 border border-white/10">
              <div className="flex items-center gap-4">
                <div
                  className={`w-5 h-5 rounded-full ${
                    status === "Delivered"
                      ? "bg-green-500"
                      : "bg-yellow-400 animate-pulse"
                  }`}
                />

                <span
                  className={`text-xl font-bold ${
                    status === "Delivered"
                      ? "text-green-400"
                      : "text-yellow-300"
                  }`}
                >
                  {status}
                </span>
              </div>

              <div className="mt-4 h-3 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-1000 ${
                    status === "Order Placed"
                      ? "w-[20%]"
                      : status === "Packed by Seller"
                        ? "w-[40%]"
                        : status === "Shipped"
                          ? "w-[60%]"
                          : status === "Out for Delivery"
                            ? "w-[80%]"
                            : "w-full"
                  } bg-gradient-to-r from-orange-500 via-yellow-500 to-green-500`}
                />
              </div>
            </div>
          </div>

          {/* Delivery Details */}

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-orange-300 mb-5">
              Delivery Details
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-800/60 rounded-2xl p-5 border border-white/10">
                <p className="text-orange-300 text-sm mb-2">Customer Name</p>

                <p className="text-white font-semibold">{order.buyerName}</p>
              </div>

              <div className="bg-slate-800/60 rounded-2xl p-5 border border-white/10">
                <p className="text-orange-300 text-sm mb-2">Payment Method</p>

                <p className="text-white font-semibold">
                  {order.paymentMethod}
                </p>
              </div>

              <div className="bg-slate-800/60 rounded-2xl p-5 border border-white/10 md:col-span-2">
                <p className="text-orange-300 text-sm mb-2">Shipping Address</p>

                <p className="text-white">{order.address}</p>

                <p className="text-white">
                  {order.state}, {order.pin}
                </p>
              </div>
            </div>
          </div>

          {/* Ordered Items */}

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-orange-300 mb-5">
              Ordered Items
            </h2>

            <div className="space-y-4">
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-slate-800/60 border border-white/10 rounded-2xl p-4 flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold text-white">{item.name}</p>

                    <p className="text-gray-400 text-sm">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <div className="text-yellow-300 font-bold">₹{item.price}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-t border-white/10 pt-6">
            <div>
              <p className="text-gray-400">Order Total</p>

              <p className="text-3xl font-bold text-yellow-300">
                ₹{order.totalCost.toFixed(2)}
              </p>
            </div>

            <button
              onClick={() => navigate("/")}
              className="px-8 py-3 rounded-2xl bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-500 font-bold hover:scale-105 transition-all duration-300 shadow-[0_0_25px_rgba(255,165,0,0.35)]"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
      ```
    </div>
  );
}

export default TrackYourOrder;
