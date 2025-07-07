'use client';
import Link from "next/link";
import { use, useEffect, useState } from 'react';
import { notFound } from "next/navigation";
import AddToCalendarButton from "@/app/components/AddToCalendarClient";

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
  let day = '', month = '', year = '';
  if (grant.date) {
    const d = formatDate(grant.date);
    day = d.day?.toString() || '';
    month = d.month?.toString() || '';
    year = d.year?.toString() || '';
  }
  return (
    <main className="max-w-3xl mx-auto px-4 py-10 min-h-screen">
      <div className="flex flex-col md:flex-row w-full max-w-3xl gap-10">
        {/* Date and logo */}
        <div className="flex flex-col items-center md:items-start min-w-[180px] md:w-1/4 mb-6 md:mb-0">
          {day && <div className="text-green-500 text-5xl font-extrabold leading-none mb-2">{day}</div>}
          {month && year && <div className="text-gray-500 text-base mb-1">{month}, {year}</div>}
          {/* Logo placeholder */}
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-2 border border-gray-200">
            <img src={grant.logo || '/images/ngo_job_board_india.jpg'} alt="Logo" className="w-10 h-10 object-contain" />
          </div>
        </div>
        {/* Title and description */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-[#1a2a3a] mb-2 leading-tight">{grant.title || 'Grant'}</h1>
          {/* Amount and organization below title */}
          {(grant.amount || grant.organization) && (
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
              {grant.amount && (
                <span className="text-lg font-semibold text-green-700">{grant.amount}</span>
              )}
              {grant.organization && (
                <span className="text-base text-gray-700 font-medium">{grant.organization}</span>
              )}
            </div>
          )}
          {grant.type && <span className="inline-block bg-blue-50 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full border border-blue-200 mb-4">{grant.type}</span>}
          {grant.description && <div className="prose prose-lg text-gray-800 mb-10 whitespace-pre-line" style={{lineHeight: '1.8'}}>{grant.description}</div>}
          {/* Add to Calendar Button */}
          {grant.date && (
            <div className="mt-6">
              <AddToCalendarButton
                name={grant.title || 'Grant Deadline'}
                options={['Apple','Google']}
                location={grant.organization || ''}
                startDate={grant.date}
                endDate={grant.date}
                startTime={"09:00"}
                endTime={"17:00"}
                timeZone="Asia/Kolkata"
                label="Add to Calendar"
              />
            </div>
          )}
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