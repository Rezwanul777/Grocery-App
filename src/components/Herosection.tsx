"use client"
import { Leaf, ShoppingBasket, Smartphone, Truck } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';
import React, { useEffect } from 'react'

const Herosection = () => {
    const slides=[
        {
    id: 1,
    icon: <Leaf className='w-20 h-20 sm:w-28 sm:h-28 text-green-400 drop-shadow-lg'/>,
    title: "Fresh Organic Groceries",
    subTitle: "Fresh fruits, vegetables and daily essentials delivered to you",
    btnText: "Shop Now",
    bg: "https://images.unsplash.com/photo-1665088127661-83aeff6104c4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fGZyZXNoJTIwb3JnYW5pYyUyMGZvb2RzfGVufDB8fDB8fHww",
  },
  {
    id: 2,
    icon:<Truck className='w-20 h-20 sm:w-28 sm:h-28 text-yellow-400 drop-shadow-lg'/>,
    title: "Fast & Reliable Delivery",
    subTitle: "Get your groceries delivered to your doorstep in record time",
    
    btnText: "Order Now",
    bg: "https://images.unsplash.com/photo-1588620862555-4da1a7c523b8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fEZhc3QlMjAlMjYlMjBSZWxpYWJsZSUyMERlbGl2ZXJ5fGVufDB8fDB8fHww",
  },
  {
    id: 3,
    icon:<Smartphone className='w-20 h-20 sm:w-28 sm:h-28 text-blue-400 drop-shadow-lg'/>,
    title: "Shop any Time, Anywhere",
    subTitle: "Access your groceries from anywhere in the world",
    btnText: "Get started",
    bg: "https://images.unsplash.com/photo-1751151950056-cfaf797f4653?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHNob3AlMjBpbiUyMGdyb2Nlcnl8ZW58MHx8MHx8fDA%3D",
  }

    ]

    // slider logic can be added here

    const [currentSlide,setCurrentSlide]=React.useState(0);
    useEffect(()=>{
        const slideInterval=setInterval(()=>{
        setCurrentSlide((prevSlide)=>(prevSlide+1)%(slides.length))
        },3000);
        return ()=>clearInterval(slideInterval);
    },[])
  return (
    <div className='relative w-[98%] mx-auto mt-30 h-[80vh] rounded-3xl overflow-hidden shadow-2xl'>
        <AnimatePresence mode='wait'>
    <motion.div
    key={currentSlide}
    initial={{opacity:0}}
    animate={{opacity:1}}
    exit={{opacity:0}}
    transition={{duration:0.5}}
    className='absolute inset-0'
    >
        <Image
        src={slides[currentSlide]?.bg}
        alt={slides[currentSlide].title}
        fill
        priority
        className='object-cover'
        />
        <div className='absolute inset-0 bg-black/50 backdrop-blur-[1px]'/>
    </motion.div>
        </AnimatePresence>
        <div className=' z-10 flex flex-col items-center justify-center h-full text-center text-white px-4 sm:px-8'>
            <div className='mb-6'>
                {slides[currentSlide]?.icon}
            </div>
            <h1 className='text-3xl sm:text-5xl font-bold mb-4 drop-shadow-lg'>{slides[currentSlide]?.title}</h1>
            <p className='text-md sm:text-lg mb-6 drop-shadow-lg'>{slides[currentSlide]?.subTitle}</p>
            <button className='bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 inline-flex gap-2 rounded-full shadow-lg drop-shadow-lg transition duration-300 ease-in-out hover:scale-105 focus:outline-none cursor-pointer'>
                <ShoppingBasket className='w-6 h-6 '/>
                {slides[currentSlide]?.btnText}
            </button>
        </div>
        <div className='absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10'>
        {slides.map((_, index) => ( 
            <div
            key={index}
            className={`w-3 h-3 rounded-full ${
                index === currentSlide ? 'bg-white w-6' : 'bg-gray-400'
            } `}
            
            />
        ))
            }
        </div>
     </div>
    
  )
}

export default Herosection