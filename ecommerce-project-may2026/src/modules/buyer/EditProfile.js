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

  if (loading)
    return <p className="p-8 text-center text-gray-600">Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-yellow-50 flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-6xl w-full border-t-4 border-teal-500">
        <h1 className="text-3xl font-bold text-teal-700 mb-6 text-center">
          Edit Your Profile
        </h1>

        <form onSubmit={handleUpdatedProfile} className="space-y-6">
          {/* Personal Info */}
          <div>
            <h2 className="text-xl font-semibold text-orange-800 mb-4">
              Personal Information
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
                type="number"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
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
            </div>
          </div>

          {/* Address Info */}
          <div>
            <h2 className="text-xl font-semibold text-orange-800 mb-4">
              Address
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="p-3 border rounded-lg focus:ring-2 focus:ring-teal-400 focus:outline-none w-full"
              />
              <input
                type="text"
                placeholder="State"
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="p-3 border rounded-lg focus:ring-2 focus:ring-teal-400 focus:outline-none w-full"
              />
              <input
                type="number"
                placeholder="PIN Code"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="p-3 border rounded-lg focus:ring-2 focus:ring-teal-400 focus:outline-none w-full"
              />
            </div>
          </div>

          {/* Submit Button */}
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

export default EditProfile;
