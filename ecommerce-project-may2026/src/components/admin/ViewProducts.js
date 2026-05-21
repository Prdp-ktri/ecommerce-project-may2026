import React, { useEffect, useState } from "react";

function ViewProducts() {
  const [details, setDetails] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    fetch("http://localhost:9000/products")
      .then((res) => res.json())
      .then((data) => {
        setDetails(data);
      });
  }, []);

  const filteredProducts = selectedCategory
    ? details.filter(
        (v) => v.productCat.toLowerCase() === selectedCategory.toLowerCase()
      )
    : details;

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-green-300 to-teal-300 flex items-start justify-center p-6">
      <div className="w-full max-w-7xl bg-white shadow-lg rounded-2xl p-4 overflow-x-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold text-teal-700 mb-8 text-center drop-shadow-lg">
          Product List
        </h1>
        <div className="flex justify-center mb-6">
          <select
            name=""
            value={selectedCategory}
            id="productCategorySelections"
            onChange={(e) => {
              setSelectedCategory(e.target.value);
            }}
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
              <th className="p-3 text-sm md:text-base">ID</th>
              <th className="p-3 text-sm md:text-base">Product Name</th>
              <th className="p-3 text-sm md:text-base">Brand</th>
              <th className="p-3 text-sm md:text-base">Category</th>
              <th className="p-3 text-sm md:text-base">Description</th>
              <th className="p-3 text-sm md:text-base">Image</th>
              <th className="p-3 text-sm md:text-base">Size</th>
              <th className="p-3 text-sm md:text-base">MRP</th>
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
                    <td className="p-3 text-gray-700 text-sm md:text-base">
                      {v.id}
                    </td>
                    <td className="p-3 font-semibold text-gray-800 text-sm md:text-base">
                      {v.productName}
                    </td>
                    <td className="p-3 text-gray-700 text-sm md:text-base">
                      {v.brandName}
                    </td>
                    <td className="p-3 text-gray-700 text-sm md:text-base">
                      {v.productCat}
                    </td>
                    <td className="p-3 text-gray-600 text-sm md:text-base whitespace-pre-wrap">
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
                      {v.productImgs.map((img, index) => (
                        <img
                          key={index}
                          src={img}
                          alt={`${v.productName}-${index}`}
                          className="w-16 h-16 object-cover rounded-lg shadow-sm border"
                        />
                      ))}
                    </td>
                    <td className="p-3 text-gray-700 text-sm md:text-base">
                      {v.productSize}
                    </td>
                    <td className="p-3 text-gray-700 font-bold text-sm md:text-base">
                      ₹{v.mrp}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="text-center text-gray-600 py-6 text-sm md:text-base"
                >
                  No products available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewProducts;
