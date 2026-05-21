import React, { useEffect, useState } from "react";
import { Trash2, User, Mail, MapPin, Home, Phone } from "lucide-react";
import { toast } from "react-toastify";

function AllBuyersList() {
  const [buyers, setBuyers] = useState([]);

  // Fetch all buyers
  useEffect(() => {
    fetch("http://localhost:5000/buyers")
      .then((res) => res.json())
      .then((data) => {
        setBuyers(data);
      })
      .catch((err) => console.error("Error fetching buyers:", err));
  }, []);

  // Handle delete
  const handleDelete = (id) => {
    if (!window.confirm("🗑️ Are you sure you want to delete this buyer?"))
      return;

    fetch(`http://localhost:5000/buyers/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (res.ok) {
          toast.success("✅ Buyer deleted successfully!");
          setBuyers((prev) => prev.filter((b) => b.id !== id)); // Update instantly
        }
      })
      .catch((err) => console.error("Error deleting buyer:", err));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-cyan-50 pt-28 p-8">
      <div className="max-w-8xl mx-auto bg-white shadow-2xl rounded-3xl p-8">
        <h1 className="text-4xl font-extrabold text-indigo-700 mb-6 text-center">
          👥 All Registered Buyers
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Manage and view all buyers currently registered on the platform.
        </p>

        {buyers.length === 0 ? (
          <div className="text-center text-gray-600 text-lg py-12">
            No buyers found 😕
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl shadow-lg border border-gray-100">
            <table className="min-w-full text-sm text-gray-700">
              <thead className="bg-gradient-to-r from-indigo-600 to-indigo-500 text-white text-base">
                <tr>
                  <th className="py-3 px-4 text-left font-semibold">#</th>
                  <th className="py-3 px-4 text-left font-semibold">Name</th>
                  <th className="py-3 px-4 text-left font-semibold">Age</th>
                  <th className="py-3 px-4 text-left font-semibold">Email</th>
                  <th className="py-3 px-4 text-left font-semibold">Phone</th>
                  <th className="py-3 px-4 text-left font-semibold">Address</th>
                  <th className="py-3 px-4 text-left font-semibold">State</th>
                  <th className="py-3 px-4 text-left font-semibold">PIN</th>
                  <th className="py-3 px-4 text-center font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {buyers.map((b, k) => (
                  <tr
                    key={b.id}
                    className="hover:bg-indigo-50 transition duration-200"
                  >
                    <td className="py-3 px-4">{k + 1}</td>

                    {/* Name */}
                    <td className="py-3 px-4 flex items-center gap-2 font-medium">
                      <User className="text-indigo-600 w-4 h-4" />
                      {b.name || "—"}
                    </td>

                    {/* Age */}
                    <td className="py-3 px-4 text-gray-700">{b.age || "—"}</td>

                    {/* Email */}
                    <td className="py-3 px-4 text-gray-700">
                      <div className="flex items-center gap-2">
                        <Mail className="text-cyan-500 w-4 h-4" />
                        <span>{b.email}</span>
                      </div>
                    </td>

                    {/* Phone */}
                    <td className="py-3 px-4 text-gray-700">
                      <div className="flex items-center gap-2">
                        <Phone className="text-cyan-500 w-4 h-4" />
                        <span>{b.phone}</span>
                      </div>
                    </td>

                    {/* Address */}
                    <td className="py-3 px-4 flex items-center gap-2 text-gray-700">
                      <Home className="text-amber-600 w-4 h-4" />
                      {b.address || "—"}
                    </td>

                    {/* State */}
                    <td className="py-3 px-4 text-gray-700">
                      {b.selectedState || "—"}
                    </td>

                    {/* PIN */}
                    <td className="py-3 px-4 flex items-center gap-2 text-gray-700">
                      <MapPin className="text-emerald-600 w-4 h-4" />
                      {b.pin || "—"}
                    </td>

                    {/* Delete Button */}
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleDelete(b.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md transition flex items-center gap-1 mx-auto"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AllBuyersList;
