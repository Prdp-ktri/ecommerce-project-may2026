import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function EditProfile() {
  const [buyerId, setBuyerId] = useState(null);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [pin, setPin] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Fetch buyer data
  useEffect(() => {
    const storedBuyer = JSON.parse(localStorage.getItem("loggedInBuyer"));
    if (!storedBuyer) {
      toast.error("Please log in to Edit your profile!");
      navigate("/login");
      return;
    }

    setBuyerId(storedBuyer.id);

    fetch("http://localhost:5000/buyers/" + storedBuyer.id)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch profile!");
        return res.json();
      })
      .then((data) => {
        setName(data.name || "");
        setAge(data.age || "");
        setEmail(data.email || "");
        setPhone(data.phone || "");
        setPassword(data.password || "");
        setAddress(data.address || "");
        setSelectedState(data.selectedState || "");
        setPin(data.pin || "");
      })
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleUpdatedProfile = (e) => {
    e.preventDefault();
    const updatedProfile = {
      name,
      age,
      email,
      phone,
      password,
      address,
      selectedState,
      pin,
    };

    fetch("http://localhost:5000/buyers/" + buyerId, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProfile),
    })
      .then((res) => {
        if (res.ok) {
          toast.success("✅ Profile Updated Successfully!");
          navigate("/view-profile");
        }
      })
      .catch((err) => toast.error(err.message));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-orange-950 to-slate-900 flex items-center justify-center text-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-orange-300">Loading Your Profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-orange-950 to-slate-900 text-white pt-32 px-6 pb-10 relative overflow-hidden">
      {/* Background Glow */}

      <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl"></div>

      {/* Header */}

      <div className="relative z-10 text-center mb-10">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-orange-300 via-yellow-300 to-orange-500 bg-clip-text text-transparent mb-3">
          Edit Profile
        </h1>

        <p className="text-gray-300 text-lg">
          Keep your account details updated for a seamless shopping experience.
        </p>
      </div>

      {/* Main Card */}

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="w-full bg-white/10 backdrop-blur-xl border border-white/10 rounded-none md:rounded-3xl p-8 shadow-2xl">
          <form onSubmit={handleUpdatedProfile} className="space-y-10">
            {/* PERSONAL INFO */}

            <div>
              <h2 className="text-2xl font-bold text-orange-300 mb-6">
                Personal Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-slate-800 border border-orange-400/20 rounded-2xl p-4 text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                />

                <input
                  type="number"
                  placeholder="Age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="bg-slate-800 border border-orange-400/20 rounded-2xl p-4 text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-slate-800 border border-orange-400/20 rounded-2xl p-4 text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                />

                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="bg-slate-800 border border-orange-400/20 rounded-2xl p-4 text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                />

                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="md:col-span-2 bg-slate-800 border border-orange-400/20 rounded-2xl p-4 text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                />
              </div>
            </div>

            {/* ADDRESS */}

            <div>
              <h2 className="text-2xl font-bold text-orange-300 mb-6">
                Address Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Full Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="md:col-span-2 bg-slate-800 border border-orange-400/20 rounded-2xl p-4 text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                />

                <input
                  type="text"
                  placeholder="State"
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="bg-slate-800 border border-orange-400/20 rounded-2xl p-4 text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                />

                <input
                  type="number"
                  placeholder="PIN Code"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="bg-slate-800 border border-orange-400/20 rounded-2xl p-4 text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                />
              </div>
            </div>

            {/* BUTTON */}

            <div className="flex justify-center pt-4">
              <button
                type="submit"
                className="group relative overflow-hidden px-10 py-4 rounded-2xl bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-500 text-white font-bold text-lg shadow-[0_0_25px_rgba(255,165,0,0.35)] hover:scale-105 hover:shadow-[0_0_35px_rgba(255,165,0,0.5)] transition-all duration-300"
              >
                <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition"></span>

                <span className="relative">Update Profile</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
