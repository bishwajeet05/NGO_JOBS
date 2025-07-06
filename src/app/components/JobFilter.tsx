"use client";

import React, { ReactNode, useState } from 'react';
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

const countries = ['India'];
const states = ['Delhi', 'Karnataka', 'West Bengal', 'Telangana', 'Gujarat', 'Maharashtra', 'Tamil Nadu'];
const cities = ['Delhi', 'Bangalore', 'Kolkata', 'Hyderabad', 'Ahmedabad', 'Mumbai', 'Chennai'];

export default function JobFilter({ onChange, filters }: { onChange: (filters: any) => void, filters: any }) {
  // Local state for multi-selects
  const [selectedSkills, setSelectedSkills] = useState<string[]>(filters.skills || []);
  const [selectedQualifications, setSelectedQualifications] = useState<string[]>(filters.qualifications || []);

  // Handlers
  const handleInput = (key: string, value: any) => {
    onChange({ [key]: value });
  };
  const handleMultiSelect = (key: string, value: string) => {
    let arr = key === 'skills' ? [...selectedSkills] : [...selectedQualifications];
    if (arr.includes(value)) {
      arr = arr.filter((v) => v !== value);
    } else {
      arr.push(value);
    }
    if (key === 'skills') setSelectedSkills(arr);
    else setSelectedQualifications(arr);
    onChange({ [key]: arr });
  };

  return (
    <aside className="sticky top-8 w-full max-w-xs bg-gray-50 border border-gray-100 rounded-md shadow-sm p-5 font-sans">
      <h2 className="text-lg font-semibold text-gray-900 mb-6 tracking-tight">Job Search Filters</h2>
      {/* 1. Keyword Search */}
      <div className="mb-6">
        <label className="block text-xs font-medium text-gray-600 mb-2 uppercase tracking-wider">Keyword</label>
        <input
          type="text"
          className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 focus:ring-2 focus:ring-blue-100 focus:border-blue-200 outline-none text-gray-900 text-sm transition"
          placeholder="Job title, skills, or organization"
          value={filters.keyword || ''}
          onChange={e => handleInput('keyword', e.target.value)}
        />
      </div>
      <hr className="my-4 border-gray-200" />
      {/* 2. Location */}
      <div className="mb-6">
        <div className="mb-3">
          <label className="block text-xs font-medium text-gray-600 uppercase tracking-wider mb-1">Country</label>
          <select
            className="w-full rounded-md border border-gray-200 bg-gray-50 px-2 py-2 text-gray-900 text-xs"
            value={filters.country || 'India'}
            onChange={e => handleInput('country', e.target.value)}
          >
            {countries.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="mb-3">
          <label className="block text-xs font-medium text-gray-600 uppercase tracking-wider mb-1">State</label>
          <select
            className="w-full rounded-md border border-gray-200 bg-gray-50 px-2 py-2 text-gray-900 text-xs"
            value={filters.state || ''}
            onChange={e => handleInput('state', e.target.value)}
          >
            <option value="">State</option>
            {states.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 uppercase tracking-wider mb-1">City</label>
          <select
            className="w-full rounded-md border border-gray-200 bg-gray-50 px-2 py-2 text-gray-900 text-xs"
            value={filters.city || ''}
            onChange={e => handleInput('city', e.target.value)}
          >
            <option value="">City</option>
            {cities.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>
      <hr className="my-4 border-gray-200" />
      {/* 3. Category */}
      <div className="mb-6">
        <label className="block text-xs font-medium text-gray-600 mb-2 uppercase tracking-wider">Category</label>
        <select
          className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 text-sm"
          value={filters.category || ''}
          onChange={e => handleInput('category', e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
      </div>
      <hr className="my-4 border-gray-200" />
      {/* 4. Employment Type */}
      <div className="mb-6">
        <label className="block text-xs font-medium text-gray-600 mb-2 uppercase tracking-wider">Employment Type</label>
        <select
          className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 text-sm"
          value={filters.employmentType || ''}
          onChange={e => handleInput('employmentType', e.target.value)}
        >
          <option value="">All Types</option>
          {employmentTypes.map(type => <option key={type} value={type}>{type}</option>)}
        </select>
      </div>
      <hr className="my-4 border-gray-200" />
      {/* 5. Experience Required */}
      <div className="mb-6">
        <label className="block text-xs font-medium text-gray-600 mb-2 uppercase tracking-wider">Experience Required</label>
        <select
          className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 text-sm"
          value={filters.experience || ''}
          onChange={e => handleInput('experience', e.target.value)}
        >
          <option value="">Any</option>
          {experienceOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
      </div>
      <hr className="my-4 border-gray-200" />
      {/* 6. Qualifications / Skills */}
      <div className="mb-6">
        <label className="block text-xs font-medium text-gray-600 mb-2 uppercase tracking-wider">Qualifications</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {qualifications.map(q => (
            <button
              key={q}
              type="button"
              className={`px-3 py-1 rounded-2xl border text-xs font-medium transition ${selectedQualifications.includes(q) ? 'bg-blue-50 border-blue-400 text-blue-700' : 'bg-gray-50 border-gray-200 text-gray-700 hover:border-blue-200'}`}
              onClick={() => handleMultiSelect('qualifications', q)}
            >
              {q}
            </button>
          ))}
        </div>
        <label className="block text-xs font-medium text-gray-600 mb-2 uppercase tracking-wider mt-3">Skills</label>
        <div className="flex flex-wrap gap-2">
          {skills.map(s => (
            <button
              key={s}
              type="button"
              className={`px-3 py-1 rounded-2xl border text-xs font-medium transition ${selectedSkills.includes(s) ? 'bg-green-50 border-green-400 text-green-700' : 'bg-gray-50 border-gray-200 text-gray-700 hover:border-green-200'}`}
              onClick={() => handleMultiSelect('skills', s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
      <hr className="my-4 border-gray-200" />
      {/* 7. Salary Range */}
      <div className="mb-6 grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-2 uppercase tracking-wider">Min Salary (INR)</label>
          <input
            type="number"
            className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 text-sm"
            value={filters.minSalary || ''}
            onChange={e => handleInput('minSalary', e.target.value)}
            min={0}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-2 uppercase tracking-wider">Max Salary (INR)</label>
          <input
            type="number"
            className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 text-sm"
            value={filters.maxSalary || ''}
            onChange={e => handleInput('maxSalary', e.target.value)}
            min={0}
          />
        </div>
      </div>
      <hr className="my-4 border-gray-200" />
      {/* 8. Posted Date */}
      <div className="mb-6">
        <label className="block text-xs font-medium text-gray-600 mb-2 uppercase tracking-wider">Posted Date</label>
        <select
          className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 text-sm"
          value={filters.postedDate || ''}
          onChange={e => handleInput('postedDate', e.target.value)}
        >
          {postedDateOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
      </div>
      <hr className="my-4 border-gray-200" />
      {/* 9. Valid Through (Deadline) */}
      <div className="mb-6 flex items-center gap-2">
        <input
          type="checkbox"
          checked={!!filters.openOnly}
          onChange={e => handleInput('openOnly', e.target.checked)}
          className="h-4 w-4 rounded border-gray-200 text-blue-600 focus:ring-blue-200"
        />
        <label className="text-xs text-gray-700">Show only open jobs (not expired)</label>
      </div>
      <hr className="my-4 border-gray-200" />
      {/* 10. Job Status */}
      <div className="mb-2 flex items-center gap-6">
        <label className="flex items-center gap-2 text-xs text-gray-700">
          <input
            type="checkbox"
            checked={!!filters.activeOnly}
            onChange={e => handleInput('activeOnly', e.target.checked)}
            className="h-4 w-4 rounded border-gray-200 text-blue-600 focus:ring-blue-200"
          />
          Active
        </label>
        <label className="flex items-center gap-2 text-xs text-gray-700">
          <input
            type="checkbox"
            checked={!!filters.featuredOnly}
            onChange={e => handleInput('featuredOnly', e.target.checked)}
            className="h-4 w-4 rounded border-gray-200 text-yellow-500 focus:ring-yellow-200"
          />
          Featured Only
        </label>
      </div>
    </aside>
  );
} 