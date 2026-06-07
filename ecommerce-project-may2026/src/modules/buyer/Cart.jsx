import React, { useState, useEffect } from "react";
import {
  ShoppingCart,
  Trash2,
  CreditCard,
  Truck,
  ShieldCheck,
  Gift,
} from "lucide-react";
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
    0,
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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-orange-950 to-slate-900 text-white pt-32 px-6 pb-10 relative overflow-hidden">
      {/* Background Effects */}

      <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl"></div>

      <div className="absolute top-36 right-16 opacity-10 animate-bounce">
        <ShoppingCart size={180} />
      </div>

      <div className="absolute bottom-24 left-10 opacity-10 animate-pulse">
        <Truck size={180} />
      </div>
      <div className="relative z-10 text-center mb-10">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-orange-300 via-yellow-300 to-orange-500 bg-clip-text text-transparent mb-3">
          Your Shopping Cart
        </h1>

        <p className="text-gray-300 text-lg">
          Review your products before checkout
        </p>

        <div className="mt-4 inline-block bg-orange-500/20 border border-orange-400/20 px-5 py-2 rounded-full">
          <span className="text-orange-300 font-semibold">
            {totalItems} Items In Cart
          </span>
        </div>
      </div>

      {cartItems.length === 0 ? (
        <div className="relative z-10 flex flex-col items-center justify-center min-h-[60vh]">
          <ShoppingCart
            size={120}
            className="text-orange-400 mb-6 animate-bounce"
          />

          <h2 className="text-4xl font-bold text-orange-300 mb-4">
            Your Cart Is Empty
          </h2>

          <p className="text-gray-400 text-lg">
            Add products and they will appear here.
          </p>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items List */}
          <div className="lg:w-3/4 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.cartId}
                className="group bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-5 hover:-translate-y-2 hover:border-orange-400/30 hover:shadow-[0_0_35px_rgba(255,165,0,0.25)] transition-all duration-500 flex flex-wrap items-center gap-5"
              >
                <img
                  src={item.productImage}
                  alt={item.productName}
                  className="w-28 h-28 object-cover rounded-2xl group-hover:scale-105 transition duration-500"
                />

                <div className="flex-1 min-w-[200px]">
                  <h3 className="text-xl font-bold text-white">
                    {item.productName}
                  </h3>
                  <p className="text-orange-300 font-medium">
                    Sold by: {item.storeName}
                  </p>
                  {/* ✅ Displaying the seller's unit selling price */}
                  <p className="text-sm text-gray-500">
                    Unit Price: ₹{parseFloat(item.price).toFixed(2)}
                  </p>
                </div>

                {/* Quantity Selector */}
                <div className="bg-slate-800 border border-orange-400/20 rounded-xl p-2 text-white focus:ring-2 focus:ring-orange-400">
                  <label
                    htmlFor={`qty-${item.cartId}`}
                    className="font-bold text-2xl text-yellow-300"
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
                      2,
                    )}
                  </p>
                </div>

                <button
                  onClick={() => handleRemoveItem(item.cartId)}
                  className="p-3 bg-red-500/20 border border-red-400/20 rounded-full hover:bg-red-500 hover:scale-110 transition"
                >
                  <Trash2 size={18} className="text-red-300" />
                </button>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="lg:w-1/4 bg-white/10 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-2xl h-fit sticky top-36">
            <h2 className="text-3xl font-bold text-orange-300 mb-6 flex items-center gap-2">
              <CreditCard size={28} />
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
                  className="bg-slate-800 border border-orange-400/20 px-3 py-2 rounded-xl text-white"
                />
                <button
                  onClick={applyCoupon}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-xl hover:scale-105 transition"
                >
                  Apply
                </button>
              </span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between text-green-400 font-semibold mt-4 bg-green-500/10 border border-green-400/20 p-3 rounded-xl">
                <span>Discount Applied:</span>
                <span>- ₹{discount}</span>
              </div>
            )}

            <div className="flex justify-between text-2xl font-bold border-t border-white/10 pt-4 mt-4">
              <span>Order Total:</span>
              <span className="text-yellow-300">₹{finalAmount.toFixed(2)}</span>
            </div>
            <button
              className="group mt-6 w-full bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 py-4 rounded-2xl font-bold text-lg hover:scale-105 shadow-[0_0_30px_rgba(34,197,94,0.35)] transition-all duration-300"
              onClick={handleProceedToCheckout}
            >
              <span className="flex items-center justify-center gap-2">
                <CreditCard size={20} />
                Proceed to Checkout
              </span>
            </button>
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-green-300">
                <Truck size={18} />
                Free Delivery Available
              </div>

              <div className="flex items-center gap-3 text-blue-300">
                <ShieldCheck size={18} />
                Secure Checkout
              </div>

              <div className="flex items-center gap-3 text-yellow-300">
                <Gift size={18} />
                Coupons & Rewards Supported
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
