"use client";
import EmployerSidebar from '../EmployerSidebar';
import React, { useEffect, useState } from 'react';
import { Bell, Search as SearchIcon } from 'lucide-react';

interface Alert {
  id: string;
  applied_at: string;
  status: string;
  first_name: string;
  last_name: string;
  candidate_email: string;
  profile_image?: string;
  job_id: string;
  job_title: string;
  city: string;
  country: string;
}

export default function CandidateAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<'newest' | 'oldest'>('newest');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAlerts() {
      setLoading(true);
      const res = await fetch('/api/employer/candidate-alerts', { credentials: 'include' });
      const data = await res.json();
      setAlerts(Array.isArray(data) ? data : []);
      setLoading(false);
    }
    fetchAlerts();
  }, []);

  const filtered = alerts
    .filter(a =>
      `${a.first_name} ${a.last_name}`.toLowerCase().includes(search.toLowerCase()) ||
      a.job_title.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === 'newest') return new Date(b.applied_at).getTime() - new Date(a.applied_at).getTime();
      return new Date(a.applied_at).getTime() - new Date(b.applied_at).getTime();
    });

  return (
    <div className="min-h-screen bg-[#f6f8fb] flex flex-col md:flex-row">
      <EmployerSidebar />
      <main className="flex-1 flex flex-col p-4 md:p-8">
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Bell className="text-blue-500 w-7 h-7" /> Candidate Alerts
        </h1>
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search ..."
                className="border border-gray-200 rounded-lg px-3 py-2 w-full pl-10 bg-[#f8fafc] focus:outline-none focus:ring-2 focus:ring-blue-200"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Sort by:</span>
              <select
                className="border border-gray-200 rounded-lg px-3 py-2 bg-[#f8fafc] focus:outline-none focus:ring-2 focus:ring-blue-200"
                value={sort}
                onChange={e => setSort(e.target.value as 'newest' | 'oldest')}
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>
          </div>
          {loading ? (
            <div className="text-center text-gray-400 py-12">Loading...</div>
          ) : filtered.length === 0 ? (
            <div className="text-center text-gray-400 py-12">No candidate alert found.</div>
          ) : (
            <ul className="divide-y">
              {filtered.map(alert => (
                <li key={alert.id} className="py-4 flex items-center gap-4 bg-[#f8fafc] rounded-lg border border-gray-100 px-4 mb-2 shadow-sm">
                  <img
                    src={alert.profile_image || '/images/download.jpeg'}
                    alt={alert.first_name}
                    className="w-12 h-12 rounded-full object-cover border"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-700">{alert.first_name} {alert.last_name}</div>
                    <div className="text-sm text-gray-500">{alert.candidate_email}</div>
                    <div className="text-sm text-gray-600 mt-1">
                      Applied for <span className="font-medium">{alert.job_title}</span> in {alert.city}, {alert.country}
                    </div>
                  </div>
                  <div className="text-xs text-gray-400 whitespace-nowrap">
                    {new Date(alert.applied_at).toLocaleString()}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
} 