"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  return { day, month, year };
}

export default function GrantsPage() {
  const [dateFilter, setDateFilter] = useState("");
  const [keyword, setKeyword] = useState("");
  const [grants, setGrants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/grants")
      .then(res => res.json())
      .then(data => {
        setGrants(data);
        setLoading(false);
      });
  }, []);

  const filteredGrants = grants.filter((grant: any) => {
    const matchesDate = dateFilter ? grant.deadline === dateFilter : true;
    const matchesKeyword = keyword
      ? grant.title.toLowerCase().includes(keyword.toLowerCase()) ||
        grant.description.toLowerCase().includes(keyword.toLowerCase()) ||
        grant.organization.toLowerCase().includes(keyword.toLowerCase())
      : true;
    return matchesDate && matchesKeyword;
  });

  return (
    <main className="max-w-5xl mx-auto px-4 py-10 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center text-[#1a2a3a] mb-2 tracking-tight">Grants</h1>
      <div className="text-center text-gray-500 mb-8">Home &gt; Grants</div>
      <form
        className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="border border-gray-200 rounded-lg px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white min-w-[180px]"
          placeholder="Date of Grant"
        />
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="border border-gray-200 rounded-lg px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white min-w-[180px]"
          placeholder="Keyword"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-2 rounded-lg text-base shadow transition-colors"
        >
          SEARCH
        </button>
      </form>
      <div className="space-y-8">
        {filteredGrants.map((grant: any) => {
          const { day, month, year } = formatDate(grant.deadline);
          return (
            <div
              key={grant.id}
              className="flex flex-col md:flex-row gap-6 items-center bg-white rounded-2xl shadow border border-gray-100 p-4 md:p-6"
            >
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                  <h2 className="text-xl font-bold text-[#1a2a3a] leading-tight mr-2">{grant.title}</h2>
                  <span className="ml-auto inline-block bg-blue-50 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full border border-blue-200">{grant.type}</span>
                </div>
                <div className="text-gray-700 text-base font-medium mb-2 line-clamp-2">{grant.description}</div>
                <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-2">
                  <span className="flex items-center gap-1"><svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg> {grant.sector}</span>
                  <span className="flex items-center gap-1"><svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 01-8 0" /><circle cx="12" cy="7" r="4" /><path d="M5.5 21h13a2.5 2.5 0 002.5-2.5V7A2.5 2.5 0 0018.5 4.5h-13A2.5 2.5 0 003 7v11.5A2.5 2.5 0 005.5 21z" /></svg> {grant.organization}</span>
                </div>
                <Link href={`/grants/${grant.id}`} className="text-blue-600 font-semibold hover:underline text-sm">View Details &rarr;</Link>
              </div>
            </div>
          );
        })}
        {filteredGrants.length === 0 && (
          <div className="text-center text-gray-400 py-12 text-lg">No grants found for your search.</div>
        )}
      </div>
    </main>
  );
} 