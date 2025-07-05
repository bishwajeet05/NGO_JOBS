"use client";

import React, { ReactNode } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FilterSection = ({ title, children, defaultOpen = false }: { title: string; children: ReactNode; defaultOpen?: boolean }) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="w-full flex justify-between items-center text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="font-semibold text-gray-800">{title}</h3>
        {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
      </button>
      {isOpen && <div className="mt-4">{children}</div>}
    </div>
  );
};

const Checkbox = ({ label, count }: { label: string; count: string }) => (
  <div className="flex items-center justify-between mb-2">
    <label className="flex items-center text-sm text-gray-600">
      <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
      <span className="ml-2">{label}</span>
    </label>
    <span className="text-sm text-gray-500">{count}</span>
  </div>
);

const JobFilter = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-900">All Filters</h2>
        <a href="#" className="text-sm font-medium text-blue-600 hover:underline">
          Applied (1)
        </a>
      </div>

      <FilterSection title="Work mode" defaultOpen={true}>
        <Checkbox label="Work from office" count="536062" />
        <Checkbox label="Remote" count="21566" />
        <Checkbox label="Hybrid" count="15333" />
        <Checkbox label="Temp. WFH due to..." count="13" />
      </FilterSection>

      <FilterSection title="Experience" defaultOpen={true}>
        <div className="relative">
          <input type="range" min="0" max="30" defaultValue="5" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>0 Yrs</span>
            <span>Any</span>
          </div>
        </div>
      </FilterSection>

      <FilterSection title="Department" defaultOpen={true}>
        <Checkbox label="Engineering - Software" count="11733" />
        <Checkbox label="Sales & Business" count="1730" />
        <Checkbox label="Customer Success" count="997" />
        <Checkbox label="Data Science & Analytics" count="944" />
        <a href="#" className="text-sm font-medium text-blue-600 hover:underline mt-2 inline-block">View More</a>
      </FilterSection>

      <FilterSection title="Location" defaultOpen={true}>
        <Checkbox label="Bengaluru" count="1401" />
        <Checkbox label="Delhi / NCR" count="1260" />
        <Checkbox label="Hyderabad" count="765" />
        <Checkbox label="Pune" count="658" />
        <a href="#" className="text-sm font-medium text-blue-600 hover:underline mt-2 inline-block">View More</a>
      </FilterSection>

      <FilterSection title="Salary" defaultOpen={true}>
        <Checkbox label="0-3 Lakhs" count="3389" />
        <Checkbox label="3-6 Lakhs" count="10368" />
        <Checkbox label="6-10 Lakhs" count="13275" />
        <Checkbox label="10-15 Lakhs" count="7719" />
        <a href="#" className="text-sm font-medium text-blue-600 hover:underline mt-2 inline-block">View More</a>
      </FilterSection>
    </div>
  );
};

export default JobFilter; 