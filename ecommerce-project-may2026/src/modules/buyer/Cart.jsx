import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Key for storing the cart in localStorage (must match the key used in ProductDetails)
const CART_STORAGE_KEY = "buyerCartItems";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const Navigate = useNavigate();

  // Function to save the current cart state back to localStorage
  const saveCartToLocalStorage = (updatedCart) => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  // Function to load cart from localStorage
  const loadCart = () => {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    } else {
      setCartItems([]);
    }
  };

  useEffect(() => {
    loadCart();

    // Optional: Add event listener to sync cart across tabs/windows
    const handleStorageChange = () => {
      loadCart();
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Handle quantity change
  const handleQuantityChange = (cartId, newQuantity) => {
    const qty = parseInt(newQuantity);
    // Prevent quantity from going below 1 or being a non-number
    if (isNaN(qty) || qty < 1) return;

    const updatedCart = cartItems.map((item) => {
      if (item.cartId === cartId) {
        return {
          ...item,
          quantity: qty, // Update the quantity
        };
      }
      return item;
    });

    saveCartToLocalStorage(updatedCart);
  };

  // Function to remove an item from the cart
  const handleRemoveItem = (cartId) => {
    const updatedCart = cartItems.filter((item) => item.cartId !== cartId);
    saveCartToLocalStorage(updatedCart);
  };

  // Function to calculate the total cost for all items
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      // ✅ Use item.price (seller's selling price)
      const price = parseFloat(item.price);
      const quantity = parseInt(item.quantity);
      if (!isNaN(price) && !isNaN(quantity)) {
        return total + price * quantity;
      }
      return total;
    }, 0);
  };

  // ✅ NEW: Redirection function
  const handleProceedToCheckout = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }
    // Navigate to the Place Order component
    Navigate("/place-order");
  };

  const totalCost = calculateTotal();
  const totalItems = cartItems.reduce(
    (sum, item) => sum + parseInt(item.quantity || 0),
    0
  );

  const applyCoupon = () => {
    if (couponCode.trim().toUpperCase() === "#FIRST500") {
      setDiscount(500);
      toast.success("Coupon Applied, ₹500 discount added.");
    } else {
      setDiscount(0);
      toast.warn("Invalid Coupon Code.");
    }
  };

  const finalAmount = Math.max(totalCost - discount, 0);

  return (
    <div className="p-8 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-teal-700 mb-6">
        Your Shopping Cart 🛒
      </h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">
          Your cart is empty. Go add some products!
        </p>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items List */}
          <div className="lg:w-3/4 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.cartId}
                className="bg-white p-4 rounded-xl shadow-md flex flex-wrap items-center gap-4"
              >
                <img
                  src={item.productImage}
                  alt={item.productName}
                  className="w-20 h-20 object-cover rounded-lg"
                />

                <div className="flex-1 min-w-[200px]">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.productName}
                  </h3>
                  <p className="text-sm text-teal-600">
                    Sold by: {item.storeName}
                  </p>
                  {/* ✅ Displaying the seller's unit selling price */}
                  <p className="text-sm text-gray-500">
                    Unit Price: ₹{parseFloat(item.price).toFixed(2)}
                  </p>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center gap-2">
                  <label
                    htmlFor={`qty-${item.cartId}`}
                    className="text-sm text-gray-700 font-medium"
                  >
                    Qty:
                  </label>
                  <select
                    id={`qty-${item.cartId}`}
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item.cartId, e.target.value)
                    }
                    className="border border-gray-300 rounded-lg p-1 w-16 text-center shadow-sm focus:ring-teal-500 focus:border-teal-500"
                  >
                    {/* Generate options up to a reasonable limit (e.g., 10) */}
                    {[...Array(10).keys()].map((i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Total Price for this item (Quantity * Price) */}
                <div className="text-right ml-auto min-w-[100px]">
                  <p className="text-sm text-gray-500">Subtotal:</p>
                  <p className="font-bold text-xl text-orange-600">
                    {/* ✅ Calculation: Quantity multiplied by Price */}₹
                    {(parseFloat(item.price) * parseInt(item.quantity)).toFixed(
                      2
                    )}
                  </p>
                </div>

                <button
                  onClick={() => handleRemoveItem(item.cartId)}
                  className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                  title="Remove Item"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 10-2 0v6a1 1 0 102 0V8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="lg:w-1/4 bg-white p-6 rounded-xl shadow-lg h-fit">
            <h2 className="text-2xl font-bold mb-4 text-teal-700">
              Order Summary
            </h2>
            <div className="flex justify-between text-gray-700 mb-2">
              <span>Total Items ({totalItems}):</span>
              <span>₹{totalCost.toFixed(2)}</span> <br />
            </div>
            <div className="flex justify-between mt-1 items-center">
              <span>Discount Coupon:</span>
              <span className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter Coupon Code"
                  id=""
                  className="border px-2 py-1 rounded"
                />
                <button
                  onClick={applyCoupon}
                  className="bg-blue-400 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  Apply
                </button>
              </span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between text-green-600 font-semibold mt-2">
                <span>Discount Applied:</span>
                <span>- ₹{discount}</span>
              </div>
            )}

            <div className="flex justify-between text-xl font-bold border-t pt-4 mt-4">
              <span>Order Total:</span>
              <span className="text-orange-600">₹{finalAmount.toFixed(2)}</span>
            </div>
            <button
              className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition"
              onClick={() => {
                handleProceedToCheckout();
              }}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
