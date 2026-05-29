import {
  Menu,
  X,
  ShieldCheck,
  PackagePlus,
  Users,
  Store,
  Sparkles,
  ScanLine,
  LogOut,
  ChevronDown,
} from "lucide-react";

import React, { useContext, useEffect, useRef, useState } from "react";

import { AdminLoginContext } from "../../App";

import { Link, useNavigate } from "react-router-dom";

import fashionRetreat from "../../fashion-retreat.jpg";

function AdminHeader() {
  const [isProductsOpen, setProductsOpen] = useState(false);

  const [isProfilesOpen, setProfilesOpen] = useState(false);

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const productsRef = useRef(null);

  const profilesRef = useRef(null);

  const { setAdminLogin } = useContext(AdminLoginContext);

  const navigate = useNavigate();

  const handleLogOut = () => {
    setAdminLogin(false);
    navigate("/");
  };

  const redirectToManageAdmin = (e) => {
    e.preventDefault();
    navigate("/manage-admin");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (productsRef.current && !productsRef.current.contains(event.target)) {
        setProductsOpen(false);
      }

      if (profilesRef.current && !profilesRef.current.contains(event.target)) {
        setProfilesOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 text-white">
      {/* Background */}

      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-cyan-950 to-slate-950 opacity-95 backdrop-blur-xl border-b border-cyan-400/10"></div>

      {/* Glow Effects */}

      <div className="absolute top-0 left-20 w-72 h-72 bg-cyan-500/20 blur-3xl rounded-full animate-pulse"></div>

      <div className="absolute top-0 right-20 w-72 h-72 bg-teal-500/20 blur-3xl rounded-full animate-pulse delay-1000"></div>

      {/* NAVBAR */}

      <nav className="relative z-10 max-w-8xl mx-auto flex items-center justify-between px-6 py-4">
        {/* LEFT SECTION */}

        <div className="flex items-center gap-5">
          {/* Logo */}

          <div className="relative group">
            <div className="absolute inset-0 bg-cyan-400 blur-2xl opacity-30 group-hover:opacity-50 transition"></div>

            <img
              src={fashionRetreat}
              alt="Fashion Retreat"
              className="relative h-[78px] w-[150px] object-cover rounded-2xl bg-white p-2 border border-cyan-400/20 shadow-[0_0_25px_rgba(0,255,255,0.2)] hover:scale-105 transition duration-300"
            />
          </div>

          {/* Brand */}

          <div>
            <h1 className="text-2xl font-extrabold bg-gradient-to-r from-white via-cyan-200 to-teal-300 bg-clip-text text-transparent">
              Fashion Retreat
            </h1>

            <p className="text-sm text-cyan-200 tracking-wide">
              Ecommerce Admin Control Center
            </p>
          </div>
        </div>

        {/* DESKTOP NAVIGATION */}

        <ul className="hidden lg:flex items-center gap-6">
          {/* PRODUCTS DROPDOWN */}

          <li className="relative" ref={productsRef}>
            <button
              onClick={() => setProductsOpen(!isProductsOpen)}
              className="relative overflow-hidden flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/15 backdrop-blur-xl border border-cyan-400/20 text-white hover:border-cyan-300 hover:bg-cyan-500/20 hover:text-cyan-100 transition-all duration-300 shadow-lg hover:shadow-[0_0_25px_rgba(0,255,255,0.2)]"
            >
              <span className="absolute inset-0 opacity-0 hover:opacity-100 bg-gradient-to-r from-transparent via-white/10 to-transparent transition duration-500"></span>

              <PackagePlus size={18} className="text-cyan-300 relative z-10" />

              <span className="font-medium relative z-10">Products</span>

              <ChevronDown
                size={18}
                className={`relative z-10 transition-transform duration-300 ${
                  isProductsOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown */}

            {isProductsOpen && (
              <div className="absolute top-16 left-0 w-64 bg-slate-800/95 backdrop-blur-2xl border border-cyan-400/20 rounded-3xl shadow-[0_0_40px_rgba(0,255,255,0.2)] overflow-hidden animate-fade-in">
                <Link
                  to={"/addProduct"}
                  className="flex items-center gap-3 px-5 py-4 text-white hover:bg-cyan-400/20 hover:text-cyan-200 transition border-b border-white/5"
                >
                  <PackagePlus size={18} className="text-cyan-300" />

                  <span>Add Product</span>
                </Link>

                <Link
                  to={"/manageProducts"}
                  className="flex items-center gap-3 px-5 py-4 text-white hover:bg-orange-400/20 hover:text-orange-200 transition border-b border-white/5"
                >
                  <Store size={18} className="text-orange-300" />

                  <span>Manage Products</span>
                </Link>

                <Link
                  to={"/viewProducts"}
                  className="flex items-center gap-3 px-5 py-4 text-white hover:bg-green-400/20 hover:text-green-200 transition"
                >
                  <ScanLine size={18} className="text-green-300" />

                  <span>View Products</span>
                </Link>
              </div>
            )}
          </li>

          {/* SELLERS */}

          <li>
            <button
              onClick={() => navigate("/full-seller-list")}
              className="relative overflow-hidden flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/15 backdrop-blur-xl border border-orange-400/20 text-white hover:border-orange-300 hover:bg-orange-500/20 hover:text-orange-100 transition-all duration-300 shadow-lg hover:shadow-[0_0_25px_rgba(255,165,0,0.2)]"
            >
              <span className="absolute inset-0 opacity-0 hover:opacity-100 bg-gradient-to-r from-transparent via-white/10 to-transparent transition duration-500"></span>

              <Store size={18} className="text-orange-300 relative z-10" />

              <span className="relative z-10">Sellers</span>
            </button>
          </li>

          {/* BUYERS */}

          <li>
            <button
              onClick={() => navigate("/full-buyers-list")}
              className="relative overflow-hidden flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/15 backdrop-blur-xl border border-teal-400/20 text-white hover:border-teal-300 hover:bg-teal-500/20 hover:text-teal-100 transition-all duration-300 shadow-lg hover:shadow-[0_0_25px_rgba(0,255,200,0.2)]"
            >
              <span className="absolute inset-0 opacity-0 hover:opacity-100 bg-gradient-to-r from-transparent via-white/10 to-transparent transition duration-500"></span>

              <Users size={18} className="text-teal-300 relative z-10" />

              <span className="relative z-10">Buyers</span>
            </button>
          </li>

          {/* MANAGE PROFILE */}

          <li className="relative" ref={profilesRef}>
            <button
              onClick={redirectToManageAdmin}
              className="relative overflow-hidden flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/15 backdrop-blur-xl border border-yellow-400/20 text-white hover:border-yellow-300 hover:bg-yellow-500/20 hover:text-yellow-100 transition-all duration-300 shadow-lg hover:shadow-[0_0_25px_rgba(255,255,0,0.2)]"
            >
              <span className="absolute inset-0 opacity-0 hover:opacity-100 bg-gradient-to-r from-transparent via-white/10 to-transparent transition duration-500"></span>

              <ShieldCheck
                size={18}
                className="text-yellow-300 relative z-10"
              />

              <span className="relative z-10">Manage Profile</span>
            </button>
          </li>
        </ul>

        {/* RIGHT SECTION */}

        <div className="hidden lg:flex items-center gap-4">
          {/* System Active */}

          <div className="flex items-center gap-2 bg-green-500/10 border border-green-400/20 px-4 py-2 rounded-full backdrop-blur-md shadow-lg">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-ping"></span>

            <span className="text-sm text-green-300 font-medium">
              System Active
            </span>
          </div>

          {/* LOGOUT */}

          <button
            onClick={handleLogOut}
            className="group relative overflow-hidden bg-gradient-to-r from-red-500 via-pink-500 to-rose-500 px-5 py-3 rounded-2xl font-semibold shadow-[0_0_30px_rgba(255,0,100,0.35)] hover:scale-105 hover:shadow-[0_0_35px_rgba(255,0,100,0.5)] transition-all duration-300"
          >
            <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition"></span>

            <span className="relative flex items-center gap-2">
              <LogOut size={18} />
              Logout
            </span>
          </button>
        </div>

        {/* MOBILE MENU BUTTON */}

        <button
          className="lg:hidden relative z-20 p-3 rounded-2xl bg-white/15 border border-cyan-400/20 hover:bg-cyan-500/20 transition shadow-lg"
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* MOBILE MENU */}

      {isMobileMenuOpen && (
        <div className="lg:hidden relative z-10 px-6 pb-6 animate-slide-down">
          <div className="bg-slate-800/95 backdrop-blur-2xl border border-cyan-400/20 rounded-3xl p-5 space-y-4 shadow-[0_0_40px_rgba(0,255,255,0.15)]">
            <button
              onClick={() => navigate("/addProduct")}
              className="w-full flex items-center gap-3 px-5 py-4 rounded-2xl bg-white/10 text-white border border-white/10 hover:bg-cyan-500/20 transition"
            >
              <PackagePlus className="text-cyan-300" size={20} />
              Add Product
            </button>

            <button
              onClick={() => navigate("/manageProducts")}
              className="w-full flex items-center gap-3 px-5 py-4 rounded-2xl bg-white/10 text-white border border-white/10 hover:bg-orange-500/20 transition"
            >
              <Store className="text-orange-300" size={20} />
              Manage Products
            </button>

            <button
              onClick={() => navigate("/viewProducts")}
              className="w-full flex items-center gap-3 px-5 py-4 rounded-2xl bg-white/10 text-white border border-white/10 hover:bg-green-500/20 transition"
            >
              <ScanLine className="text-green-300" size={20} />
              View Products
            </button>

            <button
              onClick={() => navigate("/full-seller-list")}
              className="w-full flex items-center gap-3 px-5 py-4 rounded-2xl bg-white/10 text-white border border-white/10 hover:bg-yellow-500/20 transition"
            >
              <Store className="text-yellow-300" size={20} />
              Sellers
            </button>

            <button
              onClick={() => navigate("/full-buyers-list")}
              className="w-full flex items-center gap-3 px-5 py-4 rounded-2xl bg-white/10 text-white border border-white/10 hover:bg-teal-500/20 transition"
            >
              <Users className="text-teal-300" size={20} />
              Buyers
            </button>

            <button
              onClick={redirectToManageAdmin}
              className="w-full flex items-center gap-3 px-5 py-4 rounded-2xl bg-white/10 text-white border border-white/10 hover:bg-cyan-500/20 transition"
            >
              <ShieldCheck className="text-cyan-300" size={20} />
              Manage Profile
            </button>

            <button
              onClick={handleLogOut}
              className="w-full bg-gradient-to-r from-red-500 via-pink-500 to-rose-500 px-5 py-4 rounded-2xl font-semibold shadow-[0_0_30px_rgba(255,0,100,0.35)] hover:scale-[1.02] transition-all duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default AdminHeader;
