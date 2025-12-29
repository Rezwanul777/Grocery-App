"use client";

import { logoutAction } from "@/actions/auth";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { IUser } from "@/models/user.model";
import { LogOut, Package, Search, ShoppingCart, User } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

// const Nav = ({ user }: { user: IUser }) => {
//   const [open, setOpen] = React.useState(false);
//   const profileRef = React.useRef<HTMLDivElement>(null);
//   const [searchBarOpen, setSearchBarOpen] = React.useState(false);
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
//         setOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);
//   return (
//     <div className="w-[95%] fixed top-2 left-1/2 -translate-x-1/2 bg-linear-to-r from-green-500  to-green-700 shadow-md shadow-lg shadow-black/30 rounded-md  flex justify-between items-center px-4 h-20 md:px-8 z-50">
//       <Link
//         href={"/"}
//         className="text-white font-bold text-2xl sm:text-3xl tracking-wide hover:scale-110 transition-transform"
//       >
//         GroceryApp
//       </Link>
//       <form className="hidden md:flex items-center bg-white rounded-full px-4 py-2 w-1/2 max-w-lg shadow-md">
//         <Search className="text-gray-500 w-6 h-6 mr-2" />
//         <input
//           type="text"
//           placeholder="Search for products..."
//           className="flex-grow outline-none px-4 text-gray-700"
//         />
//       </form>
//       {/* for mobile search bar option */}
//       <div className="flex items-center gap-2 md:gap-6 relative">
//         <div className="md:hidden bg-white p-2 rounded-full cursor-pointer hover:scale-110  transition-transform" onClick={() => setSearchBarOpen((prev) => !prev)}>
//           <Search className="text-green-600 w-9 h-9 cursor-pointer hover:scale-110 transition-transform " />
//         </div>
//         <Link
//           href={""}
//           className="relative flex  items-center text-white hover:scale-110 transition-transform"
//         >
//           <ShoppingCart className="text-white w-9 h-9 cursor-pointer hover:scale-110 transition-transform" />
//           <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-sm text-white">
//             0
//           </span>
//         </Link>
//         <div className="relative" ref={profileRef}>
//           <div
//             className="bg-white w-10 h-10 rounded-full overflow-hidden cursor-pointer hover:scale-110 transition-transform"
//             onClick={() => setOpen((prev) => !prev)}
//           >
//             {user.image ? (
//               <Image
//                 src={user.image}
//                 alt="User Avatar"
//                 fill
//                 className="object-cover rounded-full border-2 border-white"
//               />
//             ) : (
//               <User className="text-gray-600" />
//             )}
//           </div>
//           <AnimatePresence>
//             {open && (
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.8, y: -20 }}
//                 animate={{ opacity: 1, scale: 1, y: 0 }}
//                 exit={{ opacity: 0, scale: 0.8, y: -20 }}
//                 className="absolute right-0 mt-5 w-56 bg-white rounded-md shadow-lg bordar p-3 border-gray-200 overflow-hidden z-999"
//               >
//                 <div className="flex items-center gap-3 px-3 py-2 border-b border-gray-200 ">
//                   <div className="relative bg-white w-10 h-10 rounded-full bg-green-100 items-center justify-center overflow-hidden cursor-pointer mb-4">
//                     {user.image ? (
//                       <Image
//                         src={user.image}
//                         alt="User Avatar"
//                         fill
//                         className="object-cover rounded-full border-2 border-white"
//                       />
//                     ) : (
//                       <User className="text-gray-600" />
//                     )}
//                   </div>
//                   <div>
//                     <div className="text-gray-800 font-semibold">
//                       {user.name}
//                     </div>
//                     <div className="text-gray-500 text-sm Capitalize">
//                       {user.role}
//                     </div>
//                   </div>
//                 </div>
//                 <Link
//                   href={""}
//                   className="flex items-center gap-2 px-3 py-3 hover:bg-green-50 text-gray-700 font-medium "
//                 >
//                   <Package className="text-green-600" />
//                   My Orders
//                 </Link>
//                 <form action={logoutAction}>
//                   <button
//                     type="submit"
//                     className="w-full flex items-center gap-2 px-3 py-3 hover:bg-red-50 text-gray-700 font-medium"
//                     onClick={() => setOpen(false)}
//                   >
//                     <LogOut className="text-red-600 w-5 h-5" />
//                     Logout
//                   </button>
//                 </form>
//               </motion.div>
//             )}
//           </AnimatePresence>
//           <AnimatePresence>
//             {searchBarOpen && (
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.8, y: -20 }}
//                 animate={{ opacity: 1, scale: 1, y: 0 }}
//                 exit={{ opacity: 0, scale: 0.8, y: -20 }}
//                 className="fixed top-24 left-1/2 -translate-x-1/2 w-[90%] bg-white rounded-full px-3 py-3  shadow-md z-50 flex items-center ">
//                   <Search className="text-gray-500 w-6 h-6 mr-2 " />
//                 <form className="grow ">
//                     <input type="text" className="w-full outline-none text-gray-600 "/>
//                 </form>
//                 <button>
//                   <span className="text-green-600 font-semibold" onClick={() => setSearchBarOpen(false)}>X</span>
//                 </button>
//                 </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       </div>
//     </div>
//   );
// };
const Nav = ({ user }: { user: IUser }) => {
  const [open, setOpen] = React.useState(false);
  const profileRef = React.useRef<HTMLDivElement>(null);

  const [searchBarOpen, setSearchBarOpen] = React.useState(false);
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // focus input when open
  useEffect(() => {
    if (searchBarOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  }, [searchBarOpen]);

  return (
    <>
      <div className="w-[95%] fixed top-2 left-1/2 -translate-x-1/2 bg-linear-to-r from-green-500 to-green-700 shadow-lg shadow-black/30 rounded-md flex justify-between items-center px-4 h-20 md:px-8 z-50">
        <Link
          href={"/"}
          className="text-white font-bold text-2xl sm:text-3xl tracking-wide hover:scale-110 transition-transform"
        >
          GroceryApp
        </Link>

        {/* Desktop Search */}
        <form className="hidden md:flex items-center bg-white rounded-full px-4 py-2 w-1/2 max-w-lg shadow-md">
          <Search className="text-gray-500 w-6 h-6 mr-2" />
          <input
            type="text"
            placeholder="Search for products..."
            className="flex-grow outline-none px-2 text-gray-700 bg-transparent"
          />
        </form>

        <div className="flex items-center gap-2 md:gap-6 relative">
          {/* Mobile search button */}
          <button
            type="button"
            className="md:hidden bg-white p-2 rounded-full cursor-pointer hover:scale-110 transition-transform"
            onClick={() => setSearchBarOpen(true)}
            aria-label="Open search"
          >
            <Search className="text-green-600 w-8 h-8" />
          </button>

          <Link
            href={""}
            className="relative flex items-center text-white hover:scale-110 transition-transform"
          >
            <ShoppingCart className="text-white w-9 h-9" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-sm text-white">
              0
            </span>
          </Link>

          {/* Profile */}
          <div className="relative" ref={profileRef}>
            <div
              className="bg-white w-10 h-10 rounded-full overflow-hidden cursor-pointer hover:scale-110 transition-transform relative"
              onClick={() => setOpen((prev) => !prev)}
            >
              {user.image ? (
                <Image
                  src={user.image}
                  alt="User Avatar"
                  fill
                  className="object-cover rounded-full border-2 border-white"
                />
              ) : (
                <User className="text-gray-600 w-10 h-10 p-2" />
              )}
            </div>

            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  className="absolute right-0 mt-5 w-56 bg-white rounded-md shadow-lg p-3 border border-gray-200 z-[60]"
                >
                  <div className="flex items-center gap-3 px-3 py-2 border-b border-gray-200">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden bg-green-100">
                      {user.image ? (
                        <Image
                          src={user.image}
                          alt="User Avatar"
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <User className="text-gray-600 w-10 h-10 p-2" />
                      )}
                    </div>
                    <div>
                      <div className="text-gray-800 font-semibold">
                        {user.name}
                      </div>
                      <div className="text-gray-500 text-sm capitalize">
                        {user.role}
                      </div>
                    </div>
                  </div>

                  <Link
                    href={""}
                    className="flex items-center gap-2 px-3 py-3 hover:bg-green-50 text-gray-700 font-medium"
                  >
                    <Package className="text-green-600" />
                    My Orders
                  </Link>

                  <form action={logoutAction}>
                    <button
                      type="submit"
                      className="w-full flex items-center gap-2 px-3 py-3 hover:bg-red-50 text-gray-700 font-medium"
                      onClick={() => setOpen(false)}
                    >
                      <LogOut className="text-red-600 w-5 h-5" />
                      Logout
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ✅ Mobile Search Overlay (moved OUTSIDE profileRef) */}
      <AnimatePresence>
        {searchBarOpen && (
          <>
            {/* Backdrop */}
            <motion.button
              type="button"
              aria-label="Close search backdrop"
              className="fixed inset-0 bg-black/20 z-[55]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSearchBarOpen(false)}
            />

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              className="fixed top-[5.75rem] left-1/2 -translate-x-1/2 w-[92%] max-w-xl z-[60]"
            >
              <form className="flex items-center gap-2 bg-white rounded-full px-4 py-3 shadow-lg">
                <Search className="text-gray-500 w-5 h-5" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search for products..."
                  className="flex-1 bg-transparent outline-none text-gray-700 placeholder:text-gray-400"
                />
                <button
                  type="button"
                  className="text-green-600 font-semibold px-2"
                  onClick={() => setSearchBarOpen(false)}
                >
                  X
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Nav;
