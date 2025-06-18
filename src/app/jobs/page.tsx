// app/page.tsx

import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image'; // Import Image for company logos

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
}

export const dynamic = 'force-dynamic';

export default async function AllJobs() {
  const data = await fetch('http://13.232.100.77/api/jobs');
  const jobs: Jobs[] = await data.json();

  // Mocking additional fields if not provided by API
  const enrichedJobs = jobs.map((job) => ({
    ...job,
    employmentType: job.employment_type || 'Full Time',
    salary: job.salary_value ? `${job.salary_currency}${job.salary_value} /${job.salary_unit_text}` : 'Competitive',
    logo: job.logo || '/images/default-logo.png', // Fallback to a local default logo
    location: job.location_id ? { city: job.city, country: job.country } : { city: 'Unknown City', country: 'India' },
  }));

  const featuredJobs = enrichedJobs.slice(0, 3); // First 3 jobs as featured
  const latestJobs = enrichedJobs.slice(3, 100); // Next 3 jobs as latest

  return (
    <>
      <Head>
        <title>All Jobs - Find Your Next Career Opportunity</title>
        <meta
          name="description"
          content="Explore a wide range of job opportunities in various categories. Find featured and latest jobs in India with detailed information on roles, organizations, and locations."
        />
      </Head>

      <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
        {/* Search Bar and Filters */}
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8 bg-white p-6 rounded-xl shadow-md">
          <div className="relative w-full sm:w-1/2">
            <input
              type="text"
              placeholder="Job Title, Keyword"
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
              aria-label="Search by job title or keyword"
            />
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
          </div>
          <div className="relative w-full sm:w-1/4">
            <input
              type="text"
              placeholder="Enter Location"
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
              aria-label="Search by location"
            />
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">📍</span>
          </div>
          <button className="w-full sm:w-auto px-6 py-3 text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-100 transition-all duration-300">
            Filter
          </button>
          <button className="w-full sm:w-auto px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300">
            Search Job
          </button>
        </div>

        {/* Popular Tags */}
        <div className="mb-8">
          <span className="text-sm font-semibold text-gray-700">Popular Tags:</span>
          <div className="flex flex-wrap gap-3 mt-3">
            {[
              'Programme Management roles',
              'Education roles',
              'Communications roles',
              'Public Health roles',
              'Finance roles',
              'M&E roles',
              'Partnerships roles',
              'CSR roles',
              'Climate roles',
              'Public Policy roles',
            ].map((tag) => (
              <Link
                key={tag}
                href={`/jobs?tag=${encodeURIComponent(tag)}`}
                className="px-4 py-2 text-sm text-indigo-600 bg-indigo-50 rounded-full hover:bg-indigo-100 transition-all duration-300"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>

        {/* Featured Jobs */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-[#1a2a3a] leading-snug mb-6">Featured Jobs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredJobs.map((job) => (
              <Link
                key={job.slug}
                href={`/jobs/${job.slug}`}
                className="block"
                aria-label={`View details for ${job.title} at ${job.organization}`}
              >
                <div className="w-full h-[200px] p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                  <div className="flex items-center mb-2">
                    <Image
                      src={'/images/default-logo.png'} // Use dynamic logo with fallback
                      alt={`${''} logo`}
                      width={48}
                      height={48}
                      className="rounded-full mr-4 border-2 border-indigo-100 p-1"
                    />
                    <div className="flex-1 overflow-hidden">
                      <h3 className="text-lg font-bold text-gray-900 tracking-tight truncate">{job.title}</h3>
                      <p className="text-xs font-medium text-gray-500 truncate">{job.organization}</p>
                    </div>
                  </div>
                  <div className="flex-1 text-xs text-gray-600 space-y-1 overflow-hidden">
                    <div className="flex items-center">
                      <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded truncate font-semibold">{job.employmentType}</span>
                    </div>
                    <div className="truncate font-normal">Category: {job.role_category}</div>
                    <div className="truncate font-normal">Salary: {job.salary}</div>
                    <div className="truncate font-normal">Location: {job.city ? `${job.city}, ${job.country}` : job.country}</div>
                  </div>
                  <div className="text-xs text-gray-500 mt-2 truncate font-normal">
                    Deadline: {job.valid_through
                        ? new Date(job.valid_through).toISOString().split("T")[0]
                        : "N/A"}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Latest Jobs */}
        <section>
          <h2 className="text-3xl font-bold tracking-tight text-[#1a2a3a] leading-snug mb-6">Latest Jobs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestJobs.map((job) => (
              <Link
                key={job.slug}
                href={`/jobs/${job.slug}`}
                className="block"
                aria-label={`View details for ${job.title} at ${job.organization}`}
              >
                <div className="w-full h-[200px] p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                  <div className="flex items-center mb-2">
                    <Image
                      src={'/images/default-logo.png'} // Use dynamic logo with fallback
                      alt={`${''} logo`}
                      width={48}
                      height={48}
                      className="rounded-full mr-4 border-2 border-indigo-100 p-1"
                    />
                    <div className="flex-1 overflow-hidden">
                      <h3 className="text-lg font-bold text-gray-900 tracking-tight truncate">{job.title}</h3>
                      <p className="text-xs font-medium text-gray-500 truncate">{job.organization}</p>
                    </div>
                  </div>
                  <div className="flex-1 text-xs text-gray-600 space-y-1 overflow-hidden">
                    <div className="flex items-center">
                      <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded truncate font-semibold">{job.employmentType}</span>
                    </div>
                    <div className="truncate font-normal">Category: {job.role_category}</div>
                    <div className="truncate font-normal">Salary: {job.salary}</div>
                    <div className="truncate font-normal">Location: {job.city ? `${job.city}, ${job.country}` : job.country}</div>
                  </div>
                  <div className="text-xs text-gray-500 mt-2 truncate font-normal">
                    Deadline: {job.valid_through
                        ? new Date(job.valid_through).toISOString().split("T")[0]
                        : "N/A"}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}