"use client";
import * as React from "react";
import { FaSearch, FaMapMarkerAlt, FaArrowRight, FaSlidersH } from "react-icons/fa";
import { motion } from "framer-motion";
import * as Select from "@radix-ui/react-select";

const categories = [
  "Jobs",
  "Fellowships",
  "Internships",
  "Scholarships",
];

export default function SearchBar({ onSearch, search, location, category, onFilterClick }: { onSearch: (search: string, location: string, category: string) => void, search: string, location: string, category: string, onFilterClick?: () => void }) {
  const [localSearch, setLocalSearch] = React.useState(search);
  const [localLocation, setLocalLocation] = React.useState(location);
  const [localCategory, setLocalCategory] = React.useState(category);
  const [isFocused, setIsFocused] = React.useState(false);

  React.useEffect(() => { setLocalSearch(search); }, [search]);
  React.useEffect(() => { setLocalLocation(location); }, [location]);
  React.useEffect(() => { setLocalCategory(category); }, [category]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(localSearch, localLocation, localCategory);
  };

  return (
    <motion.form
      className="flex flex-col sm:flex-row items-stretch gap-3 sm:gap-0 bg-white rounded-lg shadow-lg border border-gray-200 w-full overflow-hidden"
      animate={{ boxShadow: isFocused ? "0 4px 24px 0 rgba(31, 38, 135, 0.14)" : "0 2px 16px 0 rgba(31, 38, 135, 0.08)" }}
      role="search"
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      tabIndex={-1}
      onSubmit={handleSubmit}
    >
      {/* What are you looking for? */}
      <div className="flex items-center gap-4 px-6 py-4 flex-[2] min-w-[140px] border-b sm:border-b-0 sm:border-r border-gray-200">
        <FaSearch className="text-blue-500 text-xl flex-shrink-0" />
        <input
          type="text"
          placeholder="Job title, skills, or NGO"
          className="bg-transparent outline-none border-0 text-base sm:text-lg w-full placeholder:text-gray-400"
          value={localSearch}
          onChange={e => setLocalSearch(e.target.value)}
        />
      </div>

      {/* Location */}
      <div className="flex items-center gap-4 px-6 py-4 flex-1 min-w-[120px] border-b sm:border-b-0 sm:border-r border-gray-200">
        <FaMapMarkerAlt className="text-blue-500 text-xl flex-shrink-0" />
        <input
          type="text"
          placeholder="City or State"
          className="bg-transparent outline-none border-0 text-base sm:text-lg w-full placeholder:text-gray-400"
          value={localLocation}
          onChange={e => setLocalLocation(e.target.value)}
        />
      </div>

      {/* Category */}
      <div className="flex items-center">
        <Select.Root value={localCategory} onValueChange={setLocalCategory}>
          <Select.Trigger className="flex items-center gap-2 px-6 py-4 bg-transparent text-base sm:text-lg w-full min-w-[120px] outline-none focus:ring-2 focus:ring-blue-200 cursor-pointer flex-shrink-0 font-medium text-[#1a2a3a] border-b sm:border-b-0 sm:border-r border-gray-200">
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

      <div className="flex w-full sm:w-auto gap-2 items-center justify-end px-4 py-4 sm:px-0 sm:py-0">
        <button
          type="button"
          className="lg:hidden flex items-center px-4 py-3 rounded bg-gray-100 text-blue-700 font-semibold border border-gray-200"
          onClick={onFilterClick}
          aria-label="Open Filters"
        >
          <FaSlidersH className="mr-2" /> Filter
        </button>
        <motion.button
          type="submit"
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded text-base sm:text-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 flex items-center justify-center gap-2"
          whileTap={{ scale: 0.97 }}
        >
          Search <FaArrowRight className="text-sm" />
        </motion.button>
      </div>
    </motion.form>
  );
} 