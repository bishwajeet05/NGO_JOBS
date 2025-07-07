"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaGlobe, FaBuilding, FaUsers, FaCalendarAlt, FaRegBookmark, FaMoneyBillWave } from 'react-icons/fa';

type Employer = {
  id: number;
  name: string;
  logo: string;
  location: string;
  tags: string;
  open_positions: number;
  about?: string;
  email?: string;
  phone?: string;
  website?: string;
  founded?: string;
  company_size?: string;
  socials?: { facebook?: string; twitter?: string; linkedin?: string; instagram?: string };
};

type Job = {
  id: number;
  title: string;
  department?: string;
  location?: string;
  salary?: string;
  type?: string;
  featured?: boolean;
  urgent?: boolean;
  temporary?: boolean;
};

export default function EmployerDetailPage() {
  const params = useParams();
  if (!params || !('id' in params)) {
    return <div className="w-full min-h-screen bg-[#F9FAFB] flex items-center justify-center text-gray-500">Loading...</div>;
  }
  const id = typeof params.id === 'string' ? params.id : Array.isArray(params.id) ? params.id[0] : '';
  const [employer, setEmployer] = useState<Employer | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/employers/${id}`)
      .then(res => res.json())
      .then((data: Employer) => {
        setEmployer(data);
        setLoading(false);
      });
    fetch(`/api/jobs?employer_id=${id}`)
      .then(res => res.json())
      .then((data: Job[]) => setJobs(data));
  }, [id]);

  if (loading || !employer) {
    return <div className="w-full min-h-screen bg-[#F9FAFB] flex items-center justify-center text-gray-500">Loading...</div>;
  }

  // Placeholder meta info
  const meta = {
    founded: employer.founded || '1995',
    company_size: employer.company_size || '50-80',
    socials: employer.socials || {
      facebook: '#',
      twitter: '#',
      linkedin: '#',
      instagram: '#',
    },
  };

  return (
    <div className="w-full min-h-screen bg-[#F9FAFB] py-8 px-2 sm:px-4 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        {/* Header Card - Reference UI, Full Width */}
        <div className="rounded-2xl shadow flex flex-col md:flex-row items-center gap-8 px-10 py-10 bg-gradient-to-r from-[#f6fafd] to-[#eaf4fb] relative mb-6 w-full">
          {/* Logo */}
          <div className="flex flex-col items-center md:items-start md:w-1/6">
            <div className="w-32 h-32 rounded-lg bg-white border border-gray-200 flex items-center justify-center overflow-hidden mb-3 shadow-sm">
              {employer.logo ? (
                <Image src={employer.logo} alt={employer.name} width={128} height={128} className="object-cover w-full h-full" />
              ) : (
                <span className="text-5xl font-bold text-gray-400">{employer.name && employer.name.length > 0 ? employer.name[0] : "?"}</span>
              )}
            </div>
          </div>
          {/* Info Row */}
          <div className="flex-1 flex flex-col gap-2 w-full">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-[#1a2a3a]">{employer.name}</h1>
              <span className="ml-2 text-xs text-green-600 font-bold bg-green-50 px-2 py-1 rounded">Featured</span>
              <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-semibold">{employer.tags}</span>
            </div>
            <div className="flex flex-wrap items-center gap-5 text-base text-gray-600 mb-2">
              <span className="flex items-center gap-1"><FaMapMarkerAlt className="inline-block" /> {employer.location}</span>
              {employer.phone && <span className="flex items-center gap-1"><FaPhone className="inline-block" /> {employer.phone}</span>}
              {employer.email && <span className="flex items-center gap-1"><FaEnvelope className="inline-block" /> {employer.email}</span>}
              {employer.website && <span className="flex items-center gap-1"><FaGlobe className="inline-block" /> <a href={employer.website} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">{employer.website}</a></span>}
              <span className="bg-blue-50 text-blue-700 text-xs px-4 py-1 rounded-full font-semibold">Open Jobs: {employer.open_positions}</span>
            </div>
          </div>
          {/* Right Actions */}
          <div className="absolute right-10 top-10 flex gap-4 items-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-7 py-2 rounded-lg shadow transition text-base">Private Message</button>
            <button className="bg-white border border-gray-200 rounded-lg p-3 hover:bg-blue-50 transition"><svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M6 19V7a6 6 0 1 1 12 0v12" stroke="#2B7FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><rect x="6" y="19" width="12" height="2" rx="1" fill="#2B7FFF"/></svg></button>
          </div>
        </div>
        {/* Two-column layout: About Company (left), Company Info (right) */}
        <div className="flex flex-col lg:flex-row gap-8 w-full">
          {/* Left: About Company and Open Positions */}
          <div className="flex-1 flex flex-col gap-8">
            {/* About Company - Reference Style */}
            <div className="bg-white rounded-xl shadow p-8">
              <h2 className="text-xl font-bold mb-4">About Company</h2>
              <div className="text-gray-700 text-base mb-6 whitespace-pre-line">{employer.about || 'No description available.'}</div>
              <div className="flex items-center gap-3 bg-[#f6fafd] rounded-lg px-6 py-3 w-fit">
                <span className="text-gray-500 text-base font-medium">Social Profiles:</span>
                <a href={meta.socials.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600"><i className="fab fa-facebook-f text-lg" /></a>
                <a href={meta.socials.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600"><i className="fab fa-twitter text-lg" /></a>
                <a href={meta.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600"><i className="fab fa-linkedin-in text-lg" /></a>
                <a href={meta.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600"><i className="fab fa-instagram text-lg" /></a>
              </div>
            </div>
            {/* Open Positions */}
            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Open Position</h2>
                <Link href="/jobs" className="text-blue-600 text-sm hover:underline">Browse Full List &rarr;</Link>
              </div>
              {jobs.length === 0 ? (
                <div className="text-gray-500">No open positions.</div>
              ) : (
                <div className="flex flex-col gap-4">
                  {jobs.slice(0, 4).map(job => (
                    <div key={job.id} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition flex flex-col sm:flex-row items-center px-4 py-5 gap-4">
                      {/* Logo */}
                      <div className="flex-shrink-0 flex items-center justify-center w-14 h-14 bg-gray-100 rounded-md">
                        <Image src={employer.logo || '/images/leadtech.png'} alt={employer.name || 'Logo'} width={40} height={40} className="object-cover w-10 h-10" />
                      </div>
                      {/* Info */}
                      <div className="flex-1 w-full flex flex-col gap-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-base sm:text-lg text-[#1a2a3a]">{job.title}</span>
                          {job.featured && <span className="ml-2 text-xs text-green-600 font-bold">Featured</span>}
                        </div>
                        <div className="flex flex-wrap gap-4 text-xs text-gray-500 mb-1 items-center">
                          {job.department && (
                            <span className="flex items-center gap-1"><FaBuilding className="inline-block" />{job.department}</span>
                          )}
                          {job.location && (
                            <span className="flex items-center gap-1"><FaMapMarkerAlt className="inline-block" />{job.location}</span>
                          )}
                          {job.salary && (
                            <span className="flex items-center gap-1"><FaMoneyBillWave className="inline-block" />{job.salary}</span>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {job.type && <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">{job.type}</span>}
                          {job.urgent && <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full">Urgent</span>}
                          {job.temporary && <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">Temporary</span>}
                        </div>
                      </div>
                      {/* Bookmark and View */}
                      <div className="flex flex-col items-end gap-2 min-w-[60px]">
                        <button className="text-gray-400 hover:text-blue-600"><FaRegBookmark size={18} /></button>
                        <Link href={`/jobs/${job.id}`} className="text-blue-600 text-sm font-semibold hover:underline whitespace-nowrap">View</Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* Right: Company Info */}
          <div className="w-full lg:w-96 flex-shrink-0 flex flex-col gap-6">
            <div className="bg-[#f6fafd] rounded-2xl shadow p-8">
              <h3 className="text-lg font-bold mb-4">Company Info</h3>
              <div className="flex flex-col gap-3 text-base text-gray-700">
                <div><span className="font-semibold text-gray-500">Categories:</span> <span className="ml-2">{employer.tags}</span></div>
                <div><span className="font-semibold text-gray-500">Founded Date:</span> <span className="ml-2">{meta.founded}</span></div>
                <div><span className="font-semibold text-gray-500">Company Size:</span> <span className="ml-2">{meta.company_size}</span></div>
                <div><span className="font-semibold text-gray-500">Location:</span> <span className="ml-2">{employer.location}</span></div>
                <div><span className="font-semibold text-gray-500">Phone Number:</span> <span className="ml-2">{employer.phone || 'N/A'}</span></div>
                <div><span className="font-semibold text-gray-500">Email:</span> <span className="ml-2">{employer.email || 'N/A'}</span></div>
                <div><span className="font-semibold text-gray-500">Website:</span> {employer.website ? <span className="ml-2 bg-white px-4 py-2 rounded-lg text-blue-600 font-semibold inline-block"><a href={employer.website} target="_blank" rel="noopener noreferrer">{employer.website}</a></span> : <span className="ml-2">N/A</span>}</div>
                <div className="flex gap-3 mt-2">
                  <a href={meta.socials.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600"><i className="fab fa-facebook-f text-lg" /></a>
                  <a href={meta.socials.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600"><i className="fab fa-twitter text-lg" /></a>
                  <a href={meta.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600"><i className="fab fa-linkedin-in text-lg" /></a>
                  <a href={meta.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600"><i className="fab fa-instagram text-lg" /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 