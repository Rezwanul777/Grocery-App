"use client";
import { motion } from "motion/react";
import { ArrowLeft, Loader, PlusCircle, Upload } from "lucide-react";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import axios from "axios";

const catagories = [
  "fruits",
  "vegetables",
  "dairy",
  "bakery",
  "meat",
  "beverages",
  "snacks",
  "household",
];
const units = ["kg", "litre", "piece", "ml", "g", "pack"];

const AddGrocery = () => {
  const [catagory, setCatagory] = React.useState(catagories[0]);
  const [unit, setUnit] = React.useState(units[0]);
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [preview, setPreview] = React.useState<string | null>(null);
  const [backendImage, setBackendImage] = React.useState<File | null>(null);
  const [loading, setLoading] = React.useState(false);

  // for upload image

// ✅ add ref to clear file input
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    // ✅ cleanup old preview url (avoid memory leak)
    if (preview) URL.revokeObjectURL(preview);

    setBackendImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const resetForm = () => {
    setName("");
    setPrice("");
    setCatagory(catagories[0]);
    setUnit(units[0]);
    setBackendImage(null);

    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);

    // ✅ clear file input field
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("category", catagory);
      formData.append("price", price);
      formData.append("unit", unit);
      if (backendImage) formData.append("image", backendImage);

      const result = await axios.post("/api/admin/add-grocery", formData);

      console.log(result);

      // ✅ clear inputs only after success
      resetForm();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-50 to-white py-16 px-4 relative">
      <Link
        href={""}
        className="absolute top-6 left-6 flex items-center justify-center gap-2 cursor-pointer text-green-600 hover:text-green-800 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium hidden md:block">Back to Home</span>
      </Link>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="bg-white w-full p-8 max-w-2xl shadow-2xl rounded-md border border-green-300"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-2">
            <PlusCircle className="w-10 h-10 text-green-600" />
            <h1 className="text-2xl font-bold text-green-600">Add Grocery</h1>
          </div>
          <p className="text-gray-600 text-sm mt-2 text-center">
            Fill out the details to add a new grocery item
          </p>
        </div>
        <form className="flex flex-col gap-6 w-full " onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="name"
              className="block font-medium mb-1  text-gray-500"
            >
              Grocery Name
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="eg: sweete, chocolate"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600 transition-all"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-medium mb-1 text-gray-500">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={catagory}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600 transition-all"
                onChange={(e) => setCatagory(e.target.value)}
              >
                <option value="">select category</option>
                {catagories.map((catagory) => (
                  <option key={catagory} value={catagory}>
                    {catagory}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-medium mb-1 text-gray-500">
                Unit <span className="text-red-500">*</span>
              </label>
              <select
                name="unit"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600 transition-all"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
              >
                <option value="">select unit</option>
                {units.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label
              htmlFor="name"
              className="block font-medium mb-1  text-gray-500"
            >
              Price
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="eg: 200"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600 transition-all"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
            />
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <label
              htmlFor="image"
              className="block cursor-pointer flex items-center justify-center gap-2 bg-green-50 text-green-600 border border-green-300 rounded-md px-3 py-2 hover:bg-green-100 hover:text-black w-full sm:w-auto  transition-all"
            >
                <Upload className="h-5 w-5"/>
              Upload Image
             
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              hidden
              onChange={handleImageUpload}
            />
            {preview && (
              <Image
                src={preview}
                alt="Preview"
                width={100}
                height={100}
                className="object-cover rounded-md shadow-md border border-gray-300"
              />
            )}
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 hover:shadow-md transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer flex item-center justify-center"
            >
                {loading?<Loader className="w-5 h-5 mr-2 animate-spin " />:" Add Grocery"}
             
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddGrocery;
