import React, { useState } from "react";
// import { BuyerLoginContext } from "../../App";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function BuyerCreation() {
  // const { setBuyerLogin } = useContext(BuyerLoginContext);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [pin, setPin] = useState("");

  const navigate = useNavigate();

  const buyerCreation = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.warn("Please fill in required fields: Name, Email & Password");
      return;
    }

    const objBuyerData = {
      name,
      age,
      email,
      phone,
      password,
      address,
      selectedState,
      pin,
    };

    try {
      const res = await fetch("http://localhost:5000/buyers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(objBuyerData),
      });

      if (!res.ok) throw new Error(`Server responded with ${res.status}`);

      toast.success("Account created — please login!");
      navigate("/buyerLogin");
    } catch (err) {
      console.error(err);
      toast.error("Failed to create account. Try again later.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-400 to-orange-400 py-12 px-4"
      style={{ width: "100vw", height: "100vh" }}
    >
      <div className="max-w-2xl w-full bg-white/60 backdrop-blur-md rounded-2xl shadow-2xl p-8 sm:p-10 border border-yellow-100">
        <div className="mb-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">
            Create your Account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Buy premium furnishing products — simple, secure, and fast.
          </p>
        </div>

        <form
          onSubmit={buyerCreation}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <div className="sm:col-span-1">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name*
            </label>
            <input
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-yellow-200 px-3 py-2 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-300"
              placeholder="Full name"
            />
          </div>

          <div>
            <label
              htmlFor="age"
              className="block text-sm font-medium text-gray-700"
            >
              Age
            </label>
            <input
              id="age"
              name="age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-yellow-200 px-3 py-2 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-300"
              placeholder="Age"
              min="0"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email*
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-yellow-200 px-3 py-2 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-300"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone:
            </label>
            <input
              type="text"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-yellow-200 px-3 py-2 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-300"
              placeholder="+91-xxxxxxxxxx"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password*
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-yellow-200 px-3 py-2 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-300"
              placeholder="Choose a secure password"
            />
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <textarea
              id="address"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your full address"
              rows={3}
              className="mt-1 block w-full rounded-lg border border-yellow-200 px-3 py-2 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-300 resize-none"
            />
          </div>

          <div>
            <label
              htmlFor="state"
              className="block text-sm font-medium text-gray-700"
            >
              State
            </label>
            <select
              id="state"
              name="state"
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-yellow-200 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-300"
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
            <label
              htmlFor="pin"
              className="block text-sm font-medium text-gray-700"
            >
              PIN Code
            </label>
            <input
              id="pin"
              name="pin"
              type="text"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-yellow-200 px-3 py-2 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-300"
              placeholder="560001"
            />
          </div>

          <div className="sm:col-span-2 flex items-center justify-between mt-2">
            <div className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/buyerLogin"
                className="font-medium text-yellow-600 hover:underline"
              >
                Login
              </Link>
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-yellow-300 to-orange-300 px-5 py-2 text-sm font-semibold text-gray-800 shadow-md hover:scale-[1.01] transition-transform"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
