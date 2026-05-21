import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ViewAllProducts() {
  const [allLatchedProducts, setAllLatchedProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
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
              allProducts.push({ ...p, sellerEmail });
            });
          } catch (error) {
            console.error("Error parsing latched products for key:", key);
          }
        }
      }
    });

    const sortedProducts = allProducts.sort((a, b) =>
      a.productCategory?.localeCompare(b.productCategory)
    );

    setAllLatchedProducts(sortedProducts);
  }, []);

  const handleViewDetails = (productId) => {
    navigate(`/product/${productId}`);
  };

  const filteredProducts = selectedCategory
    ? allLatchedProducts.filter(
        (p) =>
          p.productCategory?.toLowerCase() === selectedCategory.toLowerCase()
      )
    : allLatchedProducts;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-teal-700 mb-4">All Products</h2>

      {/* Category Dropdown */}
      <div className="flex justify-center mb-8">
        <select
          id="categories-dropdown"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-teal-400 rounded-lg p-2 shadow-md text-gray-700 focus:ring-2 focus:ring-teal-500 focus:outline-none"
        >
          <option value="">All Categories</option>
          <option value="bed">Bed</option>
          <option value="mattress">Mattress</option>
          <option value="sofa">Sofa</option>
          <option value="mats">Mats</option>
        </select>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <div
              key={index}
              onClick={() => handleViewDetails(product.id)}
              className="cursor-pointer bg-white rounded-2xl shadow-lg p-4 hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center"
            >
              <img
                src={product.productImages}
                alt={product.productName}
                className="w-40 h-40 object-cover rounded-md mb-3"
              />
              <h3 className="text-lg font-semibold">{product.productName}</h3>
              <h4 className="text-xl font-bold text-blue-500">
                {product.productCategory}
              </h4>
              <p className="text-lg text-red-500">₹{product.price}</p>
              <p className="text-lg text-green-500 bg-orange-300 rounded-md">
                Seller: {product.storeName}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 text-lg mt-10">
          No products found for this category
        </p>
      )}
    </div>
  );
}

export default ViewAllProducts;
