"use client";
import axios from "axios";
import { ArrowRight, Bike, User, UserCog } from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const EditRoleMobile = () => {
  const [roles, setRoles] = useState([
    { id: "admin", label: "Admin", icon: UserCog },
    { id: "user", label: "User", icon: User },
    { id: "deliveryBoy", label: "Delivery Boy", icon: Bike },
  ]);
  const [selectedRole, setSelectedRole] = useState<string>("");
    const [mobile, setMobile] = useState<string>("");
  const router = useRouter();
   const handleEditRole = async () => {
  try {
    const result = await axios.post("/api/user/edit-mobile-role", {
      role: selectedRole,
      mobile,
    });
    console.log("Updated:", result.data);
    router.push("/");
  } catch (error) {
    console.log("Error updating role and mobile:", error);
  }
};
  return (
    <div className="flex flex-col min-h-screen items-center text-center p-6 w-full">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="text-3xl md:text-4xl font-extrabold text-green-600 text-center mt-8"
      >
        select your role
      </motion.h1>
      <div className="mt-10 flex flex-col md:flex-row gap-6 items-center justify-center mt-10">
        {roles.map((role) => {
          const Icon = role.icon;
          const isSelected = selectedRole === role.id;
          return (
            <motion.div
              key={role.id}
              whileTap={{ scale: 0.94 }}
              onClick={() => setSelectedRole(role.id)}
              className={`cursor-pointer border-2 rounded-lg p-6 flex flex-col items-center justify-center gap-4 w-40 h-40 transition-all
                        ${
                          isSelected
                            ? "border-green-600 bg-green-50 shadow-lg"
                            : "border-gray-300 hover:border-green-400 hover:bg-green-50 transition-colors"
                        }
                        `}
            >
              <Icon />
              <span>{role.label}</span>
            </motion.div>
          );
        })}
      </div>
      <div className="mt-10 flex flex-col items-center justify-center">
        <label htmlFor="mobile" className="text-gray-600 font-medium mb-3">
          Enter your mobile number
        </label>
        <input
          type="tel"
          id="mobile"
          className="border w-64 md:w-80 border-gray-300 rounded-md px-6 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-green-600"
          placeholder="eg.00000000000" onChange={(e) => setMobile(e.target.value)}
        />
      </div>
      <button
        className={`inline-flex items-center gap-2 mt-10 text-green-600 hover:text-green-800 transition-colors
            ${
              selectedRole && mobile.length ===11
                ? "bg-green-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-green-700 cursor-pointer"
                : "bg-gray-300 text-gray-600 px-6 py-3 rounded-md cursor-not-allowed"
            }
            `}
        onClick={handleEditRole}
      >
        Go To Home <ArrowRight />
      </button>
    </div>
  );
};

export default EditRoleMobile;
