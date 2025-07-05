"use client";
import EmployerSidebar from '../EmployerSidebar';
import { useEffect, useState } from 'react';
import { FileText, User, CheckCircle, XCircle, Clock, ChevronDown, Search as SearchIcon, Plus, Eye, Trash2 } from "lucide-react";

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Newest");
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchApplications() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/employer/applications', { credentials: 'include' });
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setApplications(data);
      } catch (e: any) {
        setError(e.message || 'Failed to load applications');
      }
      setLoading(false);
    }
    fetchApplications();
  }, []);

  // Group applications by job
  const jobsMap: { [jobId: string]: { jobTitle: string, city: string, country: string, applicants: any[] } } = {};
  for (const app of applications) {
    if (!jobsMap[app.job_id]) {
      jobsMap[app.job_id] = {
        jobTitle: app.job_title,
        city: app.city,
        country: app.country,
        applicants: []
      };
    }
    jobsMap[app.job_id].applicants.push(app);
  }
  const jobsList = Object.values(jobsMap);

  // Filter and sort
  let filteredJobs = jobsList.filter(job =>
    !filter || job.jobTitle === filter
  );
  if (search) {
    filteredJobs = filteredJobs.map(job => ({
      ...job,
      applicants: job.applicants.filter((a: any) =>
        a.candidate_name?.toLowerCase().includes(search.toLowerCase()) ||
        a.candidate_email?.toLowerCase().includes(search.toLowerCase())
      )
    })).filter(job => job.applicants.length > 0);
  }
  if (sort === "Newest") {
    filteredJobs = filteredJobs.sort((a, b) => {
      const aDate = a.applicants[0]?.created_at ? new Date(a.applicants[0].created_at).getTime() : 0;
      const bDate = b.applicants[0]?.created_at ? new Date(b.applicants[0].created_at).getTime() : 0;
      return bDate - aDate;
    });
  } else {
    filteredJobs = filteredJobs.sort((a, b) => {
      const aDate = a.applicants[0]?.created_at ? new Date(a.applicants[0].created_at).getTime() : 0;
      const bDate = b.applicants[0]?.created_at ? new Date(b.applicants[0].created_at).getTime() : 0;
      return aDate - bDate;
    });
  }

  return (
    <div className="min-h-screen bg-[#f6f8fb] flex flex-col md:flex-row">
      <EmployerSidebar />
      <main className="flex-1 flex flex-col p-4 md:p-8">
        <h1 className="text-2xl font-bold mb-6">All Applicants</h1>
        <div className="bg-white rounded-xl shadow-md p-6">
          {loading ? (
            <div className="text-center text-gray-400 py-12">Loading...</div>
          ) : error ? (
            <div className="text-center text-red-500 py-12">{error}</div>
          ) : (
            <>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
                <div className="flex gap-2 w-full md:w-auto">
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
                  <select
                    className="border border-gray-200 rounded-lg px-3 py-2 bg-[#f8fafc] focus:outline-none focus:ring-2 focus:ring-blue-200"
                    value={filter}
                    onChange={e => setFilter(e.target.value)}
                  >
                    <option value="">Filter by job</option>
                    {jobsList.map((job, idx) => (
                      <option key={idx} value={job.jobTitle}>{job.jobTitle}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">Sort by:</span>
                  <button
                    className="border border-gray-200 rounded-lg px-3 py-2 flex items-center gap-2 bg-[#f8fafc] focus:outline-none focus:ring-2 focus:ring-blue-200"
                    onClick={() => setSort(sort === "Newest" ? "Oldest" : "Newest")}
                  >
                    {sort} <ChevronDown size={16} />
                  </button>
                </div>
              </div>
              {filteredJobs.length === 0 ? (
                <div className="text-center text-gray-400 py-12">No applications found.</div>
              ) : (
                filteredJobs.map((job, idx) => (
                  <div key={idx} className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-semibold text-lg flex items-center gap-2">
                        <FileText className="w-5 h-5 text-blue-500" />
                        {job.jobTitle}
                      </div>
                      <div className="flex gap-2 text-xs">
                        <span className="bg-blue-100 text-blue-700 rounded px-2 py-1">Total: {job.applicants.length}</span>
                        <span className="bg-green-100 text-green-700 rounded px-2 py-1">Approved: {job.applicants.filter(a => a.status === 'Approved').length}</span>
                        <span className="bg-red-100 text-red-700 rounded px-2 py-1">Rejected(s): {job.applicants.filter(a => a.status === 'Rejected').length}</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      {job.applicants.map((applicant: any, i: number) => (
                        <div key={i} className="bg-[#f8fafc] rounded-lg border border-gray-100 p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-sm">
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                              <User className="w-5 h-5 text-blue-400" />
                              <span className="font-semibold text-gray-700">{applicant.candidate_name}</span>
                              {applicant.status === "Approved" ? (
                                <span className="bg-green-100 text-green-700 rounded px-2 py-1 text-xs font-semibold">Approved</span>
                              ) : applicant.status === "Rejected" ? (
                                <span className="bg-red-100 text-red-700 rounded px-2 py-1 text-xs font-semibold">Rejected</span>
                              ) : (
                                <span className="bg-yellow-100 text-yellow-700 rounded px-2 py-1 text-xs font-semibold">Pending</span>
                              )}
                            </div>
                            <div className="text-xs text-gray-500">
                              <span className="font-semibold">{job.jobTitle}</span>
                            </div>
                            <div className="text-xs text-gray-400">Applied date: {new Date(applicant.created_at).toLocaleDateString()}</div>
                          </div>
                          <div className="flex gap-2 items-center">
                            <button className="p-2 rounded-lg hover:bg-blue-100/60 transition-colors" title="Shortlist"><Plus size={16} className="text-blue-500" /></button>
                            <button className="p-2 rounded-lg hover:bg-blue-100/60 transition-colors" title="View"><Eye size={16} className="text-gray-500" /></button>
                            <button className="p-2 rounded-lg hover:bg-green-100/60 transition-colors" title="Approve"><CheckCircle size={16} className="text-green-500" /></button>
                            <button className="p-2 rounded-lg hover:bg-red-100/60 transition-colors" title="Reject"><XCircle size={16} className="text-red-400" /></button>
                            <button className="p-2 rounded-lg hover:bg-red-50 transition-colors" title="Delete"><Trash2 size={16} className="text-red-400" /></button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
              <div className="flex justify-center mt-8">
                <button className="px-6 py-2 rounded-lg bg-[#f8fafc] border border-gray-200 text-gray-600 font-semibold hover:bg-blue-50 transition-colors">Load More</button>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
} 