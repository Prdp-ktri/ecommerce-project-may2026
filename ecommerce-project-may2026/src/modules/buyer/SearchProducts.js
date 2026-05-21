import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

function SearchProducts() {
  // State for all products loaded from localStorage
  const [allLatchedProducts, setAllLatchedProducts] = useState([]);
  // State for the current search query
  const [searchTerm, setSearchTerm] = useState("");
  // Router hook
  const navigate = useNavigate();

  // Load all products from localStorage when the component mounts
  useEffect(() => {
    const allKeys = Object.keys(localStorage);
    const allProducts = [];

    allKeys.forEach((key) => {
      if (key.startsWith("latchedProducts_")) {
        const stored = localStorage.getItem(key);
        if (stored) {
          try {
            const parsed = JSON.parse(stored);

            // Extract sellerEmail from the key
            const sellerEmail = key.replace("latchedProducts_", "");
            // Assuming 'parsed' is an array of products for that seller
            parsed.forEach((p) => {
              allProducts.push({ ...p, sellerEmail });
            });
          } catch (error) {
            console.error("Error parsing latched products for key:", key);
          }
        }
      }
    });
    setAllLatchedProducts(allProducts);
  }, []);

  // Use useMemo to filter the products whenever allLatchedProducts or searchTerm changes
  const filteredProducts = useMemo(() => {
    if (!searchTerm) {
      return allLatchedProducts; // Return all products if search term is empty
    }

    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    // Filter products whose name (or store name) includes the search term
    return allLatchedProducts.filter(
      (product) =>
        product.productName.toLowerCase().includes(lowerCaseSearchTerm) ||
        (product.storeName &&
          product.storeName.toLowerCase().includes(lowerCaseSearchTerm))
    );
  }, [allLatchedProducts, searchTerm]); // Dependencies for recalculation

  // Handler for navigation to product details page
  const handleViewDetails = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-extrabold text-teal-800 mb-6 border-b-2 border-teal-200 pb-2">
        Discover Products
      </h2>

      {/* Visually Appealing Search Bar */}
      <div className="mb-8 max-w-lg mx-auto">
        <div className="relative">
          <input
            type="text"
            placeholder="Search products by name or store..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 pl-10 border-2 border-teal-400 rounded-full shadow-lg focus:outline-none focus:ring-4 focus:ring-teal-200 transition-all duration-300 placeholder-gray-500 text-gray-800"
          />
          {/* Search Icon */}
          <svg
            className="w-5 h-5 text-teal-500 absolute left-3 top-1/2 transform -translate-y-1/2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
          {/* Clear Button */}
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-500 p-1"
              aria-label="Clear search"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Displaying Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <div
              key={product.id || index} // Prefer product.id for key, fallback to index
              onClick={() => handleViewDetails(product.id)}
              className="cursor-pointer bg-white rounded-xl shadow-lg p-4 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 flex flex-col items-center"
            >
              <img
                src={product.productImages}
                alt={product.productName}
                className="w-full h-40 object-cover rounded-lg mb-3"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://via.placeholder.com/160x160.png?text=No+Image"; // Placeholder for broken image
                }}
              />
              <h3 className="text-lg font-bold text-gray-800 text-center mb-1 truncate w-full">
                {product.productName}
              </h3>
              <p className="text-xl font-extrabold text-red-600 mb-2">
                ₹{product.price}
              </p>
              <p className="text-sm font-medium text-white bg-teal-600 px-3 py-1 rounded-full">
                Seller: {product.storeName}
              </p>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-xl text-gray-500">
              {searchTerm
                ? `No products found matching "${searchTerm}".`
                : "No products are currently available."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchProducts;
