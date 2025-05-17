// app/page.tsx

import { getJobPosts } from '@/lib/post';
import Link from 'next/link';

interface Jobs {
  id: string;
  title: string;
  organization: string;
  category: string;
  postdate: string;
}

async function getJobs() {
  const posts = await getJobPosts();
  const jobs: Jobs[] = JSON.parse(JSON.stringify(posts));
  return jobs;
}

export default async function AllJobs() {
  const jobs = await getJobs();

  return (
    <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-black mb-6">All Jobs</h1>
      <ul className="space-y-4">
        {jobs.map((jobs) => (
          <li key={jobs.id} className="border-b border-gray-200 pb-4 last:border-0">
            <Link href={`/jobs/${jobs.id}`} className="block hover:bg-gray-50 p-4 rounded-lg transition-colors">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">{jobs.title}</h2>
                <div className="mt-2 flex justify-between items-center text-sm text-gray-600">
                  <span>Category: {jobs.category}</span>
                  <span>Post Date: {new Date(jobs.postdate).toLocaleDateString()}</span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}



/*
"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// Mock data (replace with API calls in a real app)
const mockJobs = Array.from({ length: 100 }, (_, i) => ({
  id: `${i + 1}`,
  title: ["UI/UX Designer", "Full Stack Engineer", "Java Software Engineer", "Frontend Developer", "React Native Web Developer", "Senior System Engineer", "Product Manager", "Lead Quality Control QA"][i % 8],
  slug: `job-${i + 1}`,
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Recusandae architecto eveniet, dolor quo repellendus pariatur.",
  responsibilities: "Design and develop user interfaces.",
  qualifications: "Bachelor's degree in design or related field.",
  requirements: "3+ years of experience in UI/UX design.",
  career_prospects: "Opportunity to lead design projects.",
  role_category: "Design",
  role_type: "Individual Contributor",
  employment_type: ["FULL_TIME", "PART_TIME", "REMOTE"][i % 3],
  experience_min: 2,
  experience_max: 5,
  education_required: "Bachelor's degree",
  industry_type: ["All", "Software", "Finance", "Recruiting", "Management", "Advertising"][i % 6],
  department: "Engineering",
  key_skills: ["Adobe XD", "Figma", "Photoshop", "React", "NodeJS", "Python", "AWS"][(i % 7)],
  salary_currency: "USD",
  salary_value: [500, 800, 250][i % 3],
  salary_unit_text: "HOUR",
  date_posted: new Date(Date.now() - (i * 24 * 60 * 60 * 1000)).toISOString().split("T")[0],
  valid_through: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  organization_id: `${i % 3 + 1}`,
  location_id: "1",
  is_remote: i % 3 === 2,
  is_active: true,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  organization: {
    name: ["LinkedIn", "Adobe Illustrator", "Bing Search"][i % 3],
    logo_url: "https://via.placeholder.com/32",
  },
  location: {
    locality: "New York",
    region: "NY",
    country: "US",
  },
}));

const mockBlogPosts = [
  {
    id: "1",
    title: "Interview Question: Why Don’t You Have a Degree?",
    description: "Learn how to respond if an interviewer asks you why you don’t have a degree, and read example answers that can help you craft.",
    author: "William Kend",
    date: "06 September",
    readTime: "9 mins to read",
    image: "https://via.placeholder.com/300x200",
    category: "News",
  },
  {
    id: "2",
    title: "21 Job Interview Tips: How To Make a Great Impression",
    description: "Our mission is to create the world’s most sustainable healthcare company by creating high-quality healthcare products in iconic, sustainable packaging.",
    author: "Sarah Harding",
    date: "06 September",
    readTime: "8 mins to read",
    image: "https://via.placeholder.com/300x200",
    category: "Events",
  },
  {
    id: "3",
    title: "39 Strengths and Weaknesses To Discuss in a Job Interview",
    description: "Our mission is to create the world’s most sustainable healthcare company by creating high-quality healthcare products in iconic, sustainable packaging.",
    author: "Steven Jobs",
    date: "06 September",
    readTime: "6 mins to read",
    image: "https://via.placeholder.com/300x200",
    category: "News",
  },
];

type FilterForm = {
  industry: string;
  salaryRange: string;
  keyword: string;
  position: string;
  experienceLevel: string;
  locationType: string;
  jobPosted: string;
  jobType: string;
  sortBy: string;
  jobsPerPage: string; // Added jobsPerPage to the type
};

export default function JobsPage() {
  const [jobs, setJobs] = useState(mockJobs);
  const [filteredJobs, setFilteredJobs] = useState(mockJobs);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage, setJobsPerPage] = useState(12);
  const { register, watch, handleSubmit, reset, setValue } = useForm<FilterForm>({
    defaultValues: {
      industry: "All",
      salaryRange: "",
      keyword: "",
      position: "",
      experienceLevel: "",
      locationType: "",
      jobPosted: "All",
      jobType: "",
      sortBy: "Newest Post",
    },
  });

  // Auto-scroll for blog section
  const blogRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const interval = setInterval(() => {
      if (blogRef.current) {
        const { scrollLeft, clientWidth, scrollWidth } = blogRef.current;
        if (scrollLeft + clientWidth >= scrollWidth) {
          blogRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          blogRef.current.scrollBy({ left: clientWidth, behavior: "smooth" });
        }
      }
    }, 3000); // Scroll every 3 seconds
    return () => clearInterval(interval);
  }, []);

  // Watch form values for filtering
  const formValues = watch();

  useEffect(() => {
    let filtered = [...mockJobs];

    // Filter by industry
    if (formValues.industry && formValues.industry !== "All") {
      filtered = filtered.filter((job) => job.industry_type === formValues.industry);
    }

    // Filter by salary range
    if (formValues.salaryRange) {
      const [min, max] = formValues.salaryRange.split("-").map(Number);
      filtered = filtered.filter((job) => job.salary_value >= min && (max ? job.salary_value <= max : true));
    }

    // Filter by keyword
    if (formValues.keyword) {
      filtered = filtered.filter((job) => job.key_skills.toLowerCase().includes(formValues.keyword.toLowerCase()));
    }

    // Filter by position
    if (formValues.position) {
      filtered = filtered.filter((job) => {
        if (formValues.position === "Senior") return job.experience_min >= 5;
        if (formValues.position === "Junior") return job.experience_max <= 3;
        return true;
      });
    }

    // Filter by experience level (using experience_min/max)
    if (formValues.experienceLevel) {
      const [min, max] = formValues.experienceLevel.split("-").map(Number);
      filtered = filtered.filter((job) => job.experience_min >= min && job.experience_max <= max);
    }

    // Filter by location type (onsite/remote)
    if (formValues.locationType) {
      filtered = filtered.filter((job) => {
        if (formValues.locationType === "Remote") return job.is_remote;
        if (formValues.locationType === "Onsite") return !job.is_remote;
        return true;
      });
    }

    // Filter by job posted
    if (formValues.jobPosted && formValues.jobPosted !== "All") {
      const days = parseInt(formValues.jobPosted);
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - days);
      filtered = filtered.filter((job) => new Date(job.date_posted) >= cutoffDate);
    }

    // Filter by job type
    if (formValues.jobType) {
      filtered = filtered.filter((job) => job.employment_type === formValues.jobType);
    }

    // Sort by
    if (formValues.sortBy === "Newest Post") {
      filtered.sort((a, b) => new Date(b.date_posted).getTime() - new Date(a.date_posted).getTime());
    }

    setFilteredJobs(filtered);
    setCurrentPage(1); // Reset to first page on filter change
  }, [formValues]);

  // Pagination
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="w-full">
      {/* Header Section }
      <section className="bg-gradient-to-r from-blue-50 to-blue-100 py-8">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-blue-900 mb-2">{filteredJobs.length} Jobs Available Now</h1>
          <p className="text-gray-600 mb-6">
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Vero repellendus magni, atque delectus molestias quis?
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <select className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
              <option>Industry</option>
              <option>All</option>
              <option>Software</option>
              <option>Finance</option>
              <option>Recruiting</option>
              <option>Management</option>
              <option>Advertising</option>
            </select>
            <select className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
              <option>Location</option>
              <option>New York, US</option>
            </select>
            <input
              type="text"
              placeholder="Your keyword..."
              className="p-2 border rounded-lg flex-grow focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Main Content }
      <section className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-6">
        {/* Filters }
        <aside className="lg:w-1/4 bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-blue-900">Advance Filter</h2>
            <button onClick={() => reset()} className="text-blue-600 hover:underline">
              Reset
            </button>
          </div>

          {/* Location }
          <div className="mb-6">
            <select
              {...register("locationType")}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Onsite/Remote</option>
              <option value="Onsite">Onsite</option>
              <option value="Remote">Remote</option>
            </select>
          </div>

          {/* Industry }
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-blue-900 mb-2">Industry</h3>
            <div className="space-y-2">
              {["All", "Software", "Finance", "Recruiting", "Management", "Advertising"].map((industry) => (
                <label key={industry} className="flex items-center gap-2">
                  <input
                    type="radio"
                    {...register("industry")}
                    value={industry}
                    className="h-4 w-4 text-blue-600"
                  />
                  <span className="text-sm">{industry}</span>
                  <span className="ml-auto text-gray-500 text-sm">
                    {industry === "All" ? mockJobs.length : mockJobs.filter((job) => job.industry_type === industry).length}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Salary Range }
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-blue-900 mb-2">Salary Range</h3>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm">$0</span>
              <input
                type="range"
                min="0"
                max="500"
                {...register("salaryRange")}
                className="w-full"
                onChange={(e) => {
                  const value = e.target.value;
                  setValue("salaryRange", `${value}-500`);
                }}
              />
              <span className="text-sm">$500</span>
            </div>
            <div className="space-y-2">
              {["0-200", "200-400", "400-600", "600-800", "800-1000"].map((range) => (
                <label key={range} className="flex items-center gap-2">
                  <input
                    type="radio"
                    {...register("salaryRange")}
                    value={range}
                    className="h-4 w-4 text-blue-600"
                  />
                  <span className="text-sm">{`$${range.replace("-", " - $")}/Hour`}</span>
                  <span className="ml-auto text-gray-500 text-sm">
                    {mockJobs.filter((job) => {
                      const [min, max] = range.split("-").map(Number);
                      return job.salary_value >= min && job.salary_value <= max;
                    }).length}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Popular Keyword }
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-blue-900 mb-2">Popular Keyword</h3>
            <div className="space-y-2">
              {["Software", "Developer", "Web"].map((keyword) => (
                <label key={keyword} className="flex items-center gap-2">
                  <input
                    type="radio"
                    {...register("keyword")}
                    value={keyword}
                    className="h-4 w-4 text-blue-600"
                  />
                  <span className="text-sm">{keyword}</span>
                  <span className="ml-auto text-gray-500 text-sm">
                    {mockJobs.filter((job) => job.key_skills.includes(keyword)).length}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Position }
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-blue-900 mb-2">Position</h3>
            <div className="space-y-2">
              {["Senior", "Junior"].map((position) => (
                <label key={position} className="flex items-center gap-2">
                  <input
                    type="radio"
                    {...register("position")}
                    value={position}
                    className="h-4 w-4 text-blue-600"
                  />
                  <span className="text-sm">{position}</span>
                  <span className="ml-auto text-gray-500 text-sm">
                    {position === "Senior"
                      ? mockJobs.filter((job) => job.experience_min >= 5).length
                      : mockJobs.filter((job) => job.experience_max <= 3).length}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Job Posted }
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-blue-900 mb-2">Job Posted</h3>
            <div className="space-y-2">
              {["All", "1", "7", "30"].map((days) => (
                <label key={days} className="flex items-center gap-2">
                  <input
                    type="radio"
                    {...register("jobPosted")}
                    value={days}
                    className="h-4 w-4 text-blue-600"
                  />
                  <span className="text-sm">{days === "All" ? "All" : `${days} day${days === "1" ? "" : "s"}`}</span>
                  <span className="ml-auto text-gray-500 text-sm">
                    {days === "All"
                      ? mockJobs.length
                      : mockJobs.filter((job) => {
                          const cutoffDate = new Date();
                          cutoffDate.setDate(cutoffDate.getDate() - parseInt(days));
                          return new Date(job.date_posted) >= cutoffDate;
                        }).length}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Job Type }
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-blue-900 mb-2">Job Type</h3>
            <div className="space-y-2">
              {["FULL_TIME", "PART_TIME", "REMOTE"].map((type) => (
                <label key={type} className="flex items-center gap-2">
                  <input
                    type="radio"
                    {...register("jobType")}
                    value={type}
                    className="h-4 w-4 text-blue-600"
                  />
                  <span className="text-sm">{type.replace("_", " ").charAt(0).toUpperCase() + type.replace("_", " ").slice(1).toLowerCase()}</span>
                  <span className="ml-auto text-gray-500 text-sm">
                    {mockJobs.filter((job) => job.employment_type === type).length}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Job Listings }
        <div className="lg:w-3/4">
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600">
              Showing {indexOfFirstJob + 1}-{Math.min(indexOfLastJob, filteredJobs.length)} of {filteredJobs.length} jobs
            </p>
            <div className="flex gap-2">
              <select
                {...register("jobsPerPage")}
                onChange={(e) => setJobsPerPage(Number(e.target.value))}
                className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="12">Show: 12</option>
                <option value="24">Show: 24</option>
                <option value="48">Show: 48</option>
              </select>
              <select
                {...register("sortBy")}
                className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="Newest Post">Sort by: Newest Post</option>
                <option value="Oldest Post">Sort by: Oldest Post</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentJobs.map((job) => (
              <div key={job.id} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <img src={job.organization.logo_url} alt={job.organization.name} className="h-8 w-8 rounded-full" />
                    <div>
                      <h3 className="text-lg font-semibold text-blue-900">{job.title}</h3>
                      <p className="text-sm text-gray-600">{job.organization.name}</p>
                    </div>
                  </div>
                  <span className="text-green-500 text-sm">New</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  <span className="inline-flex items-center">
                    <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {`${job.location.locality}, ${job.location.region}, ${job.location.country}`}
                  </span>
                </p>
                <p className="text-sm text-gray-600 mb-2">{job.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {job.key_skills.split(",").map((skill, idx) => (
                    <span key={idx} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                      {skill.trim()}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-lg font-semibold text-blue-900">${job.salary_value}/{job.salary_unit_text.toLowerCase()}</p>
                  <button className="bg-blue-100 text-blue-600 px-3 py-1 rounded-lg hover:bg-blue-200 transition-colors">
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination }
          <div className="flex justify-center mt-6">
            <nav className="flex items-center gap-2">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 disabled:opacity-50"
              >
                &larr;
              </button>
              {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => paginate(pageNum)}
                    className={`p-2 rounded-full ${
                      currentPage === pageNum ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 disabled:opacity-50"
              >
                &rarr;
              </button>
            </nav>
          </div>
        </div>
      </section>

      {/* News and Blog Section }
      <section className="bg-gray-50 py-8">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-blue-900 mb-2">News and Blog</h2>
          <p className="text-gray-600 mb-6">Get the latest news, updates and tips</p>
          <div ref={blogRef} className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-6">
            {mockBlogPosts.map((post) => (
              <div key={post.id} className="min-w-[300px] sm:min-w-[400px] bg-white rounded-lg shadow-sm snap-center">
                <img src={post.image} alt={post.title} className="w-full h-48 object-cover rounded-t-lg" />
                <div className="p-4">
                  <span className="text-blue-600 text-sm">{post.category}</span>
                  <h3 className="text-lg font-semibold text-blue-900 mt-2">{post.title}</h3>
                  <p className="text-sm text-gray-600 mt-2">{post.description}</p>
                  <div className="flex items-center gap-2 mt-4">
                    <span className="text-sm text-gray-600">{post.author}</span>
                    <span className="text-sm text-gray-600">{post.date}</span>
                    <span className="text-sm text-gray-600">{post.readTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}*/