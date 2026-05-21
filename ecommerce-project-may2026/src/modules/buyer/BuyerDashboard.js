import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Package,
  User,
  MapPin,
  Mail,
  PersonStanding,
  Phone,
  PersonStandingIcon,
  Map,
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

      // 🟩 Fetch buyer's orders
      const allOrders = JSON.parse(localStorage.getItem("orders")) || [];
      const myOrders = allOrders.filter(
        (order) => order.buyerEmail === storedBuyer.email,
      );
      setOrdersCount(myOrders.length);

      // 🟩 Most recent order
      if (myOrders.length > 0) {
        const latestOrder = myOrders[myOrders.length - 1];
        setRecentOrder(latestOrder);
      }
    }
  }, [navigate]);

  if (!buyer) return <p>Loading dashboard...</p>;

  // Navigation Handlers
  const goToProducts = () => navigate("/viewAllProducts");
  const goToOrders = () => navigate("/track-your-order");
  const goToEditProfile = () => navigate("/edit-profile");

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-yellow-50 to-teal-50 pt-6 p-12">
      {/* 🟢 Welcome Header */}
      <div
        style={{
          border: "2px solid #ccc",
          padding: "10px",
          marginBottom: "20px",
        }}
      >
        <Marquee
          speed={125}
          pauseOnHover={true}
          gradient={true}
          gradientColor={[100, 100, 100]}
          gradientWidth={100}
          style={{ fontSize: "1.5rem", color: "#007bff" }}
        >
          If you are buying products from our website for the first time, you
          can buy it for the discount of ₹500 by applying the coupon on the
          check-out page{"     "}
          <b>
            <u>#FIRST500</u>
          </b>
        </Marquee>
      </div>
      <div className="bg-gradient-to-r from-orange-500 to-yellow-400 text-white rounded-2xl shadow-2xl p-8 mb-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome, {buyer.name || "Valued Buyer"}!
            </h1>
            <p className="text-lg opacity-90">
              Here’s a quick overview of your account and activity.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 bg-white/20 px-4 py-2 rounded-full">
            <p className="font-medium flex items-center gap-2">
              <User size={20} /> {buyer.email}
            </p>
          </div>
        </div>
      </div>

      {/* 🟨 Buyer Info Card */}
      <div className="bg-white shadow-md border-l-4 border-teal-500 rounded-2xl p-6 mb-10 max-w-8xl mx-auto">
        <h2 className="text-2xl font-semibold text-teal-700 mb-4 flex items-center gap-2">
          <User size={26} className="text-teal-600" /> Your Details
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
          <p>
            <span>
              <span className="font-semibold">Name:</span> {buyer.name || "—"}
            </span>
          </p>
          <p>
            <span className="font-semibold">Age:</span> {buyer.age || "—"}
          </p>
          <p className="flex items-center gap-2">
            <Mail size={18} className="text-gray-500" />
            <span>
              <span className="font-semibold">Email:</span> {buyer.email || "—"}
            </span>
          </p>
          <p className="flex items-center gap-2">
            <Phone size={18} className="text-gray-500" />
            <span>
              <span className="font-semibold">Phone:</span> {buyer.phone || "—"}
            </span>
          </p>
          <p className="flex items-center gap-2">
            <MapPin size={18} className="text-gray-500" />
            <span>
              <span className="font-semibold">Address:</span>{" "}
              {buyer.address || "—"}
            </span>
          </p>
          <p>
            <span className="font-semibold">State:</span>{" "}
            {buyer.selectedState || "—"}
          </p>
          <p>
            <span className="font-semibold">PIN:</span> {buyer.pin || "—"}
          </p>
        </div>
      </div>

      {/* 🟦 Sneak Peek Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Card 1: View Products */}
        <div
          onClick={goToProducts}
          className="cursor-pointer bg-white shadow-lg border-t-4 border-orange-500 rounded-2xl p-6 hover:shadow-2xl transition duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="bg-orange-500 p-3 rounded-full">
              <ShoppingCart size={28} className="text-white" />
            </div>
            <span className="text-sm text-gray-500">Explore</span>
          </div>
          <h2 className="text-xl font-semibold text-orange-600 mb-2">
            View Products
          </h2>
          <p className="text-gray-700 text-sm mb-3">
            Discover new products available in <b>{location || "your area"}</b>.
          </p>
          <p className="text-gray-500 text-sm italic">
            Find the best deals today!
          </p>
        </div>

        {/* Card 2: Track Orders */}
        <div
          onClick={goToOrders}
          className="cursor-pointer bg-white shadow-lg border-t-4 border-teal-500 rounded-2xl p-6 hover:shadow-2xl transition duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="bg-teal-500 p-3 rounded-full">
              <Package size={28} className="text-white" />
            </div>
            <span className="text-sm text-gray-500">Orders</span>
          </div>
          <h2 className="text-xl font-semibold text-teal-600 mb-2">
            Track Orders
          </h2>
          <p className="text-gray-700 text-sm mb-3">
            You’ve placed <b className="text-teal-600">{ordersCount}</b> orders
            so far.
          </p>
          {recentOrder ? (
            <p className="text-gray-500 text-sm italic">
              Last order: {recentOrder.productName || "Product"} (
              {recentOrder.status || "Pending"})
            </p>
          ) : (
            <p className="text-gray-500 text-sm italic">
              No orders yet — start shopping!
            </p>
          )}
        </div>

        {/* Card 3: Edit Profile */}
        <div
          onClick={goToEditProfile}
          className="cursor-pointer bg-white shadow-lg border-t-4 border-yellow-500 rounded-2xl p-6 hover:shadow-2xl transition duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="bg-yellow-500 p-3 rounded-full">
              <User size={28} className="text-white" />
            </div>
            <span className="text-sm text-gray-500">Profile</span>
          </div>
          <h2 className="text-xl font-semibold text-yellow-600 mb-2">
            Edit Profile
          </h2>
          <p className="text-gray-700 text-sm mb-3">
            Update your details and keep your information current.
          </p>
          <p className="text-gray-500 text-sm italic">
            Last updated recently? Keep it fresh!
          </p>
        </div>
      </div>

      {/* 🟨 Quick Access */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Quick Access
        </h3>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={goToProducts}
            className="bg-orange-500 text-white px-5 py-2 rounded-md hover:bg-orange-600 transition"
          >
            View Products
          </button>
          <button
            onClick={goToOrders}
            className="bg-teal-500 text-white px-5 py-2 rounded-md hover:bg-teal-600 transition"
          >
            Track Orders
          </button>
          <button
            onClick={goToEditProfile}
            className="bg-yellow-500 text-white px-5 py-2 rounded-md hover:bg-yellow-600 transition"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default BuyerDashboard;
