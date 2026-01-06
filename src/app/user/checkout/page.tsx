/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/static-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import {
  ArrowLeft,
  Building,
  CreditCard,
  CreditCardIcon,
  Home,
  Loader2,
  LocateFixed,
  MapPin,
  Navigation,
  Phone,
  Search,
  User,
} from "lucide-react";
import Link from "next/link";

import { motion } from "motion/react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import React, { useEffect, useState } from "react";
import L, { LatLngExpression } from "leaflet";

import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { log } from "console";
import { OpenStreetMapProvider } from "leaflet-geosearch";

const markIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const CheckOut = () => {
  const userData = useSelector((state: RootState) => state.user.userData);
  const [address, setAddress] = useState({
    fullName: "",
    mobile: "",
    fullAddress: "",
    city: "",
    state: "",
    pinCode: "",
  });

  // for geolocation
  const [searchQuery, setSearchQuery] = useState("");
  const [position, setPosition] = useState<[number, number] | null>(null);

  // loading state
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition([latitude, longitude]);
        },
        (err) => {
          console.log("location error", err);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    }
  }, []);

  useEffect(() => {
    if (userData) {
      setAddress((prev) => ({ ...prev, fullName: userData.name || "" }));
      setAddress((prev) => ({ ...prev, mobile: userData.mobile || "" }));
    }
  }, [userData]);

  const DraggableMarker: React.FC = () => {
    const map =useMap()
    useEffect(() => {
      map.setView(position as LatLngExpression, 13, { animate: true });
    },[map,position])
    return (
      <Marker
        icon={markIcon}
        position={position as LatLngExpression}
        draggable={true}
        eventHandlers={{
          dragend: (e: L.LeafletEvent) => {
            const marker = e.target as L.Marker;
            const { lat, lng } = marker.getLatLng();
            setPosition([lat, lng]);
          },
        }}
      />
    );
  };

  // search function for address in map

  const handleSearchQuery=async()=>{
    setLoading(true)
   try {
     const provider= await new OpenStreetMapProvider()
    // search
const results = await provider.search({ query: searchQuery });
if(results.length>0){
  setLoading(false)
  setPosition([results[0].y,results[0].x])
}
   } catch (error) {
    console.log(error);
    setLoading(false)
   }
  }

  // street map
  useEffect(() => {
    const fetchAddress = async () => {
      if(!position) return
    try {
      const result= await axios.get(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${position[0]}&lon=${position[1]}`);
      console.log(result.data);
      setAddress((prev) => ({
        ...prev,
        fullAddress: result.data.display_name || "",
        city: result.data.address.city || "",
        state: result.data.address.state || "",
        pinCode: result.data.address.postcode || "",
      }))
    } catch (error) {
      console.log(error);
    }
    }
    fetchAddress()
    
  }, [position]);

  // search current location

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition([latitude, longitude]);
        },
        (err) => {
          console.log("location error", err);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    }
  };

  return (
    <div className="w-[90%] md:w-[80%] mx-auto py-10 relative">
      <Link
        href={"/user/cart"}
        className="absolute -top-2 left-0 text-green-600 flex items-center hover:text-green-800 hover:scale-105 transition-all duration-200 ease-in-out mt-6"
      >
        <ArrowLeft size={20} />
        <span className="hidden md:inline-block ml-2">Back to Cart</span>
      </Link>
      <h1 className="text-2xl md:text-3xl font-semibold text-gray-700 flex items-center justify-center text-center gap-2 mb-10">
        Checkout
      </h1>
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl hover:shadow-lg  p-6  border border-gray-200"
        >
          <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2 mb-4">
            <MapPin size={20} className="text-green-600" />
            Delivery address
          </h2>
          <div className="space-y-4">
            <div className="relative ">
              <User
                size={20}
                className="text-green-600 absolute top-3 left-3"
              />
              <input
                type="text"
                value={address.fullName}
                onChange={(e) =>
                  setAddress((prev) => ({
                    ...prev,
                    fullName: e.target.value,
                  }))
                }
                placeholder="Full Name"
                className="w-full border border-gray-300 rounded-md px-4 py-2 pl-10 pr-3 focus:outline-none focus:border-green-600"
              />
            </div>
            <div className="relative ">
              <Phone
                size={20}
                className="text-green-600 absolute top-3 left-3"
              />
              <input
                type="text"
                value={address.mobile}
                onChange={(e) =>
                  setAddress((prev) => ({ ...prev, mobile: e.target.value }))
                }
                placeholder="Enter Mobile Number"
                className="w-full border border-gray-300 rounded-md px-4 py-2 pl-10 pr-3 focus:outline-none focus:border-green-600"
              />
            </div>
            <div className="relative ">
              <Home
                size={20}
                className="text-green-600 absolute top-3 left-3"
              />
              <input
                type="text"
                value={address.fullAddress}
                onChange={(e) =>
                  setAddress((prev) => ({ ...prev, City: e.target.value }))
                }
                placeholder="Enter Full Address"
                className="w-full border border-gray-300 rounded-md px-4 py-2 pl-10 pr-3 focus:outline-none focus:border-green-600"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="relative ">
                <Building
                  size={20}
                  className="text-green-600 absolute top-3 left-3"
                />
                <input
                  type="text"
                  value={address.city}
                  onChange={(e) =>
                    setAddress((prev) => ({ ...prev, City: e.target.value}))
                  }
                  placeholder="City"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 pl-10 pr-3 focus:outline-none focus:border-green-600"
                />
              </div>
              <div className="relative ">
                <Navigation
                  size={20}
                  className="text-green-600 absolute top-3 left-3"
                />
                <input
                  type="text"
                  value={address.state}
                  onChange={(e) =>
                    setAddress((prev) => ({ ...prev, State: e.target.value }))
                  }
                  placeholder="State"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 pl-10 pr-3 focus:outline-none focus:border-green-600"
                />
              </div>
              <div className="relative ">
                <Search
                  size={20}
                  className="text-green-600 absolute top-3 left-3"
                />
                <input
                  type="text"
                  value={address.pinCode}
                  onChange={(e) =>
                    setAddress((prev) => ({ ...prev, Pin: e.target.value,}))
                  }
                  placeholder="Pincode"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 pl-10 pr-3 focus:outline-none focus:border-green-600"
                />
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-green-600"
                placeholder="City or Area  name..."
                value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)}
              />
              <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-all duration-200 ease-in-out cursor-pointer" onClick={handleSearchQuery}>
                {loading?<Loader2 size={20} className="animate-spin"/>:"Search"}
              </button>
            </div>
            <div className="relative mt-6 h-[330px] rounded-md overflow-hidden border border-gray-200 shadow-inner">
              {/* google map */}
              {position && (
                <MapContainer
                  center={position as LatLngExpression}
                  zoom={13}
                  scrollWheelZoom={true}
                  className="w-full h-full"
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <DraggableMarker />
                </MapContainer>
              )}
              <motion.button whileHover={{scale:1.1}} className="absolute bottom-4 right-4 bg-green-600 text-white p-3 shadow-lg rounded-full hover:bg-green-700 transition-all flex items-center justify-center  z-999 cursor-pointer " onClick={handleCurrentLocation}>
                <LocateFixed size={20}/>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Right Side for payment part */}
        <motion.div
       initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl hover:shadow-lg transition-all duration-200 ease-in-out  p-6  border border-gray-200 h-fit"
        >
          <h2 className="flex items-center gap-2 text-lg md:text-xl font-semibold mb-4 text-gray-600"><CreditCard size={20} className="text-green-600"/> Payment method</h2>
              <div className="space-y-4 mb-6">
                <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-all duration-200 ease-in-out cursor-pointer"> <CreditCard/> <span>Pay Online(Stripe)</span> </button>
              </div>
        </motion.div>
        
      </div>
    </div>
  );
};

export default CheckOut;
