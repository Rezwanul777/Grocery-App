/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { ArrowLeft, ShoppingBagIcon, ShoppingBasketIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import {AnimatePresence, motion} from "motion/react"
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import Image from 'next/image'

const CartPage = () => {
   const cartData = useSelector((state: RootState) => state.cart?.cartData ?? []);
  return (
    <div className='w-[95%] sm:w-[90%] md:w-[80%] mx-auto mt-6 mb-24 relative'>
        <Link href={"/"} className='absolute -top-2 left-0 text-green-600 flex items-center hover:text-green-800 hover:scale-105 transition-all duration-200 ease-in-out'>
        <ArrowLeft size={20}/>
        <span className='hidden md:inline-block ml-2'>Back to Home</span>
        </Link>
        <motion.h1 
        initial={{opacity:0,y:10}}
        animate={{opacity:1,y:0}}
        transition={{duration:0.3}}
        className='text-2xl md:text-3xl font-semibold text-green-700 flex items-center justify-center text-center gap-2 mb-10'
        >
          Your shoping Cart
          
        </motion.h1>

        {/* Cart Items */}

        {cartData.length==0?(
          <motion.div 
          initial={{opacity:0,y:10}}
          animate={{opacity:1,y:0}}
          transition={{duration:0.3}}
          className='flex flex-col items-center justify-center gap-4 py-20 bg-white rounded-xl shadow-lg'
          >
            <ShoppingBagIcon className='w-10 h-10 text-gray-600 mx-auto mb-4' />
            <p className='text-lg md:text-2xl font-semibold text-gray-600'>Your Cart is Empty. Add some items to your cart</p>
            <Link href={"/"} className='bg-green-600 text-white px-6 py-3 rounded-full flex items-center hover:bg-green-800 hover:scale-105 inline-block transition-all duration-200 ease-in-out'>
            Continue Shopping
            </Link>
            </motion.div>
        ):(
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                    <div>
                        <AnimatePresence>
                            {cartData.map((item: any) => (
                                <motion.div
                                    key={item._id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                    className="bg-white rounded-2xl  flex flex-col sm:flex-row items-center overflow-hidden duration-300 p-5 shadow-lg hover:shadow-md border border-gray-300"
                                >
                                    <div className='relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md: h-28 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100'>
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-cover p-3 transition-transform duration-300 hover:scale-105"/>

                                    </div>
                                    <div className='flex flex-col items-start justify-center flex-grow ml-4 sm:ml-6 mt-4 sm:mt-0'>
                                    <h3 className='text-lg font-semibold text-green-800 line-clamp-1'>{item.name}</h3>
                                    <p className='text-sm text-gray-600'>{item.unit}</p>
                                    <p className='text-sm mt-1 text-gray-600 sm:text-base'>Price :Tk{Number(item.price) * Number(item.quantity)}</p>
                                    </div>
                                    </motion.div>
                                    
                            ))}
                        </AnimatePresence>
                    </div>
                        
            </div>
        )}
    </div>
  )
}

export default CartPage