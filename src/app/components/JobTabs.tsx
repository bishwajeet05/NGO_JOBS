"use client";
import React from 'react';

const JOBS = [
  {
    title: 'Program Manager - Rural Development',
    org: 'Akshaya Patra Foundation',
    location: 'Bangalore, Karnataka',
    deadline: '15 Jul 2024',
    description: 'Lead rural development initiatives focusing on sustainable agriculture and community empowerment programs across Karnataka state.',
    tags: ['Rural Development', 'Program Management', 'Agriculture'],
  },
  {
    title: 'Education Coordinator',
    org: 'Teach for India',
    location: 'Mumbai, Maharashtra',
    deadline: '20 Jul 2024',
    description: 'Coordinate educational programs and teacher training initiatives in underserved communities across Mumbai metropolitan area.',
    tags: ['Education', 'Training', 'Community Work'],
  },
  {
    title: 'Health Program Officer',
    org: 'Smile Foundation',
    location: 'Delhi, NCR',
    deadline: '25 Jul 2024',
    description: 'Implement healthcare programs focusing on maternal and child health in urban slum communities.',
    tags: ['Healthcare', 'Maternal Health', 'Urban Development'],
  },
];

export default function JobTabs() {
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
          {JOBS.map((job, idx) => (
          <div
            key={idx}
              className="bg-white rounded-xl shadow p-4 sm:p-6 flex flex-col justify-between min-h-[260px] hover:shadow-md transition-shadow"
          >
            <div>
                <h3 className="font-semibold text-base sm:text-lg mb-2 text-[#1a2a3a] line-clamp-2">{job.title}</h3>
                <div className="text-sm text-gray-700 font-medium mb-2">{job.org}</div>
                <div className="flex items-center text-xs sm:text-sm text-gray-500 mb-2">
                <span className="mr-1.5">📍</span>{job.location}
              </div>
                <div className="flex items-center text-xs sm:text-sm text-gray-500 mb-3">
                <span className="mr-1.5">🗓️</span>Deadline: {job.deadline}
              </div>
                <div className="text-sm text-gray-700 mb-4 line-clamp-2">{job.description}</div>
                <div className="flex flex-wrap gap-2 mb-4">
                {job.tags.map((tag) => (
                  <span
                    key={tag}
                      className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
              <button className="w-full bg-[#2B7FFF] text-white px-4 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#2B7FFF]/90 transition-colors">
              Apply Now
            </button>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
} 