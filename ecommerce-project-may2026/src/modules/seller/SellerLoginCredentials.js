import React, { useContext, useEffect, useState } from "react";
import {
  AdminLoginContext,
  BuyerLoginContext,
  LoginContext,
  SellerLoginContext,
} from "../../App";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function SellerLoginCredentials() {
  const { setSellerLogin } = useContext(SellerLoginContext);
  const { setBuyerLogin } = useContext(BuyerLoginContext);
  const { setAdminLogin } = useContext(AdminLoginContext);
  const { setLogin } = useContext(LoginContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:7000/sellers")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error("Error fetching seller data:", err));
  }, []);

  const handleSellerLogin = async (e) => {
    e.preventDefault();
    const sellerUser = data.find(
      (v) => v.email === email && v.password === password
    );
    if (sellerUser) {
      toast.success("Welcome to your Seller Portal");
      localStorage.setItem(
        "loggedInSeller",
        JSON.stringify({
          storeName: sellerUser.storeName,
          email: sellerUser.email,
          trademark: sellerUser.trademark || "",
        })
      );
      setSellerLogin(true);
      setAdminLogin(false);
      setBuyerLogin(false);
      setLogin(true);
      navigate("/sellerDashboard");
    } else {
      toast.error("Invalid Seller Credentials, Try Again!");
    }
    console.log("Matching seller:", sellerUser);
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-green-200 via-blue-200 to-green-300 flex items-center justify-center">
      <div className="bg-white/80 backdrop-blur-md shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Seller Login Portal
        </h2>

        <form onSubmit={handleSellerLogin} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              id="emailInp"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-400 focus:ring-2 focus:ring-green-300 outline-none"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              id="passwordInp"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-400 focus:ring-2 focus:ring-green-300 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-gradient-to-r from-green-400 to-blue-400 px-4 py-2 text-white font-semibold shadow-md hover:opacity-90 transition duration-200"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <a
            href="/sellerCreation"
            className="font-medium text-green-600 hover:underline"
          >
            Create one here
          </a>
        </p>
      </div>
    </div>
  );
}

export default SellerLoginCredentials;
