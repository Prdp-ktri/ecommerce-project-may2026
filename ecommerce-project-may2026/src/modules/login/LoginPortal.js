import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  AdminLoginContext,
  BuyerLoginContext,
  SellerLoginContext,
} from "../../App";

function LoginPortal() {
  const navigate = useNavigate();
  const { setAdminLogin } = useContext(AdminLoginContext);
  const { setSellerLogin } = useContext(SellerLoginContext);
  const { setBuyerLogin } = useContext(BuyerLoginContext);

  const [role, setRole] = useState("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [admins, setAdmins] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [buyers, setBuyers] = useState([]);

  // Fetch data once
  useEffect(() => {
    fetch("http://localhost:9999/admin")
      .then((res) => res.json())
      .then((data) => setAdmins(data))
      .catch((err) => console.error("Error fetching Admin data:", err));

    fetch("http://localhost:7000/sellers")
      .then((res) => res.json())
      .then((data) => setSellers(data))
      .catch((err) => console.error("Error fetching seller data:", err));

    fetch("http://localhost:5000/buyers")
      .then((res) => res.json())
      .then((data) => setBuyers(data))
      .catch((err) => console.error("Error fetching buyer data:", err));
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    if (role === "admin") {
      const adminUser = admins.find(
        (v) => v.email === email && v.password === password
      );
      if (adminUser) {
        toast("Welcome to the Admin Dashboard!");
        setAdminLogin(true);
        navigate("/adminDashboard");
      } else {
        toast("Invalid Admin Login Credentials!");
      }
    }

    if (role === "seller") {
      const sellerUser = sellers.find(
        (v) => v.email === email && v.password === password
      );
      if (sellerUser) {
        // ✅ Store only the logged-in seller
        localStorage.setItem("loggedInSeller", JSON.stringify(sellerUser));
        toast("Welcome to the Seller Dashboard!");
        setSellerLogin(true);
        navigate("/sellerDashboard");
      } else {
        toast("Invalid Seller Login Credentials!");
      }
    }

    if (role === "buyer") {
      const buyerUser = buyers.find(
        (v) => v.email === email && v.password === password
      );
      if (buyerUser) {
        localStorage.setItem("loggedInBuyer", JSON.stringify(buyerUser));
        toast("Welcome to Buyer Portal!");
        setBuyerLogin(true);
        navigate("/buyerDashboard");
      } else {
        toast("Invalid Buyer Login Credentials!");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Choose Your Login Portal
        </h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Select Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none transition"
            >
              <option value="admin">Admin Login</option>
              <option value="seller">Seller Login</option>
              <option value="buyer">Buyer Login</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="emailInp"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="emailInp"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none transition placeholder-gray-400"
            />
          </div>

          <div>
            <label
              htmlFor="passwordInp"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="passwordInp"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none transition placeholder-gray-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition-transform transform hover:scale-105"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPortal;
