import React, { useContext, useEffect, useState } from "react";
import LatchProduct from "../../components/seller/LatchProduct";
import { LatchedProductsContext } from "../../context/LatchedProductsContext";

function AllLatchableProducts() {
  const [details, setDetails] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [expanded, setExpanded] = useState({});
  const [latchProduct, setLatchProduct] = useState(null);
  const { latchedProducts, setLatchedProducts } = useContext(
    LatchedProductsContext
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
        (v) => v.productCat.toLowerCase() === selectedCategory.toLowerCase()
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
      <div
        className="min-h-screen w-full bg-gradient-to-r from-green-300 to-teal-300 flex items-start justify-center p-6"
        style={{ marginTop: "50px" }}
      >
        <div className="w-full max-w-9xl bg-white shadow-lg rounded-2xl p-4 overflow-x-auto">
          <h1 className="text-3xl md:text-4xl font-extrabold text-teal-700 mb-8 text-center drop-shadow-lg">
            Products List
          </h1>
          <div className="flex justify-center mb-6">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-teal-400 p-2 rounded-lg text-gray-700 shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="">All Categories</option>
              <option value="bed">Bed</option>
              <option value="sofa">Sofa</option>
              <option value="mattress">Mattress</option>
              <option value="mats">Mats</option>
            </select>
          </div>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-teal-500 text-white text-left">
                <th className="p-3">ID</th>
                <th className="p-3">Product Name</th>
                <th className="p-3">Brand</th>
                <th className="p-3">Category</th>
                <th className="p-3">Description</th>
                <th className="p-3">Image</th>
                <th className="p-3">Size</th>
                <th className="p-3">MRP</th>
                <th className="p-3">Actions</th>
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
                      className="odd:bg-orange-300 even:bg-green-300 hover:bg-teal-50 transition-colors"
                    >
                      <td className="p-3">{v.id}</td>
                      <td className="p-3 font-semibold">{v.productName}</td>
                      <td className="p-3">{v.brandName}</td>
                      <td className="p-3">{v.productCat}</td>
                      <td className="p-3 whitespace-pre-wrap">
                        {isExpanded ? v.productDesc : shortDesc}
                        {v.productDesc.length > 100 && (
                          <button
                            onClick={() => toggleExpand(v.id)}
                            className="ml-2 text-teal-600 font-semibold hover:underline"
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
                            className="w-16 h-16 object-cover rounded-lg shadow-sm border"
                          />
                        ))}
                      </td>
                      <td className="p-3">{v.productSize}</td>
                      <td className="p-3 font-bold">₹{v.mrp}</td>
                      <td>
                        <button
                          onClick={() => showProductDetails(v)}
                          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                        >
                          Latch on this Product
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="9" className="text-center py-6">
                    No products available
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
