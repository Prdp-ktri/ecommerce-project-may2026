import React, { useContext, useEffect, useState } from "react";
import LatchProduct from "../../components/seller/LatchProduct";
import { LatchedProductsContext } from "../../context/LatchedProductsContext";

function AllLatchableProducts() {
  const [details, setDetails] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [expanded, setExpanded] = useState({});
  const [latchProduct, setLatchProduct] = useState(null);
  const { latchedProducts, setLatchedProducts } = useContext(
    LatchedProductsContext,
  );

  useEffect(() => {
    fetch("http://localhost:9000/products")
      .then((res) => res.json())
      .then((data) => {
        setDetails(data);
      })
      .catch((err) => console.error("Failed to fetch products:", err));
  }, []);

  const filteredProducts = selectedCategory
    ? details.filter(
        (v) => v.productCat.toLowerCase() === selectedCategory.toLowerCase(),
      )
    : details;

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const showProductDetails = (product) => {
    setLatchProduct(product); // store product for modal
  };

  // ------------------------------------------------------------------
  //  ✅ CORRECTED FUNCTION: Include seller details in the product object
  // ------------------------------------------------------------------
  const handleLatch = (product, quantity, price) => {
    const loggedInSeller = JSON.parse(localStorage.getItem("loggedInSeller"));
    if (!loggedInSeller) return alert("No seller logged in!");

    const storageKey = `latchedProducts_${loggedInSeller.email}`;

    const newProduct = {
      // Product Details
      id: product.id || product._id || product.productId || Date.now(),
      productName: product.productName, // Corrected typo: 'prouctName' -> 'productName'
      brandName: product.brandName,
      productCategory: product.productCat,
      productDescription: product.productDesc,
      productImages: product.productImgs[0],
      productSize: product.productSize,
      productMRP: product.mrp,
      quantity,
      price,

      // ✅ SELLER PROFILE DETAILS ADDED HERE
      // These details are necessary for the ProductDetails page to show the seller info
      storeName: loggedInSeller.storeName,
      email: loggedInSeller.email,
      trademark: loggedInSeller.trademark,
    };

    const existing = JSON.parse(localStorage.getItem(storageKey)) || [];
    const updated = [...existing, newProduct];

    localStorage.setItem(storageKey, JSON.stringify(updated));
    setLatchedProducts(updated);
    setLatchProduct(null);
  };
  // ------------------------------------------------------------------

  return (
    <div>
      <div className="min-h-screen w-full bg-gradient-to-br from-slate-950 via-teal-950 to-slate-900 text-white pt-32 px-6 pb-10 relative overflow-hidden">
        {/* Glow Effects */}

        <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"></div>

        <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl"></div>

        <div className="absolute top-40 right-10 text-white/10 text-[180px] animate-bounce">
          📦
        </div>

        <div className="absolute bottom-20 left-10 text-white/10 text-[180px] animate-pulse">
          🚚
        </div>
        <div className="relative z-10 w-full bg-white/10 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl p-8 overflow-x-auto">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-extrabold bg-gradient-to-r from-cyan-300 via-teal-300 to-emerald-400 bg-clip-text text-transparent mb-3">
              Seller Product Catalogue
            </h1>

            <p className="text-gray-300">
              Browse products available for latching into your store.
            </p>

            <div className="mt-4 inline-block bg-cyan-500/20 border border-cyan-400/20 px-5 py-2 rounded-full">
              <span className="text-cyan-300 font-semibold">
                {filteredProducts.length} Products Available
              </span>
            </div>
          </div>
          <div className="flex justify-center mb-6">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-slate-800 border border-cyan-400/20 text-white p-3 rounded-2xl shadow-lg focus:ring-2 focus:ring-cyan-400 focus:outline-none"
            >
              <option value="">All Categories</option>
              <option value="bed">Bed</option>
              <option value="sofa">Sofa</option>
              <option value="mattress">Mattress</option>
              <option value="mats">Mats</option>
            </select>
          </div>
          <table className="w-full border-separate border-spacing-y-3">
            <thead>
              <tr className="bg-gradient-to-r from-cyan-600 to-emerald-600 text-white">
                <th className="p-4 font-bold tracking-wide">Product Name</th>
                <th className="p-4 font-bold tracking-wide">ID</th>
                <th className="p-4 font-bold tracking-wide">Brand</th>
                <th className="p-4 font-bold tracking-wide">Category</th>
                <th className="p-4 font-bold tracking-wide">Description</th>
                <th className="p-4 font-bold tracking-wide">Image</th>
                <th className="p-4 font-bold tracking-wide">Size</th>
                <th className="p-4 font-bold tracking-wide">MRP</th>
                <th className="p-4 font-bold tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((v) => {
                  const isExpanded = expanded[v.id];
                  const shortDesc = v.productDesc.slice(0, 100);

                  return (
                    <tr
                      key={v.id}
                      className="bg-white/5 hover:bg-cyan-500/10 border border-white/10 transition-all duration-300 hover:scale-[1.01]"
                    >
                      <td className="p-3">{v.id}</td>
                      <td className="p-4 font-bold text-cyan-300">
                        {v.productName}
                      </td>
                      <td className="p-3">{v.brandName}</td>
                      <td className="p-4">
                        <span className="bg-cyan-500/20 border border-cyan-400/20 text-cyan-300 px-3 py-1 rounded-full text-sm">
                          {v.productCat}
                        </span>
                      </td>
                      <td className="p-3 whitespace-pre-wrap">
                        {isExpanded ? v.productDesc : shortDesc}
                        {v.productDesc.length > 100 && (
                          <button
                            onClick={() => toggleExpand(v.id)}
                            className="ml-2 text-cyan-300 font-semibold hover:text-cyan-200 transition"
                          >
                            {isExpanded ? "Read Less" : "Read More"}
                          </button>
                        )}
                      </td>
                      <td className="p-3">
                        {v.productImgs.map((obj, index) => (
                          <img
                            loading="lazy"
                            key={index}
                            src={obj}
                            alt={`${v.productName}-${index}`}
                            className="w-20 h-20 object-cover rounded-xl shadow-lg border border-white/10 hover:scale-110 transition duration-300"
                          />
                        ))}
                      </td>
                      <td className="p-3">{v.productSize}</td>
                      <td className="p-4 font-bold text-yellow-300 text-lg">
                        ₹{v.mrp}
                      </td>
                      <td>
                        <button
                          onClick={() => showProductDetails(v)}
                          className="bg-gradient-to-r from-cyan-500 to-emerald-500 text-white px-4 py-2 rounded-xl font-semibold hover:scale-105 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all duration-300"
                        >
                          Latch Product
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan="9"
                    className="text-center py-12 text-gray-300 text-xl"
                  >
                    📦 No Products Available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {latchProduct && (
        <LatchProduct
          product={latchProduct}
          onLatch={handleLatch}
          onClose={() => setLatchProduct(null)}
        />
      )}
    </div>
  );
}

export default AllLatchableProducts;
