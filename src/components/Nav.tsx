"use client";

import { logoutAction } from "@/actions/auth";
;
/* eslint-disable @typescript-eslint/no-unused-vars */
import { IUser } from "@/models/user.model";
import { RootState } from "@/redux/store";
import {  Boxes,  ClipboardCheck,  LogOut, Menu, Package, Plus, Search, ShoppingCart, User, X, } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { signOut } from "next-auth/react";
// import { signOut } from "next-auth/react";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";

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
  const[menuOpen,setMenuOpen]=React.useState(false)

  const {cartData}=useSelector((state:RootState)=>state.cart)

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

  // focus input when open for mobile
  useEffect(() => {
    if (searchBarOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  }, [searchBarOpen]);

  // for admin side bar when click on menu of mobile view
  const sideBar=menuOpen?createPortal(
    <AnimatePresence>
        <motion.div
        initial={{x:-100,opacity:0}}
        animate={{x:0,opacity:1}}
        exit={{x:-100,opacity:0}}
        transition={{type:"spring",stiffness:100,damping:14}}
        className="fixed top-0 left-0  h-full w-[75%] sm:w-[75%] bg-linear-to-b from-green-800/80 via-green-700 to-green-900/90 backdrop-blur-md border-r border-green-400/20 shadow-[0_0_50px_-10pxrgba(0,255,100,0.3] flex flex-col p-6 z-9999 text-white
        "
        > 
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-extrbold tracking-wide text-2xl text-white/90 ">Admin Panel</h1>
          <button className="text-white/80 text-2xl font-bold transition" onClick={() => setMenuOpen(false)}><X/></button>
        </div>
        <div className="flex items-center gap-3 p-3 mt-3 bg-white/15 text-white/90 hover:bg-white/20 rounded-xl transition-all shadow-inner">
        <div className="relative w-10 h-10 rounded-full border-2 border-green-500/60 shadow-md">
          {user.image ? (
                        <Image
                          src={user.image}
                          alt="User Avatar"
                          fill
                          className="object-cover rounded-full"
                        />
                      ) : (
                        <User className="text-gray-600 w-10 h-10 p-2" />
                      )}
        </div>
        <div>
          <h2 className="text-lg font-semibold">{user.name}</h2>
          <p className="text-sm text-geen-200 capitalize tracking-wide">{user.role}</p>
        </div>

        

        </div>

        <div className="flex flex-col gap-3 mt-6  font-medium">
           <Link className="flex items-center gap-2 bg-white text-green-700 font-semibold px-4 py-2 rounded-xl hover:scale-110 transition-transform transition-all" href={"/admin/add-grocery"}><Plus className="w-5 h-5"/> Add Grocery</Link>
            <Link className="flex items-center gap-2 bg-white text-green-700 font-semibold px-4 py-2 rounded-xl hover:scale-110 transition-transform transition-all" href={""}><Boxes className="w-5 h-5"/>View Grocery</Link> 
            <Link className="flex items-center gap-2 bg-white text-green-700 font-semibold px-4 py-2 rounded-xl hover:scale-110 transition-transform transition-all" href={""}><ClipboardCheck className="w-5 h-5"/> Manage orders</Link>
        </div>
        <div className="my-5 border-t border-white/20"></div>
        <div className="flex items-center gap-3 font-semibold mt-auto  text-red-400 hover:text-red-600 font-semibold p-3 rounded-xl hover:scale-110 transition-transform transition-all" onClick={()=> signOut({redirectTo:"/"})}>
          <LogOut className="w-5 h-5 text-red-400" />
          Log out
        </div>

        </motion.div>
    </AnimatePresence>,
    document.body
  ):null

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
        {user.role == "user" && (
          <form className="hidden md:flex items-center bg-white rounded-full px-4 py-2 w-1/2 max-w-lg shadow-md">
            <Search className="text-gray-500 w-6 h-6 mr-2" />
            <input
              type="text"
              placeholder="Search for products..."
              className="flex-grow outline-none px-2 text-gray-700 bg-transparent"
            />
          </form>
        )}

        <div className="flex items-center gap-2 md:gap-6 relative">
          {/* Mobile search button */}
          {user.role == "user" && (
            <>
              <button
                type="button"
                className="md:hidden bg-white p-2 rounded-full cursor-pointer hover:scale-110 transition-transform"
                onClick={() => setSearchBarOpen(true)}
                aria-label="Open search"
              >
                <Search className="text-green-600 w-8 h-8" />
              </button>

              <Link
                href={"/user/cart"}
                className="relative flex items-center text-white hover:scale-110 transition-transform"
              >
                <ShoppingCart className="text-white w-9 h-9" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-sm text-white">
                  {cartData.length}
                </span>
              </Link>
            </>
            
          )}

          {/* for admin */}

           {user.role=="admin" && <>
          
          <div className="hidden md:flex items-center gap-4 text-white">
            <Link className="flex items-center gap-2 bg-white text-green-700 font-semibold px-4 py-2 rounded-full hover:scale-110 transition-transform transition-all" href={"/admin/add-grocery"}><Plus className="w-5 h-5"/> Add Grocery</Link>
            <Link className="flex items-center gap-2 bg-white text-green-700 font-semibold px-4 py-2 rounded-full hover:scale-110 transition-transform transition-all" href={""}><Boxes className="w-5 h-5"/>View Grocery</Link> 
            <Link className="flex items-center gap-2 bg-white text-green-700 font-semibold px-4 py-2 rounded-full hover:scale-110 transition-transform transition-all" href={""}><ClipboardCheck className="w-5 h-5"/> Manage orders</Link>
          </div>

          <div className="md:hidden bg-white w-10 h-10 flex items-center justify-center rounded-full cursor-pointer hover:scale-110 transition-transform">
          <Menu
              type="button"
              className="w-6 h-6 text-gray-600"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Open menu"
            >
             
            </Menu>
          </div>
          
          </>}

         

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

                 {user.role=="user" &&  <Link
                    href={""}
                    className="flex items-center gap-2 px-3 py-3 hover:bg-green-50 text-gray-700 font-medium"
                  >
                    <Package className="text-green-600" />
                    My Orders
                  </Link>}

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
        {sideBar}
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
