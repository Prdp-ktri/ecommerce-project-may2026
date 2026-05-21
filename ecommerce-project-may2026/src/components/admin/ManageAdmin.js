import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Mail,
  Home,
  Map,
  MapPin,
  BadgePercent,
  BadgeCheck,
  Ship,
  UserCog,
} from "lucide-react";

function ManageAdmin() {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🟩 Fetch admin data
  useEffect(() => {
    fetch("http://localhost:9999/admin")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        console.log("Fetched admin data:", data);

        if (Array.isArray(data) && data.length > 0) {
          setAdmin(data[0]); // <-- pick the first admin object
        } else {
          toast.error("No admin data found!");
        }
      })
      .catch((err) => {
        console.error("Error fetching admin data:", err);
        toast.error("Failed to load admin data!");
      })
      .finally(() => setLoading(false));
  }, []);

  // 🟨 Handle field changes
  const handleChange = (e) => {
    setAdmin((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // 🟧 Update admin data
  const handleUpdate = (e) => {
    e.preventDefault();
    if (!admin?.id) {
      toast.error("Cannot update: Admin ID missing!");
      return;
    }

    fetch(`http://localhost:9999/admin/${admin.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(admin),
    })
      .then((res) => {
        if (res.ok) {
          toast.success("Admin data updated successfully!");
        } else {
          toast.error("Failed to update admin data!");
        }
      })
      .catch((err) => {
        console.error("Error updating admin:", err);
        toast.error("Error updating admin data!");
      });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600 text-lg">
        Loading admin data...
      </div>
    );
  }

  if (!admin) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500 text-lg">
        No admin data available.
      </div>
    );
  }

  // 🟩 Main Component
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20 px-6 flex flex-col lg:flex-row items-start justify-center gap-10">
      {/* 🟦 Admin Form Section */}
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-2xl p-10 border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-8">
          Manage Admin Profile
        </h2>

        <form onSubmit={handleUpdate} className="space-y-6">
          {/* Email */}
          <div className="flex items-center gap-3">
            <Mail className="text-indigo-500 w-5 h-5" />
            <input
              type="email"
              name="email"
              value={admin.email || ""}
              onChange={handleChange}
              placeholder="Admin Email"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required
            />
          </div>

          {/* Address */}
          <div className="flex items-center gap-3">
            <Home className="text-amber-600 w-5 h-5" />
            <input
              type="text"
              name="address"
              value={admin.address || ""}
              onChange={handleChange}
              placeholder="Address"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-400 focus:outline-none"
            />
          </div>

          {/* State */}
          <div className="flex items-center gap-3">
            <Map className="text-blue-600 w-5 h-5" />
            <input
              type="text"
              name="state"
              value={admin.state || ""}
              onChange={handleChange}
              placeholder="State"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* PIN */}
          <div className="flex items-center gap-3">
            <MapPin className="text-emerald-600 w-5 h-5" />
            <input
              type="text"
              name="pin"
              value={admin.pin || ""}
              onChange={handleChange}
              placeholder="PIN Code"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-400 focus:outline-none"
            />
          </div>

          {/* GST */}
          <div className="flex items-center gap-3">
            <BadgePercent className="text-green-600 w-5 h-5" />
            <input
              type="text"
              name="gst"
              value={admin.gst || ""}
              onChange={handleChange}
              placeholder="GST Number"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-400 focus:outline-none"
            />
          </div>

          {/* Trademark */}
          <div className="flex items-center gap-3">
            <BadgeCheck className="text-indigo-600 w-5 h-5" />
            <input
              type="text"
              name="trademark"
              value={admin.trademark || ""}
              onChange={handleChange}
              placeholder="Trademark"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>

          {/* IEC No. */}
          <div className="flex items-center gap-3">
            <Ship className="text-blue-500 w-5 h-5" />
            <input
              type="text"
              name="iec"
              value={admin.iec || ""}
              onChange={handleChange}
              placeholder="IEC Number"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Update Button */}
          <div className="text-center pt-4">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-xl shadow-md transition-transform transform hover:scale-105"
            >
              Update Admin Details
            </button>
          </div>
        </form>
      </div>

      {/* 🟨 Live Preview Card */}
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 border border-gray-200 mt-10 lg:mt-0">
        <div className="flex flex-col items-center">
          <div className="bg-indigo-100 p-4 rounded-full mb-4">
            <UserCog className="text-indigo-600 w-10 h-10" />
          </div>
          <h3 className="text-2xl font-bold text-indigo-700 mb-2">
            Admin Profile Preview
          </h3>
          <p className="text-gray-500 mb-6">Real-time updated info</p>

          <div className="text-left w-full space-y-3">
            <p className="text-gray-700">
              <strong>Email:</strong> {admin.email || "—"}
            </p>
            <p className="text-gray-700">
              <strong>Address:</strong> {admin.address || "—"}
            </p>
            <p className="text-gray-700">
              <strong>State:</strong> {admin.state || "—"}
            </p>
            <p className="text-gray-700">
              <strong>PIN:</strong> {admin.pin || "—"}
            </p>
            <p className="text-gray-700">
              <strong>GST No.:</strong> {admin.gst || "—"}
            </p>
            <p className="text-gray-700">
              <strong>Trademark:</strong> {admin.trademark || "—"}
            </p>
            <p className="text-gray-700">
              <strong>IEC No.:</strong> {admin.iec || "—"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageAdmin;
