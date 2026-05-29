import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, ShoppingCart } from "lucide-react"; // Imported ShoppingCart icon
import { Link, useNavigate } from "react-router-dom";

// Key for storing the cart in localStorage (must match the key used in ProductDetails)
const CART_STORAGE_KEY = "buyerCartItems";

function BuyerHeader() {
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(null);
  // State to hold the current number of items in the cart
  const [cartItemCount, setCartItemCount] = useState(0);

  const productsRef = useRef(null);
  const deliveryRef = useRef(null);
  const profileRef = useRef(null);

  // Function to read the cart count from localStorage
  const getCartCount = () => {
    try {
      const storedCart = localStorage.getItem(CART_STORAGE_KEY);
      const items = storedCart ? JSON.parse(storedCart) : [];
      setCartItemCount(items.length);
    } catch (e) {
      console.error("Error reading cart from localStorage:", e);
      setCartItemCount(0);
    }
  };

  // Listen for changes in localStorage (e.g., when an item is added)
  // This uses a Window event listener, which is the standard way to communicate
  // changes across tabs/components when relying purely on localStorage.
  useEffect(() => {
    getCartCount();

    // Event listener to update cart count whenever localStorage changes
    const handleStorageChange = () => {
      getCartCount();
    };

    window.addEventListener("storage", handleStorageChange);
    // Use an interval to periodically check if the storage key exists (fallback)
    const interval = setInterval(getCartCount, 1000);

    // Cleanup function
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []); // Run only on mount

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Products
      if (productsRef.current && !productsRef.current.contains(event.target)) {
        if (openDropdown === "products") {
          setOpenDropdown(null);
        }
      }

      // Delivery
      if (deliveryRef.current && !deliveryRef.current.contains(event.target)) {
        if (openDropdown === "delivery") {
          setOpenDropdown(null);
        }
      }

      // Profile
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        if (openDropdown === "profile") {
          setOpenDropdown(null);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdown]);

  // const handleDropdown = (menu) => {
  //   setOpenDropdown(openDropdown === menu ? null : menu);
  // };

  const SignOut = (e) => {
    e.preventDefault();
    navigate("/buyerLogin");
  };

  const ViewAllProducts = (e) => {
    e.preventDefault();
    navigate("/viewAllProducts");
  };

  const SearchProducts = (e) => {
    e.preventDefault();
    navigate("/searchProducts");
  };

  // Function to navigate to the Cart page
  const goToCart = () => {
    navigate("/cart"); // Ensure you have a route configured for '/cart'
  };

  const trackyourorder = () => {
    navigate("/track-your-order");
  };

  const deliveredOrders = () => {
    navigate("/deliveredorders");
  };

  // const editprofile = (id) => {
  //   navigate(`/edit-profile/${id}`);
  // };

  return (
    <header className="fixed top-0 left-0 w-full z-50 text-white">
      {/* Background */}

      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-orange-950 to-slate-950 opacity-95 backdrop-blur-xl border-b border-orange-400/10"></div>

      {/* Glow Effects */}

      <div className="absolute top-0 left-20 w-72 h-72 bg-orange-500/20 blur-3xl rounded-full animate-pulse"></div>

      <div className="absolute top-0 right-20 w-72 h-72 bg-yellow-500/20 blur-3xl rounded-full animate-pulse delay-1000"></div>

      {/* NAVBAR */}

      <div className="relative z-10 w-full px-6 py-4 flex justify-between items-center">
        {/* LEFT SECTION */}

        <div className="flex items-center gap-5">
          {/* Ecommerce Logo */}

          <div className="relative">
            <div className="absolute inset-0 bg-orange-400 blur-2xl opacity-30"></div>

            <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-yellow-500 flex items-center justify-center shadow-[0_0_25px_rgba(255,165,0,0.35)] border border-white/20">
              <ShoppingCart className="text-white" size={32} />
            </div>
          </div>

          {/* Brand */}

          <div>
            <h1 className="text-2xl font-extrabold bg-gradient-to-r from-white via-orange-200 to-yellow-300 bg-clip-text text-transparent">
              Buyer Portal
            </h1>

            <p className="text-sm text-orange-200 tracking-wide">
              Smart Ecommerce Shopping Experience
            </p>
          </div>
        </div>

        {/* NAVIGATION */}

        <nav className="hidden lg:flex items-center gap-6 relative">
          {/* PRODUCTS */}

          <div className="relative" ref={productsRef}>
            <button
              onClick={() =>
                setOpenDropdown(openDropdown === "products" ? null : "products")
              }
              className="relative overflow-hidden flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/15 backdrop-blur-xl border border-orange-400/20 text-white hover:border-orange-300 hover:bg-orange-500/20 hover:text-orange-100 transition-all duration-300 shadow-lg hover:shadow-[0_0_25px_rgba(255,165,0,0.2)]"
            >
              <span className="absolute inset-0 opacity-0 hover:opacity-100 bg-gradient-to-r from-transparent via-white/10 to-transparent transition duration-500"></span>

              <ShoppingCart
                size={18}
                className="text-orange-300 relative z-10"
              />

              <span className="relative z-10 font-medium">Products</span>

              <ChevronDown size={18} className="relative z-10" />
            </button>

            {/* Dropdown */}

            {openDropdown === "products" && (
              <div className="absolute top-16 left-0 w-64 bg-slate-800/95 backdrop-blur-2xl border border-orange-400/20 rounded-3xl shadow-[0_0_40px_rgba(255,165,0,0.2)] overflow-hidden animate-fade-in">
                <button
                  onClick={SearchProducts}
                  className="w-full text-left flex items-center gap-3 px-5 py-4 text-white hover:bg-orange-400/20 hover:text-orange-200 transition border-b border-white/5"
                >
                  <ShoppingCart size={18} className="text-orange-300" />
                  Search Products
                </button>

                <button
                  onClick={ViewAllProducts}
                  className="w-full text-left flex items-center gap-3 px-5 py-4 text-white hover:bg-yellow-400/20 hover:text-yellow-200 transition"
                >
                  <ShoppingCart size={18} className="text-yellow-300" />
                  View All Products
                </button>
              </div>
            )}
          </div>

          {/* DELIVERY */}

          <div className="relative" ref={deliveryRef}>
            <button
              onClick={() =>
                setOpenDropdown(openDropdown === "delivery" ? null : "delivery")
              }
              className="relative overflow-hidden flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/15 backdrop-blur-xl border border-cyan-400/20 text-white hover:border-cyan-300 hover:bg-cyan-500/20 hover:text-cyan-100 transition-all duration-300 shadow-lg hover:shadow-[0_0_25px_rgba(0,200,255,0.2)]"
            >
              <span className="absolute inset-0 opacity-0 hover:opacity-100 bg-gradient-to-r from-transparent via-white/10 to-transparent transition duration-500"></span>

              <ShoppingCart size={18} className="text-cyan-300 relative z-10" />

              <span className="relative z-10 font-medium">Delivery Status</span>

              <ChevronDown size={18} className="relative z-10" />
            </button>

            {/* Dropdown */}

            {openDropdown === "delivery" && (
              <div className="absolute top-16 left-0 w-72 bg-slate-800/95 backdrop-blur-2xl border border-cyan-400/20 rounded-3xl shadow-[0_0_40px_rgba(0,200,255,0.2)] overflow-hidden animate-fade-in">
                <button
                  onClick={trackyourorder}
                  className="w-full text-left flex items-center gap-3 px-5 py-4 text-white hover:bg-cyan-400/20 hover:text-cyan-200 transition border-b border-white/5"
                >
                  <ShoppingCart size={18} className="text-cyan-300" />
                  Track Your Order
                </button>

                <button
                  onClick={deliveredOrders}
                  className="w-full text-left flex items-center gap-3 px-5 py-4 text-white hover:bg-green-400/20 hover:text-green-200 transition"
                >
                  <ShoppingCart size={18} className="text-green-300" />
                  Delivered Orders
                </button>
              </div>
            )}
          </div>

          {/* PROFILE */}

          <div className="relative" ref={profileRef}>
            <button
              onClick={() =>
                setOpenDropdown(openDropdown === "profile" ? null : "profile")
              }
              className="relative overflow-hidden flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/15 backdrop-blur-xl border border-yellow-400/20 text-white hover:border-yellow-300 hover:bg-yellow-500/20 hover:text-yellow-100 transition-all duration-300 shadow-lg hover:shadow-[0_0_25px_rgba(255,255,0,0.2)]"
            >
              <span className="absolute inset-0 opacity-0 hover:opacity-100 bg-gradient-to-r from-transparent via-white/10 to-transparent transition duration-500"></span>

              <ShoppingCart
                size={18}
                className="text-yellow-300 relative z-10"
              />

              <span className="relative z-10 font-medium">Manage Profile</span>

              <ChevronDown size={18} className="relative z-10" />
            </button>

            {/* Dropdown */}

            {openDropdown === "profile" && (
              <div className="absolute top-16 left-0 w-64 bg-slate-800/95 backdrop-blur-2xl border border-yellow-400/20 rounded-3xl shadow-[0_0_40px_rgba(255,255,0,0.2)] overflow-hidden animate-fade-in">
                <Link
                  to={"/edit-profile"}
                  className="block px-5 py-4 text-white hover:bg-yellow-400/20 hover:text-yellow-200 transition border-b border-white/5"
                >
                  Edit Profile
                </Link>

                <Link
                  to={"/view-profile"}
                  className="block px-5 py-4 text-white hover:bg-orange-400/20 hover:text-orange-200 transition"
                >
                  View Profile
                </Link>
              </div>
            )}
          </div>

          {/* CART */}

          <button
            onClick={goToCart}
            className="relative overflow-hidden p-4 rounded-2xl bg-white/15 backdrop-blur-xl border border-orange-400/20 text-white hover:border-orange-300 hover:bg-orange-500/20 transition-all duration-300 shadow-lg hover:shadow-[0_0_25px_rgba(255,165,0,0.25)]"
            aria-label={`Shopping Cart with ${cartItemCount} items`}
          >
            <span className="absolute inset-0 opacity-0 hover:opacity-100 bg-gradient-to-r from-transparent via-white/10 to-transparent transition duration-500"></span>

            <ShoppingCart size={24} className="relative z-10 text-orange-300" />

            {/* Cart Badge */}

            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold min-w-[22px] h-[22px] flex items-center justify-center rounded-full border-2 border-slate-900 shadow-[0_0_20px_rgba(255,0,100,0.5)] animate-pulse">
                {cartItemCount}
              </span>
            )}
          </button>

          {/* SIGN OUT */}

          <button
            onClick={SignOut}
            className="group relative overflow-hidden bg-gradient-to-r from-red-500 via-pink-500 to-rose-500 px-5 py-3 rounded-2xl font-semibold shadow-[0_0_30px_rgba(255,0,100,0.35)] hover:scale-105 hover:shadow-[0_0_35px_rgba(255,0,100,0.5)] transition-all duration-300"
          >
            <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition"></span>

            <span className="relative">Sign Out</span>
          </button>
        </nav>
      </div>
    </header>
  );
}

export default BuyerHeader;
