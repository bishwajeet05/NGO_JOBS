import { getJobPostBySlug, getJobPosts, getResultPosts, getAdmitPosts } from '@/lib/post';
import type { Metadata } from "next";
import Link from 'next/link';
import { 
  BriefcaseIcon, 
  ClockIcon, 
  CurrencyDollarIcon, 
  MapPinIcon, 
  BuildingOfficeIcon, 
  CalendarIcon,  
  GlobeAltIcon, 
  IdentificationIcon, 
  ClipboardDocumentListIcon 
} from '@heroicons/react/24/outline';
import { Clock } from 'lucide-react';

interface JobDetail {
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
}

interface Job {
  id: string;
  slug:string;
  title: string;
  organization: string;
  category: string;
  postdate: string;
}

async function getResult() {
  const posts = await getResultPosts();
  return posts;
}

async function getJobs() {
  const posts = await getJobPosts();
  return posts;
}

async function getAdmitCard() {
  const posts = await getAdmitPosts();
  return posts;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const id = (await params).id;
  const job = await getJobPostBySlug(id);

  if (!job) {
    return {
      title: "Job Not Found - Sarkari Naukri India",
      description: "The job you are looking for does not exist or has been removed. Explore Sarkari Naukri India for more job opportunities.",
    };
  }

  return {
    title: `${job.title} - Sarkari Naukri India`,
    description: job.summary,
    openGraph: {
      title: `${job.title} - Sarkari Naukri India`,
      description: job.summary,
      url: `https://example.com/jobs/${id}`,
      images: [
        {
          url: "https://example.com/og-image.jpg",
          width: 1200,
          height: 630,
          alt: job.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${job.title} - Sarkari Naukri India`,
      description: job.summary,
      images: ["https://example.com/og-image.jpg"],
    },
  };
}

export default async function JobDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const jid = (await params).id;
  console.log(jid);

  try {
    const job = await getJobPostBySlug(jid);
    const sidejobs = await getJobs();

    if (!job) {
      return (
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <h1 className="text-2xl font-bold mb-4">Job Not Found</h1>
            <p>The job you are looking for does not exist or has been removed.</p>
          </div>
        </div>
      );
    }

    const schemaMarkup = {
      "@context": "https://schema.org/",
      "@type": "JobPosting",
      "title": job.title,
      "description": job.summary,
      "hiringOrganization": {
        "@type": "Organization",
        "name": job.organization,
        "sameAs": job.officialWebsite,
      },
      "datePosted": job.startDate,
      "validThrough": job.lastDate,
      "employmentType": "Full-time",
      "jobLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "India",
        },
      },
      "baseSalary": {
        "@type": "MonetaryAmount",
        "currency": "INR",
        "value": {
          "@type": "QuantitativeValue",
          "value": job.payScale,
          "unitText": "MONTH",
        },
      },
      "applicationContact": {
        "@type": "ContactPoint",
        "contactType": "HR",
        "url": job.applylink,
      },
    };

    const breadcrumbMarkup = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://example.com",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Jobs",
          "item": "https://example.com/jobs",
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": job.title,
          "item": `https://example.com/jobs/${jid}`,
        },
      ],
    };

    const webpageMarkup = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": job.title,
      "description": job.summary,
      "url": `https://example.com/jobs/${jid}`,
    };

    return (
      <div className="container mx-auto px-4 py-8">
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbMarkup)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(webpageMarkup)}
        </script>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Content (2/3 width on desktop) */}
          <div className="md:col-span-2">
            {/* Header Section */}
            <div className="bg-white p-4 sm:p-6 mb-6 flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                {/* Left side: Title, Category, and Post Date */}
                <div className="flex flex-col gap-2">
                  <h1 className="text-3xl sm:text-3xl font-bold text-gray-800">{job.title}</h1>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-gray-600 text-xs sm:text-sm">
                    <div className="flex items-center gap-1">
                      <MapPinIcon className="h-4 w-4 text-gray-500" />
                      <span>
                      {[
                        job.city,
                        job.country,
                      ]
                        .filter(Boolean) // Remove falsy values (null, undefined, '')
                        .join(', ')}
                    </span>
                      <BriefcaseIcon className="h-4 w-4 sm:h-4 sm:w-5 text-gray-600" />
                      <span> {job.organization}</span>
                      </div>
                      <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 sm:h-4 sm:w-5 text-gray-600" />
                      <span> {new Date(job.date_posted).toLocaleDateString('en-IN')}</span>
                    </div>
                  </div>
                </div>
                {/* Right side: Apply Button */}
                <div className="flex items-start justify-end">
                  {job && job.applylink ? (
                    <a
                      href={job.applylink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-800 hover:bg-blue-700 text-white px-4 py-2 sm:py-3 rounded-md text-xs sm:text-sm font-medium transition-colors flex items-center justify-center"
                    >
                      Apply Online
                    </a>
                  ) : (
                    <span className="text-red-500">No application link available</span>
                  )}
                </div>
              </div>
              <div className="w-full border-t border-gray-300"></div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6 flex flex-col gap-4">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Employment Information</h2>
              <div className="flex flex-col gap-3 text-gray-600 text-sm">
                {/* Pair 1: Organization and Category */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <BuildingOfficeIcon className="h-5 w-5 text-gray-500" />
                    <span>
                      <strong>Organization :</strong> {job.organization || "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ClipboardDocumentListIcon className="h-5 w-5 text-gray-500" />
                    <span>
                      <strong>Category :</strong> {job.role_category || "N/A"}
                    </span>
                  </div>
                </div>

                {/* Pair 2: Salary and Date Posted */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <CurrencyDollarIcon className="h-5 w-5 text-gray-500" />
                    <span>
                      <strong>Salary :</strong> {job.salary_value || "N/A"}{" "}
                      {job.salary_currency}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ClockIcon className="h-5 w-5 text-gray-500" />
                    <span>
                      <strong>Job ID :</strong> {job.job_id || "N/A"}
                    </span>
                  </div>
                  
                </div>

                {/* Pair 3: Experience and Organization Type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5 text-gray-500" />
                    <span>
                      <strong>Experience :</strong> {job.experience_min || "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GlobeAltIcon className="h-5 w-5 text-gray-500" />
                    <span>
                      <strong>Organization Type :</strong> {job.organization_type || "N/A"}
                    </span>
                  </div>
                </div>

                {/* Pair 4: Location and Employment Type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <MapPinIcon className="h-5 w-5 text-gray-500" />
                    <span>
                      <strong>Location :</strong> {[
                        job.street_address,
                        job.city,
                        job.state,
                        job.country,
                      ]
                        .filter(Boolean) // Remove falsy values (null, undefined, '')
                        .join(', ')}
                    </span>

                  </div>
                  <div className="flex items-center gap-2">
                    <IdentificationIcon className="h-5 w-5 text-gray-500" />
                    <span>
                      <strong>Employment Type :</strong> {job.employment_type || "N/A"}
                    </span>
                  </div>
                </div>

                {/* Pair 5: Job ID and Valid Through */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                 <div className="flex items-center gap-2">
                  <BriefcaseIcon className="h-5 w-5 text-gray-500" />
                  <span>
                    <strong>Date Posted :</strong>{" "}
                    {job.date_posted
                      ? new Date(job.date_posted).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })
                      : "N/A"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5 text-gray-500" />
                  <span>
                    <strong>Valid Through :</strong>{" "}
                    {job.valid_through
                      ? new Date(job.valid_through).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })
                      : "N/A"}
                  </span>
                </div>
                </div>
              </div>
            </div>

            {/* Full Width Sections */}
            <div className="space-y-6 mt-6">
              {/* Vacancy Details */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-sm font-semibold text-gray-800 mb-4">Job Summary</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center w-full pl-4">
                    <div className="text-gray-600 whitespace-pre-line text-xs"
                    dangerouslySetInnerHTML={{ __html: job.description}}
                  />
                  </div>
                  <div className="flex items-center w-full pl-4 pb-5 md:pb-6"></div>
                </div>
              </div>

              {/* How to Apply */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-sm font-semibold text-gray-800 mb-4">How to Apply</h2>
                <div className="text-gray-600 whitespace-pre-line text-xs">{job.howToApply}</div>
                <div className="flex items-center w-full pl-4 pb-5 md:pb-6"></div>
                <h2 className="text-sm font-semibold text-gray-800 mb-4">Frequently Asked Questions</h2>
                <div className="text-gray-600 whitespace-pre-line text-xs">{job.freeText_01}</div>
                <div className="text-gray-600 whitespace-pre-line text-xs">{job.freeText_02}</div>
                <div className="text-gray-600 whitespace-pre-line text-xs">{job.freeText_03}</div>
                <div className="text-gray-600 whitespace-pre-line text-xs">{job.freeText_04}</div>
                <div className="text-gray-600 whitespace-pre-line text-xs">{job.freeText_05}</div>
              </div>
            </div>
          </div>

          {/* Right-Side Placeholder (1/3 width on desktop) */}
          <div className="md:col-span-1">
            {/* Featured Jobs */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-base font-semibold text-gray-800 mb-4">Jobs you might be interested in</h2>
              <div className="space-y-3">
                {sidejobs.map(job => (
                  <div key={job.title} className="border-b pb-4 last:border-0">
                    <Link href={`/jobs/${job.id}`}>
                      <div className="flex justify-between items-start">
                        <h3 className="text-sm font-medium text-black">{job.title}</h3>
                        {true && (
                          <span className="px-2 py-1 bg-yellow-200 text-yellow-900 text-xs rounded">
                            New
                          </span>
                        )}
                      </div>
                      <div className="flex items-center w-full pt-3 md:pt-4">
                        <div className="text-xs text-gray-700">Post Date : {new Date(job.postdate).toLocaleDateString()}</div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching job details:', error);
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-gray-600">
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p>Failed to fetch job details. Please try again later.</p>
        </div>
      </div>
    );
  }
}