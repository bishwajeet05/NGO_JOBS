"use client";

import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";

type Job = {
  id: string;
  title: string;
  slug: string;
  description: string;
  how_to_apply: string;
  applylink: string;
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
};

export default function AdminPanel() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [viewingJob, setViewingJob] = useState<Job | null>(null);
  const { register, handleSubmit, reset, setValue, getValues, watch } = useForm<Job>();
  const descriptionEditorRef = useRef<HTMLDivElement>(null);
  const howToApplyEditorRef = useRef<HTMLDivElement>(null);

  // Watch for changes in title, city, and state to generate slug
  const title = watch("title");
  const city = watch("city");
  const state = watch("state");

  // Utility function to generate a slug
  const generateSlug = (title: string, city: string, state: string) => {
    const parts = [title, city, state].filter(part => part).map(part => 
      part.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
        .trim()
        .replace(/\s+/g, '-') // Replace spaces with hyphens
    ).filter(part => part); // Remove empty parts
    return parts.join('-') || 'job'; // Fallback to 'job' if all parts are empty
  };

  // Update slug when title, city, or state changes
  useEffect(() => {
    if (!editingJob || (editingJob && getValues("slug") === editingJob.slug)) {
      const newSlug = generateSlug(title || '', city || '', state || '');
      setValue("slug", newSlug);
    }
  }, [title, city, state, setValue, editingJob, getValues]);

  // Editor toolbar functions
  const formatText = (command: string, value?: string, editor: 'description' | 'how_to_apply' = 'description') => {
    const editorRef = editor === 'description' ? descriptionEditorRef : howToApplyEditorRef;
    if (command === 'fontSize' && value) {
      // Apply font size using inline style for better control
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const selectedText = range.toString();
        if (selectedText) {
          const span = document.createElement('span');
          span.style.fontSize = `${value}px`;
          span.textContent = selectedText;
          range.deleteContents();
          range.insertNode(span);
          // Move cursor after the span
          range.setStartAfter(span);
          range.setEndAfter(span);
          selection.removeAllRanges();
          selection.addRange(range);
        }
      }
    } else {
      document.execCommand(command, false, value);
    }
    updateFormValue(editor);
    editorRef.current?.focus();
  };

  const insertBulletList = (editor: 'description' | 'how_to_apply' = 'description') => {
    document.execCommand('insertUnorderedList', false, undefined);
    updateFormValue(editor);
    const editorRef = editor === 'description' ? descriptionEditorRef : howToApplyEditorRef;
    editorRef.current?.focus();
  };

  const insertNumberedList = (editor: 'description' | 'how_to_apply' = 'description') => {
    document.execCommand('insertOrderedList', false, undefined);
    updateFormValue(editor);
    const editorRef = editor === 'description' ? descriptionEditorRef : howToApplyEditorRef;
    editorRef.current?.focus();
  };

  const insertTable = (editor: 'description' | 'how_to_apply' = 'description') => {
    const rows = prompt("Enter number of rows:", "2") || "2";
    const cols = prompt("Enter number of columns:", "2") || "2";
    const rowCount = parseInt(rows, 10);
    const colCount = parseInt(cols, 10);
    if (isNaN(rowCount) || isNaN(colCount) || rowCount <= 0 || colCount <= 0) return;

    let tableHtml = '<table border="1" style="border-collapse: collapse; width: 100%;">';
    for (let i = 0; i < rowCount; i++) {
      tableHtml += '<tr>';
      for (let j = 0; j < colCount; j++) {
        tableHtml += '<td style="padding: 5px;"><br></td>';
      }
      tableHtml += '</tr>';
    }
    tableHtml += '</table><br>';
    document.execCommand('insertHTML', false, tableHtml);
    updateFormValue(editor);
    const editorRef = editor === 'description' ? descriptionEditorRef : howToApplyEditorRef;
    editorRef.current?.focus();
  };

  const updateFormValue = (editor: 'description' | 'how_to_apply') => {
    const editorRef = editor === 'description' ? descriptionEditorRef : howToApplyEditorRef;
    if (editorRef.current) {
      setValue(editor, editorRef.current.innerHTML);
    }
  };

  // Initialize editor content when editing
  useEffect(() => {
    if (editingJob) {
      if (descriptionEditorRef.current) {
        descriptionEditorRef.current.innerHTML = editingJob.description || '';
        setValue('description', editingJob.description || '');
      }
      if (howToApplyEditorRef.current) {
        howToApplyEditorRef.current.innerHTML = editingJob.how_to_apply || '';
        setValue('how_to_apply', editingJob.how_to_apply || '');
      }
    }
  }, [editingJob, setValue]);

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
        if (key === "date_posted" && typeof value === "string" && value) {
          try {
            const date = new Date(value);
            if (!isNaN(date.getTime())) {
              const formattedDate = date.toISOString().split("T")[0];
              setValue("date_posted", formattedDate);
            } else {
              console.warn(`Invalid date for date_posted: ${value}`);
              setValue("date_posted", "");
            }
          } catch (error) {
            console.warn(`Error parsing date_posted: ${value}`, error);
            setValue("date_posted", "");
          }
        } else if (key === "valid_through" && typeof value === "string" && value) {
          try {
            const date = new Date(value);
            if (!isNaN(date.getTime())) {
              const formattedDateTime = date.toISOString().slice(0, 16);
              setValue("valid_through", formattedDateTime);
            } else {
              console.warn(`Invalid date for valid_through: ${value}`);
              setValue("valid_through", "");
            }
          } catch (error) {
            console.warn(`Error parsing valid_through: ${value}`, error);
            setValue("valid_through", "");
          }
        } else if (key !== 'description' && key !== 'how_to_apply') {
          setValue(key as keyof Job, value);
        }
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
      if (descriptionEditorRef.current) descriptionEditorRef.current.innerHTML = '';
      if (howToApplyEditorRef.current) howToApplyEditorRef.current.innerHTML = '';
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
                  {job.organization || "Unknown Organization"}
                </p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      editJob(job);
                    }}
                    className="bg-yellow-500 text-black px-3 py-1 rounded text-sm hover:bg-yellow-600 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteJob(job.id);
                    }}
                    className="bg-red-500 text-black px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
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
                <label className="block text-sm font-medium">Title<span className="text-red-500">*</span></label>
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
                <label className="block text-sm font-medium">Slug<span className="text-red-500">*</span></label>
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
              <div className="flex-1">
                <label className="block text-sm font-medium">URL <span className="text-red-500">*</span></label>
                <textarea
                  {...register("applylink", { required: true })}
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
                <label className="block text-sm font-medium">Description</label>
                <div className="mt-1">
                  <div className="flex flex-wrap gap-2 mb-2 bg-gray-200 p-2 rounded">
                    <button
                      type="button"
                      onClick={() => formatText('bold', undefined, 'description')}
                      className="px-2 py-1 bg-white rounded hover:bg-gray-300"
                      title="Bold"
                    >
                      <strong>B</strong>
                    </button>
                    <button
                      type="button"
                      onClick={() => formatText('italic', undefined, 'description')}
                      className="px-2 py-1 bg-white rounded hover:bg-gray-300"
                      title="Italic"
                    >
                      <em>I</em>
                    </button>
                    <button
                      type="button"
                      onClick={() => insertBulletList('description')}
                      className="px-2 py-1 bg-white rounded hover:bg-gray-300"
                      title="Bullet List"
                    >
                      •
                    </button>
                    <button
                      type="button"
                      onClick={() => insertNumberedList('description')}
                      className="px-2 py-1 bg-white rounded hover:bg-gray-300"
                      title="Numbered List"
                    >
                      1.
                    </button>
                    <select
                      onChange={(e) => formatText('fontSize', e.target.value, 'description')}
                      className="px-2 py-1 bg-white rounded"
                      title="Font Size"
                      defaultValue=""
                    >
                      <option value="" disabled>Size</option>
                      {[12, 14, 16, 18, 20, 24, 28, 32, 36, 40].map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                    <select
                      onChange={(e) => formatText('foreColor', e.target.value, 'description')}
                      className="px-2 py-1 bg-white rounded"
                      title="Text Color"
                      defaultValue=""
                    >
                      <option value="" disabled>Color</option>
                      <option value="black">Black</option>
                      <option value="red">Red</option>
                      <option value="blue">Blue</option>
                    </select>
                    <button
                      type="button"
                      onClick={() => insertTable('description')}
                      className="px-2 py-1 bg-white rounded hover:bg-gray-300"
                      title="Insert Table"
                    >
                      Table
                    </button>
                  </div>
                  <div
                    ref={descriptionEditorRef}
                    contentEditable
                    onInput={() => updateFormValue('description')}
                    className="min-h-[200px] p-2 border rounded bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    style={{ whiteSpace: 'pre-wrap' }}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium">How to Apply</label>
                <div className="mt-1">
                  <div className="flex flex-wrap gap-2 mb-2 bg-gray-200 p-2 rounded">
                    <button
                      type="button"
                      onClick={() => formatText('bold', undefined, 'how_to_apply')}
                      className="px-2 py-1 bg-white rounded hover:bg-gray-300"
                      title="Bold"
                    >
                      <strong>B</strong>
                    </button>
                    <button
                      type="button"
                      onClick={() => formatText('italic', undefined, 'how_to_apply')}
                      className="px-2 py-1 bg-white rounded hover:bg-gray-300"
                      title="Italic"
                    >
                      <em>I</em>
                    </button>
                    <button
                      type="button"
                      onClick={() => insertBulletList('how_to_apply')}
                      className="px-2 py-1 bg-white rounded hover:bg-gray-300"
                      title="Bullet List"
                    >
                      •
                    </button>
                    <button
                      type="button"
                      onClick={() => insertNumberedList('how_to_apply')}
                      className="px-2 py-1 bg-white rounded hover:bg-gray-300"
                      title="Numbered List"
                    >
                      1.
                    </button>
                    <select
                      onChange={(e) => formatText('fontSize', e.target.value, 'how_to_apply')}
                      className="px-2 py-1 bg-white rounded"
                      title="Font Size"
                      defaultValue=""
                    >
                      <option value="" disabled>Size</option>
                      {[12, 14, 16, 18, 20, 24, 28, 32, 36, 40].map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                    <select
                      onChange={(e) => formatText('foreColor', e.target.value, 'how_to_apply')}
                      className="px-2 py-1 bg-white rounded"
                      title="Text Color"
                      defaultValue=""
                    >
                      <option value="" disabled>Color</option>
                      <option value="black">Black</option>
                      <option value="red">Red</option>
                      <option value="blue">Blue</option>
                    </select>
                    <button
                      type="button"
                      onClick={() => insertTable('how_to_apply')}
                      className="px-2 py-1 bg-white rounded hover:bg-gray-300"
                      title="Insert Table"
                    >
                      Table
                    </button>
                  </div>
                  <div
                    ref={howToApplyEditorRef}
                    contentEditable
                    onInput={() => updateFormValue('how_to_apply')}
                    className="min-h-[200px] p-2 border rounded bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    style={{ whiteSpace: 'pre-wrap' }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Role Details */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Role Details</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-black">
                  Employment Type <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("role_category", { required: true })}
                  className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="" disabled>Select Employment Type</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contractual">Contractual</option>
                  <option value="Internship">Internship</option>
                  <option value="Volunteer">Volunteer</option>
                  <option value="Consultant / Freelance">Consultant / Freelance</option>
                  <option value="Fellowship">Fellowship</option>
                  <option value="Scholarship">Scholarship</option>
                  <option value="Temporary / Project-based">Temporary / Project-based</option>
                  <option value="Remote / Virtual Assignment">Remote</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-black">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("employment_type", { required: true })}
                  className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="" disabled>Select Category Type</option>
                  <option value="Education">Education</option>
                  <option value="Health">Health</option>
                  <option value="Livelihoods">Livelihoods</option>
                  <option value="Gender & Women Empowerment">Gender & Women Empowerment</option>
                  <option value="Child Rights & Protection">Child Rights & Protection</option>
                  <option value="Environment & Climate Change">Environment & Climate Change</option>
                  <option value="Disability & Inclusion">Disability & Inclusion</option>
                  <option value="Fundraising & Partnerships">Fundraising & Partnerships</option>
                  <option value="Monitoring & Evaluation (M&E)">Monitoring & Evaluation (M&E)</option>
                  <option value="Research & Policy">Research & Policy</option>
                  <option value="Communications & Media">Communications & Media</option>
                  <option value="Technology for Development (ICT4D)">Technology for Development (ICT4D)</option>
                  <option value="Rural Development">Rural Development</option>
                  <option value="Urban Development">Urban Development</option>
                  <option value="WASH (Water, Sanitation & Hygiene)">WASH (Water, Sanitation & Hygiene)</option>
                  <option value="Human Rights">Human Rights</option>
                  <option value="Mental Health & Wellbeing">Mental Health & Wellbeing</option>
                  <option value="Disaster Management">Disaster Management</option>
                  <option value="Governance & Advocacy">Governance & Advocacy</option>
                  <option value="Capacity Building & Training">Capacity Building & Training</option>
                  <option value="Volunteer Management">Volunteer Management</option>
                  <option value="Corporate Social Responsibility (CSR)">Corporate Social Responsibility (CSR)</option>
                  <option value="Administrative & Operations">Administrative & Operations</option>
                  <option value="Finance & Compliance">Finance & Compliance</option>
                  <option value="Internships & Fellowships">Internships & Fellowships</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Experience */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Experience & Education</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium">Experience (Years)</label>
                <input
                  {...register("experience_min", { required: false, valueAsNumber: true })}
                  className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                  type="number"
                  min="0"
                />
              </div>
            </div>
          </div>

          {/* Salary */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Salary</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-black">
                  Salary Currency <span className="text-red-500"></span>
                </label>
                <select
                  {...register("salary_currency", { required: false })}
                  className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="" disabled>Select Currency</option>
                  <option value="INR">INR - Indian Rupee</option>
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                  <option value="AUD">AUD - Australian Dollar</option>
                  <option value="CAD">CAD - Canadian Dollar</option>
                  <option value="JPY">JPY - Japanese Yen</option>
                  <option value="CNY">CNY - Chinese Yuan</option>
                  <option value="CHF">CHF - Swiss Franc</option>
                  <option value="SGD">SGD - Singapore Dollar</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium">Salary Value</label>
                <input
                  {...register("salary_value", { required: false, valueAsNumber: true })}
                  className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                  type="number"
                  step="0.01"
                  min="0"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium">Salary Unit</label>
                <select
                  {...register("salary_unit_text", { required: false })}
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
                <label className="block text-sm font-medium">Date Posted<span className="text-red-500">*</span></label>
                <input
                  {...register("date_posted", { required: true })}
                  className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                  type="date"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium">Valid Through<span className="text-red-500">*</span></label>
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
                <label className="block text-sm font-medium">Organization / Company name <span className="text-red-500">*</span></label>
                <textarea
                  {...register("organization", { required: true })}
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
                <label className="block text-sm font-medium">Organisation Details</label>
                <textarea
                  {...register("organization_type", { required: true })}
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
          </div>

          {/* Location */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Location</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="flex gap-4 mb-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-black">
                      Country <span className="text-red-500">*</span>
                    </label>
                    <select
                      {...register("country", { required: true })}
                      className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="" disabled>Select Country</option>
                      <option value="India">India</option>
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-black">
                      State <span className="text-red-500"></span>
                    </label>
                    <input
                      {...register("state", { required: false })}
                      className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="e.g., Maharashtra"
                    />
                  </div>
                </div>

                <div className="flex gap-4 mb-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-black">
                      City <span className="text-red-500"></span>
                    </label>
                    <input
                      {...register("city", { required: false })}
                      className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="e.g., Pune"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-black">
                      PIN/Postal Code <span className="text-red-500"></span>
                    </label>
                    <input
                      {...register("pin_code", { required: false })}
                      className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="e.g., 400001"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-black">
                    Street Address
                  </label>
                  <textarea
                    {...register("street_address")}
                    className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                    rows={3}
                    placeholder="e.g., 123 Main Street"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Status */}
          <div>
            <h3 className="text-lg font-semibold mb-2"></h3>
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
              className="bg-green-500 text-black px-4 py-2 rounded hover:bg-green-600 transition-colors"
            >
              {editingJob ? "Update Job" : "Add Job"}
            </button>
            {editingJob && (
              <button
                type="button"
                onClick={() => {
                  setEditingJob(null);
                  reset();
                  if (descriptionEditorRef.current) descriptionEditorRef.current.innerHTML = '';
                  if (howToApplyEditorRef.current) howToApplyEditorRef.current.innerHTML = '';
                }}
                className="bg-gray-500 text-black px-4 py-2 rounded hover:bg-gray-600 transition-colors"
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
                  {key === "description" || key === "how_to_apply" ? (
                    <span dangerouslySetInnerHTML={{ __html: String(value) }} />
                  ) : typeof value === "boolean" ? (
                    value.toString()
                  ) : (
                    value || "N/A"
                  )}
                </p>
              ))}
            </div>
            <button
              onClick={() => setViewingJob(null)}
              className="mt-4 bg-gray-500 text-black px-4 py-2 rounded hover:bg-gray-600 transition-colors w-full sm:w-auto"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}