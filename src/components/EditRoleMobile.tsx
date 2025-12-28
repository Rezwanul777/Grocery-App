"use client"
import { Bike, User, UserCog } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
const EditRoleMobile = () => {
    const [roles,setRoles]=useState([
        {id:"admin",label:"Admin", icon:UserCog},
        {id:"user",label:"User", icon:User},
        {id:"deliveryBoy",label:"Delivery Boy", icon:Bike},
    ])
    const [selectedRole,setSelectedRole]=useState<string>("");
  return (
    <div className='flex flex-col min-h-screen text-center p-6 w-full'>
        <motion.h1
         initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        className="text-3xl md:text-4xl font-extrabold text-green-600 text-center mt-8"
        >select your role</motion.h1>
        <div className='mt-10 flex flex-col md:flex-row gap-6 items-center justify-center mt-10'>
            { roles.map((role)=>{
                    const Icon=role.icon;
                    return(
                        <motion.div>
                            <Icon />
                            <span>{role.label}</span>
                        </motion.div>
                    )
                }
            )
            }
        </div>
    </div>
  )
}

export default EditRoleMobile