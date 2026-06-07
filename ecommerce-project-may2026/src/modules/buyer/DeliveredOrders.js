import React, { useEffect, useState } from "react";

function DeliveredOrders() {
  const [deliveredOrders, setDeliveredOrders] = useState([]);

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem("deliveredOrders")) || [];

    setDeliveredOrders(orders);
  }, []);

  // Empty State

  if (deliveredOrders.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-orange-950 to-slate-900 text-white pt-32 px-6 relative overflow-hidden">
        {/* Glow Effects */}

        <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"></div>

        <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl"></div>

        <div className="relative z-10 flex flex-col items-center justify-center min-h-[70vh] text-center">
          <div className="text-8xl mb-6">🎉</div>

          <h2 className="text-4xl font-bold text-orange-300 mb-4">
            No Delivered Orders Yet
          </h2>

          <p className="text-gray-300 text-lg max-w-lg">
            Orders that have successfully reached your doorstep will appear
            here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-orange-950 to-slate-900 text-white pt-32 px-6 pb-10 relative overflow-hidden">
      {/* Glow Effects */}

      <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl"></div>

      {/* Header */}

      <div className="relative z-10 text-center mb-12">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-green-300 via-emerald-300 to-green-500 bg-clip-text text-transparent mb-4">
          Delivered Orders
        </h1>

        <p className="text-gray-300 text-lg">
          View all successfully delivered purchases.
        </p>

        <div className="mt-5 inline-block bg-green-500/20 border border-green-400/20 px-5 py-2 rounded-full">
          <span className="text-green-300 font-semibold">
            {deliveredOrders.length} Delivered Orders
          </span>
        </div>
      </div>

      {/* Orders Grid */}

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {deliveredOrders.map((order) => (
          <div
            key={order.orderId}
            className="group bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:-translate-y-2 hover:border-green-400/30 hover:shadow-[0_0_35px_rgba(34,197,94,0.25)] transition-all duration-500"
          >
            {/* Status Header */}

            <div className="flex items-center justify-between mb-5">
              <div className="text-5xl">📦</div>

              <span className="bg-green-500/20 text-green-300 border border-green-400/20 px-4 py-1 rounded-full text-sm font-semibold">
                Delivered
              </span>
            </div>

            {/* Order Details */}

            <div className="space-y-4">
              <div>
                <p className="text-gray-400 text-sm">Order ID</p>

                <p className="font-semibold text-white break-all">
                  {order.orderId}
                </p>
              </div>

              <div>
                <p className="text-gray-400 text-sm">Delivered On</p>

                <p className="font-semibold text-green-300">{order.placedAt}</p>
              </div>

              <div>
                <p className="text-gray-400 text-sm">Order Value</p>

                <p className="text-3xl font-bold text-yellow-300">
                  ₹
                  {order.totalCost?.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>
            </div>

            {/* Bottom Success Bar */}

            <div className="mt-6 bg-green-500/10 border border-green-400/20 rounded-2xl p-3 text-center">
              <p className="text-green-300 font-medium">
                ✅ Successfully Delivered
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DeliveredOrders;
