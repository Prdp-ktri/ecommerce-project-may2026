import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ManageProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [pin, setPin] = useState("");
  const [storeName, setStoreName] = useState("");
  const [gst, setGst] = useState("");
  const [trademark, setTrademark] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Get the logged-in seller from localStorage
    const storedSeller = JSON.parse(localStorage.getItem("loggedInSeller"));
    if (!storedSeller || !storedSeller.id) {
      toast.error("⚠️ Seller not found! Please log in again.");
      navigate("/login");
      return;
    }

    // ✅ Fetch seller data by ID from backend
    fetch(`http://localhost:7000/sellers/${storedSeller.id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch profile!");
        return res.json();
      })
      .then((data) => {
        setName(data.name || "");
        setEmail(data.email || "");
        setPhone(data.phone || "");
        setPassword(data.password || "");
        setAddress(data.address || "");
        setSelectedState(data.selectedState || "");
        setPin(data.pin || "");
        setStoreName(data.storeName || "");
        setGst(data.gst || "");
        setTrademark(data.trademark || "");
      })
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleUpdatedProfile = (e) => {
    e.preventDefault();

    const storedSeller = JSON.parse(localStorage.getItem("loggedInSeller"));
    if (!storedSeller || !storedSeller.id) {
      toast.error("⚠️ Cannot update profile — Seller ID not found!");
      return;
    }

    const updatedProfile = {
      id: storedSeller.id,
      name,
      email,
      phone,
      password,
      address,
      selectedState,
      pin,
      storeName,
      gst,
      trademark,
    };

    fetch(`http://localhost:7000/sellers/${storedSeller.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProfile),
    })
      .then((res) => {
        if (res.ok) {
          localStorage.setItem(
            "loggedInSeller",
            JSON.stringify(updatedProfile)
          );
          toast.success("✅ Profile Updated Successfully!");
          navigate("/sellerDashboard");
        } else {
          throw new Error("Failed to update profile!");
        }
      })
      .catch((err) => toast.error(err.message));
  };

  if (loading) {
    return <p className="p-8 text-center text-gray-600">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-yellow-50 flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-2xl w-full border-t-4 border-teal-500">
        <h1 className="text-3xl font-bold text-teal-700 mb-6 text-center">
          Edit Your Profile
        </h1>

        <form onSubmit={handleUpdatedProfile} className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-orange-800 mb-4">
              Seller Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-3 border rounded-lg focus:ring-2 focus:ring-teal-400 focus:outline-none w-full"
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-3 border rounded-lg focus:ring-2 focus:ring-teal-400 focus:outline-none w-full"
              />
              <input
                type="phone"
                placeholder="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="p-3 border rounded-lg focus:ring-2 focus:ring-teal-400 focus:outline-none w-full"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-3 border rounded-lg focus:ring-2 focus:ring-teal-400 focus:outline-none w-full"
              />
              <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="p-3 border rounded-lg focus:ring-2 focus:ring-teal-400 focus:outline-none w-full"
              />
              <input
                type="text"
                placeholder="State (e.g. RJ)"
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="p-3 border rounded-lg focus:ring-2 focus:ring-teal-400 focus:outline-none w-full"
              />
              <input
                type="text"
                placeholder="PIN Code"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="p-3 border rounded-lg focus:ring-2 focus:ring-teal-400 focus:outline-none w-full"
              />
              <input
                type="text"
                placeholder="Store Name"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="p-3 border rounded-lg focus:ring-2 focus:ring-teal-400 focus:outline-none w-full"
              />
              <input
                type="text"
                placeholder="GST Number"
                value={gst}
                onChange={(e) => setGst(e.target.value)}
                className="p-3 border rounded-lg focus:ring-2 focus:ring-teal-400 focus:outline-none w-full"
              />
              <input
                type="text"
                placeholder="Trademark Number"
                value={trademark}
                onChange={(e) => setTrademark(e.target.value)}
                className="p-3 border rounded-lg focus:ring-2 focus:ring-teal-400 focus:outline-none w-full"
              />
            </div>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-3 bg-teal-500 text-white font-semibold rounded-lg shadow-md hover:bg-teal-600 transition duration-300"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ManageProfile;
