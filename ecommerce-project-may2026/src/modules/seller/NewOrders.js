import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function NewOrders() {
  const [orders, setOrders] = useState([]);
  const [sellerName, setSellerName] = useState("");

  useEffect(() => {
    const loggedInSeller = JSON.parse(localStorage.getItem("loggedInSeller"));

    if (!loggedInSeller) {
      toast.error("Please log in as a seller first!");
      return;
    }

    setSellerName(loggedInSeller.storeName);

    const sellerOrders = JSON.parse(localStorage.getItem("sellerOrders")) || {};

    const myOrders = sellerOrders[loggedInSeller.storeName] || [];

    setOrders(myOrders);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-teal-950 to-slate-900 text-white pt-32 px-6 pb-10 relative overflow-hidden">
      {/* Background Effects */}

      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl"></div>

      <div className="absolute top-36 right-8 text-[180px] opacity-10 animate-bounce">
        📦
      </div>

      <div className="absolute bottom-20 left-8 text-[180px] opacity-10 animate-pulse">
        🚚
      </div>

      {/* Header */}

      <div className="relative z-10 text-center mb-10">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-cyan-300 via-teal-300 to-emerald-400 bg-clip-text text-transparent mb-4">
          Incoming Orders
        </h1>

        <p className="text-gray-300 text-lg">Orders received for your store.</p>

        <div className="inline-block mt-4 px-5 py-2 rounded-full bg-cyan-500/20 border border-cyan-400/20">
          <span className="text-cyan-300 font-semibold">{sellerName}</span>
        </div>

        <div className="mt-4">
          <span className="bg-emerald-500/20 border border-emerald-400/20 px-5 py-2 rounded-full text-emerald-300 font-semibold">
            {orders.length} Active Orders
          </span>
        </div>
      </div>

      {/* No Orders */}

      {orders.length === 0 ? (
        <div className="relative z-10 flex flex-col items-center justify-center py-32">
          <div className="text-8xl animate-bounce mb-6">📭</div>

          <h2 className="text-3xl font-bold text-cyan-300 mb-3">
            No New Orders Yet
          </h2>

          <p className="text-gray-400">
            New customer orders will appear here automatically.
          </p>
        </div>
      ) : (
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {orders.map((order, index) => (
            <div
              key={index}
              className="
                bg-white/10
                backdrop-blur-xl
                border border-white/10
                rounded-3xl
                p-6
                hover:-translate-y-2
                hover:border-cyan-400/30
                hover:shadow-[0_0_35px_rgba(34,211,238,0.25)]
                transition-all
                duration-500
              "
            >
              {/* Top Section */}

              <div className="flex justify-between items-start mb-5">
                <div>
                  <p className="text-sm text-cyan-300">Order ID</p>

                  <h3 className="font-bold text-lg text-white">
                    {order.orderId}
                  </h3>
                </div>

                <div
                  className={`
                    px-4 py-2 rounded-full text-sm font-semibold
                    ${
                      order.status === "Delivered"
                        ? "bg-green-500/20 text-green-300"
                        : "bg-yellow-500/20 text-yellow-300"
                    }
                  `}
                >
                  {order.status}
                </div>
              </div>

              {/* Buyer Details */}

              <div className="bg-slate-800/60 rounded-2xl p-4 border border-white/10 mb-5">
                <h4 className="text-cyan-300 font-semibold mb-3">
                  Buyer Information
                </h4>

                <p>
                  <span className="text-gray-400">Name:</span> {order.buyerName}
                </p>

                <p className="mt-2">
                  <span className="text-gray-400">Address:</span>{" "}
                  {order.address}
                </p>

                <p>
                  {order.state} - {order.pin}
                </p>
              </div>

              {/* Payment & Date */}

              <div className="grid grid-cols-2 gap-4 mb-5">
                <div className="bg-slate-800/60 rounded-2xl p-4 border border-white/10">
                  <p className="text-gray-400 text-sm">Payment</p>

                  <p className="text-emerald-300 font-semibold">
                    {order.paymentMethod}
                  </p>
                </div>

                <div className="bg-slate-800/60 rounded-2xl p-4 border border-white/10">
                  <p className="text-gray-400 text-sm">Total Amount</p>

                  <p className="text-yellow-300 font-bold text-xl">
                    ₹{order.totalCost}
                  </p>
                </div>
              </div>

              {/* Ordered Items */}

              <div className="mb-5">
                <h4 className="text-cyan-300 font-semibold mb-3">
                  Ordered Items
                </h4>

                <div className="space-y-3">
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="
                        flex
                        justify-between
                        items-center
                        bg-slate-800/60
                        border
                        border-white/10
                        rounded-xl
                        px-4
                        py-3
                      "
                    >
                      <div>
                        <p className="font-semibold">{item.name}</p>

                        <p className="text-sm text-gray-400">
                          Qty: {item.quantity}
                        </p>
                      </div>

                      <div className="text-yellow-300 font-bold">
                        ₹{item.price}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}

              <div className="border-t border-white/10 pt-4 flex justify-between items-center">
                <span className="text-gray-400 text-sm">Placed On</span>

                <span className="font-semibold text-white">
                  {order.placedAt}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NewOrders;
