/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { ArrowLeft, Minus, Plus, ShoppingBagIcon, ShoppingBasketIcon, Trash2 } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import {AnimatePresence, motion} from "motion/react"
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import Image from 'next/image'
import { decreaseCartItemQuantity, deleteCartItemQuantity, IncreaseCartItemQuantity } from '@/redux/cartSlice'
import { useRouter } from 'next/navigation'

const CartPage = () => {
   const {cartData,subTotal,deliveryFee,finalTotal} = useSelector((state: RootState) => state.cart);
   const dispatch=useDispatch<AppDispatch>();
   const router=useRouter()
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
                    <div className='lg:col-span-2 flex flex-col gap-4'>
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
                                    <div className='flex items-center justify-center sm:justify-end mt-4 sm:mt-0 gap-2 bg-gray-100 px-3 py-2 rounded-full'>
                                        <button className='bg-white p-1.5 border border-gray-100 rounded-full hover:bg-green-200'><Minus className='w-4 h-4 text-green-600' onClick={()=>dispatch(decreaseCartItemQuantity(item._id))}/></button>
                                        <span className='text-lg font-semibold text-gray-800 w-6'>{item.quantity}</span>
                                        <button className='bg-white p-1.5 border border-gray-100 rounded-full hover:bg-green-200'><Plus className='w-4 h-4 text-green-600'onClick={()=>dispatch(IncreaseCartItemQuantity(item._id))}/></button>
                                        
                                    </div>
                                    <button><Trash2 className='w-6 h-6 text-red-600 hover:text-red-800 hover:scale-105 transition-all duration-200 ease-in-out sm:ml-4' onClick={()=>dispatch(deleteCartItemQuantity(item._id))}/></button>

                                    </motion.div>
                                    
                            ))}
                        </AnimatePresence>
                    </div>
                    <div className='bg-white rounded-2xl flex flex-col gap-4 p-6 shadow-lg border border-gray-100 h-fit sticky top-24'>
                        <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Order Summary</h2>
                        <div className='space-y-2 text-gray-600 sm:text-base'>
                            <div className='flex justify-between'>
                                 <span className='text-gray-600'>Subtotal</span> 
                            <span className='font-semibold text-gray-800'>Tk {subTotal}</span>
                            </div>
                            <div className='flex justify-between'>
                                 <span className='text-gray-600'>Delivery Fee</span> 
                            <span className='font-semibold text-gray-800'>Tk {deliveryFee}</span>
                            </div>
                            <hr className='my-3'/>
                            <div className='flex justify-between font-bold text-lg sm:text-xl'>
                                 <span className='text-gray-600'>Total</span> 
                            <span className='font-semibold text-gray-800'>Tk {finalTotal}</span>
                            </div>
                            <motion.button whileTap={{scale:0.90}} className='bg-green-500 w-full hover:bg-green-600 text-white text-sm sm:text-base py-3 mt-3 rounded-full flex items-center justify-center gap-2 cursor-pointer' onClick={()=>router.push('/user/checkout')}>
                                Proceed to Checkout
                            </motion.button>
                        </div>
                           

                    </div>
                        
            </div>
        )}
    </div>
    
  )
}

export default CartPage