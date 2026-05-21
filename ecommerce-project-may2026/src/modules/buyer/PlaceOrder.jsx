import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// LocalStorage Keys
const BUYER_PROFILE_KEY = "loggedInBuyer";
const CART_STORAGE_KEY = "buyerCartItems";
const SELLER_ORDERS_KEY = "sellerOrders"; // 🆕 for storing seller orders

// 🆕 CONSTANT FOR INDIAN STATES/UTs
const INDIAN_STATES = [
  { code: "AP", name: "Andhra Pradesh" },
  { code: "AR", name: "Arunachal Pradesh" },
  { code: "AS", name: "Assam" },
  { code: "BR", name: "Bihar" },
  { code: "CH", name: "Chhattisgarh" },
  { code: "GA", name: "Goa" },
  { code: "GJ", name: "Gujarat" },
  { code: "HR", name: "Haryana" },
  { code: "HP", name: "Himachal Pradesh" },
  { code: "JH", name: "Jharkhand" },
  { code: "KA", name: "Karnataka" },
  { code: "KL", name: "Kerala" },
  { code: "MP", name: "Madhya Pradesh" },
  { code: "MH", name: "Maharashtra" },
  { code: "MN", name: "Manipur" },
  { code: "ML", name: "Meghalaya" },
  { code: "MZ", name: "Mizoram" },
  { code: "NL", name: "Nagaland" },
  { code: "OD", name: "Odisha" },
  { code: "PB", name: "Punjab" },
  { code: "RJ", name: "Rajasthan" },
  { code: "SK", name: "Sikkim" },
  { code: "TN", name: "Tamil Nadu" },
  { code: "TG", name: "Telangana" },
  { code: "TR", name: "Tripura" },
  { code: "UK", name: "Uttarakhand" },
  { code: "UP", name: "Uttar Pradesh" },
  { code: "WB", name: "West Bengal" },
  { code: "AN", name: "Andaman And Nicobar Islands" },
  { code: "CHD", name: "Chandigarh" },
  { code: "DD", name: "Dadra And Nagar Haveli and Daman and Diu" },
  { code: "DL", name: "Delhi" },
  { code: "JK", name: "Jammu and Kashmir" },
  { code: "LA", name: "Ladakh" },
  { code: "LD", name: "Lakshadweep" },
  { code: "PY", name: "Puducherry" },
];

// ✅ Helper to get the full state name from its code
const getFullStateName = (code) => {
  const state = INDIAN_STATES.find((s) => s.code === code);
  return state ? state.name : code || "Not specified";
};

function PlaceOrder() {
  const navigate = useNavigate();

  // Buyer info
  const [buyerName, setBuyerName] = useState("");
  const [buyerAddress, setBuyerAddress] = useState("");
  const [buyerPin, setBuyerPin] = useState("");
  const [buyerState, setBuyerState] = useState(""); // State code (e.g., 'MH')

  // Editable address fields
  const [editedAddress, setEditedAddress] = useState("");
  const [editedPin, setEditedPin] = useState("");
  const [editedState, setEditedState] = useState(""); // for dropdown

  // UI / order states
  const [isEditing, setIsEditing] = useState(false);
  const [totalCost, setTotalCost] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // ✅ 1. Get logged-in buyer info
    const loggedInBuyer = JSON.parse(localStorage.getItem(BUYER_PROFILE_KEY));
    if (!loggedInBuyer) {
      toast.warn("You must be logged in to place an order.");
      navigate("/login");
      return;
    }

    // ✅ 2. Fetch buyers from API
    fetch("http://localhost:5000/buyers")
      .then((res) => res.json())
      .then((buyers) => {
        const currentBuyer = buyers.find(
          (b) => b.email === loggedInBuyer.email
        );

        if (currentBuyer) {
          const fetchedAddress = currentBuyer.address || "";
          const fetchedPin = currentBuyer.pin || "";
          let fetchedStateCode = currentBuyer.state || "";

          const foundState = INDIAN_STATES.find(
            (s) =>
              s.code.toLowerCase() === fetchedStateCode.toLowerCase() ||
              s.name.toLowerCase() === fetchedStateCode.toLowerCase()
          );
          fetchedStateCode = foundState ? foundState.code : "";

          setBuyerName(currentBuyer.name || "Buyer");
          setBuyerAddress(fetchedAddress);
          setBuyerPin(fetchedPin);
          setBuyerState(fetchedStateCode);

          setEditedAddress(fetchedAddress);
          setEditedPin(fetchedPin);
          setEditedState(fetchedStateCode);
        } else {
          setBuyerAddress("Buyer not found in records.");
        }
      })
      .catch((err) => {
        console.error("Error fetching buyer data:", err);
        setBuyerAddress("Error fetching address. Please try again later.");
      });

    // ✅ 3. Calculate total cost
    const storedCart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];
    const cost = storedCart.reduce(
      (sum, item) => sum + parseFloat(item.price) * parseInt(item.quantity),
      0
    );
    setTotalCost(cost);

    if (storedCart.length === 0) {
      toast.error("Your cart is empty. Redirecting to home.");
      navigate("/");
    }
  }, [navigate]);

  // ✅ Save edited address, PIN, and State
  const handleSaveAddress = () => {
    if (!editedAddress.trim() || !editedPin.trim() || !editedState.trim()) {
      alert("Address, PIN, and State must be filled.");
      return;
    }

    setBuyerAddress(editedAddress);
    setBuyerPin(editedPin);
    setBuyerState(editedState);
    setIsEditing(false);
    alert("Address, PIN, and State updated successfully (local update only).");
  };

  // ✅ Cancel editing
  const handleCancelEdit = () => {
    setEditedAddress(buyerAddress);
    setEditedPin(buyerPin);
    setEditedState(buyerState);
    setIsEditing(false);
  };

  // ✅ Handle placing the order
  const handlePlaceOrder = () => {
    if (!paymentMethod) {
      toast.warn("Please select a payment method.");
      return;
    }

    if (
      !buyerAddress.trim() ||
      !buyerPin.trim() ||
      !buyerState.trim() ||
      buyerAddress === "Address not found."
    ) {
      alert(
        "Please ensure your full delivery address, PIN, and State are set before placing the order."
      );
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const orderId = "ORD" + Date.now();
      const storedCart =
        JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];
      const loggedInBuyer = JSON.parse(localStorage.getItem(BUYER_PROFILE_KEY));

      // 🆕 Prepare buyer's order
      const newOrder = {
        orderId,
        buyerName,
        buyerEmail: loggedInBuyer.email,
        address: buyerAddress,
        pin: buyerPin,
        state: getFullStateName(buyerState),
        paymentMethod,
        totalCost,
        items: storedCart,
        status: "Order Placed",
        placedAt: new Date().toLocaleString(),
      };

      // 🆕 Save to buyer orders
      const existingOrders =
        JSON.parse(localStorage.getItem("buyerOrders")) || [];
      existingOrders.push(newOrder);
      localStorage.setItem("buyerOrders", JSON.stringify(existingOrders));

      // 🆕 Also assign to seller orders
      const sellerOrders =
        JSON.parse(localStorage.getItem(SELLER_ORDERS_KEY)) || {};

      storedCart.forEach((item) => {
        const sellerName = item.sellerName || item.storeName;
        if (!sellerName) return;

        if (!sellerOrders[sellerName]) {
          sellerOrders[sellerName] = [];
        }

        const sellerOrder = {
          orderId,
          buyerName,
          buyerEmail: loggedInBuyer.email,
          address: buyerAddress,
          pin: buyerPin,
          state: getFullStateName(buyerState),
          totalCost,
          paymentMethod,
          items: storedCart.filter(
            (p) => p.sellerName === sellerName || p.storeName === sellerName
          ),
          status: "New",
          placedAt: new Date().toLocaleString(),
        };

        sellerOrders[sellerName].push(sellerOrder);
      });

      localStorage.setItem(SELLER_ORDERS_KEY, JSON.stringify(sellerOrders));

      // Clear cart and finish up
      localStorage.removeItem(CART_STORAGE_KEY);
      setIsProcessing(false);

      toast.info(`Order placed successfully! Your Order ID: ${orderId}`);
      navigate(`/track-your-order/${orderId}`);
    }, 2000);
  };

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-teal-700 mb-8 text-center">
        Final Checkout
      </h1>

      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Shipping Address */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg border-t-4 border-teal-500">
          <h2 className="text-xl font-semibold text-teal-700 mb-4 flex justify-between items-center">
            Shipping Address
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="text-sm text-blue-500 hover:underline"
              >
                Change/Edit
              </button>
            ) : (
              <div className="space-x-2">
                <button
                  onClick={handleSaveAddress}
                  className="text-sm text-green-600 font-medium hover:underline"
                  disabled={
                    !editedAddress.trim() ||
                    !editedPin.trim() ||
                    !editedState.trim()
                  }
                >
                  Save
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="text-sm text-red-500 font-medium hover:underline"
                >
                  Cancel
                </button>
              </div>
            )}
          </h2>

          <div className="p-4 bg-teal-50/50 border border-teal-200 rounded-lg">
            {!isEditing ? (
              <>
                <p className="font-medium text-gray-800">Deliver to:</p>
                <p className="text-black-700">Name: {buyerName}</p>
                <p className="mt-1 text-gray-600 whitespace-pre-line">
                  Address: {buyerAddress}
                </p>
                <p>
                  PIN: {buyerPin}, State: {getFullStateName(buyerState)}
                </p>
              </>
            ) : (
              <div className="space-y-4">
                <label className="block">
                  <span className="text-sm font-medium text-gray-700">
                    Full Address:
                  </span>
                  <textarea
                    value={editedAddress}
                    onChange={(e) => setEditedAddress(e.target.value)}
                    rows="4"
                    className="w-full border border-teal-300 rounded-lg p-2 focus:ring-2 focus:ring-teal-500 focus:outline-none mt-1"
                    placeholder="Street, City, Landmark..."
                  />
                </label>

                <div className="flex space-x-4">
                  <label className="block w-1/3">
                    <span className="text-sm font-medium text-gray-700">
                      PIN Code:
                    </span>
                    <input
                      type="text"
                      value={editedPin}
                      onChange={(e) => setEditedPin(e.target.value)}
                      className="w-full border border-teal-300 rounded-lg p-2 focus:ring-2 focus:ring-teal-500 focus:outline-none mt-1"
                      placeholder="e.g., 400001"
                      maxLength="6"
                    />
                  </label>

                  <label className="block flex-grow">
                    <span className="text-sm font-medium text-gray-700">
                      State:
                    </span>
                    <select
                      value={editedState}
                      onChange={(e) => setEditedState(e.target.value)}
                      className="w-full border border-teal-300 rounded-lg p-2 focus:ring-2 focus:ring-teal-500 focus:outline-none mt-1 bg-white"
                    >
                      <option value="">Select a state...</option>
                      {INDIAN_STATES.map((state) => (
                        <option key={state.code} value={state.code}>
                          {state.name}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-lg border-t-4 border-orange-500 h-fit order-first lg:order-none">
          <h2 className="text-xl font-semibold text-orange-600 mb-4">
            Order Summary
          </h2>
          <div className="flex justify-between text-lg font-bold">
            <span>Grand Total:</span>
            <span className="text-orange-600">₹{totalCost.toFixed(2)}</span>
          </div>
        </div>

        {/* Payment Method */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg border-t-4 border-green-500">
          <h2 className="text-xl font-semibold text-green-700 mb-4">
            Select Payment Method
          </h2>

          <div className="space-y-4">
            {["UPI", "Net Banking", "COD"].map((method) => (
              <label
                key={method}
                className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition"
              >
                <input
                  type="radio"
                  name="payment"
                  value={method}
                  checked={paymentMethod === method}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500"
                />
                <span className="ml-3 font-medium text-gray-700">{method}</span>
              </label>
            ))}
          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={!paymentMethod || isProcessing}
            className={`mt-6 w-full text-white py-3 rounded-lg font-bold transition ${
              !paymentMethod || isProcessing
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-teal-600 hover:bg-teal-700"
            }`}
          >
            {isProcessing
              ? "Processing Order..."
              : `Pay & Place Order - ₹${totalCost.toFixed(2)}`}
          </button>

          {isProcessing && (
            <p className="mt-2 text-sm text-center text-teal-600">
              Please do not refresh the page.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PlaceOrder;
