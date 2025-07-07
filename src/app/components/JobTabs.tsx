"use client";
import React, { useEffect, useState } from 'react';
import { BriefcaseIcon, CalendarIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { FaMapMarkerAlt } from 'react-icons/fa';

export default function JobTabs() {
  const [jobs, setJobs] = useState<any[]>([]);
  useEffect(() => {
    fetch('/api/jobs?featured=true')
      .then(res => res.json())
      .then(data => setJobs(Array.isArray(data) ? data.slice(0, 6) : []));
  }, []);

  return (
    <div className="w-full py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <div className="text-center sm:text-left mb-4 sm:mb-0">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-[#1a2a3a] leading-snug">
              Featured Jobs
            </h2>
            <p className="mt-2 text-sm sm:text-base text-gray-600">
              Explore the latest featured NGO jobs with urgent hiring across India's development sector.
            </p>
          </div>
          <a 
            href="/jobs" 
            className="inline-flex items-center gap-2 text-[#2B7FFF] font-semibold hover:underline text-sm sm:text-base whitespace-nowrap"
          >
            View All Jobs
            <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
      </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {jobs.map((job, idx) => (
            <div
              key={job.id || idx}
              className="bg-white rounded-xl shadow p-4 sm:p-6 flex flex-col justify-between min-h-[260px] hover:shadow-md transition-shadow"
            >
              <div>
                <h3 className="font-bold text-lg sm:text-xl mb-2 text-[#1a2a3a] line-clamp-2">{job.title}</h3>
                <div className="text-sm text-gray-700 font-medium mb-1 flex items-center">
                  <FaMapMarkerAlt className="w-4 h-4 mr-2 text-gray-400" />
                  {job.organization}
                </div>
                <div className="flex items-center text-sm text-gray-500 mb-1">
                  <FaMapMarkerAlt className="w-4 h-4 mr-2 text-gray-400" />
                  {job.city}{job.state ? `, ${job.state}` : ''}{job.country ? `, ${job.country}` : ''}
                </div>
                <div className="flex items-center text-gray-700 text-base font-medium mb-1">
                  <CalendarIcon className="h-4 w-4 mr-1 text-gray-500" />
                  <span>Valid Through: <b>{new Date(job.valid_through).toLocaleDateString()}</b></span>
                </div>
                <div className="flex items-start gap-2 text-gray-700 mt-1 mb-2">
                  <span className="line-clamp-2">{job.description}</span>
                </div>
                <div className="flex flex-row flex-wrap items-center gap-2 mb-2 w-full">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    <BriefcaseIcon className="h-4 w-4 mr-1 text-blue-500" />
                    {job.employment_type}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                    <CalendarIcon className="h-4 w-4 mr-1 text-purple-500" />
                    {job.experience_min}+ yrs
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    <CurrencyDollarIcon className="h-4 w-4 mr-1 text-green-500" />
                    ₹{parseInt(job.salary_value).toLocaleString()} / {job.salary_unit_text?.toLowerCase?.()}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700">
                    <CalendarIcon className="h-4 w-4 mr-1 text-gray-500" />
                    Posted {new Date(job.date_posted).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <a href={`/jobs/${job.slug || job.id}`} className="w-full mt-2">
                <button className="w-full bg-[#2B7FFF] text-white px-4 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#2B7FFF]/90 transition-colors">
                  View Details
                </button>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 