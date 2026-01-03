/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import axios from "axios";
import Image from "next/image";
import { motion } from "motion/react";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decreaseCartItemQuantity, IncreaseCartItemQuantity } from "@/redux/cartSlice";
import mongoose from "mongoose";

interface IGrocery {
  _id?: mongoose.Types.ObjectId;
  name: string;
  category: string;
  price: number;
  image: string;
  unit: string;
  quantity: number;
  description?: string;
  inStock?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const GroceryCard = ({ item }: { item: IGrocery }) => {
  const dispatch = useDispatch<AppDispatch>();

  const cartData = useSelector((state: RootState) => state.cart?.cartData ?? []);

  const isCartItem = cartData.find(
    (cartItem: any) => String(cartItem._id) === String(item._id)
  );

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-2xl border border-green-200 shadow-sm hover:shadow-md overflow-hidden"
    >
      <div className="relative w-full h-44">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      <div className="p-4 space-y-2">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold text-green-900 text-lg leading-tight">
            {item.name}
          </h3>
          <span className="text-xs px-2 py-1 rounded-full bg-green-50 text-green-700 border border-green-200 capitalize">
            {item.category}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-green-700 font-bold text-base">
            ৳ {item.price}{" "}
            <span className="text-gray-500 font-medium">/ {item.unit}</span>
          </p>

          {!isCartItem ? (
            <button
              onClick={() => dispatch(addToCart({ ...item, _id: String(item._id), quantity: 1 }))}
              className="flex items-center gap-2 text-sm bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition"
            >
              <ShoppingCart className="w-4 h-4" />
              Add
            </button>
          ) : (
          /* + - CONTROLS */
          <div className="flex items-center gap-3 bg-green-50 border border-green-300 rounded-lg px-2 py-1">
            <button
              onClick={() => dispatch(decreaseCartItemQuantity(String(isCartItem._id!)))}
              className="p-1 rounded hover:bg-green-200"
            >
              <Minus className="w-4 h-4 text-green-700" />
            </button>

            <span className="font-semibold text-green-800 min-w-[20px] text-center">
              {isCartItem.quantity}
            </span>

            <button
              onClick={() => dispatch(IncreaseCartItemQuantity(String(isCartItem._id!)))}
              className="p-1 rounded hover:bg-green-200"
            >
              <Plus className="w-4 h-4 text-green-700" />
            </button>
          </div>
        )}
        </div>
      </div>
    </motion.div>
  );
};

const GroceryGrid = () => {
  const [items, setItems] = React.useState<IGrocery[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  const fetchGroceries = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axios.get("/api/groceries");
      setItems(res.data);
    } catch (e: any) {
      setError("Failed to load groceries");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchGroceries();
  }, []);

  return (
    <section className="w-[90%] md:w-[80%] mx-auto mt-10">
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="text-2xl md:text-3xl font-semibold text-green-800 mb-8 text-center"
      >
        Grocery Items
      </motion.h2>

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-72 rounded-2xl border border-green-100 bg-green-50 animate-pulse"
            />
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl">
          {error}{" "}
          <button
            onClick={fetchGroceries}
            className="ml-2 underline font-medium"
          >
            Retry
          </button>
        </div>
      )}

      {!loading && !error && items.length === 0 && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-xl">
          No grocery items found.
        </div>
      )}

      {!loading && !error && items.length > 0 && (
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.15 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.06 } },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {items.map((item) => (
            <motion.div
              key={item._id?.toString()}
              variants={{
                hidden: { opacity: 0, y: 16 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.35 }}
            >
              <GroceryCard item={item} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
};

export default GroceryGrid;
