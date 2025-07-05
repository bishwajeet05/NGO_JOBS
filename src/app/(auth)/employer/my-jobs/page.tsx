"use client";
import { useEffect, useState } from "react";
import EmployerSidebar from '../EmployerSidebar';
import { FileText, Edit, Trash2, Lock, ChevronDown } from "lucide-react";
import { useRouter } from 'next/navigation';

export default function MyJobs() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Newest");
  const [applicantCounts, setApplicantCounts] = useState<{ [jobId: string]: number }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const userRes = await fetch('/api/auth/me', { credentials: 'include' });
        const userData = await userRes.json();
        setUser(userData);
        const jobsRes = await fetch('/api/jobs');
        const jobsData = await jobsRes.json();
        setJobs(jobsData.filter((job: any) => job.user_id === userData.id));
        const countsRes = await fetch('/api/employer/job-applicant-counts', { credentials: 'include' });
        const countsData = await countsRes.json();
        setApplicantCounts(countsData);
      } catch (err: any) {
        setError(err.message || 'Failed to load jobs');
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  // Filtered and sorted jobs
  const filteredJobs = jobs
    .filter(job => job.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === "Newest") {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      } else {
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      }
    });

  return (
    <div className="min-h-screen bg-[#f6f8fb] flex flex-col md:flex-row">
      <EmployerSidebar />
      <main className="flex-1 flex flex-col p-4 md:p-8">
        <h1 className="text-2xl font-bold mb-6">Manage Jobs</h1>
        <div className="bg-white rounded-xl shadow-md p-6">
          {loading ? (
            <div className="text-center text-gray-400 py-12">Loading...</div>
          ) : error ? (
            <div className="text-center text-red-500 py-12">{error}</div>
          ) : (
            <>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
                <input
                  type="text"
                  placeholder="Search ..."
                  className="border rounded-md px-3 py-2 w-full md:w-64"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">Sort by:</span>
                  <button
                    className="border rounded-md px-3 py-2 flex items-center gap-2"
                    onClick={() => setSort(sort === "Newest" ? "Oldest" : "Newest")}
                  >
                    {sort} <ChevronDown size={16} />
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm bg-white rounded-xl overflow-hidden shadow-sm">
                  <thead>
                    <tr className="bg-[#f8fafc] text-gray-500 border-b border-gray-100">
                      <th className="px-6 py-3 text-left font-semibold">Title</th>
                      <th className="px-6 py-3 text-left font-semibold">Applicants</th>
                      <th className="px-6 py-3 text-left font-semibold">Created & Expired</th>
                      <th className="px-6 py-3 text-left font-semibold">Status</th>
                      <th className="px-6 py-3 text-left font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredJobs.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="text-center py-10 text-gray-400 bg-white">No jobs found.</td>
                      </tr>
                    ) : (
                      filteredJobs.map(job => (
                        <tr key={job.id} className="transition-colors duration-150 bg-white hover:bg-blue-50/60 border-b border-gray-100 last:border-b-0">
                          <td className="px-6 py-4 font-semibold align-top">
                            <div className="flex items-center gap-2">
                              <FileText className="w-5 h-5 text-blue-500" />
                              <span>{job.title}</span>
                            </div>
                            <div className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                              <span className="inline-block"><svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="#bbb"/></svg></span>
                              <span>{job.city || "-"}, {job.country || "-"}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-blue-600 underline cursor-pointer align-top">{applicantCounts[job.id] ?? 0} Applicant(s)</td>
                          <td className="px-6 py-4 align-top">
                            <div className="text-xs text-gray-500">
                              <span className="block">Created: {job.date_posted ? new Date(job.date_posted).toLocaleDateString() : '-'}</span>
                              <span className="block">Expiry date: {job.valid_through ? new Date(job.valid_through).toLocaleDateString() : '-'}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 align-top">
                            <span className="text-green-500 font-semibold bg-green-50 rounded px-2 py-1 text-xs">Published</span>
                          </td>
                          <td className="px-6 py-4 flex gap-2 align-top">
                            <button className="p-2 rounded-lg hover:bg-blue-100/60 transition-colors" title="Lock"><Lock size={16} className="text-gray-400" /></button>
                            <button className="p-2 rounded-lg hover:bg-blue-100/60 transition-colors" title="Edit"><Edit size={16} className="text-blue-500" /></button>
                            <button className="p-2 rounded-lg hover:bg-red-50 transition-colors" title="Delete"><Trash2 size={16} className="text-red-400" /></button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
} 