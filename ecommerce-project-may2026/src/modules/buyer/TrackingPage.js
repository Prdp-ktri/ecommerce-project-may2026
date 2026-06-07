import React from "react";
import MiniOrderTracker from "./MiniOrderTracker";

function TrackingPage() {
  const orders = JSON.parse(localStorage.getItem("buyerOrders")) || [];

  if (orders.length === 0) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-slate-950 via-orange-950 to-slate-900 text-white pt-28 relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"></div>

        <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl"></div>

        <div className="relative z-10 w-full min-h-[calc(100vh-112px)] flex flex-col items-center justify-center text-center px-6">
          <div className="text-9xl mb-6 animate-bounce">📦</div>

          <h2 className="text-5xl font-extrabold bg-gradient-to-r from-orange-300 to-yellow-300 bg-clip-text text-transparent mb-4">
            No Orders Found
          </h2>

          <p className="text-gray-300 text-xl max-w-lg">
            Place your first order and track shipping, delivery status, and
            updates from here.
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
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-orange-300 via-yellow-300 to-orange-500 bg-clip-text text-transparent mb-4">
          Order Tracking Center
        </h1>

        <p className="text-gray-300 text-lg">
          Track every order you've placed from one dashboard.
        </p>

        <div className="mt-5 inline-block bg-orange-500/20 border border-orange-400/20 px-5 py-2 rounded-full">
          <span className="text-orange-300 font-semibold">
            {orders.length} Active Orders
          </span>
        </div>
      </div>

      {/* Orders Section */}

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          <h2 className="text-2xl font-bold text-orange-300 mb-8">
            Your Orders
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {orders.map((order) => (
              <div
                key={order.orderId}
                className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl p-6 hover:border-orange-400/30 hover:shadow-[0_0_35px_rgba(255,165,0,0.25)] hover:-translate-y-2 transition-all duration-500"
              >
                <MiniOrderTracker orderId={order.orderId} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrackingPage;
