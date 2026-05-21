import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AddProduct() {
  const [brandName, setBrandName] = useState("");
  const [productCat, setProductCat] = useState("");
  const [productName, setProductName] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productImgs, setProductImgs] = useState([]);
  const [productSize, setProductSize] = useState("");
  const [mrp, setMrp] = useState(0);
  const navigate = useNavigate();

  const addProduct = (e) => {
    e.preventDefault();

    let productObj = {
      productName,
      brandName,
      productCat,
      productDesc,
      productImgs,
      productSize,
      mrp,
    };

    console.log("Product Data:", productObj);

    fetch("http://localhost:9000/products", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(productObj),
    }).then((res) => {
      if (res) {
        toast.success("Product Added for latching on Seller Portal");
        navigate("/viewProducts");
      }
    });
  };

  return (
    <div>
      <div
        className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-300 to-teal-300 p-6"
        style={{ width: "100vw", height: "150vh", paddingTop: "40px" }}
      >
        <div className="w-full max-w-2xl bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8">
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Add New Product
          </h1>

          <form onSubmit={addProduct} className="space-y-5">
            {/* Brand Name */}
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Enter the brand name
              </label>
              <input
                type="text"
                value={brandName}
                placeholder="Enter the brand name"
                onChange={(e) => setBrandName(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-400 focus:outline-none"
              />
            </div>
            {/* Category */}
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Enter the product category
              </label>
              <select
                value={productCat}
                onChange={(e) => setProductCat(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-400 focus:outline-none"
              >
                <option value="">-- Select Category --</option>
                <option value="Bed">Bed</option>
                <option value="Sofa">Sofa</option>
                <option value="Mattress">Mattress</option>
                <option value="Mats">Mats</option>
              </select>
            </div>
            {/* Product Name */}
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Enter the product name
              </label>
              <input
                type="text"
                value={productName}
                placeholder="Enter the product name"
                onChange={(e) => setProductName(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-400 focus:outline-none"
              />
            </div>
            {/* Description */}
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Enter the description and other details
              </label>
              <textarea
                value={productDesc}
                onChange={(e) => setProductDesc(e.target.value)}
                placeholder="Enter the product details"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-400 focus:outline-none h-24"
              ></textarea>
            </div>
            {/* Images */}
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Enter product image URLs
              </label>
              <input
                type="url"
                name=""
                placeholder="Paste image URLs and press enter"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    if (e.target.value.trim()) {
                      setProductImgs([...productImgs, e.target.value.trim()]);
                      e.target.value = "";
                    }
                  }
                }}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-400 focus:outline-none"
                id=""
              />
              <p className="text-sm text-gray-500 mt-1">
                Press Enter to add multiple URLs
              </p>
              <div className="flex flex-wrap gap-3 mt-3">
                {productImgs.map((url, index) => {
                  <img
                    key={index}
                    src={url}
                    alt={`preview-${index}`}
                    className="w-20 h-20 object-cover rounded-lg shadow"
                  />;
                })}
              </div>
            </div>

            {/* <img
                    key={index}
                    src={productImgs.name}
                    alt={`preview-${index}`}
                    className="w-20 h-20 object-cover rounded-lg shadow"
                  />
                ) */}
            {/* Size */}
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Enter the size of the product
              </label>
              <select
                value={productSize}
                onChange={(e) => setProductSize(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-400 focus:outline-none"
              >
                <option value="">-- Select Size --</option>
                {productCat === "Bed" ? (
                  <>
                    <option value="king">King Size</option>
                    <option value="queen">Queen Size</option>
                    <option value="single">Single Bed</option>
                    <option value="double">Double Bed</option>
                  </>
                ) : productCat === "Sofa" ? (
                  <>
                    <option value="single">Single Seater</option>
                    <option value="double">Double Seater</option>
                    <option value="three">Three Seater</option>
                    <option value="recliner">Recliners</option>
                    <option value="sofa-sets">Sofa Sets</option>
                  </>
                ) : productCat === "Mattress" ? (
                  <>
                    <option value="king">King Size</option>
                    <option value="queen">Queen Size</option>
                    <option value="double">Double Bed</option>
                    <option value="single">Single Bed</option>
                  </>
                ) : productCat === "Mats" ? (
                  <>
                    <option value="yoga">Yoga Mats</option>
                    <option value="door">Door Mats</option>
                  </>
                ) : null}
              </select>
            </div>
            {/* MRP */}
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Enter the MRP
              </label>
              <input
                type="number"
                value={mrp}
                onChange={(e) => setMrp(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-400 focus:outline-none"
              />
            </div>
            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 bg-teal-500 text-white rounded-lg shadow-md hover:bg-teal-600 transition duration-200"
            >
              Add Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
