"use client";
import { ArrowRight, Bike, ShoppingBasket } from "lucide-react";
import { motion } from "motion/react";

type propType={
  nextStep:(s:number)=>void
}

const Welcome = ({nextStep}:propType) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-6 bg-linear-to-b from-green-50 to-white">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="flex items-center justify-center gap-4"
        >
          <ShoppingBasket className="w-10 h-10 text-green-600" />
          <h1 className="text-4xl md:text-6xl font-extrabold text-green-600">
            PrinceCart
          </h1>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeInOut" }}
          className="mt-2 text-lg md:text-2xl text-gray-700 max-w-lg"
        >
          Your one-stop shop for fresh groceries delivered fast and easy!
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center justify-center gap-8 mt-8"
        >
          <ShoppingBasket className="w-20 h-20 md:h-30 md:w-30 text-green-600 drop-shadow-md" />
          <Bike className="w-20 h-20 md:h-30 md:w-30 text-orange-600 drop-shadow-md" />
        </motion.div>

        <motion.button initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7, ease: "easeInOut" }}
          className="mt-10 flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300"
          
          onClick={()=>nextStep(2)}>
          Next
          <ArrowRight/>
        </motion.button>
      </div>
    </>
  );
};

export default Welcome;
