import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function SellerCreation() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [pin, setPin] = useState("");
  const [storeName, setStoreName] = useState("");
  const [gst, setGst] = useState("");
  const [trademark, setTrademark] = useState("");

  const navigate = useNavigate();

  const sellerCreation = async (e) => {
    e.preventDefault();

    if (
      !name ||
      !email ||
      !password ||
      !phone ||
      !address ||
      !pin ||
      !storeName ||
      !gst ||
      !trademark
    ) {
      toast.warn(
        "Please fill in the required fields: Name, Email, Password, Phone, Address, PIN, Store Name, GST No., Trademark"
      );
    }

    const objSellerData = {
      name,
      email,
      password,
      phone,
      address,
      selectedState,
      pin,
      storeName,
      gst,
      trademark,
    };

    try {
      const res = await fetch("http://localhost:7000/sellers", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(objSellerData),
      });

      if (!res.ok) throw new Error(`Server responded with ${res.status}`);

      toast.success("Seller Account Created - Please Login");
      navigate("/sellerLogin");
    } catch (err) {
      console.error(err);
      toast.error("Failed to create a seller account, try again...!");
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-r from-green-300 to-teal-400">
      {/* Scrollable Form Card */}
      <div className="w-full max-w-2xl h-[90vh] bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl p-8 border border-gray-100 overflow-y-auto">
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-extrabold text-gray-800">
            Seller Account Creation
          </h2>
          <p className="text-gray-600 mt-1">
            Sell or Resell Products on our E-Commerce portal
          </p>
        </div>

        <form onSubmit={sellerCreation} className="space-y-5">
          {/* Input Fields */}
          <div>
            <label htmlFor="name" className="block font-medium text-gray-700">
              Name:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="nameInp"
              className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label htmlFor="email" className="block font-medium text-gray-700">
              Email:
            </label>
            <input
              type="email"
              value={email}
              id="emailInp"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block font-medium text-gray-700"
            >
              Password:
            </label>
            <input
              type="password"
              value={password}
              id="passwordInp"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block font-medium text-gray-700">
              Phone:
            </label>
            <input
              type="phone"
              value={phone}
              id="phoneInp"
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label
              htmlFor="address"
              className="block font-medium text-gray-700"
            >
              Address:
            </label>
            <textarea
              value={address}
              rows={3}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-green-400"
            ></textarea>
          </div>

          <div>
            <label htmlFor="state" className="block font-medium text-gray-700">
              State:
            </label>
            <select
              id="state"
              name="state"
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-green-400"
            >
              <option value="">Select a state...</option>
              <option value="AP">Andhra Pradesh</option>
              <option value="AR">Arunachal Pradesh</option>
              <option value="AS">Assam</option>
              <option value="BR">Bihar</option>
              <option value="CH">Chhattisgarh</option>
              <option value="GA">Goa</option>
              <option value="GJ">Gujarat</option>
              <option value="HR">Haryana</option>
              <option value="HP">Himachal Pradesh</option>
              <option value="JH">Jharkhand</option>
              <option value="KA">Karnataka</option>
              <option value="KL">Kerala</option>
              <option value="MP">Madhya Pradesh</option>
              <option value="MH">Maharashtra</option>
              <option value="MN">Manipur</option>
              <option value="ML">Meghalaya</option>
              <option value="MZ">Mizoram</option>
              <option value="NL">Nagaland</option>
              <option value="OD">Odisha</option>
              <option value="PB">Punjab</option>
              <option value="RJ">Rajasthan</option>
              <option value="SK">Sikkim</option>
              <option value="TN">Tamil Nadu</option>
              <option value="TG">Telangana</option>
              <option value="TR">Tripura</option>
              <option value="UK">Uttarakhand</option>
              <option value="UP">Uttar Pradesh</option>
              <option value="WB">West Bengal</option>
              <option value="AN">Andaman And Nicobar Islands</option>
              <option value="CHD">Chandigarh</option>
              <option value="DD">
                Dadra And Nagar Haveli and Daman and Diu
              </option>
              <option value="DL">Delhi</option>
              <option value="JK">Jammu and Kashmir</option>
              <option value="LA">Ladakh</option>
              <option value="LD">Lakshadweep</option>
              <option value="PY">Puducherry</option>
            </select>
          </div>

          <div>
            <label htmlFor="pin" className="block font-medium text-gray-700">
              Enter the PIN Code:
            </label>
            <input
              type="number"
              value={pin}
              id="pinInp"
              onChange={(e) => setPin(e.target.value)}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label
              htmlFor="storeName"
              className="block font-medium text-gray-700"
            >
              Store Name:
            </label>
            <input
              type="text"
              value={storeName}
              id="storeInp"
              onChange={(e) => setStoreName(e.target.value)}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label
              htmlFor="trademark"
              className="block font-medium text-gray-700"
            >
              Trademark:
            </label>
            <input
              type="text"
              value={trademark}
              id="tmInp"
              onChange={(e) => setTrademark(e.target.value)}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label htmlFor="gst" className="block font-medium text-gray-700">
              GST No.:
            </label>
            <input
              type="text"
              value={gst}
              onChange={(e) => setGst(e.target.value)}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Bottom actions */}
          <div className="sm:col-span-2 flex items-center justify-between mt-6">
            <div className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/sellerLogin"
                className="font-medium text-green-600 hover:underline"
              >
                Login
              </Link>
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-green-400 to-teal-500 px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:scale-[1.03] transition-transform"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SellerCreation;
