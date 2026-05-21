import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function EditProductDetails() {
  const [brandName, setBrandName] = useState("");
  const [productCat, setProductCat] = useState("");
  const [productName, setProductName] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productImgs, setProductImgs] = useState([]);
  const [productSize, setProductSize] = useState("");
  const [mrp, setMrp] = useState(0);
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:9000/products/" + id)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch product with ID" + id);
        }
        return res.json();
      })
      .then((data) => {
        if (!data) throw new Error("No product found");
        setBrandName(data.brandName);
        setProductCat(data.productCat);
        setProductName(data.productName);
        setProductDesc(data.productDesc);
        setProductImgs(data.productImgs);
        setProductSize(data.productSize);
        setMrp(data.mrp || 0);
      })
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  }, [id]);
  // console.log(id);

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading product...!</h2>;
  }

  const handleUpdatedData = (e) => {
    e.preventDefault();
    let updatedObj = {
      brandName,
      productCat,
      productName,
      productDesc,
      productImgs,
      productSize,
      mrp,
    };
    console.log(updatedObj);

    fetch("http://localhost:9000/products/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedObj),
    }).then((res) => {
      if (res) {
        toast.success("Updated...!");
        navigate("/manageProducts");
      }
    });
  };

  return (
    <div className="flex justify-center items-start mt-32 px-4">
      <form
        onSubmit={handleUpdatedData}
        className="w-full max-w-6xl bg-gray-300 shadow-lg rounded-2xl p-6 border border-gray-500"
      >
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Edit Product
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm md:text-base">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="px-4 py-3 text-left border">Product ID</th>
                <th className="px-4 py-3 text-left border">Brand Name</th>
                <th className="px-4 py-3 text-left border">Category</th>
                <th className="px-4 py-3 text-left border">Product Name</th>
                <th className="px-4 py-3 text-left border">Description</th>
                <th className="px-4 py-3 text-left border">Images</th>
                <th className="px-4 py-3 text-left border">Size</th>
                <th className="px-4 py-3 text-left border">MRP</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-400">
                <td className="px-4 py-2 border text-gray-500 italic">Auto</td>
                <td className="px-4 py-2 border">
                  <input
                    type="text"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </td>
                <td className="px-4 py-2 border">
                  <select
                    value={productCat}
                    onChange={(e) => setProductCat(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="bed">Bed</option>
                    <option value="sofa">Sofa</option>
                    <option value="mattress">Mattress</option>
                    <option value="mats">Mats</option>
                  </select>
                </td>
                <td className="px-4 py-2 border">
                  <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </td>
                <td className="px-4 py-2 border">
                  <input
                    type="text"
                    value={productDesc}
                    onChange={(e) => setProductDesc(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </td>
                <td className="px-4 py-2 border">
                  <input
                    type="text"
                    value={productImgs}
                    onChange={(e) =>
                      setProductImgs(
                        e.target.value.split(",").map((img) => img.trim())
                      )
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Separate multiple URLs with commas
                  </p>
                </td>
                <td className="px-4 py-2 border">
                  <select
                    value={productSize}
                    onChange={(e) => setProductSize(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Select Size</option>
                    {productCat === "bed" ? (
                      <>
                        <option value="king">King Size</option>
                        <option value="queen">Queen Size</option>
                        <option value="single">Single Bed</option>
                        <option value="double">Double Bed</option>
                      </>
                    ) : productCat === "sofa" ? (
                      <>
                        <option value="single">Single Seater</option>
                        <option value="double">Double Seater</option>
                        <option value="three">Three Seater</option>
                        <option value="four">Four Seater</option>
                        <option value="five">Five Seater</option>
                      </>
                    ) : productCat === "mattress" ? (
                      <>
                        <option value="king">King Size</option>
                        <option value="queen">Queen Size</option>
                        <option value="double">Double Bed</option>
                        <option value="single">Single Bed</option>
                      </>
                    ) : productCat === "mats" ? (
                      <>
                        <option value="yoga">Yoga Mats</option>
                        <option value="door">Door Mats</option>
                      </>
                    ) : null}
                  </select>
                </td>
                <td className="px-4 py-2 border">
                  <input
                    type="number"
                    value={mrp}
                    onChange={(e) => setMrp(Number(e.target.value))}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg shadow hover:bg-indigo-700 transition"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProductDetails;
