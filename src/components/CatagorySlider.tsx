// "use client";
// import { motion } from "motion/react";
// import {
//   Apple,
//   Leaf,
//   Milk,
//   Croissant,
//   Beef,
//   CupSoda,
//   Popcorn,
//   Home,
//   ShoppingBasket,
// } from "lucide-react";

// export const categories = [
//   {
//     id: 1,
//     name: "fruits",
//     bgColor: "bg-red-300",
//     textColor: "text-red-500",
//     Icon: Apple,
//   },
//   {
//     id: 2,
//     name: "vegetables",
//     bgColor: "bg-green-300",
//     textColor: "text-green-500",
//     Icon: Leaf,
//   },
//   {
//     id: 3,
//     name: "dairy",
//     bgColor: "bg-blue-300",
//     textColor: "text-blue-500",
//     Icon: Milk,
//   },
//   {
//     id: 4,
//     name: "bakery",
//     bgColor: "bg-orange-300",
//     textColor: "text-orange-500",
//     Icon: Croissant,
//   },
//   {
//     id: 5,
//     name: "meat",
//     bgColor: "bg-rose-300",
//     textColor: "text-rose-600",
//     Icon: Beef,
//   },
//   {
//     id: 6,
//     name: "beverages",
//     bgColor: "bg-purple-300",
//     textColor: "text-purple-500",
//     Icon: CupSoda,
//   },
//   {
//     id: 7,
//     name: "snacks",
//     bgColor: "bg-yellow-500",
//     textColor: "text-yellow-500",
//     Icon: Popcorn,
//   },
//   {
//     id: 8,
//     name: "household",
//     bgColor: "bg-gray-500",
//     textColor: "text-gray-500",
//     Icon: Home,
//   },
// ];

// const CatagorySlider = () => {
//   return (
//     <motion.div
//       className="w-[90%] md:w-[80%] mx-auto mt-6 relative"
//       initial={{ opacity: 0, y: 50 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: false }}
//       transition={{ duration: 0.6 }}
//     >
//       <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-green-700 text-center">
//         <ShoppingBasket className="w-10 h-10 text-green-600 inline-block mr-2" />
//         Shop By Category
//       </h2>
//       <div className="flex items-center gap-6 overflow-x-auto scrollbar-hide scroll-smooth px-10 pb-4">
//         {categories.map((cat) => {
//           const Icon = cat.Icon;
//           return <motion.div
//           key={cat.id}

//           initial={{ opacity: 0, y: 50 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: false }}
//           transition={{ duration: 0.6 }}
//           className={`flex flex-col items-center justify-center gap-4 min-w-[150px] md:min-w-[200px] rounded-xl border-2 border-green-600 ${cat.bgColor} p-8 hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer`}
//           >
//             <div className="flex flex-col items-center justify-center gap-2 p-5" >
//               <Icon className="w-8 h-8  text-green-600" />
//              <p className="text-sm md:text-base font-medium text-center">{cat.name}</p>
//              </div>

//           </motion.div>
//         })}
//       </div>
//     </motion.div>
//   );
// };

// export default CatagorySlider;

"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import {
  Apple,
  Leaf,
  Milk,
  Croissant,
  Beef,
  CupSoda,
  Popcorn,
  Home,
  ShoppingBasket,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const categories = [
  {
    id: 1,
    name: "fruits",
    bgColor: "bg-red-300",
    textColor: "text-red-600",
    Icon: Apple,
  },
  {
    id: 2,
    name: "vegetables",
    bgColor: "bg-green-300",
    textColor: "text-green-600",
    Icon: Leaf,
  },
  {
    id: 3,
    name: "dairy",
    bgColor: "bg-blue-300",
    textColor: "text-blue-600",
    Icon: Milk,
  },
  {
    id: 4,
    name: "bakery",
    bgColor: "bg-orange-300",
    textColor: "text-orange-600",
    Icon: Croissant,
  },
  {
    id: 5,
    name: "meat",
    bgColor: "bg-rose-300",
    textColor: "text-rose-700",
    Icon: Beef,
  },
  {
    id: 6,
    name: "beverages",
    bgColor: "bg-purple-300",
    textColor: "text-purple-600",
    Icon: CupSoda,
  },
  {
    id: 7,
    name: "snacks",
    bgColor: "bg-yellow-300",
    textColor: "text-yellow-700",
    Icon: Popcorn,
  },
  {
    id: 8,
    name: "household",
    bgColor: "bg-gray-300",
    textColor: "text-gray-700",
    Icon: Home,
  },
];

export default function CategorySlider() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  const [paused, setPaused] = useState(false);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const updateButtons = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanLeft(el.scrollLeft > 5);
    setCanRight(el.scrollLeft < max - 5);
  };

  const scrollByCards = (dir: string) => {
    const el = scrollerRef.current;
    if (!el) return;

    const cardWidth = window.innerWidth >= 768 ? 220 : 170;
    const gap = 24;
    const amount = (cardWidth + gap) * 2;

    el.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  /* ---------- AUTOPLAY ---------- */
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    autoplayRef.current = setInterval(() => {
      if (paused) return;

      const max = el.scrollWidth - el.clientWidth;
      if (el.scrollLeft >= max - 10) {
        // loop back to start
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollByCards("right");
      }
    }, 3000);

    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [paused]);

  /* ---------- SCROLL EVENTS ---------- */
  useEffect(() => {
    updateButtons();
    const el = scrollerRef.current;
    if (!el) return;

    const onScroll = () => updateButtons();
    const onResize = () => updateButtons();

    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <motion.section
      className="w-[90%] md:w-[80%] mx-auto mt-6 relative overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="flex items-center justify-center gap-2 mb-5">
        <ShoppingBasket className="w-8 h-8 text-green-600" />
        <h2 className="text-2xl md:text-3xl font-semibold text-green-700">
          Shop By Category
        </h2>
      </div>

      {/* Left */}
      <button
        onClick={() => scrollByCards("left")}
        disabled={!canLeft}
        className={`absolute left-0 top-1/2 -translate-y-1/2 z-10
          h-10 w-10 rounded-full bg-white border shadow
          flex items-center justify-center
          ${canLeft ? "opacity-100" : "opacity-40 cursor-not-allowed"}`}
      >
        <ChevronLeft className="w-5 h-5 text-green-700" />
      </button>

      {/* Right */}
      <button
        onClick={() => scrollByCards("right")}
        disabled={!canRight}
        className={`absolute right-0 top-1/2 -translate-y-1/2 z-10
          h-10 w-10 rounded-full bg-white border shadow
          flex items-center justify-center
          ${canRight ? "opacity-100" : "opacity-40 cursor-not-allowed"}`}
      >
        <ChevronRight className="w-5 h-5 text-green-700" />
      </button>

      {/* Slider */}
      <div
        ref={scrollerRef}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        className="flex gap-6 overflow-x-auto scroll-smooth px-12 pb-4
      overflow-y-hidden
      [scrollbar-width:none] [-ms-overflow-style:none]
      [&::-webkit-scrollbar]:hidden"
      >
        {categories.map((cat, idx) => {
          const Icon = cat.Icon;
          return (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.4, delay: idx * 0.03 }}
              className={`min-w-[170px] md:min-w-[220px]
                rounded-2xl border-2 border-green-600 ${cat.bgColor}
                p-6 md:p-8 cursor-pointer
                hover:scale-105 transition-transform`}
            >
              <div className="flex flex-col items-center gap-3">
                <div className="h-14 w-14 rounded-xl bg-white/70 flex items-center justify-center">
                  <Icon className={`w-8 h-8 ${cat.textColor}`} />
                </div>
                <p className="capitalize font-semibold text-green-900 text-center">
                  {cat.name}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
