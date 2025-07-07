"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { useForm } from "react-hook-form";
import Image from 'next/image';
import { BarChart2, Briefcase, User, Settings as SettingsIcon, LogOut, Menu, Users as UsersIcon, FileText, Bell, CreditCard, LifeBuoy, LayoutGrid, Layers, Edit, Trash2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import DashboardSidebar from '../DashboardSidebar';

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
  employment_type: string;
  experience_min: number;
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
  featured: boolean;
  created_at: string;
  updated_at: string;
};

function SuperAdminAddJobsInner() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [viewingJob, setViewingJob] = useState<Job | null>(null);
  const { register, handleSubmit, reset, setValue, getValues, watch } = useForm<Job>();
  const descriptionEditorRef = useRef<HTMLDivElement>(null);
  const howToApplyEditorRef = useRef<HTMLDivElement>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [orgExists, setOrgExists] = useState(false);
  const [orgCheckLoading, setOrgCheckLoading] = useState(false);
  const organizationValue = watch("organization");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const searchParams = useSearchParams();

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

  // Fetch current user and jobs
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await fetch('/api/auth/me', { credentials: 'include' });
        const userData = await userRes.json();
        setUser(userData);
        const jobsRes = await fetch('/api/jobs');
        const jobsData = await jobsRes.json();
        setJobs(jobsData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
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

  // Check for existing organization when entering Organization / Company name
  useEffect(() => {
    if (!organizationValue) {
      setOrgExists(false);
      return;
    }
    setOrgCheckLoading(true);
    // Check if organization already exists in jobs
    const exists = jobs.some(job => job.organization?.trim().toLowerCase() === organizationValue.trim().toLowerCase());
    setOrgExists(exists);
    setOrgCheckLoading(false);
  }, [organizationValue, jobs]);

  // Load job for editing if id is in query params
  useEffect(() => {
    const id = searchParams?.get('id');
    if (id && jobs.length > 0) {
      const job = jobs.find(j => j.id === id);
      if (job) setEditingJob(job);
    }
  }, [searchParams, jobs]);

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
      // Remove ?id= from URL after edit
      if (window && window.history && searchParams?.get('id')) {
        const url = new URL(window.location.href);
        url.searchParams.delete('id');
        window.history.replaceState({}, document.title, url.pathname);
      }
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

  // Sidebar items for super-admin
  const sidebarItems = [
    { icon: BarChart2, label: 'Dashboard', href: '/super-admin' },
    { icon: Briefcase, label: 'Add Jobs', href: '/super-admin/add-jobs' },
    { icon: FileText, label: 'Analytics', href: '/super-admin/analytics' },
    { icon: UsersIcon, label: 'Users', href: '/super-admin/users' },
    { icon: LayoutGrid, label: 'Applications', href: '/super-admin/applications' },
    { icon: CreditCard, label: 'Payments', href: '/super-admin/payments' },
    { icon: Bell, label: 'Notifications', href: '/super-admin/notifications' },
    { icon: SettingsIcon, label: 'Settings', href: '/super-admin/settings' },
    { icon: LifeBuoy, label: 'Support', href: '/super-admin/support' },
    { icon: Layers, label: 'Content', href: '/super-admin/content' },
    { icon: Layers, label: 'Integrations', href: '/super-admin/integrations' },
    { icon: LogOut, label: 'Log Out' },
  ];

  return (
    <div className="min-h-screen bg-[#f6f8fb] flex flex-col md:flex-row">
      {/* Mobile Topbar */}
      <header className="md:hidden flex items-center justify-between bg-white px-4 py-3 shadow-sm sticky top-0 z-30">
        <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-md hover:bg-gray-100">
          <Menu className="w-6 h-6 text-indigo-600" />
        </button>
        <span className="font-extrabold text-lg text-gray-800">Admin Dashboard</span>
        <Image src="/images/wa.jpg" alt="User" width={36} height={36} className="rounded-full border-2 border-indigo-200" />
      </header>

      {/* Sidebar - Mobile Drawer & Desktop */}
      <DashboardSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col p-1 md:p-2 bg-gradient-to-br from-[#f7faff] via-[#f5f7fb] to-[#f0f4fa] min-h-screen">
        {/* Job Form - professional, space-efficient, soft premium */}
        <section className="bg-white/90 rounded-2xl border border-blue-100 shadow-lg shadow-blue-100/30 p-4 md:p-6 mb-6 w-full transition-all">
          <h2 className="text-lg font-extrabold mb-3 border-b border-blue-50 pb-2 text-blue-900 tracking-tight">{editingJob ? "Edit Job" : "Add Job"}</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* 1. Candidate & Role Information */}
            <div className="mb-2">
              <div className="bg-gradient-to-r from-blue-50/80 to-indigo-50/60 px-3 py-1.5 rounded-lg border border-blue-100 text-base font-semibold text-blue-700 mb-2 shadow-sm flex items-center gap-2">
                <span role="img" aria-label="Candidate">👤</span> Candidate & Role Information
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                {/* Job Title */}
                <div>
                  <label className="block text-base font-semibold text-blue-900 mb-1">Job Title<span className="text-red-500">*</span></label>
                  <textarea
                    {...register("title", { required: true })}
                    className="mt-0.5 p-2 border border-blue-100 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-200 bg-[#f8fafc] text-base resize-none shadow-sm"
                    rows={1}
                  />
                </div>
                {/* Slug */}
                <div>
                  <label className="block text-base font-semibold text-blue-900 mb-1">Slug<span className="text-red-500">*</span></label>
                  <textarea
                    {...register("slug", { required: true })}
                    className="mt-0.5 p-2 border border-blue-100 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-200 bg-[#f8fafc] text-base resize-none shadow-sm"
                    rows={1}
                  />
                </div>
                {/* Job URL */}
                <div className="md:col-span-2">
                  <label className="block text-base font-semibold text-blue-900 mb-1">Job URL</label>
                  <textarea
                    {...register("applylink", { required: false })}
                    className="mt-0.5 p-2 border border-blue-100 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-200 bg-[#f8fafc] text-base resize-none shadow-sm"
                    rows={1}
                  />
                </div>
                {/* How to Apply */}
                <div className="md:col-span-2">
                  <label className="block text-base font-semibold text-blue-900 mb-1">How to Apply<span className="text-red-500">*</span></label>
                  <div className="mt-0.5">
                    {/* Rich Text Editor Toolbar */}
                    <div className="flex flex-wrap gap-1 mb-1 bg-gradient-to-r from-blue-50/60 to-indigo-50/40 p-1.5 rounded border border-blue-100 shadow-sm">
                      <button type="button" onClick={() => formatText('bold', undefined, 'how_to_apply')} className="px-1.5 py-0.5 bg-white rounded hover:bg-gray-300" title="Bold"><strong>B</strong></button>
                      <button type="button" onClick={() => formatText('italic', undefined, 'how_to_apply')} className="px-1.5 py-0.5 bg-white rounded hover:bg-gray-300" title="Italic"><em>I</em></button>
                      <button type="button" onClick={() => insertBulletList('how_to_apply')} className="px-1.5 py-0.5 bg-white rounded hover:bg-gray-300" title="Bullet List">•</button>
                      <button type="button" onClick={() => insertNumberedList('how_to_apply')} className="px-1.5 py-0.5 bg-white rounded hover:bg-gray-300" title="Numbered List">1.</button>
                      <select onChange={(e) => formatText('fontSize', e.target.value, 'how_to_apply')} className="px-1.5 py-0.5 bg-white rounded" title="Font Size" defaultValue=""><option value="" disabled>Size</option>{[12, 14, 16, 18, 20, 24, 28, 32, 36, 40].map((size) => (<option key={size} value={size}>{size}</option>))}</select>
                      <select onChange={(e) => formatText('foreColor', e.target.value, 'how_to_apply')} className="px-1.5 py-0.5 bg-white rounded" title="Text Color" defaultValue=""><option value="" disabled>Color</option><option value="black">Black</option><option value="red">Red</option><option value="blue">Blue</option></select>
                      <button type="button" onClick={() => insertTable('how_to_apply')} className="px-1.5 py-0.5 bg-white rounded hover:bg-gray-300" title="Insert Table">Table</button>
                    </div>
                    <div ref={howToApplyEditorRef} contentEditable onInput={() => updateFormValue('how_to_apply')} className="min-h-[80px] p-2 border border-blue-100 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all shadow-sm text-base" style={{ whiteSpace: 'pre-wrap' }} />
                  </div>
                </div>
                {/* Employment Type */}
                <div>
                  <label className="block text-base font-semibold text-blue-900 mb-1">Employment Type<span className="text-red-500">*</span></label>
                  <select
                    {...register("employment_type", { required: true })}
                    className="mt-0.5 p-2 border border-blue-100 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-200 bg-[#f8fafc] text-base transition-all shadow-sm"
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
                {/* Category */}
                <div>
                  <label className="block text-base font-semibold text-blue-900 mb-1">Category<span className="text-red-500">*</span></label>
                  <select
                    {...register("role_category", { required: true })}
                    className="mt-0.5 p-2 border border-blue-100 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-200 bg-[#f8fafc] text-base transition-all shadow-sm"
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
                {/* Experience Required */}
                <div>
                  <label className="block text-base font-semibold text-blue-900 mb-1">Experience Required (Years)</label>
                  <input
                    {...register("experience_min", { required: false, valueAsNumber: true })}
                    className="mt-0.5 p-2 border border-blue-100 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-200 bg-[#f8fafc] text-base transition-all shadow-sm"
                    type="number"
                    min="0"
                  />
                </div>
                {/* Qualifications / Skills */}
                <div>
                  <label className="block text-base font-semibold text-blue-900 mb-1">Qualifications / Skills</label>
                  <textarea
                    {...register("qualifications", { required: false })}
                    className="mt-0.5 p-2 border border-blue-100 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-200 bg-[#f8fafc] text-base transition-all shadow-sm"
                    rows={1}
                  />
                </div>
                {/* Salary Details */}
                <div className="md:col-span-2">
                  <div className="bg-gradient-to-r from-blue-50/80 to-indigo-50/60 px-3 py-1.5 rounded-lg border border-blue-100 text-base font-semibold text-blue-700 mb-2 shadow-sm">Salary Details</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-3">
                <div>
                      <label className="block text-base font-semibold text-blue-900 mb-1">Currency</label>
                  <select
                    {...register("salary_currency", { required: false })}
                    className="mt-0.5 p-2 border border-blue-100 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-200 bg-[#f8fafc] text-base transition-all shadow-sm"
                  >
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
                <div>
                      <label className="block text-base font-semibold text-blue-900 mb-1">Amount</label>
                  <input
                    {...register("salary_value", { required: false, valueAsNumber: true })}
                    className="mt-0.5 p-2 border border-blue-100 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-200 bg-[#f8fafc] text-base transition-all shadow-sm"
                    type="number"
                    step="0.01"
                    min="0"
                  />
                </div>
                <div>
                      <label className="block text-base font-semibold text-blue-900 mb-1">Unit</label>
                  <select
                    {...register("salary_unit_text", { required: false })}
                    className="mt-0.5 p-2 border border-blue-100 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-200 bg-[#f8fafc] text-base transition-all shadow-sm"
                        defaultValue="YEAR"
                  >
                    <option value="HOUR">Per Hour</option>
                    <option value="MONTH">Per Month</option>
                    <option value="YEAR">Per Year</option>
                  </select>
                </div>
              </div>
            </div>
                {/* Date Posted */}
                <div>
                  <label className="block text-base font-semibold text-blue-900 mb-1">Date Posted<span className="text-red-500">*</span></label>
                  <input
                    {...register("date_posted", { required: true })}
                    className="mt-0.5 p-2 border border-blue-100 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-200 bg-[#f8fafc] text-base transition-all shadow-sm"
                    type="date"
                  />
                </div>
                {/* Valid Through */}
                <div>
                  <label className="block text-base font-semibold text-blue-900 mb-1">Valid Through<span className="text-red-500">*</span></label>
                  <input
                    {...register("valid_through", { required: true })}
                    className="mt-0.5 p-2 border border-blue-100 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-200 bg-[#f8fafc] text-base transition-all shadow-sm"
                    type="date"
                  />
                </div>
                {/* Job Description */}
                <div className="md:col-span-2">
                  <label className="block text-base font-semibold text-blue-900 mb-1">Job Description</label>
                  <div className="mt-0.5">
                    {/* Rich Text Editor Toolbar */}
                    <div className="flex flex-wrap gap-1 mb-1 bg-gradient-to-r from-blue-50/60 to-indigo-50/40 p-1.5 rounded border border-blue-100 shadow-sm">
                      <button type="button" onClick={() => formatText('bold', undefined, 'description')} className="px-1.5 py-0.5 bg-white rounded hover:bg-gray-300" title="Bold"><strong>B</strong></button>
                      <button type="button" onClick={() => formatText('italic', undefined, 'description')} className="px-1.5 py-0.5 bg-white rounded hover:bg-gray-300" title="Italic"><em>I</em></button>
                      <button type="button" onClick={() => insertBulletList('description')} className="px-1.5 py-0.5 bg-white rounded hover:bg-gray-300" title="Bullet List">•</button>
                      <button type="button" onClick={() => insertNumberedList('description')} className="px-1.5 py-0.5 bg-white rounded hover:bg-gray-300" title="Numbered List">1.</button>
                      <select onChange={(e) => formatText('fontSize', e.target.value, 'description')} className="px-1.5 py-0.5 bg-white rounded" title="Font Size" defaultValue=""><option value="" disabled>Size</option>{[12, 14, 16, 18, 20, 24, 28, 32, 36, 40].map((size) => (<option key={size} value={size}>{size}</option>))}</select>
                      <select onChange={(e) => formatText('foreColor', e.target.value, 'description')} className="px-1.5 py-0.5 bg-white rounded" title="Text Color" defaultValue=""><option value="" disabled>Color</option><option value="black">Black</option><option value="red">Red</option><option value="blue">Blue</option></select>
                      <button type="button" onClick={() => insertTable('description')} className="px-1.5 py-0.5 bg-white rounded hover:bg-gray-300" title="Insert Table">Table</button>
                    </div>
                    <div ref={descriptionEditorRef} contentEditable onInput={() => updateFormValue('description')} className="min-h-[120px] p-2 border border-blue-100 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all shadow-sm text-base" style={{ whiteSpace: 'pre-wrap' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Organisation Details */}
            <div className="mb-2">
              <div className="bg-gradient-to-r from-blue-50/80 to-indigo-50/60 px-3 py-1.5 rounded-lg border border-blue-100 text-base font-semibold text-blue-700 mb-2 shadow-sm flex items-center gap-2">
                <span role="img" aria-label="Organisation">🏢</span> Organisation Details
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                {/* Organisation / Company Name */}
                <div>
                  <label className="block text-base font-semibold text-blue-900 mb-1">Organisation / Company Name<span className="text-red-500">*</span></label>
                  <textarea
                    {...register("organization", { required: true })}
                    className="mt-0.5 p-2 border border-blue-100 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-200 bg-[#f8fafc] text-base transition-all shadow-sm"
                    rows={1}
                  />
                  {organizationValue && (
                    <div className="text-sm mt-1" style={{ color: orgExists ? '#e53e3e' : '#38a169' }}>
                      {orgCheckLoading ? 'Checking organisation...' : orgExists ? 'Organisation already exists!' : 'Organisation name is unique.'}
                </div>
                  )}
                </div>
                {/* Organisation Logo */}
                <div>
                  <label className="block text-base font-semibold text-blue-900 mb-1">Organisation Logo</label>
                  <label htmlFor="org-logo-upload" className="flex flex-col items-center justify-center border-2 border-dashed border-blue-200 rounded-lg bg-white/80 p-2 cursor-pointer hover:border-blue-400 transition-all min-h-[56px] w-full">
                    <svg className="w-7 h-7 text-blue-400 mb-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                    <span className="text-blue-700 font-medium text-sm">Upload logo</span>
                    <input
                      id="org-logo-upload"
                      type="file"
                      accept="image/*"
                      onChange={e => {
                        const file = e.target.files?.[0] || null;
                        setLogoFile(file);
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => setLogoPreview(reader.result as string);
                          reader.readAsDataURL(file);
                        } else {
                          setLogoPreview(null);
                        }
                      }}
                      className="hidden"
                    />
                  </label>
                  {logoPreview && (
                    <div className="mt-1 flex items-center gap-2">
                      <img src={logoPreview} alt="Logo Preview" className="h-10 w-auto rounded border border-blue-200 shadow" />
                      <span className="text-blue-700 text-xs">Preview</span>
                    </div>
                  )}
                </div>
                {/* Organisation Description */}
                <div>
                  <label className="block text-base font-semibold text-blue-900 mb-1">Organisation Description</label>
                  <textarea
                    {...register("organization_type", { required: true })}
                    className="mt-0.5 p-2 border border-blue-100 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-200 bg-[#f8fafc] text-base transition-all shadow-sm min-w-[320px] md:min-w-[480px]"
                    rows={2}
                  />
                </div>
                {/* Country */}
                <div>
                  <label className="block text-base font-semibold text-blue-900 mb-1">Country<span className="text-red-500">*</span></label>
                      <select
                        {...register("country", { required: true })}
                        className="mt-0.5 p-2 border border-blue-100 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-200 bg-[#f8fafc] text-base transition-all shadow-sm"
                      >
                        <option value="India">India</option>
                        <option value="United States">United States</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Canada">Canada</option>
                        <option value="Australia">Australia</option>
                      </select>
                    </div>
                {/* State */}
                <div>
                  <label className="block text-base font-semibold text-blue-900 mb-1">State</label>
                      <input
                        {...register("state", { required: false })}
                        className="mt-0.5 p-2 border border-blue-100 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-200 bg-[#f8fafc] text-base transition-all shadow-sm"
                        placeholder="e.g., Maharashtra"
                      />
                    </div>
                {/* City */}
                <div>
                  <label className="block text-base font-semibold text-blue-900 mb-1">City</label>
                      <input
                        {...register("city", { required: false })}
                        className="mt-0.5 p-2 border border-blue-100 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-200 bg-[#f8fafc] text-base transition-all shadow-sm"
                        placeholder="e.g., Pune"
                      />
                    </div>
                {/* PIN / Postal Code */}
                <div>
                  <label className="block text-base font-semibold text-blue-900 mb-1">PIN / Postal Code</label>
                      <input
                        {...register("pin_code", { required: false })}
                        className="mt-0.5 p-2 border border-blue-100 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-200 bg-[#f8fafc] text-base transition-all shadow-sm"
                        placeholder="e.g., 400001"
                      />
                    </div>
                {/* Street Address */}
                <div className="md:col-span-2">
                  <label className="block text-base font-semibold text-blue-900 mb-1">Street Address</label>
                    <textarea
                      {...register("street_address")}
                      className="mt-0.5 p-2 border border-blue-100 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-200 bg-[#f8fafc] text-base transition-all shadow-sm"
                      rows={2}
                      placeholder="e.g., 123 Main Street"
                    />
                </div>
              </div>
            </div>

            {/* 3. Job Visibility & Status */}
            <div className="mb-2">
              <div className="bg-gradient-to-r from-blue-50/80 to-indigo-50/60 px-3 py-1.5 rounded-lg border border-blue-100 text-base font-semibold text-blue-700 mb-2 shadow-sm flex items-center gap-2">
                <span role="img" aria-label="Status">⚙</span> Job Visibility & Status
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                {/* Status */}
                <div>
                  <h3 className="text-base font-semibold mb-1"></h3>
                  <div className="flex items-center gap-1">
                    <input
                      {...register("is_active")}
                      type="checkbox"
                      className="h-3.5 w-3.5"
                      id="is_active"
                    />
                    <label htmlFor="is_active" className="text-base font-medium">
                      Active
                    </label>
                  </div>
                  {/* Featured Checkbox */}
                  <div className="flex items-center gap-1 mt-2">
                    <input
                      {...register("featured")}
                      type="checkbox"
                      className="h-3.5 w-3.5"
                      id="featured"
                    />
                    <label htmlFor="featured" className="text-base font-medium">
                      Mark as Featured
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-2">
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-lg text-base font-bold shadow hover:from-blue-600 hover:to-indigo-600 transition-colors"
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
                  className="bg-gray-200 text-blue-900 px-4 py-2 rounded-lg text-base font-bold shadow hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>
        {/* Jobs List - soft premium */}
        <section className="bg-white/90 rounded-2xl border border-blue-100 shadow-lg shadow-blue-100/30 p-4 md:p-6 overflow-auto w-full transition-all">
          <h2 className="text-lg font-extrabold mb-3 border-b border-blue-50 pb-2 text-blue-900 tracking-tight">Jobs</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-base bg-white rounded-xl overflow-hidden shadow-sm">
              <thead className="sticky top-0 bg-gradient-to-r from-blue-50/80 to-indigo-50/60 z-10">
                <tr className="text-blue-800 border-b border-blue-100">
                  <th className="px-4 py-3 text-left font-semibold">Title</th>
                  <th className="px-4 py-3 text-left font-semibold">Organisation</th>
                  <th className="px-4 py-3 text-left font-semibold">Category</th>
                  <th className="px-4 py-3 text-left font-semibold">Created & Expired</th>
                  <th className="px-4 py-3 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.length === 0 ? (
                  <tr><td colSpan={5} className="text-center text-blue-300 py-6 text-base">No jobs available.</td></tr>
                ) : jobs.slice(0, 5).map((job) => (
                  <tr key={job.id} className="bg-white hover:bg-blue-50/60 border-b border-blue-50 transition-all">
                    <td className="px-4 py-3 font-semibold align-top text-base">
                      <div className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-blue-500" />
                        <span>{job.title}</span>
                      </div>
                      <div className="text-base text-blue-400 flex items-center gap-1 mt-1">
                        <span className="inline-block"><svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="#90cdf4"/></svg></span>
                        <span>{job.city || "-"}, {job.country || "-"}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 align-top text-base">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-base font-semibold shadow-sm">{job.organization}</span>
                    </td>
                    <td className="px-4 py-3 align-top text-base">
                      <span className="bg-green-50 text-green-700 px-2 py-1 rounded text-base font-semibold shadow-sm">{job.role_category}</span>
                    </td>
                    <td className="px-4 py-3 align-top text-base">
                      <div className="text-blue-700 font-semibold">{job.date_posted ? new Date(job.date_posted).toLocaleDateString() : '-'}</div>
                      <div className="text-blue-400 text-base">Expires: {job.valid_through ? new Date(job.valid_through).toLocaleDateString() : '-'}</div>
                    </td>
                    <td className="px-4 py-3 align-top text-base">
                      <button onClick={() => editJob(job)} className="text-blue-600 hover:underline mr-2">Edit</button>
                      <button onClick={() => deleteJob(job.id)} className="text-red-600 hover:underline">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-end mt-2">
              <a href="/super-admin/all-jobs" className="text-blue-600 font-bold hover:underline">View All</a>
            </div>
          </div>
        </section>
      </main>

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

export default function SuperAdminAddJobs() {
  return (
    <Suspense>
      <SuperAdminAddJobsInner />
    </Suspense>
  );
} 