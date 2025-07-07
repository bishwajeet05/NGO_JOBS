"use client";

import React, { ReactNode, useState, useRef, useEffect, CSSProperties } from 'react';
import ReactDOM from 'react-dom';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import { Dialog } from '@headlessui/react';
import { FaSearch } from 'react-icons/fa';

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

const categories = [
  'Education',
  'Health',
  'Livelihoods',
  'CSR',
  'Child Rights & Protection',
  'Programme Management',
  'Communications',
  'Public Health',
  'Finance',
  'M&E',
  'Partnerships',
  'Climate',
  // ...add more as needed
];

const employmentTypes = [
  'Full-time',
  'Part-time',
  'Contract',
  'Internship',
  'Volunteer',
];

const experienceOptions = [
  { label: '0–1 years', value: '0-1' },
  { label: '2–4 years', value: '2-4' },
  { label: '5+ years', value: '5+' },
];

const postedDateOptions = [
  { label: 'Any time', value: '' },
  { label: 'Last 24 hours', value: '1' },
  { label: 'Last 7 days', value: '7' },
  { label: 'Last 30 days', value: '30' },
];

const qualifications = [
  'Bachelors',
  'Masters',
  'PhD',
  'Diploma',
  'Certification',
  // ...add more as needed
];

const skills = [
  'Project Management',
  'Data Analysis',
  'Fieldwork',
  'Fundraising',
  'Training',
  'Advocacy',
  // ...add more as needed
];

interface JobFilterProps {
  onChange: (filters: any) => void;
  filters: any;
  cityOptions?: string[];
  stateOptions?: string[];
  departmentOptions?: string[];
  workModeOptions?: string[];
  filterSidebarRef?: React.RefObject<HTMLDivElement | null>;
  mobileFilterOpen?: boolean;
  setMobileFilterOpen?: (open: boolean) => void;
}

// Helper to get popover style (position above the button)
function getPopoverStyle(anchorRef: React.RefObject<HTMLButtonElement | null>, filterSidebarRef?: React.RefObject<HTMLDivElement | null>): CSSProperties {
  if (typeof window === 'undefined' || !anchorRef.current) return { visibility: 'hidden', position: 'fixed' };
  const anchorRect = anchorRef.current.getBoundingClientRect();
  let left = anchorRect.left + window.scrollX;
  if (filterSidebarRef && filterSidebarRef.current) {
    const sidebarRect = filterSidebarRef.current.getBoundingClientRect();
    left = sidebarRect.left;
  }
  return {
    position: 'fixed',
    left,
    top: anchorRect.bottom + 8,
    zIndex: 9999,
    background: 'white',
    borderRadius: '0.5rem',
    boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
    width: '320px',
    border: '1px solid #e5e7eb',
    padding: '1rem',
  };
}

// Utility hook to close popover on outside click
function useOutsideAlerter(ref: React.RefObject<HTMLDivElement | null>, onClose: () => void) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, onClose]);
}

interface LargeModalProps {
  open: boolean;
  title: string;
  searchValue: string;
  onSearchChange: (val: string) => void;
  options: string[];
  selected: string[];
  onSelect: (val: string) => void;
  onClose: () => void;
  onApply: () => void;
  columns?: number;
  placeholder?: string;
}

function LargeModal({
  open,
  title,
  searchValue,
  onSearchChange,
  options,
  selected,
  onSelect,
  onClose,
  onApply,
  columns = 2,
  placeholder = 'Search',
}: LargeModalProps) {
  if (!open) return null;
  // Split options into columns
  const colSize = Math.ceil(options.length / columns);
  const optionColumns = Array.from({ length: columns }, (_, i) =>
    options.slice(i * colSize, (i + 1) * colSize)
  );
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl p-6 relative">
        <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-700" onClick={onClose} aria-label="Close">
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <div className="mb-4 flex items-center border rounded px-2">
          <FaSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder={placeholder}
            value={searchValue}
            onChange={e => onSearchChange(e.target.value)}
            className="w-full py-2 outline-none"
          />
        </div>
        <div className={`grid grid-cols-${columns} gap-4 max-h-72 overflow-y-auto mb-6`}>
          {optionColumns.map((col, i) => (
            <div key={i}>
              {col.map((opt: string) => (
                <label key={opt} className="flex items-center gap-2 mb-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selected.includes(opt)}
                    onChange={() => onSelect(opt)}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  {opt}
                </label>
              ))}
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <button
            onClick={onApply}
            className="px-6 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}

// Extract filter content into a new component
function FilterContent({
  filters,
  onChange,
  cityOptions,
  stateOptions,
  selectedCategories,
  setSelectedCategories,
  selectedCities,
  setSelectedCities,
  selectedStates,
  setSelectedStates,
  selectedSkills,
  setSelectedSkills,
  selectedQualifications,
  setSelectedQualifications,
  categoryModalOpen,
  setCategoryModalOpen,
  cityModalOpen,
  setCityModalOpen,
  stateModalOpen,
  setStateModalOpen,
  qualModalOpen,
  setQualModalOpen,
  skillsModalOpen,
  setSkillsModalOpen,
  categorySearch,
  setCategorySearch,
  citySearch,
  setCitySearch,
  stateSearch,
  setStateSearch,
  qualSearch,
  setQualSearch,
  skillsSearch,
  setSkillsSearch,
  filteredCategories,
  filteredCities,
  filteredStates,
  filteredQuals,
  filteredSkills,
  handleMultiSelect,
  categoryAnchorRef,
  cityAnchorRef,
  stateAnchorRef,
  qualAnchorRef,
  skillsAnchorRef,
  hasMounted,
  categoryPopoverRef,
  cityPopoverRef,
  statePopoverRef,
  qualPopoverRef,
  skillsPopoverRef,
  filterSidebarRef
}: {
  filters: any;
  onChange: (filters: any) => void;
  cityOptions: string[];
  stateOptions: string[];
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
  selectedCities: string[];
  setSelectedCities: React.Dispatch<React.SetStateAction<string[]>>;
  selectedStates: string[];
  setSelectedStates: React.Dispatch<React.SetStateAction<string[]>>;
  selectedSkills: string[];
  setSelectedSkills: React.Dispatch<React.SetStateAction<string[]>>;
  selectedQualifications: string[];
  setSelectedQualifications: React.Dispatch<React.SetStateAction<string[]>>;
  categoryModalOpen: boolean;
  setCategoryModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  cityModalOpen: boolean;
  setCityModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  stateModalOpen: boolean;
  setStateModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  qualModalOpen: boolean;
  setQualModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  skillsModalOpen: boolean;
  setSkillsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  categorySearch: string;
  setCategorySearch: React.Dispatch<React.SetStateAction<string>>;
  citySearch: string;
  setCitySearch: React.Dispatch<React.SetStateAction<string>>;
  stateSearch: string;
  setStateSearch: React.Dispatch<React.SetStateAction<string>>;
  qualSearch: string;
  setQualSearch: React.Dispatch<React.SetStateAction<string>>;
  skillsSearch: string;
  setSkillsSearch: React.Dispatch<React.SetStateAction<string>>;
  filteredCategories: string[];
  filteredCities: string[];
  filteredStates: string[];
  filteredQuals: string[];
  filteredSkills: string[];
  handleMultiSelect: (key: string, value: string) => void;
  categoryAnchorRef: React.RefObject<HTMLButtonElement | null>;
  cityAnchorRef: React.RefObject<HTMLButtonElement | null>;
  stateAnchorRef: React.RefObject<HTMLButtonElement | null>;
  qualAnchorRef: React.RefObject<HTMLButtonElement | null>;
  skillsAnchorRef: React.RefObject<HTMLButtonElement | null>;
  hasMounted: boolean;
  categoryPopoverRef: React.RefObject<HTMLDivElement | null>;
  cityPopoverRef: React.RefObject<HTMLDivElement | null>;
  statePopoverRef: React.RefObject<HTMLDivElement | null>;
  qualPopoverRef: React.RefObject<HTMLDivElement | null>;
  skillsPopoverRef: React.RefObject<HTMLDivElement | null>;
  filterSidebarRef?: React.RefObject<HTMLDivElement | null>;
}) {
  // Salary slider state
  const [salary, setSalary] = React.useState([10000, 3000000]);
  const salaryRanges = [
    { label: '₹10,000 - ₹100,000', min: 10000, max: 100000 },
    { label: '₹100,000 - ₹1,000,000', min: 100000, max: 1000000 },
    { label: '₹1,000,000 - ₹3,000,000', min: 1000000, max: 3000000 },
    { label: '₹3,000,000 Up', min: 3000000, max: 3000000 },
  ];
  const jobTypes = [
    'Full-time',
    'Part-time',
    'Contract',
    'Internship',
    'Volunteer',
  ];
  // Remote toggle
  const [remote, setRemote] = React.useState(filters.remote || false);

  return (
    <div className="space-y-3 text-sm sm:text-base">
      {/* Job Type */}
      <FilterSection title="Job Type" defaultOpen>
        <div className="flex flex-col gap-1 sm:gap-2">
          {jobTypes.map(type => (
            <label key={type} className="flex items-center gap-2 text-gray-700 text-sm sm:text-base px-1 py-1 rounded hover:bg-gray-100">
              <input
                type="checkbox"
                checked={filters.jobType?.includes(type)}
                onChange={() => {
                  const arr = filters.jobType ? [...filters.jobType] : [];
                  if (arr.includes(type)) {
                    onChange({ ...filters, jobType: arr.filter(t => t !== type) });
                  } else {
                    onChange({ ...filters, jobType: [...arr, type] });
                  }
                }}
                className="h-5 w-5 sm:h-4 sm:w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              {type}
            </label>
          ))}
        </div>
      </FilterSection>
      {/* Salary */}
      <FilterSection title="Salary" defaultOpen>
        <div className="mb-2 flex items-center gap-1 sm:gap-2">
          <input
            type="number"
            min={10000}
            max={3000000}
            value={salary[0]}
            onChange={e => {
              const val = Math.max(10000, Math.min(Number(e.target.value), salary[1]));
              setSalary([val, salary[1]]);
              onChange({ ...filters, salaryMin: val, salaryMax: salary[1] });
            }}
            className="w-16 sm:w-20 border rounded px-2 py-1 text-xs sm:text-sm"
          />
          <span> (₹) </span>
          <input
            type="number"
            min={salary[0]}
            max={3000000}
            value={salary[1]}
            onChange={e => {
              const val = Math.max(salary[0], Math.min(Number(e.target.value), 3000000));
              setSalary([salary[0], val]);
              onChange({ ...filters, salaryMin: salary[0], salaryMax: val });
            }}
            className="w-20 sm:w-24 border rounded px-2 py-1 text-xs sm:text-sm"
          />
        </div>
        <div className="flex items-center gap-1 sm:gap-2 mb-2">
          <input
            type="range"
            min={10000}
            max={3000000}
            step={1000}
            value={salary[0]}
            onChange={e => {
              const val = Number(e.target.value);
              setSalary([val, salary[1]]);
              onChange({ ...filters, salaryMin: val, salaryMax: salary[1] });
            }}
            className="w-2/5 sm:w-1/2"
          />
          <input
            type="range"
            min={10000}
            max={3000000}
            step={1000}
            value={salary[1]}
            onChange={e => {
              const val = Number(e.target.value);
              setSalary([salary[0], val]);
              onChange({ ...filters, salaryMin: salary[0], salaryMax: val });
            }}
            className="w-2/5 sm:w-1/2"
          />
        </div>
        <div className="flex justify-between text-[10px] sm:text-xs text-gray-500 mb-2">
          <span>Min: ₹10,000</span>
          <span>Max: ₹3,000,000</span>
        </div>
        <div className="flex flex-col gap-1">
          {salaryRanges.map(range => (
            <label key={range.label} className="flex items-center gap-2 text-gray-700 text-xs sm:text-sm px-1 py-1 rounded hover:bg-gray-100">
              <input
                type="radio"
                name="salaryRange"
                checked={salary[0] === range.min && salary[1] === range.max}
                onChange={() => {
                  setSalary([range.min, range.max]);
                  onChange({ ...filters, salaryMin: range.min, salaryMax: range.max });
                }}
                className="h-5 w-5 sm:h-4 sm:w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              {range.label}
            </label>
          ))}
        </div>
      </FilterSection>
      {/* Category */}
      <FilterSection title="Category" defaultOpen>
        <div className="flex flex-col gap-1 sm:gap-2">
          {filteredCategories.slice(0, 5).map(cat => (
            <label key={cat} className="flex items-center gap-2 text-gray-700 text-sm sm:text-base px-1 py-1 rounded hover:bg-gray-100">
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onChange={() => handleMultiSelect('category', cat)}
                className="h-5 w-5 sm:h-4 sm:w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              {cat}
            </label>
          ))}
          {filteredCategories.length > 5 && (
            <button
              type="button"
              className="text-blue-600 text-xs underline mt-1 text-left px-1"
              onClick={() => setCategoryModalOpen(true)}
            >
              View More
            </button>
          )}
        </div>
      </FilterSection>
      {/* City */}
      <FilterSection title="City" defaultOpen={false}>
        <div className="flex flex-col gap-1 sm:gap-2">
          {filteredCities.slice(0, 5).map(city => (
            <label key={city} className="flex items-center gap-2 text-gray-700 text-sm sm:text-base px-1 py-1 rounded hover:bg-gray-100">
              <input
                type="checkbox"
                checked={selectedCities.includes(city)}
                onChange={() => handleMultiSelect('city', city)}
                className="h-5 w-5 sm:h-4 sm:w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              {city}
            </label>
          ))}
          {filteredCities.length > 5 && (
            <button
              type="button"
              className="text-blue-600 text-xs underline mt-1 text-left px-1"
              onClick={() => setCityModalOpen(true)}
            >
              View More
            </button>
          )}
          </div>
      </FilterSection>
      {/* State */}
      <FilterSection title="State" defaultOpen={false}>
        <div className="flex flex-col gap-1 sm:gap-2">
          {filteredStates.slice(0, 5).map(state => (
            <label key={state} className="flex items-center gap-2 text-gray-700 text-sm sm:text-base px-1 py-1 rounded hover:bg-gray-100">
              <input
                type="checkbox"
                checked={selectedStates.includes(state)}
                onChange={() => handleMultiSelect('state', state)}
                className="h-5 w-5 sm:h-4 sm:w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              {state}
            </label>
          ))}
          {filteredStates.length > 5 && (
            <button
              type="button"
              className="text-blue-600 text-xs underline mt-1 text-left px-1"
              onClick={() => setStateModalOpen(true)}
            >
              View More
            </button>
          )}
        </div>
      </FilterSection>
      {/* Skills */}
      <FilterSection title="Skills" defaultOpen={false}>
        <div className="flex flex-col gap-1 sm:gap-2">
          {filteredSkills.slice(0, 5).map(skill => (
            <label key={skill} className="flex items-center gap-2 text-gray-700 text-sm sm:text-base px-1 py-1 rounded hover:bg-gray-100">
              <input
                type="checkbox"
                checked={selectedSkills.includes(skill)}
                onChange={() => handleMultiSelect('skills', skill)}
                className="h-5 w-5 sm:h-4 sm:w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              {skill}
            </label>
          ))}
          {filteredSkills.length > 5 && (
            <button
              type="button"
              className="text-blue-600 text-xs underline mt-1 text-left px-1"
              onClick={() => setSkillsModalOpen(true)}
            >
              View More
            </button>
          )}
        </div>
      </FilterSection>
      {/* Qualifications */}
      <FilterSection title="Qualifications" defaultOpen={false}>
        <div className="flex flex-col gap-1 sm:gap-2">
          {filteredQuals.slice(0, 5).map(qual => (
            <label key={qual} className="flex items-center gap-2 text-gray-700 text-sm sm:text-base px-1 py-1 rounded hover:bg-gray-100">
              <input
                type="checkbox"
                checked={selectedQualifications.includes(qual)}
                onChange={() => handleMultiSelect('qualifications', qual)}
                className="h-5 w-5 sm:h-4 sm:w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              {qual}
            </label>
          ))}
          {filteredQuals.length > 5 && (
            <button
              type="button"
              className="text-blue-600 text-xs underline mt-1 text-left px-1"
              onClick={() => setQualModalOpen(true)}
            >
              View More
            </button>
          )}
        </div>
      </FilterSection>
      {/* Remote Job Toggle */}
      <FilterSection title="Remote Job" defaultOpen={false}>
        <label className="flex items-center gap-2 cursor-pointer text-sm sm:text-base px-1 py-1 rounded hover:bg-gray-100">
          <input
            type="checkbox"
            checked={remote}
            onChange={e => {
              setRemote(e.target.checked);
              onChange({ ...filters, remote: e.target.checked });
            }}
            className="h-5 w-5 sm:h-4 sm:w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-gray-700">Remote Job</span>
        </label>
      </FilterSection>
    </div>
  );
}

export default function JobFilter({ onChange, filters, cityOptions = [], stateOptions = [], filterSidebarRef, mobileFilterOpen = false, setMobileFilterOpen }: JobFilterProps) {
  // All hooks must be inside the component:
  const categoryAnchorRef = useRef<HTMLButtonElement | null>(null);
  const cityAnchorRef = useRef<HTMLButtonElement | null>(null);
  const stateAnchorRef = useRef<HTMLButtonElement | null>(null);
  const qualAnchorRef = useRef<HTMLButtonElement | null>(null);
  const skillsAnchorRef = useRef<HTMLButtonElement | null>(null);

  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [cityModalOpen, setCityModalOpen] = useState(false);
  const [stateModalOpen, setStateModalOpen] = useState(false);
  const [qualModalOpen, setQualModalOpen] = useState(false);
  const [skillsModalOpen, setSkillsModalOpen] = useState(false);

  const categoryPopoverRef = useRef<HTMLDivElement | null>(null);
  const cityPopoverRef = useRef<HTMLDivElement | null>(null);
  const statePopoverRef = useRef<HTMLDivElement | null>(null);
  const qualPopoverRef = useRef<HTMLDivElement | null>(null);
  const skillsPopoverRef = useRef<HTMLDivElement | null>(null);

  useOutsideAlerter(categoryPopoverRef, () => setCategoryModalOpen(false));
  useOutsideAlerter(cityPopoverRef, () => setCityModalOpen(false));
  useOutsideAlerter(statePopoverRef, () => setStateModalOpen(false));
  useOutsideAlerter(qualPopoverRef, () => setQualModalOpen(false));
  useOutsideAlerter(skillsPopoverRef, () => setSkillsModalOpen(false));

  // Local state for multi-selects
  const [selectedCategories, setSelectedCategories] = useState<string[]>(filters.category || []);
  const [selectedCities, setSelectedCities] = useState<string[]>(filters.city || []);
  const [selectedStates, setSelectedStates] = useState<string[]>(filters.state || []);
  const [selectedSkills, setSelectedSkills] = useState<string[]>(filters.skills || []);
  const [selectedQualifications, setSelectedQualifications] = useState<string[]>(filters.qualifications || []);
  const [categorySearch, setCategorySearch] = useState('');
  const [citySearch, setCitySearch] = useState('');
  const [stateSearch, setStateSearch] = useState('');
  const [qualSearch, setQualSearch] = useState('');
  const [skillsSearch, setSkillsSearch] = useState('');

  // Add hasMounted state to prevent hydration mismatch
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => { setHasMounted(true); }, []);

  // Filtered options for modal search
  const filteredCategories = categories.filter(opt => opt.toLowerCase().includes(categorySearch.toLowerCase()));
  const filteredCities = cityOptions.filter(opt => opt.toLowerCase().includes(citySearch.toLowerCase()));
  const filteredStates = stateOptions.filter(opt => opt.toLowerCase().includes(stateSearch.toLowerCase()));
  const filteredQuals = qualifications.filter(opt => opt.toLowerCase().includes(qualSearch.toLowerCase()));
  const filteredSkills = skills.filter(opt => opt.toLowerCase().includes(skillsSearch.toLowerCase()));

  // Handlers for multi-selects
  const handleMultiSelect = (key: string, value: string) => {
    let arr;
    switch (key) {
      case 'skills':
        arr = [...selectedSkills];
        if (arr.includes(value)) arr = arr.filter((v) => v !== value);
        else arr.push(value);
        setSelectedSkills(arr);
        onChange({ skills: arr });
        break;
      case 'qualifications':
        arr = [...selectedQualifications];
        if (arr.includes(value)) arr = arr.filter((v) => v !== value);
        else arr.push(value);
        setSelectedQualifications(arr);
        onChange({ qualifications: arr });
        break;
      case 'category':
        arr = [...selectedCategories];
        if (arr.includes(value)) arr = arr.filter((v) => v !== value);
        else arr.push(value);
        setSelectedCategories(arr);
        onChange({ category: arr });
        break;
      case 'city':
        arr = [...selectedCities];
        if (arr.includes(value)) arr = arr.filter((v) => v !== value);
        else arr.push(value);
        setSelectedCities(arr);
        onChange({ city: arr });
        break;
      case 'state':
        arr = [...selectedStates];
        if (arr.includes(value)) arr = arr.filter((v) => v !== value);
        else arr.push(value);
        setSelectedStates(arr);
        onChange({ state: arr });
        break;
      default:
        break;
    }
  };

  // Add local state for staged selections
  const [stagedCategories, setStagedCategories] = useState<string[]>([]);
  const [stagedCities, setStagedCities] = useState<string[]>([]);
  const [stagedStates, setStagedStates] = useState<string[]>([]);
  const [stagedQualifications, setStagedQualifications] = useState<string[]>([]);
  const [stagedSkills, setStagedSkills] = useState<string[]>([]);

  // When opening a modal, stage the current selection
  const openCategoryModal = () => {
    setStagedCategories(selectedCategories);
    setCategoryModalOpen(true);
  };
  const openCityModal = () => {
    setStagedCities(selectedCities);
    setCityModalOpen(true);
  };
  const openStateModal = () => {
    setStagedStates(selectedStates);
    setStateModalOpen(true);
  };
  const openQualModal = () => {
    setStagedQualifications(selectedQualifications);
    setQualModalOpen(true);
  };
  const openSkillsModal = () => {
    setStagedSkills(selectedSkills);
    setSkillsModalOpen(true);
  };

  return (
    <aside className="sticky top-8 w-full max-w-xs bg-white border border-gray-100 rounded-md shadow-sm p-5 font-sans">
      <h2 className="text-lg font-semibold text-gray-900 mb-6 tracking-tight">Job Search Filters</h2>
      <FilterContent
        filters={filters}
        onChange={onChange}
        cityOptions={cityOptions}
        stateOptions={stateOptions}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        selectedCities={selectedCities}
        setSelectedCities={setSelectedCities}
        selectedStates={selectedStates}
        setSelectedStates={setSelectedStates}
        selectedSkills={selectedSkills}
        setSelectedSkills={setSelectedSkills}
        selectedQualifications={selectedQualifications}
        setSelectedQualifications={setSelectedQualifications}
        categoryModalOpen={categoryModalOpen}
        setCategoryModalOpen={setCategoryModalOpen}
        cityModalOpen={cityModalOpen}
        setCityModalOpen={setCityModalOpen}
        stateModalOpen={stateModalOpen}
        setStateModalOpen={setStateModalOpen}
        qualModalOpen={qualModalOpen}
        setQualModalOpen={setQualModalOpen}
        skillsModalOpen={skillsModalOpen}
        setSkillsModalOpen={setSkillsModalOpen}
        categorySearch={categorySearch}
        setCategorySearch={setCategorySearch}
        citySearch={citySearch}
        setCitySearch={setCitySearch}
        stateSearch={stateSearch}
        setStateSearch={setStateSearch}
        qualSearch={qualSearch}
        setQualSearch={setQualSearch}
        skillsSearch={skillsSearch}
        setSkillsSearch={setSkillsSearch}
        filteredCategories={filteredCategories}
        filteredCities={filteredCities}
        filteredStates={filteredStates}
        filteredQuals={filteredQuals}
        filteredSkills={filteredSkills}
        handleMultiSelect={handleMultiSelect}
        categoryAnchorRef={categoryAnchorRef}
        cityAnchorRef={cityAnchorRef}
        stateAnchorRef={stateAnchorRef}
        qualAnchorRef={qualAnchorRef}
        skillsAnchorRef={skillsAnchorRef}
        hasMounted={hasMounted}
        categoryPopoverRef={categoryPopoverRef}
        cityPopoverRef={cityPopoverRef}
        statePopoverRef={statePopoverRef}
        qualPopoverRef={qualPopoverRef}
        skillsPopoverRef={skillsPopoverRef}
        filterSidebarRef={filterSidebarRef}
      />
      {/* Mobile Drawer */}
      {hasMounted && mobileFilterOpen && ReactDOM.createPortal(
        <div className="fixed inset-0 z-50 flex justify-start lg:hidden">
          {/* Even lighter overlay, no blur */}
          <div className="fixed inset-0 bg-transparent transition-opacity duration-300" onClick={() => setMobileFilterOpen && setMobileFilterOpen(false)} />
          {/* Slide-in from left */}
          <div className="relative h-full w-full max-w-xs sm:max-w-sm bg-white shadow-2xl p-4 sm:p-6 flex flex-col animate-slideInLeft" style={{left: 0}}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Filter</h2>
              <button onClick={() => setMobileFilterOpen && setMobileFilterOpen(false)} className="text-gray-400 hover:text-gray-700" aria-label="Close">
                <span className="text-2xl">&times;</span>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto hide-scrollbar">
              <FilterContent
                filters={filters}
                onChange={onChange}
                cityOptions={cityOptions}
                stateOptions={stateOptions}
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                selectedCities={selectedCities}
                setSelectedCities={setSelectedCities}
                selectedStates={selectedStates}
                setSelectedStates={setSelectedStates}
                selectedSkills={selectedSkills}
                setSelectedSkills={setSelectedSkills}
                selectedQualifications={selectedQualifications}
                setSelectedQualifications={setSelectedQualifications}
                categoryModalOpen={categoryModalOpen}
                setCategoryModalOpen={setCategoryModalOpen}
                cityModalOpen={cityModalOpen}
                setCityModalOpen={setCityModalOpen}
                stateModalOpen={stateModalOpen}
                setStateModalOpen={setStateModalOpen}
                qualModalOpen={qualModalOpen}
                setQualModalOpen={setQualModalOpen}
                skillsModalOpen={skillsModalOpen}
                setSkillsModalOpen={setSkillsModalOpen}
                categorySearch={categorySearch}
                setCategorySearch={setCategorySearch}
                citySearch={citySearch}
                setCitySearch={setCitySearch}
                stateSearch={stateSearch}
                setStateSearch={setStateSearch}
                qualSearch={qualSearch}
                setQualSearch={setQualSearch}
                skillsSearch={skillsSearch}
                setSkillsSearch={setSkillsSearch}
                filteredCategories={filteredCategories}
                filteredCities={filteredCities}
                filteredStates={filteredStates}
                filteredQuals={filteredQuals}
                filteredSkills={filteredSkills}
                handleMultiSelect={handleMultiSelect}
                categoryAnchorRef={categoryAnchorRef}
                cityAnchorRef={cityAnchorRef}
                stateAnchorRef={stateAnchorRef}
                qualAnchorRef={qualAnchorRef}
                skillsAnchorRef={skillsAnchorRef}
                hasMounted={hasMounted}
                categoryPopoverRef={categoryPopoverRef}
                cityPopoverRef={cityPopoverRef}
                statePopoverRef={statePopoverRef}
                qualPopoverRef={qualPopoverRef}
                skillsPopoverRef={skillsPopoverRef}
                filterSidebarRef={filterSidebarRef}
              />
            </div>
            <button
              onClick={() => setMobileFilterOpen && setMobileFilterOpen(false)}
              className="mt-4 w-full py-2 rounded bg-blue-600 text-white font-semibold text-base sm:text-lg hover:bg-blue-700 transition"
            >
              Apply Filter
            </button>
          </div>
          {/* Add slide-in animation */}
          <style>{`
            @keyframes slideInLeft {
              from { transform: translateX(-100%); }
              to { transform: translateX(0); }
            }
            .animate-slideInLeft {
              animation: slideInLeft 0.3s cubic-bezier(0.4,0,0.2,1);
            }
          `}</style>
        </div>,
        document.body
      )}
      {/* Hide scrollbar utility */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </aside>
  );
} 