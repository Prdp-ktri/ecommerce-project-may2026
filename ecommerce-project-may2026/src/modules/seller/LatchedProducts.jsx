import React, { useEffect, useState } from "react";

function LatchedProducts() {
  const [latchedProducts, setLatchedProducts] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editedQuantity, setEditedQuantity] = useState("");
  const [editedPrice, setEditedPrice] = useState("");

  // Load latched products from localStorage
  useEffect(() => {
    const loggedInSeller = JSON.parse(localStorage.getItem("loggedInSeller"));
    if (loggedInSeller) {
      const storageKey = `latchedProducts_${loggedInSeller.email}`;
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        setLatchedProducts(JSON.parse(stored));
      }
    }
  }, []);

  // Save to localStorage whenever products change
  const updateLocalStorage = (updatedProducts) => {
    const loggedInSeller = JSON.parse(localStorage.getItem("loggedInSeller"));
    if (!loggedInSeller) return;

    const updatedWithSeller = updatedProducts.map((p) => ({
      ...p,
      storeName: loggedInSeller.storeName,
      email: loggedInSeller.email,
      trademark: loggedInSeller.trademark,
    }));

    const storageKey = `latchedProducts_${loggedInSeller.email}`;
    localStorage.setItem(storageKey, JSON.stringify(updatedWithSeller));
    setLatchedProducts(updatedWithSeller);
  };

  // Remove a product
  const handleRemove = (index) => {
    const updated = latchedProducts.filter((_, i) => i !== index);
    updateLocalStorage(updated);
  };

  // Start editing a product
  const handleEdit = (index) => {
    setEditIndex(index);
    setEditedQuantity(latchedProducts[index].quantity);
    setEditedPrice(latchedProducts[index].price);
  };

  // Save edited values
  const handleSave = (index) => {
    const updated = [...latchedProducts];
    updated[index].quantity = editedQuantity;
    updated[index].price = editedPrice;
    updateLocalStorage(updated);
    setEditIndex(null);
  };

  // Cancel editing
  const handleCancel = () => {
    setEditIndex(null);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-teal-700 mb-4">Latched Products</h2>

      {latchedProducts.length === 0 ? (
        <p>No products latched yet.</p>
      ) : (
        <div
          className="
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4 
            gap-6
          "
        >
          {latchedProducts.map((product, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-4 hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center relative"
            >
              {/* Remove Button */}
              <button
                onClick={() => handleRemove(index)}
                className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xl rounded-full w-8 h-8 flex items-center justify-center"
              >
                X
              </button>

              {/* Product Image */}
              <img
                src={product.productImages}
                alt={product.productName}
                className="w-40 h-40 object-cover rounded-md mb-3"
              />

              {/* Product Info */}
              <h3 className="text-lg font-semibold">{product.productName}</h3>
              <h3 className="text-sm text-black">
                Product ID:<b> {product.id}</b>
              </h3>
              <p className="text-sm text-gray-600">{product.brandName}</p>
              <p className="text-sm text-gray-600">{product.productCategory}</p>

              {/* Quantity and Price */}
              {editIndex === index ? (
                <>
                  <div className="mt-2">
                    <label className="block text-sm text-gray-700 mb-1">
                      Quantity:
                    </label>
                    <input
                      type="number"
                      value={editedQuantity}
                      onChange={(e) => setEditedQuantity(e.target.value)}
                      className="border border-gray-300 rounded-lg p-1 w-20 text-center"
                    />
                  </div>

                  <div className="mt-2">
                    <label className="block text-sm text-gray-700 mb-1">
                      Price:
                    </label>
                    <input
                      type="number"
                      value={editedPrice}
                      onChange={(e) => setEditedPrice(e.target.value)}
                      className="border border-gray-300 rounded-lg p-1 w-24 text-center"
                    />
                  </div>

                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => handleSave(index)}
                      className="bg-green-600 text-white font-semibold py-1 px-3 rounded-lg hover:bg-green-700"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-gray-400 text-white font-semibold py-1 px-3 rounded-lg hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-sm text-gray-500 mt-2">
                    Quantity: {product.quantity}{" "}
                    <button
                      onClick={() => handleEdit(index)}
                      className="bg-blue-600 text-white font-semibold py-1 px-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ml-2"
                    >
                      Edit
                    </button>
                  </p>
                  <p className="text-teal-700 font-bold text-lg mt-2">
                    ₹{product.price}{" "}
                    <button
                      onClick={() => handleEdit(index)}
                      className="bg-teal-600 text-white font-semibold py-1 px-2 rounded-lg shadow-md hover:bg-teal-700 transition duration-300 ml-2"
                    >
                      Edit
                    </button>
                  </p>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LatchedProducts;
