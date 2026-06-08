import React, { useEffect, useState } from "react";

function LatchedProducts() {
  const [latchedProducts, setLatchedProducts] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editedQuantity, setEditedQuantity] = useState("");
  const [editedPrice, setEditedPrice] = useState("");

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

  const handleRemove = (index) => {
    const updated = latchedProducts.filter((_, i) => i !== index);
    updateLocalStorage(updated);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditedQuantity(latchedProducts[index].quantity);
    setEditedPrice(latchedProducts[index].price);
  };

  const handleSave = (index) => {
    const updated = [...latchedProducts];

    updated[index].quantity = editedQuantity;
    updated[index].price = editedPrice;

    updateLocalStorage(updated);
    setEditIndex(null);
  };

  const handleCancel = () => {
    setEditIndex(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-teal-950 to-slate-900 text-white pt-32 px-6 pb-10 relative overflow-hidden">
      {/* Background Effects */}

      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl"></div>

      <div className="absolute top-36 right-8 text-[180px] opacity-10 animate-bounce">
        📦
      </div>

      <div className="absolute bottom-16 left-6 text-[180px] opacity-10 animate-pulse">
        🚚
      </div>

      {/* Header */}

      <div className="relative z-10 text-center mb-10">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-cyan-300 via-teal-300 to-emerald-400 bg-clip-text text-transparent mb-4">
          Latched Products Inventory
        </h1>

        <p className="text-gray-300 text-lg">
          Manage pricing, stock quantities and inventory listings.
        </p>

        <div className="inline-block mt-4 px-5 py-2 rounded-full bg-cyan-500/20 border border-cyan-400/20">
          <span className="text-cyan-300 font-semibold">
            {latchedProducts.length} Products Latched
          </span>
        </div>
      </div>

      {latchedProducts.length === 0 ? (
        <div className="relative z-10 flex flex-col items-center justify-center py-32">
          <div className="text-8xl mb-6 animate-bounce">📦</div>

          <h2 className="text-3xl font-bold text-cyan-300 mb-3">
            No Products Latched Yet
          </h2>

          <p className="text-gray-400">
            Start latching products to build your inventory.
          </p>
        </div>
      ) : (
        <div
          className="
          relative z-10
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          gap-8
        "
        >
          {latchedProducts.map((product, index) => (
            <div
              key={index}
              className="
                group
                bg-white/10
                backdrop-blur-xl
                border border-white/10
                rounded-3xl
                p-5
                hover:-translate-y-3
                hover:border-cyan-400/30
                hover:shadow-[0_0_35px_rgba(34,211,238,0.25)]
                transition-all
                duration-500
                relative
              "
            >
              {/* Remove Button */}

              <button
                onClick={() => handleRemove(index)}
                className="
                  absolute
                  top-3
                  right-3
                  w-9
                  h-9
                  rounded-full
                  bg-red-500/20
                  border
                  border-red-400/20
                  hover:bg-red-500
                  transition
                  font-bold
                "
                style={{ zIndex: 5 }}
              >
                ✕
              </button>

              {/* Product Image */}

              <div className="overflow-hidden rounded-2xl">
                <img
                  src={product.productImages}
                  alt={product.productName}
                  className="
                    w-full
                    h-56
                    object-cover
                    rounded-2xl
                    group-hover:scale-110
                    transition
                    duration-500
                  "
                />
              </div>

              {/* Product Info */}

              <h3 className="text-xl font-bold text-cyan-300 mt-4">
                {product.productName}
              </h3>

              <p className="text-gray-400 mt-1">
                Product ID:
                <span className="text-white font-semibold"> {product.id}</span>
              </p>

              <p className="text-gray-400">
                Brand:
                <span className="text-white"> {product.brandName}</span>
              </p>

              <div className="mt-2">
                <span className="bg-cyan-500/20 border border-cyan-400/20 text-cyan-300 px-3 py-1 rounded-full text-sm">
                  {product.productCategory}
                </span>
              </div>

              {/* Edit Section */}

              {editIndex === index ? (
                <div className="mt-5 space-y-4">
                  <div>
                    <label className="block text-sm text-cyan-300 mb-1">
                      Quantity
                    </label>

                    <input
                      type="number"
                      value={editedQuantity}
                      onChange={(e) => setEditedQuantity(e.target.value)}
                      className="
                        w-full
                        bg-slate-800
                        border
                        border-cyan-400/20
                        rounded-xl
                        px-3
                        py-2
                        text-white
                        focus:outline-none
                        focus:ring-2
                        focus:ring-cyan-400
                      "
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-cyan-300 mb-1">
                      Selling Price
                    </label>

                    <input
                      type="number"
                      value={editedPrice}
                      onChange={(e) => setEditedPrice(e.target.value)}
                      className="
                        w-full
                        bg-slate-800
                        border
                        border-cyan-400/20
                        rounded-xl
                        px-3
                        py-2
                        text-white
                        focus:outline-none
                        focus:ring-2
                        focus:ring-cyan-400
                      "
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleSave(index)}
                      className="
                        flex-1
                        bg-gradient-to-r
                        from-emerald-500
                        to-green-500
                        py-2
                        rounded-xl
                        font-semibold
                        hover:scale-105
                        transition
                      "
                    >
                      Save
                    </button>

                    <button
                      onClick={handleCancel}
                      className="
                        flex-1
                        bg-slate-700
                        py-2
                        rounded-xl
                        font-semibold
                        hover:bg-slate-600
                        transition
                      "
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="mt-5 bg-slate-800/60 rounded-2xl p-3 border border-white/10">
                    <p className="text-gray-300">
                      Quantity:
                      <span className="text-cyan-300 font-bold ml-2">
                        {product.quantity}
                      </span>
                    </p>

                    <p className="text-2xl font-bold text-yellow-300 mt-2">
                      ₹{product.price}
                    </p>
                  </div>

                  <div className="mt-4 flex gap-3">
                    <button
                      onClick={() => handleEdit(index)}
                      className="
                        flex-1
                        bg-gradient-to-r
                        from-cyan-500
                        to-blue-500
                        py-2
                        rounded-xl
                        font-semibold
                        hover:scale-105
                        transition-all
                      "
                    >
                      Edit Listing
                    </button>
                  </div>
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
