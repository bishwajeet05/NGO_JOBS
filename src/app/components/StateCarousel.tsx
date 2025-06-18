"use client";
import { FaMapMarkerAlt, FaChevronRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi", "Jammu & Kashmir", "Ladakh", "Puducherry", "Chandigarh", "Andaman & Nicobar", "Lakshadweep", "Dadra & Nagar Haveli", "Daman & Diu"
];

export default function StateCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const [dragWidth, setDragWidth] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const updateDragWidth = () => {
    if (containerRef.current && rowRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const rowWidth = rowRef.current.scrollWidth;
      setDragWidth(rowWidth - containerWidth > 0 ? rowWidth - containerWidth : 0);
    }
    };

    updateDragWidth();
    window.addEventListener('resize', updateDragWidth);
    return () => window.removeEventListener('resize', updateDragWidth);
  }, []);

  return (
    <div className="relative w-full mt-6 sm:mt-8 overflow-x-hidden px-4 sm:px-6" ref={containerRef}>
      {/* Gradient Indicators */}
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#eaf4fb] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#eaf4fb] to-transparent z-10 pointer-events-none" />
      
      <motion.div
        ref={rowRef}
        className="flex gap-3 sm:gap-4 cursor-grab active:cursor-grabbing py-2"
        drag="x"
        dragConstraints={{ left: -dragWidth, right: 0 }}
        whileTap={{ cursor: "grabbing" }}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
        dragElastic={0.1}
        dragMomentum={true}
      >
        {STATES.map((state) => (
          <motion.div
            key={state}
            className={`flex items-center gap-2 bg-white rounded-xl shadow-sm border border-gray-100 px-4 sm:px-6 py-2.5 sm:py-3 min-w-[160px] sm:min-w-[180px] max-w-fit h-[48px] sm:h-[52px] whitespace-nowrap hover:shadow-md transition-all duration-200 ${
              isDragging ? '' : 'hover:scale-[1.02]'
            }`}
            whileHover={!isDragging ? { scale: 1.02 } : {}}
            whileTap={!isDragging ? { scale: 0.98 } : {}}
          >
            <span className="bg-blue-50 rounded-full p-1.5 sm:p-2 text-blue-500 flex items-center justify-center">
              <FaMapMarkerAlt className="text-sm sm:text-base" />
            </span>
            <span className="font-medium text-gray-700 text-xs sm:text-sm truncate flex-1">{state}</span>
            <FaChevronRight className="text-gray-400 text-xs sm:text-sm" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
} 