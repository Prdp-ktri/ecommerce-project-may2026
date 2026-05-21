import React, { useEffect, useState } from "react";
import { Trash2, Store, Mail, BadgePercent, Phone } from "lucide-react"; // icons
import { toast } from "react-toastify";

function AllSellersList() {
  const [sellers, setSellers] = useState([]);

  // Fetch sellers
  useEffect(() => {
    fetch("http://localhost:7000/sellers")
      .then((res) => res.json())
      .then((data) => {
        setSellers(data);
      })
      .catch((err) => console.error("Error fetching sellers:", err));
  }, []);

  // Delete seller
  const handleDelete = (id) => {
    if (!window.confirm("🗑️ Are you sure you want to delete this seller?"))
      return;

    fetch(`http://localhost:7000/sellers/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (res.ok) {
          toast.success("✅ Seller deleted successfully!");
          setSellers((prev) => prev.filter((s) => s.id !== id));
        }
      })
      .catch((err) => console.error("Error deleting seller:", err));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-yellow-50 pt-28 p-8">
      <div className="max-w-8xl mx-auto bg-white shadow-2xl rounded-3xl p-8">
        <h1 className="text-4xl font-extrabold text-teal-700 mb-6 text-center">
          🏪 All Registered Sellers
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Manage and view all seller accounts registered on the platform.
        </p>

        {sellers.length === 0 ? (
          <div className="text-center text-gray-600 text-lg py-12">
            No sellers found 😕
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl shadow-lg border border-gray-100">
            <table className="min-w-full text-sm text-gray-700">
              <thead className="bg-gradient-to-r from-teal-600 to-teal-500 text-white text-base">
                <tr>
                  <th className="py-3 px-4 text-left font-semibold">#</th>
                  <th className="py-3 px-4 text-left font-semibold">
                    Store Name
                  </th>
                  <th className="py-3 px-4 text-left font-semibold">Email</th>
                  <th className="py-3 px-4 text-left font-semibold">Phone</th>
                  <th className="py-3 px-4 text-left font-semibold">Address</th>
                  <th className="py-3 px-4 text-left font-semibold">State</th>
                  <th className="py-3 px-4 text-left font-semibold">GST No.</th>
                  <th className="py-3 px-4 text-left font-semibold">
                    Trademark
                  </th>
                  <th className="py-3 px-4 text-center font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {sellers.map((v, k) => (
                  <tr
                    key={v.id}
                    className="hover:bg-teal-50 transition duration-200"
                  >
                    <td className="py-3 px-4">{k + 1}</td>

                    {/* Store Name */}
                    <td className="py-3 px-4 flex items-center gap-2 font-medium">
                      <Store className="text-teal-600 w-4 h-4" />
                      {v.storeName || "—"}
                    </td>

                    {/* Email */}
                    <td className="py-3 px-4 text-gray-700">
                      <div className="flex items-center gap-2">
                        <Mail className="text-orange-500 w-4 h-4" />
                        <span>{v.email}</span>
                      </div>
                    </td>

                    {/* Phone */}
                    <td className="py-3 px-4 text-gray-700">
                      <div className="flex items-center gap-2">
                        <Phone className="text-orange-500 w-4 h-4" />
                        <span>{v.phone}</span>
                      </div>
                    </td>

                    {/* Address */}
                    <td className="py-3 px-4 text-gray-700">{v.address}</td>

                    {/* State */}
                    <td className="py-3 px-4 text-gray-700">
                      {v.selectedState || "—"}
                    </td>

                    {/* GST */}
                    <td className="py-3 px-4 flex items-center gap-2 text-gray-700">
                      <BadgePercent className="text-green-600 w-4 h-4" />
                      {v.gst || "—"}
                    </td>

                    {/* Trademark */}
                    <td className="py-3 px-4 text-gray-700">
                      {v.trademark || "—"}
                    </td>

                    {/* Delete Button */}
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleDelete(v.id)}
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

export default AllSellersList;
