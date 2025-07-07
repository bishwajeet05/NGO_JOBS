"use client";

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FaSearch, FaMapMarkerAlt, FaCalendarAlt, FaBuilding, FaMoneyBillWave, FaClock, FaStar, FaTimesCircle, FaSlidersH, FaRegBookmark } from 'react-icons/fa';
import { CalendarIcon, BriefcaseIcon, ClipboardDocumentListIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import SearchBar from '../components/SearchBar';
import JobFilter from '../components/JobFilter';

interface Job {
  id: string;
  title: string;
  slug: string;
  description: string;
  qualifications: string;
  role_category: string;
  employment_type: string;
  experience_min: number;
  salary_currency: string;
  salary_value: string;
  salary_unit_text: string;
  date_posted: string;
  valid_through: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  how_to_apply: string;
  organization: string;
  organization_type: string;
  location_id: string | null;
  country: string;
  state: string;
  city: string;
  pin_code: string;
  street_address: string;
  applylink: string;
  employer_id: string | null;
  user_id: string | null;
  featured: boolean;
}

export default function JobsClient() {
  const searchParams = useSearchParams();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [employmentType, setEmploymentType] = useState<string[]>([]);
  const [experience, setExperience] = useState<string[]>([]);
  const [qualifications, setQualifications] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [salaryRange, setSalaryRange] = useState<[number, number]>([0, 1000000]);
  const [postedDate, setPostedDate] = useState<string>('');
  const [jobStatus, setJobStatus] = useState<string[]>([]);
  const [country, setCountry] = useState('India');
  const [stateVal, setStateVal] = useState('');
  const [city, setCity] = useState('');
  const [activeOnly, setActiveOnly] = useState(false);
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [openOnly, setOpenOnly] = useState(false);
  const filterSidebarRef = useRef<HTMLDivElement>(null);
  const jobsListRef = useRef<HTMLDivElement>(null);
  const [sidebarFixed, setSidebarFixed] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Fetch jobs on mount
  useEffect(() => {
    fetchJobs();
  }, []);

  // Set initial state from query params
  useEffect(() => {
    if (searchParams) {
      const searchQ = searchParams.get('search');
      const locationQ = searchParams.get('location');
      const categoryQ = searchParams.get('category');
      if (searchQ) setSearch(searchQ);
      if (locationQ) setLocation(locationQ);
      if (categoryQ) setCategory(categoryQ);
    }
  }, [searchParams]);

  useEffect(() => {
    if (!jobsListRef.current) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        setSidebarFixed(!entry.isIntersecting);
      },
      { root: null, threshold: 0 }
    );
    observer.observe(jobsListRef.current);
    return () => observer.disconnect();
  }, []);

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

    // Location filter (city, state, country) - support multi-select
    if (Array.isArray(city) && city.length > 0 && !city.map(c => c.toLowerCase()).includes(job.city.toLowerCase())) {
      return false;
    }
    if (!Array.isArray(city) && city && job.city.toLowerCase() !== city.toLowerCase()) {
      return false;
    }
    if (Array.isArray(stateVal) && stateVal.length > 0 && !stateVal.map(s => s.toLowerCase()).includes(job.state.toLowerCase())) {
      return false;
    }
    if (!Array.isArray(stateVal) && stateVal && job.state.toLowerCase() !== stateVal.toLowerCase()) {
      return false;
    }
    if (country && job.country.toLowerCase() !== country.toLowerCase()) {
      return false;
    }

    // Category filter - support multi-select
    if (Array.isArray(category) && category.length > 0 && !category.includes(job.role_category)) {
      return false;
    }
    if (!Array.isArray(category) && category && category !== 'Jobs' && job.role_category !== category) {
      return false;
    }

    // Employment type filter
    if (employmentType.length > 0 && !employmentType.includes(job.employment_type)) {
      return false;
    }

    // Experience filter (normalize values)
    if (experience.length > 0) {
      const jobExp = job.experience_min;
      const hasMatchingExp = experience.some((exp: string) => {
        switch (exp) {
          case '0-1': return jobExp <= 1;
          case '2-4': return jobExp >= 2 && jobExp <= 4;
          case '5+': return jobExp >= 5;
          // fallback for old values
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
    if (Array.isArray(qualifications) && qualifications.length > 0) {
      const jobQuals = job.qualifications.toLowerCase();
      const hasMatchingQual = qualifications.some((qual: string) => 
        jobQuals.includes(qual.toLowerCase())
      );
      if (!hasMatchingQual) return false;
    }

    // Skills filter
    if (Array.isArray(skills) && skills.length > 0) {
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
        case '1': // Last 24 hours
          filterDate.setDate(filterDate.getDate() - 1);
          break;
        case '7': // Last 7 days
          filterDate.setDate(filterDate.getDate() - 7);
          break;
        case '30': // Last 30 days
          filterDate.setDate(filterDate.getDate() - 30);
          break;
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
    if (activeOnly && !job.is_active) {
      return false;
    }
    if (featuredOnly && !job.featured) {
      return false;
    }
    // Open only (not expired)
    if (openOnly && new Date(job.valid_through) < new Date()) {
      return false;
    }

    return true;
  });

  // Handler for JobFilter changes
  const handleFilterChange = (newFilters: any) => {
    if (newFilters.employmentType !== undefined) setEmploymentType(newFilters.employmentType ? [newFilters.employmentType] : []);
    if (newFilters.experience !== undefined) setExperience(newFilters.experience ? [newFilters.experience] : []);
    if (newFilters.qualifications !== undefined) setQualifications(newFilters.qualifications);
    if (newFilters.skills !== undefined) setSkills(newFilters.skills);
    if (newFilters.minSalary !== undefined || newFilters.maxSalary !== undefined) {
      setSalaryRange([
        newFilters.minSalary ? parseInt(newFilters.minSalary) : 0,
        newFilters.maxSalary ? parseInt(newFilters.maxSalary) : 1000000
      ]);
    }
    if (newFilters.postedDate !== undefined) setPostedDate(newFilters.postedDate);
    if (newFilters.country !== undefined) setCountry(newFilters.country);
    if (newFilters.state !== undefined) setStateVal(newFilters.state);
    if (newFilters.city !== undefined) setCity(newFilters.city);
    if (newFilters.category !== undefined) setCategory(newFilters.category);
    if (newFilters.activeOnly !== undefined) setActiveOnly(newFilters.activeOnly);
    if (newFilters.featuredOnly !== undefined) setFeaturedOnly(newFilters.featuredOnly);
    if (newFilters.openOnly !== undefined) setOpenOnly(newFilters.openOnly);
  };

  // Compute unique city and state options from jobs
  const cityOptions = Array.from(new Set(jobs.map(job => job.city).filter(Boolean)));
  const stateOptions = Array.from(new Set(jobs.map(job => job.state).filter(Boolean)));

  // Compute unique department and work mode options from jobs
  const departmentOptions = Array.from(new Set(jobs.map(job => job.role_category).filter(Boolean)));
  const workModeOptions = Array.from(new Set(jobs.map(job => job.employment_type).filter(Boolean)));

  // Helper to check if any filter is active
  const isAnyFilterActive = () => {
    return (
      search ||
      location ||
      category ||
      employmentType.length > 0 ||
      experience.length > 0 ||
      qualifications.length > 0 ||
      skills.length > 0 ||
      salaryRange[0] > 0 ||
      salaryRange[1] < 1000000 ||
      postedDate ||
      country !== 'India' ||
      stateVal ||
      city ||
      activeOnly ||
      featuredOnly ||
      openOnly
    );
  };

  // Handler to clear all filters
  const handleClearFilters = () => {
    setSearch('');
    setLocation('');
    setCategory('');
    setEmploymentType([]);
    setExperience([]);
    setQualifications([]);
    setSkills([]);
    setSalaryRange([0, 1000000]);
    setPostedDate('');
    setCountry('India');
    setStateVal('');
    setCity('');
    setActiveOnly(false);
    setFeaturedOnly(false);
    setOpenOnly(false);
  };

  // Show loading state
  if (loading) {
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Find Your Dream Job</h1>
          <p className="text-gray-600">Discover opportunities in the NGO sector</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 w-full">
          <SearchBar 
            search={search}
            location={location}
            category={category}
            onSearch={(searchVal, locationVal, categoryVal) => {
              setSearch(searchVal);
              setLocation(locationVal);
              setCategory(categoryVal);
            }}
            onFilterClick={() => setMobileFilterOpen(true)}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filter Sidebar */}
          <div
            className={`hidden lg:block lg:col-span-1${sidebarFixed ? ' fixed top-0 left-0 w-full max-w-xs z-40' : ''}`}
            ref={filterSidebarRef}
            style={sidebarFixed ? { left: filterSidebarRef.current?.getBoundingClientRect().left || 0 } : {}}
          >
            {isAnyFilterActive() && (
              <button
                onClick={handleClearFilters}
                className="flex items-center mb-4 text-sm text-red-600 hover:text-red-800 font-semibold"
                title="Clear all filters"
              >
                <FaTimesCircle className="mr-2 w-5 h-5" /> Remove All Filters
              </button>
            )}
            <JobFilter 
              onChange={handleFilterChange}
              filters={{
                keyword: search,
                country: country,
                state: stateVal,
                city: city,
                category: category,
                employmentType: employmentType[0] || '',
                experience: experience[0] || '',
                qualifications: qualifications,
                skills: skills,
                minSalary: salaryRange[0] ? salaryRange[0].toString() : '',
                maxSalary: salaryRange[1] ? salaryRange[1].toString() : '',
                postedDate: postedDate,
                activeOnly: activeOnly,
                featuredOnly: featuredOnly,
                openOnly: openOnly
              }}
              cityOptions={cityOptions}
              stateOptions={stateOptions}
              departmentOptions={departmentOptions}
              workModeOptions={workModeOptions}
              filterSidebarRef={filterSidebarRef}
              mobileFilterOpen={mobileFilterOpen}
              setMobileFilterOpen={setMobileFilterOpen}
            />
          </div>

          {/* Job Listings */}
          <div className="lg:col-span-3" ref={jobsListRef}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {filteredJobs.length} {filteredJobs.length === 1 ? 'Job' : 'Jobs'} Found
              </h2>
              <div className="text-sm text-gray-500">
                Showing {filteredJobs.length} of {jobs.length} jobs
              </div>
            </div>

            {filteredJobs.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <FaSearch className="mx-auto h-12 w-12" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
                <p className="text-gray-500">Try adjusting your search criteria or filters</p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredJobs.map((job) => (
                  <Link
                    key={job.id}
                    href={`/jobs/${job.slug}`}
                    className="relative block bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-5 md:p-6 hover:shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
                    tabIndex={0}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-xl font-semibold text-gray-900">
                            <Link href={`/jobs/${job.slug}`} className="hover:text-blue-600 transition-colors">
                              {job.title}
                            </Link>
                            {job.featured && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 ml-2 align-middle">
                                <FaStar className="w-3 h-3 mr-1" />
                                Featured
                              </span>
                            )}
                          </h3>
                        </div>
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center text-gray-600">
                            <FaBuilding className="w-4 h-4 mr-2" />
                            <span className="text-base font-medium">{job.organization}</span>
                          </div>
                        </div>
                        <div className="flex items-center text-gray-600 mb-1">
                          <FaMapMarkerAlt className="w-4 h-4 mr-2" />
                          <span>{job.city}, {job.state}, {job.country}</span>
                        </div>
                        <div className="flex items-center text-gray-700 text-base font-medium mb-1">
                          <CalendarIcon className="h-4 w-4 mr-1 text-gray-500" />
                          <span>Valid Through: <b>{new Date(job.valid_through).toLocaleDateString()}</b></span>
                        </div>
                      </div>
                      <div className="flex flex-col items-center ml-4">
                        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-2xl font-bold text-blue-600 border border-gray-200 mb-2">
                          {/* If you have job.logo, use <img src={job.logo} ... /> here. Otherwise, fallback to first letter */}
                          {job.organization && job.organization.length > 0 ? job.organization[0].toUpperCase() : <FaBuilding className="w-6 h-6 text-gray-400" />}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 text-gray-700 mt-1 mb-2">
                      <ClipboardDocumentListIcon className="h-4 w-4 mt-0.5 text-gray-500 flex-shrink-0" />
                      <p className="line-clamp-2">{job.description}</p>
                    </div>
                    <div className="flex flex-row flex-wrap items-center gap-2 mb-2 w-full">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        <BriefcaseIcon className="h-4 w-4 mr-1 text-blue-500" />
                        {job.employment_type}
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                        <CalendarIcon className="h-4 w-4 mr-1 text-purple-500" />
                        {job.experience_min}+ yrs
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        <CurrencyDollarIcon className="h-4 w-4 mr-1 text-green-500" />
                        ₹{parseInt(job.salary_value).toLocaleString()} / {job.salary_unit_text.toLowerCase()}
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700">
                        <CalendarIcon className="h-4 w-4 mr-1 text-gray-500" />
                        Posted {new Date(job.date_posted).toLocaleDateString()}
                      </span>
                      <div className="flex-1 flex justify-end">
                        <button
                          type="button"
                          className="inline-flex items-center px-2 py-2 rounded-md bg-white ml-2 focus:outline-none group"
                          tabIndex={-1}
                          aria-label="Save job"
                          style={{ color: '#0071E3' }}
                          onClick={e => { e.preventDefault(); e.stopPropagation(); /* TODO: Save job logic */ }}
                        >
                          <FaRegBookmark className="w-5 h-5 transition-colors group-hover:opacity-80" style={{ color: '#0071E3' }} />
                        </button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 