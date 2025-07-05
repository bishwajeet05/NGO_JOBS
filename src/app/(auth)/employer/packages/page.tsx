"use client";
import EmployerSidebar from '../EmployerSidebar';
import React, { useEffect, useState } from 'react';
import { Package as PackageIcon } from 'lucide-react';

interface PackageInfo {
  urgent: boolean;
  featured: boolean;
  posted: number;
  limitPosts: number;
  duration: number;
}

interface Package {
  id: string;
  name: string;
  type: string;
  info: PackageInfo;
  status: string;
}

export default function Packages() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPackages() {
      setLoading(true);
      const res = await fetch('/api/employer/packages', { credentials: 'include' });
      const data = await res.json();
      setPackages(Array.isArray(data) ? data : []);
      setLoading(false);
    }
    fetchPackages();
  }, []);

  return (
    <div className="min-h-screen bg-[#f6f8fb] flex flex-col md:flex-row">
      <EmployerSidebar />
      <main className="flex-1 flex flex-col p-4 md:p-8">
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <PackageIcon className="text-blue-500 w-7 h-7" /> My Packages
        </h1>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          {loading ? (
            <div className="text-center text-gray-400 py-12">Loading...</div>
          ) : packages.length === 0 ? (
            <div className="text-center text-gray-400 py-12">No packages found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-[#f8fafc] text-gray-700 border-b border-gray-100">
                    <th className="px-4 py-3 font-semibold">#</th>
                    <th className="px-4 py-3 font-semibold">ID</th>
                    <th className="px-4 py-3 font-semibold">Package</th>
                    <th className="px-4 py-3 font-semibold">Package Type</th>
                    <th className="px-4 py-3 font-semibold">Package Info</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {packages.map((pkg, idx) => (
                    <tr key={pkg.id} className={
                      `transition ${idx % 2 === 0 ? 'bg-white' : 'bg-[#f8fafc]'} hover:bg-blue-50/60`}
                    >
                      <td className="px-4 py-4 text-gray-500">{idx + 1}</td>
                      <td className="px-4 py-4 text-blue-700 font-medium">{pkg.id}</td>
                      <td className="px-4 py-4">
                        <span className="text-blue-700 underline cursor-pointer hover:text-blue-900 transition">{pkg.name}</span>
                      </td>
                      <td className="px-4 py-4">{pkg.type}</td>
                      <td className="px-4 py-4 whitespace-pre-line text-gray-700">
                        Urgent: {pkg.info.urgent ? 'Yes' : 'No'}
                        {"\n"}Featured: {pkg.info.featured ? 'Yes' : 'No'}
                        {"\n"}Posted: {pkg.info.posted}
                        {"\n"}Limit Posts: {pkg.info.limitPosts}
                        {"\n"}Listing Duration: {pkg.info.duration}
                      </td>
                      <td className="px-4 py-4">
                        <span className={pkg.status === 'Active' ? 'text-green-500 font-semibold' : 'text-gray-400'}>{pkg.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 