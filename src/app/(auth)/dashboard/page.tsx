"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type Job = {
  id: string;
  title: string;
  slug: string;
  description: string;
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
  organization_id: string;
  location_id: string;
  is_remote: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export default function AdminPanel() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [viewingJob, setViewingJob] = useState<Job | null>(null);
  const { register, handleSubmit, reset, setValue } = useForm<Job>();

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [jobsRes] = await Promise.all([
          fetch("/api/jobs").then((res) => res.json()),
        ]);
        setJobs(jobsRes);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, []);

  // Set form values when editing
  useEffect(() => {
    if (editingJob) {
      Object.entries(editingJob).forEach(([key, value]) => {
        setValue(key as keyof Job, value);
      });
    }
  }, [editingJob, setValue]);

  // Create or update job
  const onSubmit = async (data: Job) => {
    try {
      const method = editingJob ? "PUT" : "POST";
      const body = editingJob ? { ...data, id: editingJob.id } : data;
      const res = await fetch("/api/jobs", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Operation failed");
      }
      reset();
      setEditingJob(null);
      const updatedJobs = await fetch("/api/jobs").then((res) => res.json());
      setJobs(updatedJobs);
    } catch (error: any) {
      alert(`Failed to save job: ${error.message}`);
    }
  };

  // Delete job
  const deleteJob = async (id: string) => {
    try {
      const res = await fetch("/api/jobs", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Delete failed");
      }
      const updatedJobs = await fetch("/api/jobs").then((res) => res.json());
      setJobs(updatedJobs);
    } catch (error: any) {
      alert(`Failed to delete job: ${error.message}`);
    }
  };

  // Edit job
  const editJob = (job: Job) => {
    setEditingJob(job);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-6 py-0 flex flex-col md:flex-row gap-6 text-black w-full">
      {/* Left: Jobs List */}
      <div className="md:w-3/10 bg-gray-100 p-4 rounded overflow-auto shadow-sm">
        <h2 className="text-xl font-bold mb-4">Jobs</h2>
        <div className="space-y-2">
          {jobs.length === 0 ? (
            <p className="text-sm text-gray-500">No jobs available.</p>
          ) : (
            jobs.map((job) => (
              <div
                key={job.id}
                className="p-3 border rounded hover:bg-gray-200 cursor-pointer transition-colors"
                onClick={() => setViewingJob(job)}
              >
                <h3 className="font-semibold text-base">{job.title}</h3>
                <p className="text-sm text-gray-600">
                   {"Unknown Organization"}
                </p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      editJob(job);
                    }}
                    className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteJob(job.id);
                    }}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Right: Job Form */}
      <div className="md:w-7/10 bg-gray-100 p-4 rounded shadow-sm">
        <h2 className="text-xl font-bold mb-4">{editingJob ? "Edit Job" : "Add Job"}</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Info */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Basic Information</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium">Title</label>
                <textarea
                  {...register("title", { required: true })}
                  className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                  rows={1}
                  onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    target.style.height = "auto";
                    target.style.height = `${target.scrollHeight}px`;
                  }}
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium">Slug</label>
                <textarea
                  {...register("slug", { required: true })}
                  className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                  rows={1}
                  onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    target.style.height = "auto";
                    target.style.height = `${target.scrollHeight}px`;
                  }}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium">Description</label>
                <textarea
                  {...register("description", { required: true })}
                  className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                  rows={1}
                  onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    target.style.height = "auto";
                    target.style.height = `${target.scrollHeight}px`;
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Responsibilities</label>
                <textarea
                  {...register("responsibilities", { required: true })}
                  className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                  rows={1}
                  onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    target.style.height = "auto";
                    target.style.height = `${target.scrollHeight}px`;
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Qualifications</label>
                <textarea
                  {...register("qualifications", { required: true })}
                  className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                  rows={1}
                  onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    target.style.height = "auto";
                    target.style.height = `${target.scrollHeight}px`;
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Requirements</label>
                <textarea
                  {...register("requirements", { required: true })}
                  className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                  rows={1}
                  onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    target.style.height = "auto";
                    target.style.height = `${target.scrollHeight}px`;
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Career Prospects</label>
                <textarea
                  {...register("career_prospects", { required: true })}
                  className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                  rows={1}
                  onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    target.style.height = "auto";
                    target.style.height = `${target.scrollHeight}px`;
                  }}
                />
              </div>
            </div>
          </div>

          {/* Role Details */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Role Details</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium">Role Category</label>
                <input
                  {...register("role_category", { required: true })}
                  className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium">Role Type</label>
                <input
                  {...register("role_type", { required: true })}
                  className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium">Employment Type</label>
                <select
                  {...register("employment_type", { required: true })}
                  className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="FULL_TIME">Full Time</option>
                  <option value="CONTRACTOR">Contractor</option>
                  <option value="PART_TIME">Part Time</option>
                  <option value="INTERN">Intern</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium">Key Skills</label>
                <input
                  {...register("key_skills", { required: true })}
                  className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Comma-separated skills"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium">Industry Type</label>
                <input
                  {...register("industry_type", { required: true })}
                  className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium">Department</label>
                <input
                  {...register("department", { required: true })}
                  className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          </div>

          {/* Experience */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Experience & Education</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium">Minimum Experience (Years)</label>
                <input
                  {...register("experience_min", { required: true, valueAsNumber: true })}
                  className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                  type="number"
                  min="0"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium">Maximum Experience (Years)</label>
                <input
                  {...register("experience_max", { required: true, valueAsNumber: true })}
                  className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                  type="number"
                  min="0"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium">Education Required</label>
                <textarea
                  {...register("education_required", { required: true })}
                  className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                  rows={4}
                  onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    target.style.height = "auto";
                    target.style.height = `${target.scrollHeight}px`;
                  }}
                />
              </div>
            </div>
          </div>

          {/* Salary */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Salary</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium">Salary Currency</label>
                <input
                  {...register("salary_currency", { required: true })}
                  className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="e.g., INR"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium">Salary Value</label>
                <input
                  {...register("salary_value", { required: true, valueAsNumber: true })}
                  className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                  type="number"
                  step="0.01"
                  min="0"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium">Salary Unit</label>
                <select
                  {...register("salary_unit_text", { required: true })}
                  className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="HOUR">Per Hour</option>
                  <option value="MONTH">Per Month</option>
                  <option value="YEAR">Per Year</option>
                </select>
              </div>
            </div>
          </div>

          {/* Dates */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Dates</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium">Date Posted</label>
                <input
                  {...register("date_posted", { required: true })}
                  className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                  type="date"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium">Valid Through</label>
                <input
                  {...register("valid_through", { required: true })}
                  className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                  type="datetime-local"
                />
              </div>
            </div>
          </div>

          {/* Organization */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Organization</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium">Organization</label>
                
              </div>
            </div>
          </div>

          {/* Location */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Location</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium">Location</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  {...register("is_remote")}
                  type="checkbox"
                  className="h-4 w-4"
                  id="is_remote"
                />
                <label htmlFor="is_remote" className="text-sm font-medium">
                  Remote
                </label>
              </div>
            </div>
          </div>

          {/* Status */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Status</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-2">
                <input
                  {...register("is_active")}
                  type="checkbox"
                  className="h-4 w-4"
                  id="is_active"
                />
                <label htmlFor="is_active" className="text-sm font-medium">
                  Active
                </label>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
            >
              {editingJob ? "Update Job" : "Add Job"}
            </button>
            {editingJob && (
              <button
                type="button"
                onClick={() => {
                  setEditingJob(null);
                  reset();
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Details Modal */}
      {viewingJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg sm:max-w-2xl max-h-[80vh] overflow-y-auto shadow-lg">
            <h2 className="text-xl font-bold mb-4">{viewingJob.title}</h2>
            <div className="grid grid-cols-1 gap-2 text-sm">
              {Object.entries(viewingJob).map(([key, value]) => (
                <p key={key} className="capitalize">
                  <strong>{key.replace(/_/g, " ")}:</strong>{" "}
                  {typeof value === "boolean" ? value.toString() : value || "N/A"}
                </p>
              ))}
            </div>
            <button
              onClick={() => setViewingJob(null)}
              className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors w-full sm:w-auto"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}