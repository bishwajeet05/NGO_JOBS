// app/page.tsx


import Link from 'next/link';

interface Jobs {
  id: string;
  slug: string;
  title: string;
  organization: string;
  category: string;
  postdate: string;
}

export const dynamic = 'force-dynamic';

export default async function AllJobs() {
  const data = await fetch('http://13.232.100.77/api/jobs');
  const jobs: Jobs[] = await data.json();

  // Mocking featured and latest jobs for now (you can adjust logic to filter jobs)
  const featuredJobs = jobs.slice(0, 3); // First 3 jobs as featured
  const latestJobs = jobs.slice(3, 6); // Next 3 jobs as latest

  return (
    <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search Bar and Filters */}
      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
        <div className="relative w-full sm:w-1/2">
          <input
            type="text"
            placeholder="Job Title, Keyword"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
        </div>
        <div className="relative w-full sm:w-1/4">
          <input
            type="text"
            placeholder="Enter Location"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">📍</span>
        </div>
        <button className="w-full sm:w-auto px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100">
          Filter
        </button>
        <button className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Search Job
        </button>
      </div>

      {/* Popular Tags */}
      <div className="mb-6">
        <span className="text-sm font-semibold text-gray-700">Popular Tag:</span>
        <div className="flex flex-wrap gap-2 mt-2">
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
            <span
              key={tag}
              className="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded-full hover:bg-gray-100 cursor-pointer"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Featured Jobs */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Featured Jobs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredJobs.map((job) => (
            <Link key={job.slug} href={`/jobs/${job.slug}`} className="block">
              <div className="p-4 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="px-2 py-1 text-xs text-green-700 bg-green-100 rounded">
                    FULL TIME
                  </span>
                  <span className="px-2 py-1 text-xs text-gray-600">Salary: IN JD</span>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-600">
                  <span className="mr-2">💼</span>
                  <span>{job.organization}</span>
                </div>
                <div className="mt-1 flex items-center text-sm text-gray-600">
                  <span className="mr-2">📍</span>
                  <span>India</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest Jobs */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Latest Jobs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestJobs.map((job) => (
            <Link key={job.slug} href={`/jobs/${job.slug}`} className="block">
              <div className="p-4 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="px-2 py-1 text-xs text-green-700 bg-green-100 rounded">
                    FULL TIME
                  </span>
                  <span className="px-2 py-1 text-xs text-gray-600">Salary: IN JD</span>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-600">
                  <span className="mr-2">💼</span>
                  <span>{job.organization}</span>
                </div>
                <div className="mt-1 flex items-center text-sm text-gray-600">
                  <span className="mr-2">📍</span>
                  <span>India</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}


/*
import { getJobPosts } from '@/lib/post';
import Link from 'next/link';

interface Jobs {
  id: string;
  slug:string;
  title: string;
  organization: string;
  category: string;
  postdate: string;
}
/*
async function getJobs() {
  const posts = await getJobPosts();
  const jobs: Jobs[] = JSON.parse(JSON.stringify(posts));
  return jobs;
}
*/
/*
export const dynamic = 'force-dynamic'
export default async function AllJobs() {
  //const jobs = await getJobs();
  const data = await fetch('http://13.232.100.77/api/jobs')
  const jobs: Jobs[] = await data.json()

  return (
    <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-black mb-6">All Jobs</h1>
      <ul className="space-y-4">
        {jobs.map((jobs) => (
          <li key={jobs.slug} className="border-b border-gray-200 pb-4 last:border-0">
            <Link href={`/jobs/${jobs.slug}`} className="block hover:bg-gray-50 p-4 rounded-lg transition-colors">
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
*/



