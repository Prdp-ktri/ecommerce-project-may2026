import React, { useContext, useEffect, useState } from "react";
import {
  AdminLoginContext,
  BuyerLoginContext,
  LoginContext,
  SellerLoginContext,
} from "../../App";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./AdminLoginCredentials.css";

function AdminLoginCredentials() {
  const { setSellerLogin } = useContext(SellerLoginContext);
  const { setBuyerLogin } = useContext(BuyerLoginContext);
  const { setAdminLogin } = useContext(AdminLoginContext);
  const { setLogin } = useContext(LoginContext);
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:9999/admin")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error("Error fetching Admin data:", err));
  }, []);

  const handleAdminLogin = (e) => {
    e.preventDefault();
    let adminUser = data.find((v) => v.email === email && v.pw === pw);

    if (adminUser) {
      toast.success("Welcome to the Admin Dashboard!");
      setAdminLogin(true);
      setBuyerLogin(false);
      setSellerLogin(false);
      setLogin(true);
      navigate("/adminDashboard");
    } else {
      toast.error("Invalid Admin Login Credentials, Enter Again");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>
        <form onSubmit={handleAdminLogin} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email:
            </label>
            <input
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              id="emailInp"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password:
            </label>
            <input
              type="password"
              value={pw}
              required
              onChange={(e) => setPw(e.target.value)}
              id="pwInp"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLoginCredentials;
