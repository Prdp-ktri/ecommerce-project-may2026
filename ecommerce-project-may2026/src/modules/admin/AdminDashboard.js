import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  UserCog,
  PackagePlus,
  Store,
  Users,
  ArrowRight,
  Mail,
  Shield,
  MapPin,
  BadgeCheck,
  BadgePercent,
  Map,
  Ship,
  StoreIcon,
  Phone,
} from "lucide-react";

function AdminDashboard() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState({});
  const [sellers, setSellers] = useState([]);
  const [buyers, setBuyers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9999/admin")
      .then((res) => res.json())
      .then((data) => setAdmin(data))
      .catch((err) => console.error("Error fetching admin:", err));
  }, []);

  // Fetch sellers
  useEffect(() => {
    fetch("http://localhost:7000/sellers")
      .then((res) => res.json())
      .then((data) => setSellers(data))
      .catch((err) => console.error("Error fetching sellers:", err));
  }, []);

  // Fetch buyers
  useEffect(() => {
    fetch("http://localhost:5000/buyers")
      .then((res) => res.json())
      .then((data) => setBuyers(data))
      .catch((err) => console.error("Error fetching buyers:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-teal-50 pt-28 p-8">
      <div className="max-w-8xl mx-auto bg-white shadow-2xl rounded-3xl p-8">
        {/* Header */}
        <h1 className="text-4xl font-extrabold text-teal-700 mb-6 text-center">
          🧭 Admin Dashboard
        </h1>
        <p className="text-center text-gray-600 mb-10">
          Manage products, view sellers and buyers, and maintain admin details.
        </p>

        {/* Admin Details */}
        <div className="bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold flex items-center gap-2 mb-4">
            <Shield size={24} /> Admin Details
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 text-base">
            <p className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-yellow-300" />{" "}
              <strong>ID:</strong> {"46d6"}
            </p>
            <p className="flex items-center gap-2">
              <StoreIcon className="w-5 h-5 text-yellow-300" />{" "}
              <strong>Store:</strong> {"Finesse Furnishing"}
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-yellow-300" />{" "}
              <strong>Email:</strong> {"pradeepkhatri44@live.com"}
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-yellow-300" />{" "}
              <strong>Phone:</strong> {"+91-9828835749"}
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-yellow-300" />{" "}
              <strong>Address:</strong>{" "}
              {"31/50, Nayakbara, Ajmer-Pushkar Rd, Pushkar"}
            </p>
            <p className="flex items-center gap-2">
              <Map className="w-5 h-5 text-yellow-300" />
              <strong>State:</strong>
              {"Rajasthan"}
            </p>
            <p className="flex items-center gap-2">
              <BadgeCheck className="w-5 h-5 text-yellow-300" />
              <strong>Trademark:</strong> {"FINESSE"}
            </p>
            <p className="flex items-center gap-2">
              <BadgePercent className="w-5 h-5 text-yellow-300" />
              <strong>GST No.:</strong>
              {"08RICS7823V1FS"}
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-yellow-300" />
              <strong>PIN:</strong>
              {"305022"}
            </p>
            <p className="flex items-center gap-2">
              <Ship className="w-5 h-5 text-yellow-300" />
              <strong>IEC Code:</strong>
              {"AI348160954"}
            </p>
          </div>
        </div>

        {/* Sneak Peek Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {/* Add Product */}
          <div
            onClick={() => navigate("/addProduct")}
            className="cursor-pointer bg-gradient-to-br from-green-400 to-teal-500 text-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <PackagePlus /> Add Product
              </h2>
              <ArrowRight />
            </div>
            <p className="text-sm opacity-90">
              Quickly add a new product with brand, category, and pricing.
            </p>
            <div className="mt-4 text-xs opacity-80">
              Example: <strong>Brand:</strong> Sleepwell |{" "}
              <strong>Category:</strong> Mattress | <strong>MRP:</strong> ₹12000
            </div>
          </div>

          {/* Sellers Overview */}
          <div
            onClick={() => navigate("/full-seller-list")}
            className="cursor-pointer bg-gradient-to-br from-orange-400 to-yellow-500 text-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Store /> Sellers Overview
              </h2>
              <ArrowRight />
            </div>
            <p className="text-sm opacity-90 mb-2">
              {sellers.length > 0
                ? `Total Sellers: ${sellers.length}`
                : "No sellers registered yet."}
            </p>
            <ul className="text-xs space-y-1 opacity-90">
              {sellers.slice(0, 3).map((s, i) => (
                <li key={i}>
                  🏪 <strong>{s.storeName}</strong> — {s.email}
                </li>
              ))}
            </ul>
          </div>

          {/* Buyers Overview */}
          <div
            onClick={() => navigate("/full-buyers-list")}
            className="cursor-pointer bg-gradient-to-br from-indigo-400 to-cyan-500 text-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Users /> Buyers Overview
              </h2>
              <ArrowRight />
            </div>
            <p className="text-sm opacity-90 mb-2">
              {buyers.length > 0
                ? `Total Buyers: ${buyers.length}`
                : "No buyers found."}
            </p>
            <ul className="text-xs space-y-1 opacity-90">
              {buyers.slice(0, 3).map((b, i) => (
                <li key={i}>
                  👤 <strong>{b.name}</strong> — {b.email}
                </li>
              ))}
            </ul>
          </div>

          {/* Manage Admin */}
          <div
            onClick={() => navigate("/manage-admin")}
            className="cursor-pointer bg-gradient-to-br from-gray-700 to-gray-900 text-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-transform hover:-translate-y-1 md:col-span-2 xl:col-span-1"
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <UserCog /> Manage Admin Profile
              </h2>
              <ArrowRight />
            </div>
            <p className="text-sm opacity-90">
              Update your admin credentials or modify account details securely.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
