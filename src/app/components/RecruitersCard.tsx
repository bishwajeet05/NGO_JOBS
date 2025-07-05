"use client";
import React from 'react';

export default function RecruitersCard() {
  return (
    <div className="w-full bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl shadow p-4 flex items-center gap-4 my-4">
      <div className="flex-shrink-0">
        <img
          src="/images/download.jpeg"
          alt="Recruiter"
          className="w-12 h-12 rounded-full border-2 border-blue-200 object-cover"
        />
      </div>
      <div className="flex-1">
        <div className="font-semibold text-[#1d1d1f] text-base mb-1">Recruiters are searching</div>
        <div className="text-sm text-[#6e6e73] mb-2">Get noticed by top NGOs. Update your profile and let recruiters find you!</div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition">Update Profile</button>
      </div>
    </div>
  );
} 