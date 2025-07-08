"use client";
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import JobTabs from './components/JobTabs';
import StateCarousel from './components/StateCarousel';
import { FaSearch, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import SearchBar from './components/SearchBar';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useMemo } from 'react';

const eventCards = [
  {
    title: 'NGO Leadership Summit 2024',
    desc: 'Annual conference bringing together NGO leaders, social entrepreneurs, and impact investors.',
    date: '15 Dec, 2024',
    time: '9:00 AM - 5:00 PM',
    location: 'New Delhi',
    tags: ['Leadership'],
    bannerType: 'Non-Profits job alert',
    bannerSubtitle: 'Jobs | Scholarship | Internship | Career guidance | Social work resources ...',
    button: 'View Details',
    dateIcon: '🗓️',
    locationIcon: '📍',
    timeIcon: '⏰',
  },
  {
    title: 'Digital Fundraising Workshop',
    desc: 'Learn modern fundraising techniques and digital marketing strategies for NGOs.',
    date: '22 Dec, 2024',
    time: '10:00 AM - 2:00 PM',
    location: 'Mumbai',
    tags: ['Fundraising'],
    bannerType: 'Non-Profits job alert',
    bannerSubtitle: 'Jobs | Scholarship | Internship | Career guidance | Social work resources ...',
    button: 'View Details',
    dateIcon: '🗓️',
    locationIcon: '📍',
    timeIcon: '⏰',
  },
  {
    title: 'Sustainable Development Goals Forum',
    desc: 'Collaborative forum on achieving SDGs through grassroots initiatives.',
    date: '8 Jan, 2025',
    time: '11:00 AM - 4:00 PM',
    location: 'Bangalore',
    tags: ['Policy'],
    bannerType: 'Non-Profits job alert',
    bannerSubtitle: 'Jobs | Scholarship | Internship | Career guidance | Social work resources ...',
    button: 'View Details',
    dateIcon: '🗓️',
    locationIcon: '📍',
    timeIcon: '⏰',
  },
];

type EmployerCard = {
  id: number;
  name: string;
  logo: string;
  location: string;
  tags: string; // comma separated
  open_positions: number;
};

export default function Home() {
  const router = useRouter();

  // Handler for dashboard search
  const handleDashboardSearch = (search: string, location: string, category: string) => {
    // Build query string
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (location) params.append('location', location);
    if (category) params.append('category', category);
    router.push(`/jobs${params.toString() ? `?${params.toString()}` : ''}`);
  };

  // Funding/Proposal section state
  const [grants, setGrants] = useState<any[]>([]);
  useEffect(() => {
    fetch('/api/grants')
      .then(res => res.json())
      .then(data => setGrants(data));
  }, []);

  return (
    <div className="w-full bg-[#F9FAFB] min-h-screen flex flex-col">
      <Head>
        <title>GreenImpact NGO</title>
      </Head>

      {/* Hero Section */}
      <section className="w-full flex flex-col items-center justify-center bg-[#eaf4fb] py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#1a2a3a] leading-tight mb-3 sm:mb-4">
            Discover NGO Opportunities in India
          </h1>
          <p className="text-sm sm:text-base md:text-lg font-medium text-gray-600 leading-relaxed mb-6 px-4 sm:px-0">
            Explore jobs, fellowships, internships, scholarships, events, and grants from over 1,000 NGOs.
          </p>
        </div>
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SearchBar onSearch={handleDashboardSearch} search="" location="" category="Jobs" />
        </div>
      </section>

      {/* Job Tabs Section */}
      <div className="w-full flex justify-center z-10 relative">
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <JobTabs />
          {/* Jobs By State Section */}
          <div className="mt-8 sm:mt-12 mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-[#1a2a3a] mb-2 text-center">
              Looking for NGO jobs in your state?
            </h2>
            <p className="text-sm sm:text-base font-normal text-gray-700 leading-relaxed text-center mb-6">
              Explore our curated list of the latest nonprofit, CSR, and development sector opportunities across India.
            </p>
            <StateCarousel />
          </div>
        </div>
      </div>

      {/* Top Organizations */}
      <section className="w-full max-w-7xl mx-auto mt-8 sm:mt-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 mb-6 sm:mb-8">
          <div className="text-center sm:text-left mb-4 sm:mb-0">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-[#1a2a3a] leading-snug">
                Top Organisations Hiring Now
              </h2>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#1a2a3a] hidden sm:block">
                <path d="M12.0196 2.91016C8.7096 2.91016 6.0196 5.60016 6.0196 8.91016V11.8002C6.0196 12.4102 5.7596 13.3402 5.4496 13.8602L4.2996 15.7702C3.5896 16.9502 4.0796 18.2602 5.3796 18.7002C9.6896 20.1402 14.3396 20.1402 18.6496 18.7002C19.8596 18.3002 20.3896 16.8702 19.7296 15.7702L18.5796 13.8602C18.2796 13.3402 18.0196 12.4102 18.0196 11.8002V8.91016C18.0196 5.61016 15.3196 2.91016 12.0196 2.91016Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round"/>
                <path d="M13.8699 3.19994C13.5599 3.10994 13.2399 3.03994 12.9099 2.99994C11.9499 2.87994 11.0299 2.94994 10.1699 3.19994C10.4599 2.45994 11.1799 1.93994 12.0199 1.93994C12.8599 1.93994 13.5799 2.45994 13.8699 3.19994Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15.0195 19.0601C15.0195 20.7101 13.6695 22.0601 12.0195 22.0601C11.1995 22.0601 10.4395 21.7201 9.89953 21.1801C9.35953 20.6401 9.01953 19.8801 9.01953 19.0601" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10"/>
              </svg>
            </div>
            <p className="mt-2 text-sm sm:text-base text-gray-600">
              Connect with leading NGOs and find your next opportunity in the development sector
            </p>
          </div>
          <Link href="/top-organisations" className="text-[#2B7FFF] font-semibold flex items-center gap-2 hover:underline text-sm sm:text-base whitespace-nowrap">
            View All 
            <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
        <TopOrganisationsLiveCards />
      </section>

      {/* Upcoming Events */}
      <section className="w-full max-w-7xl mx-auto mt-12 sm:mt-16 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <div className="text-center sm:text-left mb-4 sm:mb-0">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-[#1a2a3a] leading-snug">
              Upcoming Events
            </h2>
            <p className="mt-2 text-sm sm:text-base text-gray-600">
              Explore upcoming NGO events, workshops, and training programs to grow your impact in the development sector.
            </p>
          </div>
          <a 
            href="/events" 
            className="inline-flex items-center gap-2 text-[#2B7FFF] font-semibold hover:underline text-sm sm:text-base whitespace-nowrap"
          >
            View All
            <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
        <UpcomingEventsLiveCards />
      </section>

      {/* Funding Opportunities */}
      <section className="w-full max-w-7xl mx-auto mt-12 sm:mt-16 mb-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <div className="text-center sm:text-left mb-4 sm:mb-0">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-[#1a2a3a] leading-snug">
              Funding / Proposal
            </h2>
            <p className="mt-2 text-sm sm:text-base text-gray-600">
            Discover the latest grants and funding opportunities for NGOs
            </p>
          </div>
          <a 
            href="/grants" 
            className="inline-flex items-center gap-2 text-[#2B7FFF] font-semibold hover:underline text-sm sm:text-base whitespace-nowrap"
          >
            View All
            <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {grants.slice(0, 3).map((grant, idx) => (
            <div key={grant.id || idx} className="rounded-xl shadow p-6 flex flex-col min-h-[320px] bg-[#f3f6f3]">
              <div className="flex flex-col gap-2 mb-4">
                <div className="flex justify-between items-start">
                  <span className="flex-shrink-0">
                    <Image src="/images/download.jpeg" alt={grant.organization || 'Org Logo'} width={48} height={48} className="rounded-md object-cover" />
                  </span>
                  <span className="inline-block px-2 py-1 rounded text-xs font-semibold bg-yellow-200 text-yellow-800">{grant.type}</span>
                </div>
                <span className="font-semibold text-black text-sm">{grant.organization}</span>
              </div>
              <h3 className="font-bold text-lg mb-3 text-black tracking-tight leading-snug">{grant.title}</h3>
              <div className="text-base text-gray-700 font-normal leading-relaxed mb-4">{truncateWords(grant.description, 45)}</div>
              <div className="text-xs text-gray-600 mb-6">Deadline: {grant.deadline ? new Date(grant.deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : 'N/A'}</div>
              <div className="flex-1 flex items-end">
                {grant.link ? (
                  <a href={grant.link} target="_blank" rel="noopener noreferrer" className="w-full">
                    <button className="bg-[#2B7FFF] text-white px-5 py-2 rounded-full font-semibold text-sm hover:bg-[#1A5FCC] transition-colors w-full">Apply Now</button>
                  </a>
                ) : (
                  <button className="bg-[#2B7FFF] text-white px-5 py-2 rounded-full font-semibold text-sm hover:bg-[#1A5FCC] transition-colors w-full" disabled>Apply Now</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Blog Section */}
/*
      <section className="w-full max-w-7xl mx-auto mb-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-[#1a2a3a] text-center mb-2"> Blog</h2>
        <p className="text-gray-600 text-base md:text-lg text-center mb-10">Weekly reads to help you learn, grow, and lead in the social sector.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Blog Card 1 */}
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-start">
            <img src="/images/blog1.jpg" alt="Attract Sales And Profits" className="w-full h-48 object-cover rounded-lg mb-4" />
            <div className="text-gray-500 text-xs mb-2">April 26, 2021 &nbsp; • &nbsp; 1 Comment</div>
            <h3 className="font-bold text-lg mb-2 text-[#1a2a3a]">Attract Sales And Profits</h3>
            <p className="text-gray-600 text-sm mb-4">A job ravenously while Far much that one rank beheld after outside....</p>
            <a href="#" className="text-[#2B7FFF] text-sm font-semibold hover:underline flex items-center gap-1">Read More <span>&rarr;</span></a>
          </div>
          {/* Blog Card 2 */}
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-start">
            <img src="/images/blog2.jpg" alt="5 Tips For Your Job Interviews" className="w-full h-48 object-cover rounded-lg mb-4" />
            <div className="text-gray-500 text-xs mb-2">April 26, 2021 &nbsp; • &nbsp; 3 Comments</div>
            <h3 className="font-bold text-lg mb-2 text-[#1a2a3a]">5 Tips For Your Job Interviews</h3>
            <p className="text-gray-600 text-sm mb-4">A job ravenously while Far much that one rank beheld after outside....</p>
            <a href="#" className="text-[#2B7FFF] text-sm font-semibold hover:underline flex items-center gap-1">Read More <span>&rarr;</span></a>
          </div>
          {/* Blog Card 3 */}
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-start">
            <img src="/images/blog3.jpg" alt="The Evening of The Holiday" className="w-full h-48 object-cover rounded-lg mb-4" />
            <div className="text-gray-500 text-xs mb-2">April 26, 2021 &nbsp; • &nbsp; 0 Comments</div>
            <h3 className="font-bold text-lg mb-2 text-[#1a2a3a]">The Evening of The Holiday</h3>
            <p className="text-gray-600 text-sm mb-4">A job ravenously while Far much that one rank beheld after outside....</p>
            <a href="#" className="text-[#2B7FFF] text-sm font-semibold hover:underline flex items-center gap-1">Read More <span>&rarr;</span></a>
          </div>
        </div>
      </section>
*/

      {/* Popular Roles Section */}
      <section className="w-full max-w-7xl mx-auto mb-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-stretch gap-0 md:gap-8 rounded-2xl overflow-hidden bg-gradient-to-r from-[#fff7f0] to-[#fff] border border-orange-100 shadow-sm">
          {/* Left Info Card */}
          <div className="flex flex-col justify-center items-center md:items-start flex-1 p-8 md:p-12">
            <div className="mb-6">
              <img src="/images/wa.jpg" alt="Popular Roles" className="w-32 h-32 object-contain mx-auto md:mx-0" />
            </div>
            <div className="flex items-center gap-3 mb-2 w-full justify-center md:justify-start">
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#171717] text-center md:text-left">Development Wala</h2>
              <a href="https://developmentwala.com/" target="_blank" rel="noopener noreferrer" className="inline-block">
                <button className="bg-white border border-blue-100 text-[#2B7FFF] hover:bg-blue-50 px-2.5 py-2 rounded-full shadow flex items-center justify-center transition-colors" aria-label="Visit Development Wala Website">
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="white"/><path d="M9 5L16 12L9 19" stroke="#2B7FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </a>
            </div>
            <p className="text-gray-500 text-base md:text-lg font-medium text-center md:text-left">Your Partner in Nonprofit Excellence</p>
          </div>
          {/* Right Carousel/Role Grid */}
          <div className="flex-1 flex items-center justify-center p-6 md:p-10 bg-white rounded-2xl md:rounded-none border-t md:border-t-0 md:border-l border-orange-100 relative">
            <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
              <div className="rounded-xl border border-gray-100 px-5 py-4 bg-white shadow-sm flex flex-col cursor-pointer hover:shadow-md transition">
                <span className="font-semibold text-[#171717] text-base mb-1">Recruitment Solutions for the Social Sector</span>
              </div>
              <div className="rounded-xl border border-gray-100 px-5 py-4 bg-white shadow-sm flex flex-col cursor-pointer hover:shadow-md transition">
                <span className="font-semibold text-[#171717] text-base mb-1">NGO Job Board & Talent Marketplace</span>
              </div>
              <div className="rounded-xl border border-gray-100 px-5 py-4 bg-white shadow-sm flex flex-col cursor-pointer hover:shadow-md transition">
                <span className="font-semibold text-[#171717] text-base mb-1">NGO & Legal Entity Registration</span>
              </div>
              <div className="rounded-xl border border-gray-100 px-5 py-4 bg-white shadow-sm flex flex-col cursor-pointer hover:shadow-md transition">
                <span className="font-semibold text-[#171717] text-base mb-1">Proposal, Project & Impact Documentation</span>
              </div>
              <div className="rounded-xl border border-gray-100 px-5 py-4 bg-white shadow-sm flex flex-col cursor-pointer hover:shadow-md transition">
                <span className="font-semibold text-[#171717] text-base mb-1">Development Consultancy & Advisory</span>
              </div>
              <div className="rounded-xl border border-gray-100 px-5 py-4 bg-white shadow-sm flex flex-col cursor-pointer hover:shadow-md transition">
                <span className="font-semibold text-[#171717] text-base mb-1">Mentorship for Students & Aspirants</span>
              </div>
            </div>
            {/* Second slide: hidden for now, contains the rest */}
            <div className="hidden" id="roles-slide-2">
              <div className="grid grid-cols-2 gap-4 w-full max-w-lg mt-4">
                <div className="rounded-xl border border-gray-100 px-5 py-4 bg-white shadow-sm flex flex-col cursor-pointer hover:shadow-md transition">
                  <span className="font-semibold text-[#171717] text-base mb-1">Mobile / App Developer</span>
                  <span className="text-gray-500 text-sm">3.1K+ Jobs &rarr;</span>
                </div>
                <div className="rounded-xl border border-gray-100 px-5 py-4 bg-white shadow-sm flex flex-col cursor-pointer hover:shadow-md transition">
                  <span className="font-semibold text-[#171717] text-base mb-1">DevOps Engineer</span>
                  <span className="text-gray-500 text-sm">3.1K+ Jobs &rarr;</span>
                </div>
                <div className="rounded-xl border border-gray-100 px-5 py-4 bg-white shadow-sm flex flex-col cursor-pointer hover:shadow-md transition">
                  <span className="font-semibold text-[#171717] text-base mb-1">Technical Lead</span>
                  <span className="text-gray-500 text-sm">10.6K+ Jobs &rarr;</span>
                </div>
              </div>
            </div>
            {/* Carousel dots and arrow (static for now) */}
            {/* (Removed carousel dots and next button as requested) */}
          </div>
        </div>
      </section>

      {/* Social Section */}
      <section className="w-full max-w-7xl mx-auto mt-12 mb-16 px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1a2a3a] text-center mb-2">🔗 Stay Connected with Us & Never Miss an Opportunity!</h2>
        <p className="text-gray-600 text-base md:text-lg text-center mb-8">Want the latest NGO jobs, fellowships, grants, and events delivered straight to your feed?</p>
        <div className="flex flex-col md:flex-row gap-6 justify-center items-stretch">
          {/* Card 1 */}
          <div className="flex-1 min-w-[260px] bg-white rounded-2xl p-6 flex flex-col justify-between shadow-md border border-blue-50">
            <div className="flex items-center gap-3 mb-4">
              <svg className="w-8 h-8 text-[#2B7FFF]" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              <span className="text-base text-[#1a2a3a] font-medium">Follow Development Wala on LinkedIn</span>
            </div>
            <a href="https://www.linkedin.com/company/development-wala/" target="_blank" rel="noopener noreferrer" className="mt-4">
              <button className="bg-[#2B7FFF] text-white px-8 py-2 rounded-full font-bold tracking-widest text-sm w-full shadow hover:bg-[#1A5FCC] transition-colors">FOLLOW</button>
            </a>
          </div>
          {/* Card 2 */}
          <div className="flex-1 min-w-[260px] bg-white rounded-2xl p-6 flex flex-col justify-between shadow-md border border-blue-50">
            <div className="flex items-center gap-3 mb-4">
              <svg className="w-8 h-8 text-[#2B7FFF]" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              <span className="text-base text-[#1a2a3a] font-medium">Follow our Job board 'NGO Hiring.org' on LinkedIn</span>
            </div>
            <a href="https://www.linkedin.com/company/ngo-hiring-org/" target="_blank" rel="noopener noreferrer" className="mt-4">
              <button className="bg-[#2B7FFF] text-white px-8 py-2 rounded-full font-bold tracking-widest text-sm w-full shadow hover:bg-[#1A5FCC] transition-colors">FOLLOW</button>
            </a>
          </div>
          {/* Card 3 */}
          <div className="flex-1 min-w-[260px] bg-white rounded-2xl p-6 flex flex-col justify-between shadow-md border border-blue-50">
            <div className="flex items-center gap-3 mb-4">
              <svg className="w-8 h-8 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              <span className="text-base text-[#1a2a3a] font-medium">Join Development Wala on WhatsApp</span>
            </div>
            <a href="https://whatsapp.com/channel/0029VaCxEqA0G0XoVCQyUx38" target="_blank" rel="noopener noreferrer" className="mt-4">
              <button className="bg-[#2B7FFF] text-white px-8 py-2 rounded-full font-bold tracking-widest text-sm w-full shadow hover:bg-[#1A5FCC] transition-colors">JOIN NOW</button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

// Live Top Organisations Cards Component
function TopOrganisationsLiveCards() {
  const [orgs, setOrgs] = useState<EmployerCard[]>([]);
  useEffect(() => {
    fetch('/api/employers')
      .then(res => res.json())
      .then(data => setOrgs(data));
  }, []);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {orgs.slice(0, 4).map(org => (
        <Link key={org.id} href={`/top-organisations/${org.id}`} className="bg-white rounded-lg shadow p-4 flex flex-col items-start hover:shadow-lg transition cursor-pointer">
          <img src={org.logo || '/images/APF-Logo-col-w_o-box-FINAL.png'} alt={org.name || 'Organisation Logo'} className="w-14 h-10 object-contain mb-2" />
          <h3 className="text-base font-semibold mb-1">{org.name || 'Organisation'}</h3>
          <div className="flex items-center text-xs text-gray-500 mb-2">
            <span className="mr-2"><svg className="inline-block w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>{org.location || 'India'}</span>
          </div>
          <div className="flex flex-wrap gap-2 mb-2">
            {org.tags && org.tags.split(',').map((tag, i) => (
              <span key={i} className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">{tag.trim()}</span>
            ))}
            <span className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full font-semibold">{org.open_positions} Open Position{org.open_positions !== 1 ? 's' : ''}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}

function truncateWords(text: string, wordLimit: number): string {
  if (!text) return '';
  const words = text.split(/\s+/);
  if (words.length <= wordLimit) return text;
  return words.slice(0, wordLimit).join(' ') + '...';
}

function UpcomingEventsLiveCards() {
  const [events, setEvents] = useState<any[]>([]);
  useEffect(() => {
    fetch('/api/events')
      .then(res => res.json())
      .then(data => setEvents(data));
  }, []);
  // Helper to format date
  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
      {events.slice(0, 3).map((event, idx) => (
        <div key={event.id || idx} className="bg-white rounded-xl shadow overflow-hidden flex flex-col">
          <div className="relative">
            <div className="w-full h-[200px] sm:h-[220px]">
              <Image
                src={event.poster_url || '/images/pexels-zhuhehuai-716276.jpg'}
                alt={event.title}
                fill
                style={{ objectFit: 'cover' }}
                className="w-full h-full object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                priority={idx === 0}
              />
            </div>
            <div className="absolute top-0 left-0 w-full p-3 sm:p-4">
              <div className="flex flex-wrap gap-2">
                {event.tags && event.tags.split(',').map((tag: string) => (
                  <span key={tag} className="bg-blue-500 text-white px-2.5 py-1 rounded-md text-xs font-medium shadow-sm">
                    {tag.trim()}
                  </span>
                ))}
              </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent"></div>
          </div>
          <div className="flex flex-col flex-1 p-4 sm:p-6">
            <div className="mb-auto">
              <h3 className="font-semibold text-base sm:text-lg text-[#1a2a3a] mb-2">
                {event.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
                {truncateWords(event.description, 45)}
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex flex-wrap gap-3 items-center text-xs sm:text-sm text-gray-600">
                <span className="flex items-center gap-1.5">
                  <span className="text-blue-500">🗓️</span>
                  <span>{formatDate(event.start_date)}</span>
                  {event.start_time && (
                    <>
                      <span className="text-gray-400 mx-1">|</span>
                      <span className="text-blue-500">⏰</span>
                      <span>{event.start_time}{event.end_time ? ` - ${event.end_time}` : ''}</span>
                    </>
                  )}
                </span>
                {event.location && (
                  <span className="flex items-center gap-1.5">
                    <span className="text-pink-500">📍</span>
                    <span>{event.location}</span>
                  </span>
                )}
              </div>
              <a href={`/events/${event.id}`}>
                <button className="w-full bg-[#2B7FFF] text-white px-4 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#1A5FCC] transition-colors">
                  View Details
                </button>
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}