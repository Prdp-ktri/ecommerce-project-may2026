import React, { useContext, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react"; // for icons
import { Link, useNavigate } from "react-router-dom";
import { SellerLoginContext } from "../../App";

function SellerHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
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
    navigate("/new-orders-of-seller")
  }

  return (
    <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-blue-500 via-blue-400 to-green-400 text-white shadow-md z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo / Brand */}
        <h1 className="text-xl font-bold pe-5">Seller Portal</h1>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-6">
          {/* Manage Products */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown("products")}
              className="flex items-center hover:text-gray-200"
            >
              Manage Products <ChevronDown className="ml-1 w-4 h-4" />
            </button>
            {openDropdown === "products" && (
              <div className="absolute top-full mt-2 bg-white text-black rounded-md shadow-lg w-48">
                <button
                  onClick={AllProducts}
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  All Products
                </button>
                <button
                  onClick={LatchedProducts}
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Latched Products
                </button>
              </div>
            )}
          </div>

          {/* Manage Orders */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown("orders")}
              className="flex items-center hover:text-gray-200"
            >
              Manage Orders <ChevronDown className="ml-1 w-4 h-4" />
            </button>
            {openDropdown === "orders" && (
              <div className="absolute top-full mt-2 bg-white text-black rounded-md shadow-lg w-56">
                <button
                  onClick={newOrders}
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  New Orders
                </button>
                <a
                  href="#in-transit"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  In Transit Orders
                </a>
                <a
                  href="#delivered"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Delivered Orders
                </a>
              </div>
            )}
          </div>

          {/* Manage Profile */}
          <button onClick={manageProfile} className="hover:text-gray-200">
            Manage Profile
          </button>
        </nav>

        {/* Right-side Login / Sign Up */}
        <div className="hidden md:flex items-center space-x-4">
          <button onClick={handleLogout} className="hover:text-gray-200">
            Logout
          </button>
          <Link
            to="/sellerCreation"
            className="bg-white text-blue-600 px-3 py-1 rounded-md hover:bg-gray-100"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-gradient-to-r from-blue-500 via-blue-400 to-green-400">
          <div className="px-4 py-3 space-y-2">
            <button
              onClick={() => toggleDropdown("products")}
              className="w-full flex justify-between items-center"
            >
              Manage Products <ChevronDown className="w-4 h-4" />
            </button>
            {openDropdown === "products" && (
              <div className="pl-4 space-y-1">
                <button
                  className="block hover:text-gray-300"
                  onClick={AllProducts}
                >
                  All Products
                </button>
                <button
                  className="block hover:text-gray-300"
                  onClick={LatchedProducts}
                >
                  Latched Products
                </button>
              </div>
            )}

            <button
              onClick={() => toggleDropdown("orders")}
              className="w-full flex justify-between items-center"
            >
              Manage Orders <ChevronDown className="w-4 h-4" />
            </button>
            {openDropdown === "orders" && (
              <div className="pl-4 space-y-1">
                <a href="#new-orders" className="block hover:text-gray-300">
                  New Orders
                </a>
                <a href="#in-transit" className="block hover:text-gray-300">
                  In Transit Orders
                </a>
                <a href="#delivered" className="block hover:text-gray-300">
                  Delivered Orders
                </a>
              </div>
            )}

            <a href="#profile" className="block">
              Manage Profile
            </a>

            <div className="border-t border-blue-300 mt-2 pt-2 space-y-2">
              <Link to="/sellerLogin" className="block">
                Logout
              </Link>
              <Link
                to="/sellerCreation"
                className="block bg-white text-blue-600 px-3 py-1 rounded-md"
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
