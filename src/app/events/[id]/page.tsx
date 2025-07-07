'use client';
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import AddToCalendarButton from "@/app/components/AddToCalendarClient";
import { use, useEffect, useState } from 'react';

function to24Hour(time12h: string) {
  const [time, modifier] = time12h.split(' ');
  let [hours, minutes] = time.split(':');
  let h = parseInt(hours, 10);
  if (modifier === 'PM' && h < 12) h += 12;
  if (modifier === 'AM' && h === 12) h = 0;
  return `${h.toString().padStart(2, '0')}:${minutes}`;
}

export default function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/events`)
      .then(res => res.json())
      .then(data => {
        const found = data.find((e: any) => e.id.toString() === id);
        setEvent(found);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center py-12">Loading...</div>;
  if (!event) {
    notFound();
    return null;
  }
  const { day, month, year } = formatDate(event.start_date);
  // Use start_time and end_time fields
  let startTime = event.start_time || '';
  let endTime = event.end_time || '';
  // Optionally convert to 24-hour format if needed for AddToCalendarButton
  // If you want to convert, uncomment below:
  // if (startTime) startTime = to24Hour(startTime);
  // if (endTime) endTime = to24Hour(endTime);
  return (
    <main className="max-w-4xl mx-auto px-4 py-10 min-h-screen">
      <div className="w-full max-w-4xl h-96 relative rounded-xl overflow-hidden mb-10">
        <Image src={event.poster_url || '/images/pexels-zhuhehuai-716276.jpg'} alt={event.title} fill className="object-cover rounded-xl" sizes="(max-width: 1024px) 100vw, 768px" />
      </div>
      <div className="flex flex-col md:flex-row w-full max-w-4xl gap-10">
        {/* Date and meta info */}
        <div className="flex flex-col items-center md:items-start min-w-[180px] md:w-1/4 mb-6 md:mb-0">
          <div className="text-green-500 text-5xl font-extrabold leading-none mb-2">{day}</div>
          <div className="text-gray-500 text-base mb-1">{month}, {year}</div>
          {(startTime || endTime) && (
            <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              {startTime}{endTime ? ` - ${endTime}` : ''}
            </div>
          )}
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 12.414a2 2 0 10-2.828 2.828l4.243 4.243a8 8 0 111.414-1.414z" /></svg>
            {event.location}
          </div>
        </div>
        {/* Title and description */}
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-[#1a2a3a] mb-6 leading-tight">{event.title}</h1>
          <div className="prose prose-lg text-gray-800 mb-10 whitespace-pre-line" style={{lineHeight: '1.8'}}>{event.description}</div>
          <div className="flex flex-wrap items-center gap-6 mt-8">
            <div className="flex items-center gap-2">
              <span className="text-gray-500 font-semibold mr-2">Share:</span>
              <Link href="#" className="hover:opacity-80"><img src="/images/social-facebook.svg" alt="Facebook" className="w-7 h-7" /></Link>
              <Link href="#" className="hover:opacity-80"><img src="/images/social-twitter.svg" alt="Twitter" className="w-7 h-7" /></Link>
              <Link href="#" className="hover:opacity-80"><img src="/images/social-google.svg" alt="Google" className="w-7 h-7" /></Link>
              <Link href="#" className="hover:opacity-80"><img src="/images/social-pinterest.svg" alt="Pinterest" className="w-7 h-7" /></Link>
            </div>
            <AddToCalendarButton
              name={event.title}
              options={['Apple','Google']}
              location={event.location}
              startDate={event.start_date}
              endDate={event.end_date || event.start_date}
              startTime={startTime}
              endTime={endTime}
              timeZone="Asia/Kolkata"
              label="Add to Calendar"
            />
          </div>
        </div>
      </div>
    </main>
  );
} 