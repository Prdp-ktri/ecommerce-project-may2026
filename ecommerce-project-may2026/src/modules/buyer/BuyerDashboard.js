import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ShoppingCart,
  Package,
  User,
  MapPin,
  Mail,
  Phone,
  Smartphone,
  CreditCard,
  Truck,
  ShoppingBag,
  Wallet,
  BadgeCheck,
  Sparkles,
  ScanLine,
} from "lucide-react";

import Marquee from "react-fast-marquee";

function BuyerDashboard() {
  const navigate = useNavigate();

  const [buyer, setBuyer] = useState(null);
  const [ordersCount, setOrdersCount] = useState(0);
  const [recentOrder, setRecentOrder] = useState(null);
  const [location, setLocation] = useState("");

  useEffect(() => {
    const storedBuyer = JSON.parse(localStorage.getItem("loggedInBuyer"));

    if (!storedBuyer) {
      navigate("/buyerLogin");
    } else {
      setBuyer(storedBuyer);
      setLocation(storedBuyer.selectedState || "");

      // Fetch Orders

      const allOrders = JSON.parse(localStorage.getItem("orders")) || [];

      const myOrders = allOrders.filter(
        (order) => order.buyerEmail === storedBuyer.email,
      );

      setOrdersCount(myOrders.length);

      // Most Recent Order

      if (myOrders.length > 0) {
        const latestOrder = myOrders[myOrders.length - 1];
        setRecentOrder(latestOrder);
      }
    }
  }, [navigate]);

  if (!buyer)
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white text-2xl">
        Loading dashboard...
      </div>
    );

  // Navigation

  const goToProducts = () => navigate("/viewAllProducts");

  const goToOrders = () => navigate("/track-your-order");

  const goToEditProfile = () => navigate("/edit-profile");

  return (
    <div className="relative overflow-hidden w-full min-h-screen bg-gradient-to-br from-slate-950 via-orange-950 to-slate-900 pt-28 md:pt-32 p-8 text-white">
      {/* Animated Background Blobs */}

      <div className="absolute top-0 left-0 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl animate-pulse"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-cyan-400/10 rounded-full blur-3xl animate-bounce"></div>

      {/* Coupon Marquee */}

      <div className="relative z-10 border border-white/10 bg-white/10 backdrop-blur-xl rounded-2xl p-3 mb-8 shadow-[0_0_30px_rgba(255,165,0,0.2)]">
        <Marquee
          speed={125}
          pauseOnHover={true}
          gradient={false}
          style={{
            fontSize: "1.2rem",
            color: "#ffffff",
            fontWeight: "600",
          }}
        >
          🎉 First time shopping? Use coupon{" "}
          <span className="mx-2 text-yellow-300 font-bold">#FIRST500</span>
          and get ₹500 OFF instantly on checkout • Quick payment •
          Lightning-fast delivery • Secure shopping experience •
        </Marquee>
      </div>

      {/* HERO SECTION */}

      <div className="relative overflow-hidden bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-[0_0_50px_rgba(255,140,0,0.25)] p-8 mb-10 hover:scale-[1.01] transition duration-500">
        {/* Floating Ecommerce Visuals */}

        <div className="absolute top-6 right-10 animate-bounce">
          <ShoppingCart className="text-yellow-300" size={40} />
        </div>

        <div className="absolute top-20 left-1/2 slow-spin">
          <ScanLine className="text-cyan-300" size={34} />
        </div>

        <div className="absolute bottom-10 right-24 animate-pulse">
          <CreditCard className="text-green-300" size={42} />
        </div>

        <div className="absolute bottom-10 left-20 animate-bounce delay-500">
          <Truck className="text-orange-300" size={42} />
        </div>

        <div className="absolute top-10 left-10 animate-pulse">
          <Sparkles className="text-pink-300" size={36} />
        </div>

        {/* Main Content */}

        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 relative z-10">
          {/* Left Content */}

          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-white via-orange-200 to-yellow-300 bg-clip-text text-transparent">
              Welcome, {buyer.name || "Valued Buyer"}!
            </h1>

            <p className="text-lg text-gray-200 max-w-2xl leading-relaxed">
              Explore trending products, enjoy one-click checkout, and
              experience ultra-fast ecommerce shopping.
            </p>

            {/* CTA Buttons */}

            <div className="flex flex-wrap gap-4 mt-8">
              <button
                onClick={goToProducts}
                className="bg-gradient-to-r from-orange-500 to-yellow-500 px-6 py-3 rounded-2xl font-semibold hover:scale-105 hover:shadow-[0_0_25px_rgba(255,165,0,0.5)] transition-all duration-300"
              >
                Start Shopping
              </button>

              <button
                onClick={goToOrders}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-3 rounded-2xl font-semibold hover:scale-105 hover:shadow-[0_0_25px_rgba(0,200,255,0.5)] transition-all duration-300"
              >
                Track Orders
              </button>
            </div>
          </div>

          {/* 3D Ecommerce Smart Device */}

          <div className="relative">
            {/* Glow */}

            <div className="absolute inset-0 bg-orange-500/30 blur-3xl rounded-full"></div>

            {/* Phone Mockup */}

            <div className="relative w-[300px] h-[580px] bg-gradient-to-br from-slate-800 to-slate-900 rounded-[40px] border-[8px] border-slate-700 shadow-[0_0_60px_rgba(255,165,0,0.3)] rotate-6 hover:rotate-0 transition duration-700 overflow-hidden">
              {/* Notch */}

              <div className="w-32 h-6 bg-black rounded-b-2xl mx-auto"></div>

              {/* Screen */}

              <div className="p-5">
                {/* Header */}

                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold">Quick Buy</h3>

                    <p className="text-sm text-gray-400">Fast checkout</p>
                  </div>

                  <ShoppingBag className="text-orange-300" size={28} />
                </div>

                {/* Product Card */}

                <div className="bg-white/10 border border-white/10 rounded-2xl p-4 backdrop-blur-md mb-5 hover:scale-105 transition">
                  <img
                    src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
                    alt="product"
                    className="w-full h-40 object-cover rounded-xl mb-4"
                  />

                  <h4 className="font-bold text-lg">Smart Watch</h4>

                  <p className="text-orange-300 font-semibold">₹4,999</p>
                </div>

                {/* Cart Section */}

                <div className="bg-gradient-to-r from-orange-500/20 to-yellow-500/20 rounded-2xl p-4 border border-white/10 mb-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <ShoppingCart
                        className="text-yellow-300 animate-bounce"
                        size={24}
                      />

                      <span className="font-semibold">Cart Ready</span>
                    </div>

                    <BadgeCheck className="text-green-300" size={22} />
                  </div>

                  <p className="text-sm text-gray-300">
                    1 item ready for instant checkout
                  </p>
                </div>

                {/* Payment */}

                <div className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 rounded-2xl p-4 border border-white/10">
                  <div className="flex items-center gap-3 mb-3">
                    <Wallet className="text-green-300" size={28} />

                    <div>
                      <h4 className="font-semibold">Quick Payment</h4>

                      <p className="text-sm text-gray-400">
                        UPI • Cards • Wallets
                      </p>
                    </div>
                  </div>

                  <button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 py-3 rounded-xl font-bold hover:scale-105 transition duration-300">
                    Checkout Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BUYER INFO */}

      <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-10 shadow-[0_0_40px_rgba(0,255,255,0.08)]">
        <h2 className="text-3xl font-bold text-orange-300 mb-6 flex items-center gap-3">
          <User size={30} />
          Your Details
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 text-gray-200">
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <p className="font-semibold text-orange-300 mb-1">Name</p>
            <p>{buyer.name || "—"}</p>
          </div>

          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <p className="font-semibold text-orange-300 mb-1">Age</p>
            <p>{buyer.age || "—"}</p>
          </div>

          <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex items-center gap-3">
            <Mail className="text-cyan-300" size={20} />
            <div>
              <p className="font-semibold text-orange-300">Email</p>
              <p>{buyer.email || "—"}</p>
            </div>
          </div>

          <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex items-center gap-3">
            <Phone className="text-green-300" size={20} />
            <div>
              <p className="font-semibold text-orange-300">Phone</p>
              <p>{buyer.phone || "—"}</p>
            </div>
          </div>

          <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex items-center gap-3">
            <MapPin className="text-pink-300" size={20} />
            <div>
              <p className="font-semibold text-orange-300">Address</p>
              <p>{buyer.address || "—"}</p>
            </div>
          </div>

          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <p className="font-semibold text-orange-300 mb-1">State</p>
            <p>{buyer.selectedState || "—"}</p>
          </div>
        </div>
      </div>

      {/* FEATURE CARDS */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Products */}

        <div
          onClick={goToProducts}
          className="group cursor-pointer relative overflow-hidden bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:-translate-y-3 hover:shadow-[0_0_40px_rgba(255,165,0,0.25)] transition-all duration-500"
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full"></div>

          <div className="w-16 h-16 rounded-2xl bg-orange-500/20 flex items-center justify-center mb-5">
            <ShoppingCart size={32} className="text-orange-300" />
          </div>

          <h2 className="text-2xl font-bold text-orange-300 mb-3">
            View Products
          </h2>

          <p className="text-gray-300 mb-3">
            Explore trending products available in{" "}
            <span className="text-yellow-300 font-semibold">
              {location || "your area"}
            </span>
            .
          </p>

          <p className="text-gray-400 text-sm italic">
            Smart recommendations. Fast buying experience.
          </p>
        </div>

        {/* Orders */}

        <div
          onClick={goToOrders}
          className="group cursor-pointer relative overflow-hidden bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:-translate-y-3 hover:shadow-[0_0_40px_rgba(0,255,200,0.25)] transition-all duration-500"
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full"></div>

          <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 flex items-center justify-center mb-5">
            <Package size={32} className="text-cyan-300" />
          </div>

          <h2 className="text-2xl font-bold text-cyan-300 mb-3">
            Track Orders
          </h2>

          <p className="text-gray-300 mb-3">
            You’ve placed{" "}
            <span className="text-cyan-300 font-bold">{ordersCount}</span>{" "}
            orders so far.
          </p>

          {recentOrder ? (
            <p className="text-gray-400 text-sm italic">
              Latest order: {recentOrder.productName} ({recentOrder.status})
            </p>
          ) : (
            <p className="text-gray-400 text-sm italic">
              No orders yet — start shopping today!
            </p>
          )}
        </div>

        {/* Profile */}

        <div
          onClick={goToEditProfile}
          className="group cursor-pointer relative overflow-hidden bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:-translate-y-3 hover:shadow-[0_0_40px_rgba(255,255,0,0.25)] transition-all duration-500"
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full"></div>

          <div className="w-16 h-16 rounded-2xl bg-yellow-500/20 flex items-center justify-center mb-5">
            <User size={32} className="text-yellow-300" />
          </div>

          <h2 className="text-2xl font-bold text-yellow-300 mb-3">
            Edit Profile
          </h2>

          <p className="text-gray-300 mb-3">
            Keep your account details accurate and secure.
          </p>

          <p className="text-gray-400 text-sm italic">
            Personalize your shopping experience.
          </p>
        </div>
      </div>

      {/* QUICK ACCESS */}

      <div className="mt-12">
        <h3 className="text-2xl font-bold text-white mb-6">Quick Access</h3>

        <div className="flex flex-wrap gap-5">
          <button
            onClick={goToProducts}
            className="bg-gradient-to-r from-orange-500 to-yellow-500 px-6 py-3 rounded-2xl font-semibold hover:scale-105 hover:shadow-[0_0_25px_rgba(255,165,0,0.5)] transition-all duration-300"
          >
            View Products
          </button>

          <button
            onClick={goToOrders}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-3 rounded-2xl font-semibold hover:scale-105 hover:shadow-[0_0_25px_rgba(0,200,255,0.5)] transition-all duration-300"
          >
            Track Orders
          </button>

          <button
            onClick={goToEditProfile}
            className="bg-gradient-to-r from-yellow-500 to-orange-500 px-6 py-3 rounded-2xl font-semibold hover:scale-105 hover:shadow-[0_0_25px_rgba(255,255,0,0.5)] transition-all duration-300"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default BuyerDashboard;
