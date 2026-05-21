import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CART_STORAGE_KEY = "buyerCartItems";

function ProductDetails() {
  const { id } = useParams();
  const [sellers, setSellers] = useState([]);
  const [productInfo, setProductInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const allKeys = Object.keys(localStorage);
    const matchingSellers = [];

    allKeys.forEach((key) => {
      if (key.startsWith("latchedProducts_")) {
        const storedProducts = localStorage.getItem(key);
        if (storedProducts) {
          const productList = JSON.parse(storedProducts);
          const sellerEmailFromKey = key.replace("latchedProducts_", "");

          const profileKey = `latchedSellerProfile_${sellerEmailFromKey}`;
          let sellerProfile = {};
          let profileFound = false; // <-- DEBUG FLAG

          const storedProfile = localStorage.getItem(profileKey);
          if (storedProfile) {
            try {
              sellerProfile = JSON.parse(storedProfile);
              profileFound = true; // <-- DEBUG FLAG SET

              sellerProfile = {
                storeName: sellerProfile.storeName,
                trademark: sellerProfile.trademark,
                sellerContactEmail: sellerProfile.email,
              };
            } catch (e) {
              console.error(
                "Error parsing seller profile for key:",
                profileKey,
                e
              );
            }
          }

          productList.forEach((productListing) => {
            if (String(productListing.id) && productListing.id === String(id)) {
              matchingSellers.push({
                ...productListing,
                ...sellerProfile,
                sellerEmailFromKey,
                profileFound, // <-- DEBUG FLAG ADDED TO SELLER OBJECT
              });
            }
          });
        }
      }
    });

    setSellers(matchingSellers);
    if (matchingSellers.length > 0) {
      setProductInfo(matchingSellers[0]);
    }
  }, [id]);

  if (!productInfo) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-600">No details found for this product.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Go Back
        </button>
      </div>
    );
  }

  const handleAddToCart = (seller) => {
    const cartItem = {
      cartId: `${seller.id}-${seller.sellerEmailFromKey}-${Date.now()}`,
      productId: seller.id,
      productName: productInfo.productName,
      productImage: productInfo.productImages,
      storeName: seller.storeName || "N/A",
      sellerEmail: seller.sellerContactEmail || seller.sellerEmailFromKey,
      quantity: seller.quantity,
      price: seller.price,
    };

    const existingCart =
      JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];

    const existingIndex = existingCart.findIndex(
      (item) =>
        item.productId === cartItem.productId &&
        item.sellerEmail === cartItem.sellerEmail
    );

    const updatedCart = [...existingCart, cartItem];

    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedCart));

    toast.success(
      `Added "${productInfo.productName}" from ${cartItem.storeName} to Cart!`
    );
  };

  return (
    <div className="p-6">
      {/* Product Details - unchanged */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <img
          src={productInfo.productImages}
          alt={productInfo.productName}
          className="w-80 h-80 object-cover rounded-xl shadow-lg"
        />
        <div>
          <h2 className="text-2xl font-bold text-teal-700 mb-2">
            {productInfo.productName}
          </h2>
          <p className="text-gray-700">{productInfo.brandName}</p>
          <p className="text-gray-500">{productInfo.productCategory}</p>
          <p className="mt-2 text-gray-600">
            <b>Product ID:</b> {productInfo.id}
          </p>
        </div>
      </div>

      {/* Sellers Section */}
      <div>
        <h3 className="text-xl font-semibold text-teal-700 mb-4">
          Sellers Offering This Product
        </h3>
        {sellers.length === 0 ? (
          <p>No sellers found for this product.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {sellers.map((seller, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center text-center hover:shadow-lg transition"
              >
                <p className="font-bold text-gray-800">
                  Store: {seller.storeName || "N/A"}
                </p>

                <p className="font-semibold text-gray-600 text-sm">
                  Contact:{" "}
                  {seller.sellerContactEmail || seller.sellerEmailFromKey}
                </p>

                {/* * DEBUG DISPLAY *
                  If this shows [Profile MISSING], you need to save the seller profile to localStorage.
                */}
                {/* <span
                  className={`text-xs font-bold ${
                    seller.profileFound ? "text-green-500" : "text-red-500"
                  }`}
                >
                  [{seller.profileFound ? "Profile FOUND" : "Profile MISSING"}]
                </span> */}

                <p className="text-gray-600 text-sm">
                  Trademark: {seller.trademark || "N/A"}
                </p>

                <p className="text-gray-600 mt-1">
                  Quantity: {seller.quantity}
                </p>
                <p className="text-teal-700 font-bold text-lg mt-1">
                  ₹{seller.price}
                </p>
                <button
                  className="mt-3 bg-orange-500 text-white py-1 px-3 rounded-md hover:bg-orange-600"
                  onClick={() => handleAddToCart(seller)}
                >
                  Buy from this Seller
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetails;
