"use client";
import * as React from "react";
import { FaSearch, FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import * as Select from "@radix-ui/react-select";

const categories = [
  "Jobs",
  "Fellowships",
  "Internships",
  "Scholarships",
];

export default function SearchBar() {
  const [category, setCategory] = React.useState(categories[0]);
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <motion.form
      className="flex flex-col sm:flex-row items-stretch gap-3 sm:gap-0 bg-white rounded-lg shadow-lg border border-gray-200 max-w-2xl w-full overflow-hidden"
      animate={{ boxShadow: isFocused ? "0 4px 24px 0 rgba(31, 38, 135, 0.14)" : "0 2px 16px 0 rgba(31, 38, 135, 0.08)" }}
      role="search"
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      tabIndex={-1}
    >
      {/* What are you looking for? */}
      <div className="flex items-center gap-2 px-4 py-3 flex-[2] min-w-[140px] border-b sm:border-b-0 sm:border-r border-gray-200">
        <FaSearch className="text-blue-500 text-lg flex-shrink-0" />
        <input
          type="text"
          placeholder="Job title, skills, or NGO"
          className="bg-transparent outline-none border-0 text-sm sm:text-base w-full placeholder:text-gray-400"
        />
      </div>

      {/* Location */}
      <div className="flex items-center gap-2 px-4 py-3 flex-1 min-w-[120px] border-b sm:border-b-0 sm:border-r border-gray-200">
        <FaMapMarkerAlt className="text-blue-500 text-lg flex-shrink-0" />
        <input
          type="text"
          placeholder="City or State"
          className="bg-transparent outline-none border-0 text-sm sm:text-base w-full placeholder:text-gray-400"
        />
      </div>

      {/* Category */}
      <div className="flex items-center">
      <Select.Root value={category} onValueChange={setCategory}>
          <Select.Trigger className="flex items-center gap-2 px-4 py-3 bg-transparent text-sm sm:text-base w-full min-w-[120px] outline-none focus:ring-2 focus:ring-blue-200 cursor-pointer flex-shrink-0 font-medium text-[#1a2a3a] border-b sm:border-b-0 sm:border-r border-gray-200">
          <Select.Value placeholder="Category" />
          <Select.Icon>
            <svg width="16" height="16" fill="none" viewBox="0 0 20 20"><path d="M6 8l4 4 4-4" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
            <Select.Content className="bg-white rounded-lg shadow-xl border border-gray-200 mt-2 z-50 min-w-[180px] overflow-hidden">
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
            >
              <Select.Viewport>
                {categories.map((cat) => (
                    <Select.Item key={cat} value={cat} className="px-4 py-2.5 cursor-pointer hover:bg-blue-50 text-sm sm:text-base font-medium text-[#1a2a3a] flex items-center justify-between group">
                    <Select.ItemText>{cat}</Select.ItemText>
                    <Select.ItemIndicator className="ml-2 text-blue-600 group-hover:text-blue-700" />
                  </Select.Item>
                ))}
              </Select.Viewport>
            </motion.div>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
      </div>

      <motion.button
        type="submit"
        className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 text-sm sm:text-base transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 flex items-center justify-center gap-2"
        whileTap={{ scale: 0.97 }}
      >
        Search <FaArrowRight className="text-sm" />
      </motion.button>
    </motion.form>
  );
} 