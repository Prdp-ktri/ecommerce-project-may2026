import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Store,
  Mail,
  MapPin,
  BadgeInfo,
  Hash,
  Phone,
  PinIcon,
} from "lucide-react";

function SellerDashboard() {
  const [seller, setSeller] = useState(null);
  const [latchedCount, setLatchedCount] = useState(0);
  const [newOrdersCount, setNewOrdersCount] = useState(0);
  const [sellerState, setSellerState] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedSeller = JSON.parse(localStorage.getItem("loggedInSeller"));

    if (!storedSeller) {
      navigate("/sellerLogin");
      return;
    }

    setSeller(storedSeller);
    setSellerState(storedSeller.selectedState || "");

    // 🟩 Fetch latched products count
    const storageKey = `latchedProducts_${storedSeller.email}`;
    const storedLatched = JSON.parse(localStorage.getItem(storageKey)) || [];
    setLatchedCount(storedLatched.length);

    // 🟩 Fetch new orders count
    const sellerOrders = JSON.parse(localStorage.getItem("sellerOrders")) || {};
    const myOrders = sellerOrders[storedSeller.storeName] || [];
    setNewOrdersCount(myOrders.length);
  }, [navigate]);

  if (!seller) return <p>Loading seller details...</p>;

  // Navigation handlers
  const goToAllLatchableProducts = () => navigate("/allLatchableProducts");
  const goToLatchedProducts = () => navigate("/latchedProducts");
  const goToNewOrders = () => navigate("/new-orders-of-seller");
  const goToManageProfile = () => navigate("/manage-profile");

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-yellow-50 pt-24 p-8">
      <div className="bg-gradient-to-r from-teal-600 to-teal-400 text-white rounded-2xl shadow-2xl p-8 mb-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome, {seller.name}!</h1>
            <p className="text-lg opacity-90">
              Managing your store with ease and insight.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex items-center gap-3 bg-white/20 px-4 py-2 rounded-full">
            <Store size={22} />
            <span className="font-medium">{seller.storeName}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 text-white">
          <div className="flex items-center gap-3 bg-white/10 p-3 rounded-lg">
            <Mail size={20} />
            <span>{seller.email}</span>
          </div>
          <div className="flex items-center gap-3 bg-white/10 p-3 rounded-lg">
            <Phone size={20} />
            <span>{seller.phone}</span>
          </div>
          <div className="flex items-center gap-3 bg-white/10 p-3 rounded-lg">
            <MapPin size={20} />
            <span>
              {seller.address}, {sellerState} - {seller.pin}
            </span>
          </div>
          <div className="flex items-center gap-3 bg-white/10 p-3 rounded-lg">
            <BadgeInfo size={20} />
            <span>GST: {seller.gst}</span>
          </div>
          <div className="flex items-center gap-3 bg-white/10 p-3 rounded-lg">
            <Hash size={20} />
            <span>Trademark: {seller.trademark}</span>
          </div>
          <div className="flex items-center gap-3 bg-white/10 p-3 rounded-lg">
            <PinIcon size={20} />
            <span>PIN Code: {seller.pin}</span>
          </div>
        </div>
      </div>

      {/* Sneak Peek Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
        <div className="bg-white shadow-lg border-t-4 border-teal-500 rounded-2xl p-6 hover:shadow-2xl transition">
          <h2 className="text-xl font-semibold text-teal-700 mb-3">
            Latched Products
          </h2>
          <p className="text-gray-600 mb-2">
            You currently have{" "}
            <span className="font-bold text-teal-600">{latchedCount}</span>{" "}
            latched products.
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Manage your product prices and quantities anytime.
          </p>
          <button
            onClick={goToLatchedProducts}
            className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700"
          >
            View Latched Products
          </button>
        </div>

        <div className="bg-white shadow-lg border-t-4 border-orange-500 rounded-2xl p-6 hover:shadow-2xl transition">
          <h2 className="text-xl font-semibold text-orange-700 mb-3">
            New Orders
          </h2>
          <p className="text-gray-600 mb-2">
            You have{" "}
            <span className="font-bold text-orange-600">{newOrdersCount}</span>{" "}
            new orders awaiting processing.
          </p>
          <p className="text-sm text-gray-500 mb-4">
            View and update order statuses for your customers.
          </p>
          <button
            onClick={goToNewOrders}
            className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700"
          >
            View Orders
          </button>
        </div>

        <div className="bg-white shadow-lg border-t-4 border-blue-500 rounded-2xl p-6 hover:shadow-2xl transition">
          <h2 className="text-xl font-semibold text-blue-700 mb-3">
            Manage Profile
          </h2>
          <p className="text-gray-600 mb-2">
            Update your profile, address, or store details anytime.
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Ensure your store and contact info are always up to date.
          </p>
          <button
            onClick={goToManageProfile}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* Quick Access Buttons */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Quick Access
        </h3>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={goToAllLatchableProducts}
            className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700 transition"
          >
            View All Latchable Products
          </button>
          <button
            onClick={goToLatchedProducts}
            className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Manage Latched Products
          </button>
          <button
            onClick={goToNewOrders}
            className="bg-orange-600 text-white px-5 py-2 rounded-md hover:bg-orange-700 transition"
          >
            Check New Orders
          </button>
        </div>
      </div>
    </div>
  );
}

export default SellerDashboard;
