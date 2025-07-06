'use client';
import Link from "next/link";
import { use, useEffect, useState } from 'react';
import { notFound } from "next/navigation";

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  return { day, month, year };
}

export default function GrantDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [grant, setGrant] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/grants`)
      .then(res => res.json())
      .then(data => {
        const found = data.find((g: any) => g.id.toString() === id);
        setGrant(found);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center py-12">Loading...</div>;
  if (!grant) {
    notFound();
    return null;
  }
  const { day, month, year } = formatDate(grant.date);
  return (
    <main className="max-w-3xl mx-auto px-4 py-10 min-h-screen">
      <div className="flex flex-col md:flex-row w-full max-w-3xl gap-10">
        {/* Date and meta info */}
        <div className="flex flex-col items-center md:items-start min-w-[180px] md:w-1/4 mb-6 md:mb-0">
          <div className="text-green-500 text-5xl font-extrabold leading-none mb-2">{day}</div>
          <div className="text-gray-500 text-base mb-1">{month}, {year}</div>
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
            <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 10c-4.418 0-8-1.79-8-4V7a2 2 0 012-2h12a2 2 0 012 2v7c0 2.21-3.582 4-8 4z" /></svg>
            {grant.amount}
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 01-8 0" /><circle cx="12" cy="7" r="4" /><path d="M5.5 21h13a2.5 2.5 0 002.5-2.5V7A2.5 2.5 0 0018.5 4.5h-13A2.5 2.5 0 003 7v11.5A2.5 2.5 0 005.5 21z" /></svg>
            {grant.organization}
          </div>
        </div>
        {/* Title and description */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-[#1a2a3a] mb-4 leading-tight">{grant.title}</h1>
          <span className="inline-block bg-blue-50 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full border border-blue-200 mb-4">{grant.type}</span>
          <div className="prose prose-lg text-gray-800 mb-10 whitespace-pre-line" style={{lineHeight: '1.8'}}>{grant.description}</div>
          <div className="flex items-center gap-2 mt-8">
            <span className="text-gray-500 font-semibold mr-2">Share:</span>
            <Link href="#" className="hover:opacity-80"><img src="/images/social-facebook.svg" alt="Facebook" className="w-7 h-7" /></Link>
            <Link href="#" className="hover:opacity-80"><img src="/images/social-twitter.svg" alt="Twitter" className="w-7 h-7" /></Link>
            <Link href="#" className="hover:opacity-80"><img src="/images/social-google.svg" alt="Google" className="w-7 h-7" /></Link>
            <Link href="#" className="hover:opacity-80"><img src="/images/social-pinterest.svg" alt="Pinterest" className="w-7 h-7" /></Link>
          </div>
        </div>
      </div>
    </main>
  );
} 