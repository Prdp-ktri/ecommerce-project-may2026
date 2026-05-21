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
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-yellow-50 flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-4xl w-full border-t-4 border-teal-500">
        <h1 className="text-3xl font-bold text-teal-700 mb-6 text-center">
          Your Profile
        </h1>

        {/* Personal Info */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-orange-800 mb-4">
            Personal Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600 font-semibold">Full Name</p>
              <p className="text-gray-800">{buyer.name}</p>
            </div>
            <div>
              <p className="text-gray-600 font-semibold">Age</p>
              <p className="text-gray-800">{buyer.age}</p>
            </div>
            <div>
              <p className="text-gray-600 font-semibold">Email</p>
              <p className="text-gray-800">{buyer.email}</p>
            </div>
            <div>
              <p className="text-gray-600 font-semibold">Phone</p>
              <p className="text-gray-800">{buyer.phone}</p>
            </div>
            <div>
              <p className="text-gray-600 font-semibold">Password</p>
              <p className="text-gray-800">********</p>
            </div>
          </div>
        </div>

        {/* Address Info */}
        <div>
          <h2 className="text-xl font-semibold text-orange-800 mb-4">
            Address
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600 font-semibold">Address</p>
              <p className="text-gray-800">{buyer.address}</p>
            </div>
            <div>
              <p className="text-gray-600 font-semibold">State</p>
              <p className="text-gray-800">{buyer.selectedState}</p>
            </div>
            <div>
              <p className="text-gray-600 font-semibold">PIN Code</p>
              <p className="text-gray-800">{buyer.pin}</p>
            </div>
          </div>
        </div>

        {/* Edit Button */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate("/edit-profile")}
            className="px-6 py-3 bg-teal-500 text-white font-semibold rounded-lg shadow-md hover:bg-teal-600 transition duration-300"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewProfile;
