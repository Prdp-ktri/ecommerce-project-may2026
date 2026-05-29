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
  Package,
  Truck,
  Camera,
  ShoppingBag,
  Boxes,
  ScanBarcode,
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

    // Fetch latched products
    const storageKey = `latchedProducts_${storedSeller.email}`;
    const storedLatched = JSON.parse(localStorage.getItem(storageKey)) || [];

    setLatchedCount(storedLatched.length);

    // Fetch new orders
    const sellerOrders = JSON.parse(localStorage.getItem("sellerOrders")) || {};

    const myOrders = sellerOrders[storedSeller.storeName] || [];

    setNewOrdersCount(myOrders.length);
  }, [navigate]);

  if (!seller)
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white text-2xl">
        Loading seller details...
      </div>
    );

  // Navigation handlers
  const goToAllLatchableProducts = () => navigate("/allLatchableProducts");

  const goToLatchedProducts = () => navigate("/latchedProducts");

  const goToNewOrders = () => navigate("/new-orders-of-seller");

  const goToManageProfile = () => navigate("/manage-profile");

  return (
    <div className="relative overflow-hidden min-h-screen bg-gradient-to-br from-slate-950 via-teal-950 to-slate-900 pt-24 p-8 text-white">
      {/* Animated Background Blobs */}

      <div className="absolute top-0 left-0 w-72 h-72 bg-teal-500/20 rounded-full blur-3xl animate-pulse"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl animate-bounce"></div>

      {/* HERO SECTION */}

      <div className="relative overflow-hidden bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-3xl shadow-[0_0_50px_rgba(0,255,200,0.2)] p-8 mb-10 hover:scale-[1.01] transition duration-500">
        {/* Floating Seller Icons */}

        <div className="absolute top-6 right-10 animate-bounce">
          <Camera className="text-yellow-300" size={38} />
        </div>

        <div className="absolute bottom-6 right-24 animate-pulse">
          <Package className="text-teal-300" size={42} />
        </div>

        <div className="absolute top-20 left-1/2 slow-spin">
          <ScanBarcode className="text-orange-300" size={34} />
        </div>

        <div className="absolute bottom-10 left-20 animate-bounce delay-500">
          <Truck className="text-cyan-300" size={42} />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between relative z-10">
          <div>
            <h1 className="text-4xl font-extrabold mb-3 bg-gradient-to-r from-white via-teal-200 to-cyan-300 bg-clip-text text-transparent">
              Welcome, {seller.name}!
            </h1>

            <p className="text-lg text-gray-200">
              Manage listings, pack orders, and grow your e-commerce business.
            </p>
          </div>

          <div className="mt-6 sm:mt-0 flex items-center gap-3 bg-white/20 px-6 py-3 rounded-full backdrop-blur-md border border-white/20">
            <Store size={24} />
            <span className="font-semibold text-lg">{seller.storeName}</span>
          </div>
        </div>

        {/* Seller Details */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 relative z-10">
          <div className="flex items-center gap-3 bg-white/10 p-4 rounded-xl border border-white/10 hover:bg-white/20 transition">
            <Mail size={20} className="text-cyan-300" />
            <span>{seller.email}</span>
          </div>

          <div className="flex items-center gap-3 bg-white/10 p-4 rounded-xl border border-white/10 hover:bg-white/20 transition">
            <Phone size={20} className="text-green-300" />
            <span>{seller.phone}</span>
          </div>

          <div className="flex items-center gap-3 bg-white/10 p-4 rounded-xl border border-white/10 hover:bg-white/20 transition">
            <MapPin size={20} className="text-orange-300" />
            <span>
              {seller.address}, {sellerState} - {seller.pin}
            </span>
          </div>

          <div className="flex items-center gap-3 bg-white/10 p-4 rounded-xl border border-white/10 hover:bg-white/20 transition">
            <BadgeInfo size={20} className="text-pink-300" />
            <span>GST: {seller.gst}</span>
          </div>

          <div className="flex items-center gap-3 bg-white/10 p-4 rounded-xl border border-white/10 hover:bg-white/20 transition">
            <Hash size={20} className="text-yellow-300" />
            <span>Trademark: {seller.trademark}</span>
          </div>

          <div className="flex items-center gap-3 bg-white/10 p-4 rounded-xl border border-white/10 hover:bg-white/20 transition">
            <PinIcon size={20} className="text-red-300" />
            <span>PIN Code: {seller.pin}</span>
          </div>
        </div>
      </div>

      {/* Seller Workflow */}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-5 text-center hover:scale-105 hover:shadow-[0_0_25px_rgba(255,255,0,0.3)] transition duration-300">
          <Camera className="mx-auto text-yellow-300 mb-3" size={38} />

          <p className="font-semibold">Product Photography</p>
        </div>

        <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-5 text-center hover:scale-105 hover:shadow-[0_0_25px_rgba(0,255,200,0.3)] transition duration-300">
          <ShoppingBag className="mx-auto text-teal-300 mb-3" size={38} />

          <p className="font-semibold">Listing Products</p>
        </div>

        <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-5 text-center hover:scale-105 hover:shadow-[0_0_25px_rgba(255,140,0,0.3)] transition duration-300">
          <Package className="mx-auto text-orange-300 mb-3" size={38} />

          <p className="font-semibold">Packing Orders</p>
        </div>

        <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-5 text-center hover:scale-105 hover:shadow-[0_0_25px_rgba(0,200,255,0.3)] transition duration-300">
          <Truck className="mx-auto text-cyan-300 mb-3" size={38} />

          <p className="font-semibold">Shipping Trucks</p>
        </div>
      </div>

      {/* Dashboard Cards */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
        {/* Latched Products */}

        <div className="group relative overflow-hidden bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl p-6 hover:-translate-y-3 hover:shadow-[0_0_40px_rgba(0,255,200,0.25)] transition-all duration-500">
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full"></div>

          <div className="w-14 h-14 rounded-2xl bg-teal-500/20 flex items-center justify-center mb-4">
            <Boxes size={30} className="text-teal-300" />
          </div>

          <h2 className="text-2xl font-bold text-teal-300 mb-3">
            Latched Products
          </h2>

          <p className="text-gray-300 mb-2">
            You currently have{" "}
            <span className="font-bold text-teal-300">{latchedCount}</span>{" "}
            latched products.
          </p>

          <p className="text-sm text-gray-400 mb-5">
            Manage product quantities, pricing, and availability instantly.
          </p>

          <button
            onClick={goToLatchedProducts}
            className="relative overflow-hidden bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-5 py-3 rounded-xl font-semibold hover:scale-105 hover:shadow-[0_0_25px_rgba(0,255,255,0.4)] transition-all duration-300"
          >
            View Latched Products
          </button>
        </div>

        {/* Orders */}

        <div className="group relative overflow-hidden bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl p-6 hover:-translate-y-3 hover:shadow-[0_0_40px_rgba(255,140,0,0.25)] transition-all duration-500">
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full"></div>

          <div className="w-14 h-14 rounded-2xl bg-orange-500/20 flex items-center justify-center mb-4">
            <Truck size={30} className="text-orange-300" />
          </div>

          <h2 className="text-2xl font-bold text-orange-300 mb-3">
            New Orders
          </h2>

          <p className="text-gray-300 mb-2">
            You have{" "}
            <span className="relative inline-flex">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>

              <span className="relative inline-flex rounded-full bg-orange-500 px-3 py-1 text-white font-bold">
                {newOrdersCount}
              </span>
            </span>{" "}
            new orders awaiting processing.
          </p>

          <p className="text-sm text-gray-400 mb-5">
            Track shipments and update delivery statuses for customers.
          </p>

          <button
            onClick={goToNewOrders}
            className="relative overflow-hidden bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-5 py-3 rounded-xl font-semibold hover:scale-105 hover:shadow-[0_0_25px_rgba(255,165,0,0.4)] transition-all duration-300"
          >
            View Orders
          </button>
        </div>

        {/* Manage Profile */}

        <div className="group relative overflow-hidden bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl p-6 hover:-translate-y-3 hover:shadow-[0_0_40px_rgba(0,120,255,0.25)] transition-all duration-500">
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full"></div>

          <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-4">
            <Store size={30} className="text-blue-300" />
          </div>

          <h2 className="text-2xl font-bold text-blue-300 mb-3">
            Manage Profile
          </h2>

          <p className="text-gray-300 mb-2">
            Update your store profile, address, branding, and contact details.
          </p>

          <p className="text-sm text-gray-400 mb-5">
            Keep your storefront professional and customer-ready.
          </p>

          <button
            onClick={goToManageProfile}
            className="relative overflow-hidden bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-5 py-3 rounded-xl font-semibold hover:scale-105 hover:shadow-[0_0_25px_rgba(0,120,255,0.4)] transition-all duration-300"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* Quick Access */}

      <div className="mt-12">
        <h3 className="text-2xl font-bold mb-6 text-white">Quick Access</h3>

        <div className="flex flex-wrap gap-5">
          <button
            onClick={goToAllLatchableProducts}
            className="bg-gradient-to-r from-green-500 to-emerald-500 px-6 py-3 rounded-xl font-semibold hover:scale-105 hover:shadow-[0_0_25px_rgba(0,255,100,0.5)] transition-all duration-300"
          >
            View All Latchable Products
          </button>

          <button
            onClick={goToLatchedProducts}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-3 rounded-xl font-semibold hover:scale-105 hover:shadow-[0_0_25px_rgba(0,180,255,0.5)] transition-all duration-300"
          >
            Manage Latched Products
          </button>

          <button
            onClick={goToNewOrders}
            className="bg-gradient-to-r from-orange-500 to-yellow-500 px-6 py-3 rounded-xl font-semibold hover:scale-105 hover:shadow-[0_0_25px_rgba(255,165,0,0.5)] transition-all duration-300"
          >
            Check New Orders
          </button>
        </div>
      </div>
    </div>
  );
}

export default SellerDashboard;
