import React, { useContext, useEffect, useRef, useState } from "react";

import {
  Menu,
  X,
  ChevronDown,
  Package,
  Truck,
  Boxes,
  Store,
  LogOut,
  Sparkles,
  ShieldCheck,
  ScanLine,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

import { SellerLoginContext } from "../../App";

function SellerHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const [openDropdown, setOpenDropdown] = useState(null);

  const productsRef = useRef(null);

  const ordersRef = useRef(null);

  const mobileMenuRef = useRef(null);

  const { setSellerLogin } = useContext(SellerLoginContext);

  const navigate = useNavigate();

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const AllProducts = (e) => {
    e.preventDefault();
    navigate("/allLatchableProducts");
  };

  const LatchedProducts = (e) => {
    e.preventDefault();
    navigate("/latchedProducts");
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInSeller");
    setSellerLogin(false);
    navigate("/sellerLogin");
  };

  const manageProfile = (e) => {
    e.preventDefault();
    navigate("/manage-profile");
  };

  const newOrders = (e) => {
    e.preventDefault();
    navigate("/new-orders-of-seller");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Products dropdown

      if (productsRef.current && !productsRef.current.contains(event.target)) {
        if (openDropdown === "products") {
          setOpenDropdown(null);
        }
      }

      // Orders dropdown

      if (ordersRef.current && !ordersRef.current.contains(event.target)) {
        if (openDropdown === "orders") {
          setOpenDropdown(null);
        }
      }

      // Mobile menu

      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setMobileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdown]);

  return (
    <header className="fixed top-0 left-0 w-full z-50 text-white">
      {/* Background */}

      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-teal-950 to-slate-950 opacity-95 backdrop-blur-xl border-b border-teal-400/10"></div>

      {/* Glow Effects */}

      <div className="absolute top-0 left-20 w-72 h-72 bg-teal-500/20 blur-3xl rounded-full animate-pulse"></div>

      <div className="absolute top-0 right-20 w-72 h-72 bg-cyan-500/20 blur-3xl rounded-full animate-pulse delay-1000"></div>

      {/* NAVBAR */}

      <div className="relative z-10 max-w-8xl mx-auto flex items-center justify-between px-6 py-4">
        {/* LEFT SECTION */}

        <div className="flex items-center gap-5">
          {/* Seller Logo */}

          <div className="relative">
            <div className="absolute inset-0 bg-teal-400 blur-2xl opacity-30"></div>

            <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center shadow-[0_0_25px_rgba(0,255,200,0.35)] border border-white/20">
              <Store className="text-white" size={32} />
            </div>
          </div>

          {/* Brand */}

          <div>
            <h1 className="text-2xl font-extrabold bg-gradient-to-r from-white via-teal-200 to-cyan-300 bg-clip-text text-transparent">
              Seller Portal
            </h1>

            <p className="text-sm text-teal-200 tracking-wide">
              Ecommerce Seller Workspace
            </p>
          </div>
        </div>

        {/* DESKTOP NAVIGATION */}

        <nav className="hidden lg:flex items-center gap-6">
          {/* PRODUCTS */}

          <div className="relative" ref={productsRef}>
            <button
              onClick={() => toggleDropdown("products")}
              className="relative overflow-hidden flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/15 backdrop-blur-xl border border-teal-400/20 text-white hover:border-teal-300 hover:bg-teal-500/20 hover:text-teal-100 transition-all duration-300 shadow-lg hover:shadow-[0_0_25px_rgba(0,255,200,0.2)]"
            >
              <span className="absolute inset-0 opacity-0 hover:opacity-100 bg-gradient-to-r from-transparent via-white/10 to-transparent transition duration-500"></span>

              <Boxes size={18} className="text-teal-300 relative z-10" />

              <span className="relative z-10 font-medium">Manage Products</span>

              <ChevronDown
                size={18}
                className={`relative z-10 transition-transform duration-300 ${
                  openDropdown === "products" ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown */}

            {openDropdown === "products" && (
              <div className="absolute top-16 left-0 w-64 bg-slate-800/95 backdrop-blur-2xl border border-teal-400/20 rounded-3xl shadow-[0_0_40px_rgba(0,255,200,0.2)] overflow-hidden animate-fade-in">
                <button
                  onClick={AllProducts}
                  className="w-full flex items-center gap-3 px-5 py-4 text-white hover:bg-teal-400/20 hover:text-teal-200 transition border-b border-white/5"
                >
                  <Package size={18} className="text-teal-300" />
                  All Products
                </button>

                <button
                  onClick={LatchedProducts}
                  className="w-full flex items-center gap-3 px-5 py-4 text-white hover:bg-cyan-400/20 hover:text-cyan-200 transition"
                >
                  <Boxes size={18} className="text-cyan-300" />
                  Latched Products
                </button>
              </div>
            )}
          </div>

          {/* ORDERS */}

          <div className="relative" ref={ordersRef}>
            <button
              onClick={() => toggleDropdown("orders")}
              className="relative overflow-hidden flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/15 backdrop-blur-xl border border-orange-400/20 text-white hover:border-orange-300 hover:bg-orange-500/20 hover:text-orange-100 transition-all duration-300 shadow-lg hover:shadow-[0_0_25px_rgba(255,165,0,0.2)]"
            >
              <span className="absolute inset-0 opacity-0 hover:opacity-100 bg-gradient-to-r from-transparent via-white/10 to-transparent transition duration-500"></span>

              <Truck size={18} className="text-orange-300 relative z-10" />

              <span className="relative z-10 font-medium">Manage Orders</span>

              <ChevronDown
                size={18}
                className={`relative z-10 transition-transform duration-300 ${
                  openDropdown === "orders" ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown */}

            {openDropdown === "orders" && (
              <div className="absolute top-16 left-0 w-72 bg-slate-800/95 backdrop-blur-2xl border border-orange-400/20 rounded-3xl shadow-[0_0_40px_rgba(255,165,0,0.2)] overflow-hidden animate-fade-in">
                <button
                  onClick={newOrders}
                  className="w-full flex items-center gap-3 px-5 py-4 text-white hover:bg-orange-400/20 hover:text-orange-200 transition border-b border-white/5"
                >
                  <Truck size={18} className="text-orange-300" />
                  New Orders
                </button>

                <button className="w-full flex items-center gap-3 px-5 py-4 text-white hover:bg-yellow-400/20 hover:text-yellow-200 transition border-b border-white/5">
                  <ScanLine size={18} className="text-yellow-300" />
                  In Transit Orders
                </button>

                <button className="w-full flex items-center gap-3 px-5 py-4 text-white hover:bg-green-400/20 hover:text-green-200 transition">
                  <ShieldCheck size={18} className="text-green-300" />
                  Delivered Orders
                </button>
              </div>
            )}
          </div>

          {/* PROFILE */}

          <button
            onClick={manageProfile}
            className="relative overflow-hidden flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/15 backdrop-blur-xl border border-cyan-400/20 text-white hover:border-cyan-300 hover:bg-cyan-500/20 hover:text-cyan-100 transition-all duration-300 shadow-lg hover:shadow-[0_0_25px_rgba(0,200,255,0.2)]"
          >
            <span className="absolute inset-0 opacity-0 hover:opacity-100 bg-gradient-to-r from-transparent via-white/10 to-transparent transition duration-500"></span>

            <Sparkles size={18} className="text-cyan-300 relative z-10" />

            <span className="relative z-10">Manage Profile</span>
          </button>
        </nav>

        {/* RIGHT SECTION */}

        <div className="hidden lg:flex items-center gap-4">
          {/* Seller Active */}

          <div className="flex items-center gap-2 bg-green-500/10 border border-green-400/20 px-4 py-2 rounded-full backdrop-blur-md shadow-lg">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-ping"></span>

            <span className="text-sm text-green-300 font-medium">
              Seller Active
            </span>
          </div>

          {/* Logout */}

          <button
            onClick={handleLogout}
            className="group relative overflow-hidden bg-gradient-to-r from-red-500 via-pink-500 to-rose-500 px-5 py-3 rounded-2xl font-semibold shadow-[0_0_30px_rgba(255,0,100,0.35)] hover:scale-105 hover:shadow-[0_0_35px_rgba(255,0,100,0.5)] transition-all duration-300"
          >
            <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition"></span>

            <span className="relative flex items-center gap-2">
              <LogOut size={18} />
              Logout
            </span>
          </button>

          {/* Signup */}

          <Link
            to="/sellerCreation"
            className="relative overflow-hidden bg-gradient-to-r from-teal-500 to-cyan-500 px-5 py-3 rounded-2xl font-semibold hover:scale-105 hover:shadow-[0_0_25px_rgba(0,255,200,0.35)] transition-all duration-300"
          >
            Sign Up
          </Link>
        </div>

        {/* MOBILE BUTTON */}

        <button
          className="lg:hidden relative z-20 p-3 rounded-2xl bg-white/15 border border-teal-400/20 hover:bg-teal-500/20 transition shadow-lg"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* MOBILE MENU */}

      {mobileOpen && (
        <div
          className="lg:hidden relative z-10 px-6 pb-6 animate-slide-down"
          ref={mobileMenuRef}
        >
          <div className="bg-slate-800/95 backdrop-blur-2xl border border-teal-400/20 rounded-3xl p-5 space-y-4 shadow-[0_0_40px_rgba(0,255,200,0.15)]">
            {/* Products */}

            <button
              onClick={() => toggleDropdown("products")}
              className="w-full flex justify-between items-center px-5 py-4 rounded-2xl bg-white/10 text-white border border-white/10 hover:bg-teal-500/20 transition"
            >
              <span className="flex items-center gap-3">
                <Boxes className="text-teal-300" size={20} />
                Manage Products
              </span>

              <ChevronDown size={18} />
            </button>

            {openDropdown === "products" && (
              <div className="pl-5 space-y-3">
                <button
                  className="block text-white hover:text-teal-300"
                  onClick={AllProducts}
                >
                  All Products
                </button>

                <button
                  className="block text-white hover:text-cyan-300"
                  onClick={LatchedProducts}
                >
                  Latched Products
                </button>
              </div>
            )}

            {/* Orders */}

            <button
              onClick={() => toggleDropdown("orders")}
              className="w-full flex justify-between items-center px-5 py-4 rounded-2xl bg-white/10 text-white border border-white/10 hover:bg-orange-500/20 transition"
            >
              <span className="flex items-center gap-3">
                <Truck className="text-orange-300" size={20} />
                Manage Orders
              </span>

              <ChevronDown size={18} />
            </button>

            {openDropdown === "orders" && (
              <div className="pl-5 space-y-3">
                <button
                  className="block text-white hover:text-orange-300"
                  onClick={newOrders}
                >
                  New Orders
                </button>

                <button className="block text-white hover:text-yellow-300">
                  In Transit Orders
                </button>

                <button className="block text-white hover:text-green-300">
                  Delivered Orders
                </button>
              </div>
            )}

            {/* Profile */}

            <button
              onClick={manageProfile}
              className="w-full flex items-center gap-3 px-5 py-4 rounded-2xl bg-white/10 text-white border border-white/10 hover:bg-cyan-500/20 transition"
            >
              <Sparkles className="text-cyan-300" size={20} />
              Manage Profile
            </button>

            {/* Bottom Buttons */}

            <div className="border-t border-white/10 pt-5 space-y-4">
              <button
                onClick={handleLogout}
                className="w-full bg-gradient-to-r from-red-500 via-pink-500 to-rose-500 px-5 py-4 rounded-2xl font-semibold shadow-[0_0_30px_rgba(255,0,100,0.35)] hover:scale-[1.02] transition-all duration-300"
              >
                Logout
              </button>

              <Link
                to="/sellerCreation"
                className="block text-center bg-gradient-to-r from-teal-500 to-cyan-500 px-5 py-4 rounded-2xl font-semibold hover:scale-[1.02] transition-all duration-300"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default SellerHeader;
