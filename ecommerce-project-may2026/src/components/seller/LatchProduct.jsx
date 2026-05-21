import React, { useState } from "react";
import { toast } from "react-toastify";

function LatchProduct({ product, onLatch, onClose }) {
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!quantity || !price) return toast("Enter Quantity and Price!");
    onLatch(product, quantity, price);
  };
  return (
    <div
      style={{
        zIndex: "1000",
        width: "300px",
        height: "450px",
        borderRadius: "15px",
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        border: "2px solid gray",
        backgroundColor: "white",
        padding: "20px",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
      }}
    >
      <h2 className="text-lg font-bold mb-3 text-teal-700">
        Latch: {product.productName}
      </h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          Quantity:
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="border rounded p-1 w-full mt-1"
          />
        </label>
        <label className="block mb-2">
          Your Selling Price:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border rounded p-1 w-full mt-1"
          />
        </label>
        <div className="flex justify-end space-x-2 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-400 text-white px-3 py-1 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-3 py-1 rounded"
          >
            Latch
          </button>
        </div>
      </form>
    </div>
  );
}

export default LatchProduct;
