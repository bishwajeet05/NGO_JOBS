"use client";
import { useEffect, useState } from "react";
import EmployerSidebar from '../EmployerSidebar';
import { Search as SearchIcon, Eye, Mail, X, ChevronDown } from "lucide-react";

function formatRate(value: any, unit: any) {
  if (!value) return "-";
  if (unit === "hour") return `$${value} / hour`;
  if (unit === "day") return `$${value} / day`;
  if (unit === "month") return `$${value} / month`;
  if (unit === "year") return `$${value} / year`;
  return `$${value}`;
}

export default function ShortlistCandidates() {
  const [candidates, setCandidates] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Newest");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchShortlist();
  }, []);

  async function fetchShortlist() {
    setLoading(true);
    try {
      const res = await fetch("/api/shortlist", { credentials: "include" });
      const data = await res.json();
      if (Array.isArray(data)) {
        setCandidates(data);
      } else {
        setCandidates([]);
        // Optionally show an error message here
      }
    } catch (e) {
      setCandidates([]);
      // Optionally show an error message here
    }
    setLoading(false);
  }

  async function removeShortlist(id: string) {
    await fetch("/api/shortlist", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
      credentials: "include"
    });
    setCandidates(candidates => candidates.filter(c => c.id !== id));
  }

  // Filter and sort
  let filtered = candidates.filter(c =>
    c.candidate_name?.toLowerCase().includes(search.toLowerCase()) ||
    c.candidate_email?.toLowerCase().includes(search.toLowerCase()) ||
    c.job_title?.toLowerCase().includes(search.toLowerCase())
  );
  if (sort === "Newest") filtered = filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  else filtered = filtered.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());

  return (
    <div className="min-h-screen bg-[#f6f8fb] flex flex-col md:flex-row">
      <EmployerSidebar />
      <main className="flex-1 flex flex-col p-4 md:p-8">
        <h1 className="text-2xl font-bold mb-6">Candidate Shortlist</h1>
        <div className="bg-white rounded-xl shadow-md p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
            <div className="relative w-full md:w-72">
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
              <button
                className="border border-gray-200 rounded-lg px-3 py-2 flex items-center gap-2 bg-[#f8fafc] focus:outline-none focus:ring-2 focus:ring-blue-200"
                onClick={() => setSort(sort === "Newest" ? "Oldest" : "Newest")}
              >
                {sort} <ChevronDown size={16} />
              </button>
            </div>
          </div>
          {loading ? (
            <div className="text-center text-gray-400 py-12">Loading...</div>
          ) : filtered.length === 0 ? (
            <div className="text-center text-gray-400 py-12">No shortlisted candidates found.</div>
          ) : (
            <div className="space-y-6">
              {filtered.map(candidate => (
                <div key={candidate.id} className="bg-white border border-gray-100 rounded-xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-sm">
                  <div className="flex items-center gap-4">
                    <img
                      src={candidate.profile_image || "/images/wa.jpg"}
                      alt={candidate.candidate_name || "Candidate"}
                      className="w-16 h-16 rounded-full object-cover border"
                    />
                    <div>
                      <div className="font-semibold text-lg text-gray-800 flex items-center gap-2">
                        {candidate.candidate_name || "Candidate"}
                        <span className="text-xs text-blue-500 font-medium underline cursor-pointer">Application</span>
                      </div>
                      <div className="text-sm text-gray-500">{candidate.job_title || "-"}</div>
                      <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                        <span>{candidate.city || "-"}</span>
                        <span>•</span>
                        <span>{candidate.country || "-"}</span>
                        <span>•</span>
                        <span>{formatRate(candidate.salary_value, candidate.salary_unit_text)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-4 md:mt-0">
                    <button className="p-2 rounded-lg hover:bg-blue-50 transition-colors" title="View Profile">
                      <Eye size={18} className="text-blue-500" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-blue-50 transition-colors" title="Send Message">
                      <Mail size={18} className="text-blue-500" />
                    </button>
                    <button
                      className="p-2 rounded-lg hover:bg-red-50 transition-colors"
                      title="Remove from Shortlist"
                      onClick={() => removeShortlist(candidate.id)}
                    >
                      <X size={18} className="text-red-400" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 