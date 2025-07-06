"use client";

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import DashboardSidebar from '../DashboardSidebar';
import { FileText } from 'lucide-react';

export default function AllJobsPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch('/api/jobs');
        const data = await res.json();
        setJobs(data);
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="min-h-screen bg-[#f6f8fb] flex flex-col md:flex-row">
      <DashboardSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <main className="flex-1 flex flex-col p-1 md:p-2 bg-gradient-to-br from-[#f7faff] via-[#f5f7fb] to-[#f0f4fa] min-h-screen">
        <section className="bg-white/90 rounded-2xl border border-blue-100 shadow-lg shadow-blue-100/30 p-4 md:p-6 overflow-auto w-full transition-all">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-extrabold border-b border-blue-50 pb-2 text-blue-900 tracking-tight">All Jobs</h2>
            <button onClick={() => router.push('/super-admin/add-jobs')} className="bg-blue-500 text-white px-4 py-2 rounded-lg font-bold shadow hover:bg-blue-600 transition-colors">Back to Add Jobs</button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-base bg-white rounded-xl overflow-hidden shadow-sm">
              <thead className="sticky top-0 bg-gradient-to-r from-blue-50/80 to-indigo-50/60 z-10">
                <tr className="text-blue-800 border-b border-blue-100">
                  <th className="px-4 py-3 text-left font-semibold">Title</th>
                  <th className="px-4 py-3 text-left font-semibold">Organization</th>
                  <th className="px-4 py-3 text-left font-semibold">Category</th>
                  <th className="px-4 py-3 text-left font-semibold">Created & Expired</th>
                </tr>
              </thead>
              <tbody>
                {jobs.length === 0 ? (
                  <tr><td colSpan={4} className="text-center text-blue-300 py-6 text-base">No jobs available.</td></tr>
                ) : jobs.map((job) => (
                  <tr key={job.id} className="bg-white hover:bg-blue-50/60 border-b border-blue-50 transition-all">
                    <td className="px-4 py-3 font-semibold align-top text-base">
                      <div className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-blue-500" />
                        <span>{job.title}</span>
                      </div>
                      <div className="text-base text-blue-400 flex items-center gap-1 mt-1">
                        <span className="inline-block"><svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="#90cdf4"/></svg></span>
                        <span>{job.city || "-"}, {job.country || "-"}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 align-top text-base">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-base font-semibold shadow-sm">{job.organization}</span>
                    </td>
                    <td className="px-4 py-3 align-top text-base">
                      <span className="bg-green-50 text-green-700 px-2 py-1 rounded text-base font-semibold shadow-sm">{job.role_category}</span>
                    </td>
                    <td className="px-4 py-3 align-top text-base">
                      <div className="text-blue-700 font-semibold">{job.date_posted ? new Date(job.date_posted).toLocaleDateString() : '-'}</div>
                      <div className="text-blue-400 text-base">Expires: {job.valid_through ? new Date(job.valid_through).toLocaleString() : '-'}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
} 