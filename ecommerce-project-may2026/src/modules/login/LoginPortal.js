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
        (v) => v.email === email && v.password === password,
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
        (v) => v.email === email && v.password === password,
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
        (v) => v.email === email && v.password === password,
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
    <div className="w-screen min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl bg-white/10 backdrop-blur-lg shadow-2xl p-10 border border-white/20">
        <h2 className="text-3xl font-bold text-center text-white mb-8">
          Choose Your Login Portal
        </h2>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-white mb-2"
            >
              Select Role
            </label>

            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-700 outline-none"
            >
              <option value="admin">Admin Login</option>
              <option value="seller">Seller Login</option>
              <option value="buyer">Buyer Login</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="emailInp"
              className="block text-sm font-medium text-white mb-2"
            >
              Email
            </label>

            <input
              type="email"
              id="emailInp"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-700 outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="passwordInp"
              className="block text-sm font-medium text-white mb-2"
            >
              Password
            </label>

            <input
              type="password"
              id="passwordInp"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-700 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl shadow-lg transition duration-300"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPortal;
