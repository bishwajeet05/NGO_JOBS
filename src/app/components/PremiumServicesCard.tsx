"use client";

import React from 'react';
import { Zap, FileText, Edit3, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const PremiumServicesCard = () => {
  return (
    <div className="bg-[#FFFBF5] rounded-2xl p-6 md:p-8 shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-gray-100 relative">
      <div className="absolute top-4 right-4 bg-purple-100 text-purple-800 text-xs font-medium px-3 py-1 rounded-full">
        by NGO Jobs
      </div>

      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Image */}
        <div className="flex-shrink-0">
          <Image 
            src="/images/undraw_hiring_8szx.svg"
            alt="Premium Services Illustration"
            width={150}
            height={150}
            className="w-24 h-24 md:w-36 md:h-36"
          />
        </div>

        {/* Content */}
        <div className="flex-grow">
          <h3 className="text-xl md:text-2xl font-bold text-[#1d1d1f]">
            Accelerate your job search with premium services
          </h3>
          <p className="text-gray-700 mt-2 text-sm md:text-base">
            Services to help you get hired, faster: from preparing your CV, getting recruiter attention, finding the right jobs, and more!
          </p>
          <div className="flex flex-wrap gap-3 mt-5">
            <button className="flex items-center text-sm font-medium px-3 py-2 bg-white/60 border border-gray-300 rounded-full hover:bg-white/80 text-purple-800">
              <Zap size={16} className="mr-2" />
              Resume writing
              <ChevronRight size={16} className="ml-1 text-gray-500" />
            </button>
            <button className="flex items-center text-sm font-medium px-3 py-2 bg-white/60 border border-gray-300 rounded-full hover:bg-white/80 text-purple-800">
              <FileText size={16} className="mr-2" />
              Priority applicant
              <ChevronRight size={16} className="ml-1 text-gray-500" />
            </button>
            <button className="flex items-center text-sm font-medium px-3 py-2 bg-white/60 border border-gray-300 rounded-full hover:bg-white/80 text-purple-800">
              <Edit3 size={16} className="mr-2" />
              Resume display
              <ChevronRight size={16} className="ml-1 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex-shrink-0 text-center md:text-right mt-6 md:mt-0">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold text-base hover:bg-blue-700 transition-colors">
            Learn more
          </button>
          <p className="text-xs text-gray-600 mt-2">Includes paid services</p>
        </div>
      </div>
    </div>
  );
};

export default PremiumServicesCard; 