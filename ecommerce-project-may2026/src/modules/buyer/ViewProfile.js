import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ViewProfile() {
  const [buyer, setBuyer] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the logged-in buyer from localStorage
    const storedBuyer = JSON.parse(localStorage.getItem("loggedInBuyer"));

    if (!storedBuyer) {
      toast.error("Please log in to view your profile!");
      navigate("/login");
      return;
    }

    // Optionally, fetch fresh data from the server
    fetch(`http://localhost:5000/buyers/${storedBuyer.id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch profile!");
        return res.json();
      })
      .then((data) => setBuyer(data))
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  }, [navigate]);

  if (loading)
    return <p className="p-8 text-center text-gray-600">Loading profile...</p>;

  if (!buyer)
    return <p className="p-8 text-center text-red-500">Profile not found!</p>;

  return (
  <div className="min-h-screen bg-gradient-to-br from-slate-950 via-orange-950 to-slate-900 text-white pt-32 px-6 pb-10 relative overflow-hidden">

    {/* Glow Effects */}

    <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"></div>

    <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl"></div>

    {/* Header */}

    <div className="relative z-10 text-center mb-10">

      <h1 className="text-5xl font-extrabold bg-gradient-to-r from-orange-300 via-yellow-300 to-orange-500 bg-clip-text text-transparent mb-3">

        Your Profile

      </h1>

      <p className="text-gray-300 text-lg">
        Manage and review your account information.
      </p>

    </div>

    {/* Main Profile Card */}

    <div className="relative z-10 w-full">

      <div className="w-full bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">

        {/* Personal Information */}

        <div className="mb-10">

          <h2 className="text-2xl font-bold text-orange-300 mb-6">
            Personal Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

            <div className="bg-slate-800/60 rounded-2xl p-5 border border-white/10">
              <p className="text-orange-300 text-sm mb-2">
                Full Name
              </p>
              <p className="text-white text-lg font-semibold">
                {buyer.name}
              </p>
            </div>

            <div className="bg-slate-800/60 rounded-2xl p-5 border border-white/10">
              <p className="text-orange-300 text-sm mb-2">
                Age
              </p>
              <p className="text-white text-lg font-semibold">
                {buyer.age}
              </p>
            </div>

            <div className="bg-slate-800/60 rounded-2xl p-5 border border-white/10">
              <p className="text-orange-300 text-sm mb-2">
                Email Address
              </p>
              <p className="text-white text-lg font-semibold break-all">
                {buyer.email}
              </p>
            </div>

            <div className="bg-slate-800/60 rounded-2xl p-5 border border-white/10">
              <p className="text-orange-300 text-sm mb-2">
                Phone Number
              </p>
              <p className="text-white text-lg font-semibold">
                {buyer.phone}
              </p>
            </div>

            <div className="bg-slate-800/60 rounded-2xl p-5 border border-white/10">
              <p className="text-orange-300 text-sm mb-2">
                Password
              </p>
              <p className="text-white text-lg font-semibold">
                ********
              </p>
            </div>

          </div>

        </div>

        {/* Address Information */}

        <div>

          <h2 className="text-2xl font-bold text-orange-300 mb-6">
            Address Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

            <div className="bg-slate-800/60 rounded-2xl p-5 border border-white/10 xl:col-span-2">
              <p className="text-orange-300 text-sm mb-2">
                Address
              </p>
              <p className="text-white text-lg font-semibold">
                {buyer.address}
              </p>
            </div>

            <div className="bg-slate-800/60 rounded-2xl p-5 border border-white/10">
              <p className="text-orange-300 text-sm mb-2">
                State
              </p>
              <p className="text-white text-lg font-semibold">
                {buyer.selectedState}
              </p>
            </div>

            <div className="bg-slate-800/60 rounded-2xl p-5 border border-white/10">
              <p className="text-orange-300 text-sm mb-2">
                PIN Code
              </p>
              <p className="text-white text-lg font-semibold">
                {buyer.pin}
              </p>
            </div>

          </div>

        </div>

        {/* Action Button */}

        <div className="flex justify-center mt-12">

          <button
            onClick={() => navigate("/edit-profile")}
            className="group relative overflow-hidden px-10 py-4 rounded-2xl bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-500 text-white font-bold text-lg shadow-[0_0_25px_rgba(255,165,0,0.35)] hover:scale-105 hover:shadow-[0_0_35px_rgba(255,165,0,0.5)] transition-all duration-300"
          >

            <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition"></span>

            <span className="relative">
              Edit Profile
            </span>

          </button>

        </div>

      </div>

    </div>

  </div>
);
}

export default ViewProfile;
