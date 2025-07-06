"use client";
// app/page.tsx

import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image'; // Import Image for company logos
import { ChevronRight } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import JobFilter from '../components/JobFilter';
import RecruitersCard from '../components/RecruitersCard';
import PremiumServicesCard from '../components/PremiumServicesCard';
import { Menu, Search, Filter } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { FaSearch, FaMapMarkerAlt, FaCalendarAlt, FaBuilding, FaMoneyBillWave, FaClock, FaStar } from 'react-icons/fa';

interface Jobs {
  id: string;
  title: string;
  slug: string;
  description: string;
  applyLink: string;
  responsibilities: string;
  qualifications: string;
  requirements: string;
  career_prospects: string;
  role_category: string;
  role_type: string;
  employment_type: string;
  experience_min: number;
  experience_max: number;
  education_required: string;
  industry_type: string;
  department: string;
  key_skills: string;
  salary_currency: string;
  salary_value: number;
  salary_unit_text: string;
  date_posted: string;
  valid_through: string;
  organization: string;
  organization_type: string;
  location_id: string;
  country: string;
  state: string;
  city: string;
  pin_code: string;
  street_address: string;
  is_remote: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  logo: string; // Added logo field
  user_id: string;
  featured: boolean; // Added featured field
}

export const dynamic = 'force-dynamic';

export default function AllJobs() {
  const searchParams = useSearchParams(); // always non-null from next/navigation
  const [jobs, setJobs] = useState<Jobs[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('Jobs');
  const [selectedTag, setSelectedTag] = useState('');
  const [employmentType, setEmploymentType] = useState<string[]>([]);
  const [experience, setExperience] = useState<string[]>([]);
  const [qualifications, setQualifications] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [salaryRange, setSalaryRange] = useState<[number, number]>([0, 1000000]);
  const [postedDate, setPostedDate] = useState<string>('');
  const [jobStatus, setJobStatus] = useState<string[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Handle hydration
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Fetch jobs on mount
  useEffect(() => {
    fetchJobs();
  }, []);

  // Set initial state from query params after hydration
  useEffect(() => {
    if (isHydrated) {
      const searchQ = searchParams?.get('search');
      const locationQ = searchParams?.get('location');
      const categoryQ = searchParams?.get('category');
      if (searchQ) setSearch(searchQ);
      if (locationQ) setLocation(locationQ);
      if (categoryQ) setCategory(categoryQ);
    }
  }, [searchParams, isHydrated]);

  const fetchJobs = async () => {
    try {
      const response = await fetch('/api/jobs');
      if (response.ok) {
        const data = await response.json();
        setJobs(data);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter jobs based on all criteria
  const filteredJobs = jobs.filter(job => {
    // Search filter
    if (search && !job.title.toLowerCase().includes(search.toLowerCase()) &&
        !job.description.toLowerCase().includes(search.toLowerCase()) &&
        !job.organization.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }

    // Location filter
    if (location && !job.city.toLowerCase().includes(location.toLowerCase()) &&
        !job.state.toLowerCase().includes(location.toLowerCase()) &&
        !job.country.toLowerCase().includes(location.toLowerCase())) {
      return false;
    }

    // Category filter
    if (category && category !== 'Jobs' && job.role_category !== category) {
      return false;
    }

    // Employment type filter
    if (employmentType.length > 0 && !employmentType.includes(job.employment_type)) {
      return false;
    }

    // Experience filter
    if (experience.length > 0) {
      const jobExp = job.experience_min;
      const hasMatchingExp = experience.some((exp: string) => {
        switch (exp) {
          case 'Entry Level (0-2 years)': return jobExp <= 2;
          case 'Mid Level (3-5 years)': return jobExp >= 3 && jobExp <= 5;
          case 'Senior Level (6-10 years)': return jobExp >= 6 && jobExp <= 10;
          case 'Executive (10+ years)': return jobExp > 10;
          default: return true;
        }
      });
      if (!hasMatchingExp) return false;
    }

    // Qualifications filter
    if (qualifications.length > 0) {
      const jobQuals = job.qualifications.toLowerCase();
      const hasMatchingQual = qualifications.some((qual: string) => 
        jobQuals.includes(qual.toLowerCase())
      );
      if (!hasMatchingQual) return false;
    }

    // Skills filter
    if (skills.length > 0) {
      const jobDesc = job.description.toLowerCase();
      const hasMatchingSkill = skills.some((skill: string) => 
        jobDesc.includes(skill.toLowerCase())
      );
      if (!hasMatchingSkill) return false;
    }

    // Salary range filter
    const jobSalary = typeof job.salary_value === 'string' ? parseFloat(job.salary_value) : job.salary_value;
    if (jobSalary < salaryRange[0] || jobSalary > salaryRange[1]) {
      return false;
    }

    // Posted date filter
    if (postedDate) {
      const jobDate = new Date(job.date_posted);
      const filterDate = new Date();
      switch (postedDate) {
        case 'Last 24 hours':
          filterDate.setDate(filterDate.getDate() - 1);
          break;
        case 'Last 3 days':
          filterDate.setDate(filterDate.getDate() - 3);
          break;
        case 'Last week':
          filterDate.setDate(filterDate.getDate() - 7);
          break;
        case 'Last month':
          filterDate.setMonth(filterDate.getMonth() - 1);
          break;
      }
      if (jobDate < filterDate) return false;
    }

    // Job status filter
    if (jobStatus.length > 0) {
      const isActive = job.is_active;
      const isFeatured = job.featured;
      const hasMatchingStatus = jobStatus.some((status: string) => {
        switch (status) {
          case 'Open': return isActive;
          case 'Active': return isActive;
          case 'Featured': return isFeatured;
          default: return true;
        }
      });
      if (!hasMatchingStatus) return false;
    }

    return true;
  });

  // Handler for JobFilter changes
  const handleFilterChange = (newFilters: any) => {
    if (newFilters.employmentType) setEmploymentType([newFilters.employmentType]);
    if (newFilters.experience) setExperience([newFilters.experience]);
    if (newFilters.qualifications) setQualifications(newFilters.qualifications);
    if (newFilters.skills) setSkills(newFilters.skills);
    if (newFilters.minSalary || newFilters.maxSalary) {
      setSalaryRange([
        newFilters.minSalary ? parseInt(newFilters.minSalary) : 0,
        newFilters.maxSalary ? parseInt(newFilters.maxSalary) : 1000000
      ]);
    }
    if (newFilters.postedDate) setPostedDate(newFilters.postedDate);
  };

  // Show loading state
  if (!isHydrated || loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-1">
                <div className="h-96 bg-gray-200 rounded"></div>
              </div>
              <div className="lg:col-span-3">
                <div className="space-y-4">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-32 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>All Jobs - Find Your Next Career Opportunity</title>
        <meta
          name="description"
          content="Explore a wide range of job opportunities in various categories. Find featured and latest jobs in India with detailed information on roles, organizations, and locations."
        />
      </Head>

      {/* MOBILE LAYOUT */}
      <div className="md:hidden w-full bg-[#F5F5F7] min-h-screen">
        {/* Header with Search, Filters, and Job Alert */}
        <header className="bg-white shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] sticky top-0 z-20">
          <div className="flex items-center gap-2 px-4 py-3">
            <button className="p-1">
              <Menu className="h-6 w-6 text-[#1d1d1f]" />
            </button>
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
            <input
              type="text"
                placeholder="Remote jobs"
                className="w-full bg-gray-100 rounded-full py-2 pl-11 pr-4 border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>
          </div>
          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar px-4 py-3 border-t border-gray-100">
            <button className="p-2 border border-gray-300 rounded-full bg-white flex-shrink-0">
              <Filter className="h-5 w-5 text-[#1d1d1f]" />
            </button>
            <div className="flex gap-2 w-max">
              {['Work mode', 'Department', 'Location', 'Experience'].map((pill) => (
                <button key={pill} className="whitespace-nowrap px-4 py-2 bg-white border border-gray-300 rounded-full text-sm text-[#1d1d1f] font-medium hover:bg-gray-100 transition">{pill}</button>
              ))}
            </div>
          </div>

          {/* Jobs found & Job alert toggle */}
          <div className="flex items-center justify-between px-4 py-2 border-t border-gray-100">
            <span className="text-sm text-[#1d1d1f] font-medium">21601 jobs found</span>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <span className="text-sm text-[#1d1d1f]">Create a job alert</span>
              <input type="checkbox" className="sr-only peer" />
              <span className="w-10 h-6 bg-gray-300 rounded-full relative transition peer-checked:bg-blue-600">
                <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transition peer-checked:translate-x-4" />
              </span>
            </label>
          </div>
        </header>

        {/* First job card */}
        {jobs.length > 0 && (
          <div className="px-4 pt-4">
            <div className="bg-white rounded-xl shadow p-4 mb-4">
              <div className="flex items-center gap-3 mb-2">
                <img src={jobs[0].logo} alt="logo" className="w-10 h-10 rounded-full border-2 border-indigo-100" />
                <div>
                  <div className="font-bold text-[#1d1d1f] text-base line-clamp-1">{jobs[0].title}</div>
                  <div className="text-xs text-[#6e6e73]">{jobs[0].organization}</div>
                </div>
              </div>
              <div className="text-xs text-[#6e6e73] mb-1">Category: {jobs[0].role_category}</div>
              <div className="text-xs text-[#6e6e73] mb-1">Salary: {jobs[0].salary_currency}{jobs[0].salary_value} /{jobs[0].salary_unit_text}</div>
              <div className="text-xs text-[#6e6e73] mb-1">Location: {jobs[0].city}, {jobs[0].country}</div>
              <div className="text-xs text-[#6e6e73]">Deadline: {jobs[0].valid_through ? new Date(jobs[0].valid_through).toISOString().split("T")[0] : "N/A"}</div>
              {/* Pills for job details */}
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold">{jobs[0].employment_type}</span>
                {jobs[0].role_category && jobs[0].role_category.trim().toLowerCase() !== jobs[0].employment_type.trim().toLowerCase() && (
                  <span className="bg-green-50 text-green-700 px-2 py-1 rounded text-xs font-semibold">{jobs[0].role_category}</span>
                )}
                <span className="bg-purple-50 text-purple-700 px-2 py-1 rounded text-xs font-semibold">{jobs[0].city}, {jobs[0].country}</span>
                <span className="bg-yellow-50 text-yellow-700 px-2 py-1 rounded text-xs font-semibold">{jobs[0].salary_currency}{jobs[0].salary_value} /{jobs[0].salary_unit_text}</span>
                {jobs[0].key_skills && jobs[0].key_skills.split(',').map((skill: any) => (
                  <span key={skill.trim()} className="bg-pink-50 text-pink-700 px-2 py-1 rounded text-xs font-semibold">{skill.trim()}</span>
                ))}
              </div>
            </div>
          </div>
        )}
        {/* Recruiters Card */}
        <div className="px-4"><RecruitersCard /></div>
        {/* Rest of the job cards */}
        <div className="px-4 pb-4">
          {jobs.slice(1).map((job) => (
            <div key={job.id} className="bg-white rounded-xl shadow p-4 mb-4">
              <div className="flex items-center gap-3 mb-2">
                <img src={job.logo} alt="logo" className="w-10 h-10 rounded-full border-2 border-indigo-100" />
                <div>
                  <div className="font-bold text-[#1d1d1f] text-base line-clamp-1">{job.title}</div>
                  <div className="text-xs text-[#6e6e73]">{job.organization}</div>
                </div>
              </div>
              <div className="text-xs text-[#6e6e73] mb-1">Category: {job.role_category}</div>
              <div className="text-xs text-[#6e6e73] mb-1">Salary: {job.salary_currency}{job.salary_value} /{job.salary_unit_text}</div>
              <div className="text-xs text-[#6e6e73] mb-1">Location: {job.city}, {job.country}</div>
              <div className="text-xs text-[#6e6e73]">Deadline: {job.valid_through ? new Date(job.valid_through).toISOString().split("T")[0] : "N/A"}</div>
              {/* Pills for job details */}
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold">{job.employment_type}</span>
                {job.role_category && job.role_category.trim().toLowerCase() !== job.employment_type.trim().toLowerCase() && (
                  <span className="bg-green-50 text-green-700 px-2 py-1 rounded text-xs font-semibold">{job.role_category}</span>
                )}
                <span className="bg-purple-50 text-purple-700 px-2 py-1 rounded text-xs font-semibold">{job.city}, {job.country}</span>
                <span className="bg-yellow-50 text-yellow-700 px-2 py-1 rounded text-xs font-semibold">{job.salary_currency}{job.salary_value} /{job.salary_unit_text}</span>
                {job.key_skills && job.key_skills.split(',').map((skill: any) => (
                  <span key={skill.trim()} className="bg-pink-50 text-pink-700 px-2 py-1 rounded text-xs font-semibold">{skill.trim()}</span>
                ))}
              </div>
              <div className="mt-4 flex justify-end">
                {job.user_id === 'superadmin' ? (
                  <a
                    href={job.applyLink || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm font-semibold transition"
                  >
                    Redirect To Recruiter
                  </a>
                ) : (
                  <a
                    href={job.applyLink || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-semibold transition"
                  >
                    Apply Now
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* Premium Services Card */}
        <div className="px-4 pb-8">
          <PremiumServicesCard />
        </div>
      </div>
      
      {/* DESKTOP LAYOUT (unchanged) */}
      <div className="hidden md:block w-full bg-[#F5F5F7] min-h-screen">
        <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Left Sidebar: Filters */}
          <aside className="md:col-span-1">
            <JobFilter 
              onChange={handleFilterChange}
              filters={{
                keyword: search,
                country: '',
                state: '',
                city: location,
                category: category,
                employmentType: employmentType[0] || '',
                experience: experience[0] || '',
                qualifications: qualifications,
                skills: skills,
                                 minSalary: salaryRange[0] ? salaryRange[0].toString() : '',
                 maxSalary: salaryRange[1] ? salaryRange[1].toString() : '',
                postedDate: postedDate,
                activeOnly: jobStatus.includes('Active'),
                featuredOnly: jobStatus.includes('Featured')
              }}
            />
          </aside>

          {/* Right Content: Search, Tags, Jobs */}
          <div className="md:col-span-3">
            {/* Search Bar and Filters */}
            <div className="flex justify-center mb-8">
              <SearchBar onSearch={(searchVal, locationVal, categoryVal) => {
                setSearch(searchVal);
                setLocation(locationVal);
                setCategory(categoryVal);
              }} search={search} location={location} category={category} />
        </div>

        {/* Popular Tags */}
        <div className="mb-8">
              <span className="text-sm font-semibold text-[#1d1d1f]">Popular Tags:</span>
          <div className="flex flex-wrap gap-3 mt-3">
            {[
                  'Programme Management',
                  'Education',
                  'Communications',
                  'Public Health',
                  'Finance',
                  'M&E',
                  'Partnerships',
                  'CSR',
                  'Climate',
            ].map((tag) => (
                  <button
                key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`flex items-center px-4 py-2 text-sm border rounded-full transition-all duration-300 ${selectedTag === tag ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'}`}
              >
                {tag}
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </button>
                ))}
                {selectedTag && (
                  <button
                    onClick={() => setSelectedTag('')}
                    className="ml-2 px-3 py-2 text-xs bg-gray-200 rounded-full text-gray-700 border border-gray-300 hover:bg-gray-300"
                  >
                    Clear Tag
                  </button>
                )}
          </div>
        </div>

            {/* Loading State */}
            {loading ? (
              <div className="text-center py-12 text-lg text-gray-500">Loading jobs...</div>
            ) : (
              <>
        {/* Featured Jobs */}
        <section className="mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-[#1d1d1f] leading-snug mb-6">Featured Jobs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredJobs.filter(job => job.featured).map((job) => (
              <Link
                key={job.slug}
                href={`/jobs/${job.slug}`}
                className="block"
                aria-label={`View details for ${job.title} at ${job.organization}`}
              >
                <div className="w-full h-[200px] p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                  <div className="flex items-center mb-2">
                    <Image
                          src={'/images/download.jpeg'} // Use dynamic logo with fallback
                      alt={`${''} logo`}
                      width={48}
                      height={48}
                      className="rounded-full mr-4 border-2 border-indigo-100 p-1"
                    />
                    <div className="flex-1 overflow-hidden">
                          <h3 className="text-lg font-bold text-[#1d1d1f] tracking-tight truncate">{job.title}</h3>
                          <p className="text-xs font-medium text-[#6e6e73] truncate">{job.organization}</p>
                    </div>
                  </div>
                      <div className="flex-1 text-xs text-[#6e6e73] space-y-1 overflow-hidden">
                    <div className="flex flex-wrap gap-2 mb-1">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold">{job.employment_type}</span>
                      {job.role_category && job.role_category.trim().toLowerCase() !== job.employment_type.trim().toLowerCase() && (
                        <span className="bg-green-50 text-green-700 px-2 py-1 rounded text-xs font-semibold">{job.role_category}</span>
                      )}
                    </div>
                    <div className="truncate font-normal">Category: {job.role_category}</div>
                            <div className="truncate font-normal">Salary: {job.salary_currency}{job.salary_value} /{job.salary_unit_text}</div>
                            <div className="truncate font-normal">Location: {job.city}, {job.country}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
        {/* Latest Jobs */}
        <section>
                  <h2 className="text-2xl font-bold tracking-tight text-[#1d1d1f] leading-snug mb-6">Latest Jobs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredJobs.filter(job => !job.featured).map((job) => (
              <Link
                key={job.slug}
                href={`/jobs/${job.slug}`}
                className="block"
                aria-label={`View details for ${job.title} at ${job.organization}`}
              >
                <div className="w-full h-[200px] p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                  <div className="flex items-center mb-2">
                    <Image
                              src={'/images/download.jpeg'}
                      alt={`${''} logo`}
                      width={48}
                      height={48}
                      className="rounded-full mr-4 border-2 border-indigo-100 p-1"
                    />
                    <div className="flex-1 overflow-hidden">
                          <h3 className="text-lg font-bold text-[#1d1d1f] tracking-tight truncate">{job.title}</h3>
                          <p className="text-xs font-medium text-[#6e6e73] truncate">{job.organization}</p>
                    </div>
                  </div>
                      <div className="flex-1 text-xs text-[#6e6e73] space-y-1 overflow-hidden">
                    <div className="flex flex-wrap gap-2 mb-1">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold">{job.employment_type}</span>
                      {job.role_category && job.role_category.trim().toLowerCase() !== job.employment_type.trim().toLowerCase() && (
                        <span className="bg-green-50 text-green-700 px-2 py-1 rounded text-xs font-semibold">{job.role_category}</span>
                      )}
                    </div>
                    <div className="truncate font-normal">Category: {job.role_category}</div>
                            <div className="truncate font-normal">Salary: {job.salary_currency}{job.salary_value} /{job.salary_unit_text}</div>
                            <div className="truncate font-normal">Location: {job.city}, {job.country}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
              </>
            )}
          </div>
      </main>
      </div>
    </>
  );
}