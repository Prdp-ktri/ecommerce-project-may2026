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
            JSON.stringify(updatedProfile),
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
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-teal-950 to-slate-900 flex items-center justify-center text-white">
        <div className="text-center">
          <div className="text-8xl animate-bounce mb-4">🏪</div>
          <h2 className="text-3xl font-bold text-cyan-300">
            Loading Seller Profile...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-teal-950 to-slate-900 text-white pt-32 px-6 pb-10 relative overflow-hidden">
      {/* Background Effects */}

      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl"></div>

      <div className="absolute top-40 right-10 text-[180px] opacity-10 animate-bounce">
        🏪
      </div>

      <div className="absolute bottom-16 left-8 text-[180px] opacity-10 animate-pulse">
        📦
      </div>
      <div
        className="
    relative z-10
    w-full
    bg-white/10
    backdrop-blur-xl
    border border-white/10
    rounded-3xl
    p-8
    shadow-2xl
  "
      >
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-cyan-300 via-teal-300 to-emerald-400 bg-clip-text text-transparent mb-4">
            Seller Account Center
          </h1>

          <p className="text-gray-300 text-lg">
            Update your store information and business credentials.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-slate-800/60 border border-white/10 rounded-2xl p-5">
            <p className="text-gray-400 text-sm">Store Name</p>
            <p className="text-cyan-300 font-bold">{storeName || "Not Set"}</p>
          </div>

          <div className="bg-slate-800/60 border border-white/10 rounded-2xl p-5">
            <p className="text-gray-400 text-sm">Trademark</p>
            <p className="text-cyan-300 font-bold">{trademark || "Not Set"}</p>
          </div>

          <div className="bg-slate-800/60 border border-white/10 rounded-2xl p-5">
            <p className="text-gray-400 text-sm">GST Number</p>
            <p className="text-cyan-300 font-bold">{gst || "Not Set"}</p>
          </div>
        </div>

        <form onSubmit={handleUpdatedProfile} className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-cyan-300 mb-6">
              Seller Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="
  w-full
  bg-slate-800/70
  border
  border-cyan-400/20
  rounded-2xl
  px-4
  py-3
  text-white
  placeholder-gray-400
  focus:outline-none
  focus:ring-2
  focus:ring-cyan-400
  hover:border-cyan-400/40
  transition-all
  duration-300
"
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="
  w-full
  bg-slate-800/70
  border
  border-cyan-400/20
  rounded-2xl
  px-4
  py-3
  text-white
  placeholder-gray-400
  focus:outline-none
  focus:ring-2
  focus:ring-cyan-400
  hover:border-cyan-400/40
  transition-all
  duration-300
"
              />
              <input
                type="phone"
                placeholder="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="
  w-full
  bg-slate-800/70
  border
  border-cyan-400/20
  rounded-2xl
  px-4
  py-3
  text-white
  placeholder-gray-400
  focus:outline-none
  focus:ring-2
  focus:ring-cyan-400
  hover:border-cyan-400/40
  transition-all
  duration-300
"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="
  w-full
  bg-slate-800/70
  border
  border-cyan-400/20
  rounded-2xl
  px-4
  py-3
  text-white
  placeholder-gray-400
  focus:outline-none
  focus:ring-2
  focus:ring-cyan-400
  hover:border-cyan-400/40
  transition-all
  duration-300
"
              />
              <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="
  w-full
  bg-slate-800/70
  border
  border-cyan-400/20
  rounded-2xl
  px-4
  py-3
  text-white
  placeholder-gray-400
  focus:outline-none
  focus:ring-2
  focus:ring-cyan-400
  hover:border-cyan-400/40
  transition-all
  duration-300
"
              />
              <input
                type="text"
                placeholder="State (e.g. RJ)"
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="
  w-full
  bg-slate-800/70
  border
  border-cyan-400/20
  rounded-2xl
  px-4
  py-3
  text-white
  placeholder-gray-400
  focus:outline-none
  focus:ring-2
  focus:ring-cyan-400
  hover:border-cyan-400/40
  transition-all
  duration-300
"
              />
              <input
                type="text"
                placeholder="PIN Code"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="
  w-full
  bg-slate-800/70
  border
  border-cyan-400/20
  rounded-2xl
  px-4
  py-3
  text-white
  placeholder-gray-400
  focus:outline-none
  focus:ring-2
  focus:ring-cyan-400
  hover:border-cyan-400/40
  transition-all
  duration-300
"
              />
              <input
                type="text"
                placeholder="Store Name"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="
  w-full
  bg-slate-800/70
  border
  border-cyan-400/20
  rounded-2xl
  px-4
  py-3
  text-white
  placeholder-gray-400
  focus:outline-none
  focus:ring-2
  focus:ring-cyan-400
  hover:border-cyan-400/40
  transition-all
  duration-300
"
              />
              <input
                type="text"
                placeholder="GST Number"
                value={gst}
                onChange={(e) => setGst(e.target.value)}
                className="
  w-full
  bg-slate-800/70
  border
  border-cyan-400/20
  rounded-2xl
  px-4
  py-3
  text-white
  placeholder-gray-400
  focus:outline-none
  focus:ring-2
  focus:ring-cyan-400
  hover:border-cyan-400/40
  transition-all
  duration-300
"
              />
              <input
                type="text"
                placeholder="Trademark Number"
                value={trademark}
                onChange={(e) => setTrademark(e.target.value)}
                className="
  w-full
  bg-slate-800/70
  border
  border-cyan-400/20
  rounded-2xl
  px-4
  py-3
  text-white
  placeholder-gray-400
  focus:outline-none
  focus:ring-2
  focus:ring-cyan-400
  hover:border-cyan-400/40
  transition-all
  duration-300
"
              />
            </div>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="
    px-10
    py-4
    rounded-2xl
    font-bold
    text-lg
    bg-gradient-to-r
    from-cyan-500
    via-teal-500
    to-emerald-500
    hover:scale-105
    hover:shadow-[0_0_30px_rgba(16,185,129,0.35)]
    transition-all
    duration-300
  "
            >
              🚀 Update Seller Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ManageProfile;
