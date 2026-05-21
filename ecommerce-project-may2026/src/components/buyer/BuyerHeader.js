import React, { useState, useEffect } from "react";
import { ChevronDown, ShoppingCart } from "lucide-react"; // Imported ShoppingCart icon
import { Link, useNavigate } from "react-router-dom";

// Key for storing the cart in localStorage (must match the key used in ProductDetails)
const CART_STORAGE_KEY = "buyerCartItems";

function BuyerHeader() {
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(null);
  // State to hold the current number of items in the cart
  const [cartItemCount, setCartItemCount] = useState(0);

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
    <header className="bg-gradient-to-r from-orange-500 to-yellow-400 shadow-md relative z-50">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo / Title */}
        <div className="text-white text-2xl font-bold tracking-wide">
          Buyer Portal
        </div>

        {/* Nav Links */}
        {/* Added extra space for the cart icon */}
        <nav className="flex space-x-6 text-white font-medium items-center relative">
          {/* Products Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setOpenDropdown("products")}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button className="flex items-center space-x-1 hover:text-gray-200 focus:outline-none">
              <span>Products</span>
              <ChevronDown size={16} />
            </button>
            {openDropdown === "products" && (
              <div className="absolute left-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg transition-all duration-200">
                <button
                  onClick={SearchProducts}
                  className="block px-4 py-2 hover:bg-yellow-100 rounded-t-md"
                >
                  Search Products
                </button>
                <button
                  onClick={ViewAllProducts}
                  className="block w-full text-left px-4 py-2 hover:bg-yellow-100 rounded-b-md"
                >
                  View All Products
                </button>
              </div>
            )}
          </div>

          {/* Delivery Status Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setOpenDropdown("delivery")}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button className="flex items-center space-x-1 hover:text-gray-200 focus:outline-none">
              <span>Delivery Status</span>
              <ChevronDown size={16} />
            </button>
            {openDropdown === "delivery" && (
              <div className="absolute left-0 mt-2 w-52 bg-white text-gray-800 rounded-md shadow-lg transition-all duration-200">
                <button
                  onClick={trackyourorder}
                  className="block px-4 py-2 hover:bg-yellow-100 rounded-t-md"
                >
                  Track Your Order
                </button>
                <button
                  onClick={deliveredOrders}
                  className="block px-4 py-2 hover:bg-yellow-100 rounded-b-md"
                >
                  Delivered Orders
                </button>
              </div>
            )}
          </div>

          {/* Manage Profile Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setOpenDropdown("profile")}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button className="flex items-center space-x-1 hover:text-gray-200 focus:outline-none">
              <span>Manage Profile</span>
              <ChevronDown size={16} />
            </button>
            {openDropdown === "profile" && (
              <div className="absolute left-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg transition-all duration-200">
                <Link
                  to={"/edit-profile"}
                  className="block px-4 py-2 hover:bg-yellow-100 rounded-md"
                >
                  Edit Profile
                </Link>
                <Link
                  to={"/view-profile"}
                  className="block px-4 py-2 hover:bg-yellow-100 rounded-md"
                >
                  View Profile
                </Link>
              </div>
            )}
          </div>

          {/* ✅ NEW: Cart Icon Button */}
          <button
            onClick={goToCart}
            className="relative p-2 hover:bg-yellow-500/20 rounded-full transition focus:outline-none"
            aria-label={`Shopping Cart with ${cartItemCount} items`}
          >
            <ShoppingCart size={24} />
            {/* Cart Count Badge */}
            {cartItemCount > 0 && (
              <span className="absolute top-0 right-0 transform translate-x-1 -translate-y-1 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-orange-500">
                {cartItemCount}
              </span>
            )}
          </button>

          {/* Sign Out Button */}
          <button
            onClick={SignOut}
            className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition"
          >
            Sign Out
          </button>
        </nav>
      </div>
    </header>
  );
}

export default BuyerHeader;
