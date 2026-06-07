import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ViewAllProducts() {
  const [allLatchedProducts, setAllLatchedProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [maxPrice, setMaxPrice] = useState(149999);

  const navigate = useNavigate();

  useEffect(() => {
    const allKeys = Object.keys(localStorage);
    const allProducts = [];

    allKeys.forEach((key) => {
      if (key.startsWith("latchedProducts_")) {
        const stored = localStorage.getItem(key);

        if (stored) {
          try {
            const parsed = JSON.parse(stored);

            const sellerEmail = key.replace("latchedProducts_", "");

            parsed.forEach((p) => {
              allProducts.push({
                ...p,
                sellerEmail,
              });
            });
          } catch (error) {
            console.error("Error parsing latched products:", key);
          }
        }
      }
    });

    const sortedProducts = allProducts.sort((a, b) =>
      a.productCategory?.localeCompare(b.productCategory),
    );

    setAllLatchedProducts(sortedProducts);
  }, []);

  const handleViewDetails = (productId) => {
    navigate(`/product/${productId}`);
  };

  const filteredProducts = allLatchedProducts.filter((p) => {
    const categoryMatch = selectedCategory
      ? p.productCategory?.toLowerCase() === selectedCategory.toLowerCase()
      : true;

    const priceMatch = Number(p.price) <= maxPrice;

    return categoryMatch && priceMatch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-orange-950 to-slate-900 text-white pt-32 px-6 pb-10 relative overflow-hidden">
      {/* Glow Effects */}

      <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl"></div>

      {/* Header */}

      <div className="text-center mb-12 relative z-10">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-orange-300 via-yellow-300 to-orange-500 bg-clip-text text-transparent mb-3">
          Explore Products
        </h1>

        <p className="text-gray-300 text-lg">
          Discover premium furniture, mattresses, sofas and home essentials
        </p>

        <div className="mt-5 inline-block bg-orange-500/20 border border-orange-400/20 px-5 py-2 rounded-full">
          <span className="text-orange-300 font-semibold">
            {filteredProducts.length} Products Available
          </span>
        </div>
      </div>

      {/* Filters */}

      <div className="max-w-4xl mx-auto mb-12 relative z-10">
        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          <h3 className="text-2xl font-bold text-orange-300 mb-6">
            Filter Products
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Category */}

            <div>
              <label className="block mb-3 font-semibold text-orange-200">
                Product Category
              </label>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-slate-800 border border-orange-400/20 rounded-2xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <option value="">All Categories</option>

                <option value="bed">Bed</option>

                <option value="mattress">Mattress</option>

                <option value="sofa">Sofa</option>

                <option value="mats">Mats</option>
              </select>
            </div>

            {/* Price */}

            <div>
              <label className="block mb-3 font-semibold text-orange-200">
                Maximum Price
              </label>

              <div className="bg-slate-800 rounded-2xl p-4">
                <p className="text-yellow-300 font-bold text-xl mb-3">
                  ₹{maxPrice.toLocaleString()}
                </p>

                <input
                  type="range"
                  min="4999"
                  max="149999"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-orange-500 cursor-pointer"
                />

                <div className="flex justify-between text-sm text-gray-400 mt-2">
                  <span>₹4,999</span>
                  <span>₹149,999</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 relative z-10">
          {filteredProducts.map((product, index) => (
            <div
              key={index}
              onClick={() => handleViewDetails(product.id)}
              className="group cursor-pointer bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden hover:-translate-y-3 hover:border-orange-400/30 hover:shadow-[0_0_35px_rgba(255,165,0,0.25)] transition-all duration-500"
            >
              {/* Image */}

              <div className="relative overflow-hidden">
                <img
                  src={product.productImages}
                  alt={product.productName}
                  className="w-full h-64 object-cover group-hover:scale-110 transition duration-700"
                />

                <div className="absolute top-3 right-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                  ₹{product.price}
                </div>
              </div>

              {/* Details */}

              <div className="p-5">
                <h3 className="text-xl font-bold text-white mb-3">
                  {product.productName}
                </h3>

                <div className="inline-block bg-cyan-500/20 border border-cyan-400/20 px-3 py-1 rounded-full text-cyan-300 text-sm mb-4">
                  {product.productCategory}
                </div>

                <div className="bg-green-500/10 border border-green-400/20 rounded-xl px-3 py-2 mb-4">
                  <p className="text-green-300 text-sm">
                    Seller: {product.storeName}
                  </p>
                </div>

                <button className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 py-3 rounded-xl font-semibold hover:scale-105 transition duration-300">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 relative z-10">
          <div className="text-8xl mb-6">📦</div>

          <h2 className="text-3xl font-bold text-orange-300 mb-4">
            No Products Found
          </h2>

          <p className="text-gray-400 text-lg">
            Try changing the category or increasing the price range.
          </p>
        </div>
      )}
    </div>
  );
}

export default ViewAllProducts;
