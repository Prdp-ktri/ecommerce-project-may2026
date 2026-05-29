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
  Boxes,
  Truck,
  ScanLine,
  Activity,
  Database,
  Server,
  BarChart3,
  Sparkles,
  Warehouse,
  ShieldCheck,
} from "lucide-react";

function AdminDashboard() {
  const navigate = useNavigate();

  const [admin, setAdmin] = useState({});
  const [sellers, setSellers] = useState([]);
  const [buyers, setBuyers] = useState([]);

  // Fetch admin

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
    <div className="relative overflow-hidden min-h-screen bg-gradient-to-br from-slate-950 via-teal-950 to-slate-900 pt-28 p-8 text-white">
      {/* Animated Background Blobs */}

      <div className="absolute top-0 left-0 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-pulse"></div>

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-emerald-400/10 rounded-full blur-3xl animate-bounce"></div>

      {/* Main Container */}

      <div className="relative z-10 max-w-8xl mx-auto">
        {/* Hero Section */}

        <div className="relative overflow-hidden bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-[0_0_60px_rgba(0,255,200,0.2)] p-10 mb-10 hover:scale-[1.01] transition duration-500">
          {/* Floating Admin Visuals */}

          <div className="absolute top-6 right-10 animate-bounce">
            <ShieldCheck className="text-teal-300" size={40} />
          </div>

          <div className="absolute top-20 left-1/2 slow-spin">
            <ScanLine className="text-cyan-300" size={36} />
          </div>

          <div className="absolute bottom-10 left-20 animate-pulse">
            <Warehouse className="text-orange-300" size={42} />
          </div>

          <div className="absolute bottom-10 right-24 animate-bounce delay-500">
            <Truck className="text-yellow-300" size={42} />
          </div>

          <div className="absolute top-12 left-12 animate-pulse">
            <Sparkles className="text-pink-300" size={34} />
          </div>

          {/* Header */}

          <div className="flex flex-col lg:flex-row items-center justify-between gap-10 relative z-10">
            {/* Left Side */}

            <div>
              <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-white via-teal-200 to-cyan-300 bg-clip-text text-transparent">
                Admin Command Center
              </h1>

              <p className="text-lg text-gray-200 max-w-3xl leading-relaxed">
                Control products, monitor buyers & sellers, manage logistics,
                oversee ecommerce operations, and maintain the complete digital
                commerce ecosystem.
              </p>

              {/* CTA Buttons */}

              <div className="flex flex-wrap gap-5 mt-8">
                <button
                  onClick={() => navigate("/addProduct")}
                  className="bg-gradient-to-r from-teal-500 to-cyan-500 px-6 py-3 rounded-2xl font-semibold hover:scale-105 hover:shadow-[0_0_25px_rgba(0,255,255,0.4)] transition-all duration-300"
                >
                  Add Products
                </button>

                <button
                  onClick={() => navigate("/manage-admin")}
                  className="bg-gradient-to-r from-orange-500 to-yellow-500 px-6 py-3 rounded-2xl font-semibold hover:scale-105 hover:shadow-[0_0_25px_rgba(255,165,0,0.5)] transition-all duration-300"
                >
                  Manage Admin
                </button>
              </div>
            </div>

            {/* 3D Admin Analytics Device */}

            <div className="relative">
              {/* Glow */}

              <div className="absolute inset-0 bg-cyan-500/30 blur-3xl rounded-full"></div>

              {/* Device */}

              <div className="relative w-[320px] h-[580px] bg-gradient-to-br from-slate-800 to-slate-950 rounded-[40px] border-[8px] border-slate-700 shadow-[0_0_60px_rgba(0,255,255,0.25)] rotate-6 hover:rotate-0 transition duration-700 overflow-hidden">
                {/* Notch */}

                <div className="w-32 h-6 bg-black rounded-b-2xl mx-auto"></div>

                {/* Screen */}

                <div className="p-5">
                  {/* Dashboard Header */}

                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold">Ecommerce Core</h3>

                      <p className="text-sm text-gray-400">Live operations</p>
                    </div>

                    <Activity
                      className="text-green-300 animate-pulse"
                      size={30}
                    />
                  </div>

                  {/* Stats */}

                  <div className="grid grid-cols-2 gap-4 mb-5">
                    <div className="bg-white/10 rounded-2xl p-4 border border-white/10">
                      <Store className="text-orange-300 mb-2" size={28} />

                      <h4 className="font-bold text-2xl">{sellers.length}</h4>

                      <p className="text-sm text-gray-400">Sellers</p>
                    </div>

                    <div className="bg-white/10 rounded-2xl p-4 border border-white/10">
                      <Users className="text-cyan-300 mb-2" size={28} />

                      <h4 className="font-bold text-2xl">{buyers.length}</h4>

                      <p className="text-sm text-gray-400">Buyers</p>
                    </div>
                  </div>

                  {/* Logistics */}

                  <div className="bg-gradient-to-r from-orange-500/20 to-yellow-500/20 rounded-2xl p-5 border border-white/10 mb-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Truck
                          className="text-orange-300 animate-bounce"
                          size={28}
                        />

                        <div>
                          <h4 className="font-semibold">Logistics Active</h4>

                          <p className="text-sm text-gray-400">
                            Shipping pipeline running
                          </p>
                        </div>
                      </div>

                      <BadgeCheck className="text-green-300" size={24} />
                    </div>
                  </div>

                  {/* Warehouse */}

                  <div className="bg-gradient-to-r from-cyan-500/20 to-teal-500/20 rounded-2xl p-5 border border-white/10 mb-5">
                    <div className="flex items-center gap-3 mb-3">
                      <Boxes className="text-cyan-300" size={28} />

                      <div>
                        <h4 className="font-semibold">Inventory Tracking</h4>

                        <p className="text-sm text-gray-400">
                          Products & warehouse synced
                        </p>
                      </div>
                    </div>

                    <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                      <div className="bg-gradient-to-r from-cyan-400 to-teal-400 h-3 w-[80%] rounded-full animate-pulse"></div>
                    </div>
                  </div>

                  {/* Database */}

                  <div className="bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-2xl p-5 border border-white/10">
                    <div className="flex items-center gap-3 mb-3">
                      <Database className="text-green-300" size={28} />

                      <div>
                        <h4 className="font-semibold">System Database</h4>

                        <p className="text-sm text-gray-400">
                          Synced & secured
                        </p>
                      </div>
                    </div>

                    <button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 py-3 rounded-xl font-bold hover:scale-105 transition duration-300">
                      System Healthy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Workflow Strip */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-5 text-center hover:scale-105 hover:shadow-[0_0_25px_rgba(0,255,255,0.25)] transition duration-300">
            <PackagePlus className="mx-auto text-cyan-300 mb-3" size={40} />

            <p className="font-semibold">Product Management</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-5 text-center hover:scale-105 hover:shadow-[0_0_25px_rgba(255,165,0,0.25)] transition duration-300">
            <Store className="mx-auto text-orange-300 mb-3" size={40} />

            <p className="font-semibold">Seller Monitoring</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-5 text-center hover:scale-105 hover:shadow-[0_0_25px_rgba(0,255,150,0.25)] transition duration-300">
            <Users className="mx-auto text-green-300 mb-3" size={40} />

            <p className="font-semibold">Buyer Analytics</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-5 text-center hover:scale-105 hover:shadow-[0_0_25px_rgba(255,255,0,0.25)] transition duration-300">
            <BarChart3 className="mx-auto text-yellow-300 mb-3" size={40} />

            <p className="font-semibold">Live Operations</p>
          </div>
        </div>

        {/* Admin Details */}

        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_0_40px_rgba(0,255,255,0.08)] p-8 mb-10">
          <h2 className="text-3xl font-bold text-cyan-300 mb-8 flex items-center gap-3">
            <Shield size={32} />
            Admin Details
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
              <p className="text-cyan-300 font-semibold mb-1">Admin ID</p>
              <p>46d6</p>
            </div>

            <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex items-center gap-3">
              <StoreIcon className="text-orange-300" size={22} />
              <div>
                <p className="text-cyan-300 font-semibold">Store</p>
                <p>Finesse Furnishing</p>
              </div>
            </div>

            <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex items-center gap-3">
              <Mail className="text-pink-300" size={22} />
              <div>
                <p className="text-cyan-300 font-semibold">Email</p>
                <p>pradeepkhatri44@live.com</p>
              </div>
            </div>

            <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex items-center gap-3">
              <Phone className="text-green-300" size={22} />
              <div>
                <p className="text-cyan-300 font-semibold">Phone</p>
                <p>+91-9828835749</p>
              </div>
            </div>

            <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex items-center gap-3">
              <MapPin className="text-yellow-300" size={22} />
              <div>
                <p className="text-cyan-300 font-semibold">Address</p>
                <p>31/50, Nayakbara, Ajmer-Pushkar Rd, Pushkar</p>
              </div>
            </div>

            <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex items-center gap-3">
              <Map className="text-orange-300" size={22} />
              <div>
                <p className="text-cyan-300 font-semibold">State</p>
                <p>Rajasthan</p>
              </div>
            </div>

            <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex items-center gap-3">
              <BadgeCheck className="text-green-300" size={22} />
              <div>
                <p className="text-cyan-300 font-semibold">Trademark</p>
                <p>FINESSE</p>
              </div>
            </div>

            <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex items-center gap-3">
              <BadgePercent className="text-yellow-300" size={22} />
              <div>
                <p className="text-cyan-300 font-semibold">GST No.</p>
                <p>08RICS7823V1FS</p>
              </div>
            </div>

            <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex items-center gap-3">
              <Ship className="text-cyan-300" size={22} />
              <div>
                <p className="text-cyan-300 font-semibold">IEC Code</p>
                <p>AI348160954</p>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {/* Add Product */}

          <div
            onClick={() => navigate("/addProduct")}
            className="group cursor-pointer relative overflow-hidden bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:-translate-y-3 hover:shadow-[0_0_40px_rgba(0,255,200,0.25)] transition-all duration-500"
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full"></div>

            <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 flex items-center justify-center mb-5">
              <PackagePlus size={34} className="text-cyan-300" />
            </div>

            <h2 className="text-2xl font-bold text-cyan-300 mb-3">
              Add Product
            </h2>

            <p className="text-gray-300 text-sm mb-4">
              Add new ecommerce products with category, pricing, and inventory
              information.
            </p>

            <ArrowRight className="text-cyan-300" />
          </div>

          {/* Sellers */}

          <div
            onClick={() => navigate("/full-seller-list")}
            className="group cursor-pointer relative overflow-hidden bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:-translate-y-3 hover:shadow-[0_0_40px_rgba(255,165,0,0.25)] transition-all duration-500"
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full"></div>

            <div className="w-16 h-16 rounded-2xl bg-orange-500/20 flex items-center justify-center mb-5">
              <Store size={34} className="text-orange-300" />
            </div>

            <h2 className="text-2xl font-bold text-orange-300 mb-3">
              Sellers Overview
            </h2>

            <p className="text-gray-300 mb-3">
              Total Sellers:{" "}
              <span className="font-bold text-orange-300">
                {sellers.length}
              </span>
            </p>

            <ArrowRight className="text-orange-300" />
          </div>

          {/* Buyers */}

          <div
            onClick={() => navigate("/full-buyers-list")}
            className="group cursor-pointer relative overflow-hidden bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:-translate-y-3 hover:shadow-[0_0_40px_rgba(0,255,255,0.25)] transition-all duration-500"
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full"></div>

            <div className="w-16 h-16 rounded-2xl bg-teal-500/20 flex items-center justify-center mb-5">
              <Users size={34} className="text-teal-300" />
            </div>

            <h2 className="text-2xl font-bold text-teal-300 mb-3">
              Buyers Overview
            </h2>

            <p className="text-gray-300 mb-3">
              Total Buyers:{" "}
              <span className="font-bold text-teal-300">{buyers.length}</span>
            </p>

            <ArrowRight className="text-teal-300" />
          </div>

          {/* Manage Admin */}

          <div
            onClick={() => navigate("/manage-admin")}
            className="group cursor-pointer relative overflow-hidden bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:-translate-y-3 hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-all duration-500"
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full"></div>

            <div className="w-16 h-16 rounded-2xl bg-gray-500/20 flex items-center justify-center mb-5">
              <UserCog size={34} className="text-gray-200" />
            </div>

            <h2 className="text-2xl font-bold text-gray-200 mb-3">
              Manage Admin
            </h2>

            <p className="text-gray-300 text-sm mb-4">
              Modify admin credentials and platform settings securely.
            </p>

            <ArrowRight className="text-gray-200" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
