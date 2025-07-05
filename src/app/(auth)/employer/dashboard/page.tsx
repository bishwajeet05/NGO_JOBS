"use client";
import React, { useEffect, useState } from 'react';
import EmployerSidebar from '../EmployerSidebar';

export default function EmployerDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStats() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/employer/dashboard', { credentials: 'include' });
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setStats(data);
      } catch (e: any) {
        setError(e.message || 'Failed to load dashboard');
      }
      setLoading(false);
    }
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-[#f6f8fb] flex">
      <EmployerSidebar />
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-bold mb-6">Applications statistics</h2>
        {loading ? (
          <div className="text-center text-gray-400 py-12">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-12">{error}</div>
        ) : stats && (
          <>
            {/* Stat cards */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
              <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col items-center border border-gray-100">
                <span className="text-2xl font-bold text-blue-600">{stats.jobCount}</span>
                <span className="text-xs text-gray-500 mt-1">Posted Jobs</span>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col items-center border border-gray-100">
                <span className="text-2xl font-bold text-pink-600">{stats.applicationCount}</span>
                <span className="text-xs text-gray-500 mt-1">Applications</span>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col items-center border border-gray-100">
                <span className="text-2xl font-bold text-yellow-600">0</span>
                <span className="text-xs text-gray-500 mt-1">Review</span>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col items-center border border-gray-100">
                <span className="text-2xl font-bold text-green-600">{stats.shortlistCount}</span>
                <span className="text-xs text-gray-500 mt-1">Shortlisted</span>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col items-center border border-gray-100">
                <span className="text-2xl font-bold text-gray-600">0</span>
                <span className="text-xs text-gray-500 mt-1">Interview</span>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col items-center border border-gray-100">
                <span className="text-2xl font-bold text-gray-600">0</span>
                <span className="text-xs text-gray-500 mt-1">Hired</span>
              </div>
            </div>
            {/* Chart and notifications */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm p-8 col-span-2 min-h-[300px] flex flex-col border border-gray-100">
                <span className="font-semibold mb-2">Page Views</span>
                <div className="flex-1 flex items-center justify-center text-gray-400">[Chart Placeholder]</div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-8 min-h-[300px] border border-gray-100">
                <span className="font-semibold mb-2 block">Notifications</span>
                <ul className="text-sm text-gray-600 space-y-2 mt-2">
                  {stats.notifications && stats.notifications.map((n: string, i: number) => (
                    <li key={i}>{n}</li>
                  ))}
                </ul>
              </div>
            </div>
            {/* Recent Applicants */}
            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
              <span className="font-semibold mb-4 block">Recent Applicants</span>
              <ul className="space-y-4">
                {stats.recentApplicants && stats.recentApplicants.length === 0 && (
                  <li className="text-gray-400">No recent applicants.</li>
                )}
                {stats.recentApplicants && stats.recentApplicants.map((a: any, i: number) => (
                  <li key={i} className="flex items-center justify-between border-b border-gray-100 pb-2">
                    <div>
                      <span className="font-bold">{a.name}</span> <span className={`bg-${a.status === 'Approved' ? 'green' : a.status === 'Pending' ? 'blue' : 'red'}-100 text-${a.status === 'Approved' ? 'green' : a.status === 'Pending' ? 'blue' : 'red'}-700 text-xs px-2 py-1 rounded ml-2`}>{a.status}</span>
                      <div className="text-xs text-gray-500">{a.jobTitle} 2 Applied date: {new Date(a.appliedDate).toLocaleDateString()}</div>
                    </div>
                    <div className="flex gap-2">
                      <button className="text-blue-500 hover:underline text-xs">View</button>
                      <button className="text-gray-400 hover:text-red-500 text-xs">Delete</button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </main>
    </div>
  );
} 