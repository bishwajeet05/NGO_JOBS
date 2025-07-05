"use client";

import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import Image from 'next/image';
import { BarChart2, Briefcase, User, Settings as SettingsIcon, LogOut, Menu, Users as UsersIcon, FileText, Bell, CreditCard, LifeBuoy, LayoutGrid, Layers, UserCheck, UserX, Shield, Activity, Star, Globe, Mail, ToggleLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import DashboardSidebar from './DashboardSidebar';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart as RechartsBarChart, Bar, PieChart, Pie, Cell
} from 'recharts';
import dynamic from 'next/dynamic';
// Nivo Line Chart (dynamic import for SSR)
const ResponsiveLine = dynamic(() => import('@nivo/line').then(mod => mod.ResponsiveLine), { ssr: false });
// Ant Design Bar Chart
import { Bar as AntBar } from '@ant-design/charts';
// MUI X Pie Chart
import { PieChart as MUIPieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { useTheme } from '@mui/material/styles';

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

const demoStats = [
  { label: 'Total Jobs', value: 1254, icon: <Briefcase className="w-6 h-6 text-blue-500" />, change: '+12%', desc: 'from last month', color: 'text-blue-500', bg: 'bg-blue-50' },
  { label: 'Total Users', value: 8549, icon: <UsersIcon className="w-6 h-6 text-purple-500" />, change: '+8%', desc: 'from last month', color: 'text-purple-500', bg: 'bg-purple-50' },
  { label: 'Active Employers', value: 342, icon: <UserCheck className="w-6 h-6 text-green-500" />, change: '+5%', desc: 'from last month', color: 'text-green-500', bg: 'bg-green-50' },
  { label: 'Active Jobseekers', value: 7842, icon: <UserX className="w-6 h-6 text-yellow-500" />, change: '+9%', desc: 'from last month', color: 'text-yellow-500', bg: 'bg-yellow-50' },
  { label: 'Jobs Expiring Soon', value: 28, icon: <FileText className="w-6 h-6 text-orange-500" />, change: '', desc: 'Within next 7 days', color: 'text-orange-500', bg: 'bg-orange-50' },
  { label: 'Applications Today', value: 124, icon: <FileText className="w-6 h-6 text-red-500" />, change: '-3%', desc: 'from yesterday', color: 'text-red-500', bg: 'bg-red-50' },
  { label: 'New Job Posts Today', value: 18, icon: <BarChart2 className="w-6 h-6 text-indigo-500" />, change: '+7%', desc: 'from yesterday', color: 'text-indigo-500', bg: 'bg-indigo-50' },
  { label: 'New Users Today', value: 42, icon: <UsersIcon className="w-6 h-6 text-pink-500" />, change: '+12%', desc: 'from yesterday', color: 'text-pink-500', bg: 'bg-pink-50' },
];

const demoTopJobs = [
  { title: 'Project Manager', company: 'Global Relief', category: 'Management', applications: 87, status: 'Active' },
  { title: 'Field Coordinator', company: 'Humanitarian Aid', category: 'Operations', applications: 76, status: 'Active' },
  { title: 'Communications Officer', company: 'Save The Children', category: 'Marketing', applications: 65, status: 'Active' },
  { title: 'Program Director', company: 'UNICEF', category: 'Management', applications: 58, status: 'Active' },
  { title: 'Finance Manager', company: 'Red Cross', category: 'Finance', applications: 52, status: 'Active' },
];

// Nivo Line Chart Data
const nivoLineData = [
  {
    id: 'Jobs',
    color: 'hsl(220, 70%, 50%)',
    data: [
      { x: '2024-06-01', y: 5 },
      { x: '2024-06-02', y: 8 },
      { x: '2024-06-03', y: 3 },
      { x: '2024-06-04', y: 10 },
      { x: '2024-06-05', y: 7 },
      { x: '2024-06-06', y: 12 },
      { x: '2024-06-07', y: 9 },
    ],
  },
];
// Ant Design Bar Chart Data
const antBarData = [
  { category: 'Management', applications: 120 },
  { category: 'Operations', applications: 98 },
  { category: 'Marketing', applications: 86 },
  { category: 'Finance', applications: 65 },
];
const antBarConfig = {
  data: antBarData,
  xField: 'applications',
  yField: 'category',
  seriesField: '',
  color: '#82ca9d',
  legend: false,
  barWidthRatio: 0.6,
  label: { position: 'right' },
  xAxis: { title: { text: 'Applications' } },
  yAxis: { title: { text: 'Category' } },
  height: 180,
  autoFit: true,
  tooltip: {},
};
// MUI Pie Chart Data
const muiPieData = [
  { id: 0, value: 400, label: 'Full Time' },
  { id: 1, value: 300, label: 'Part Time' },
  { id: 2, value: 200, label: 'Contract' },
  { id: 3, value: 100, label: 'Internship' },
];

export default function DashboardPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [viewingJob, setViewingJob] = useState<Job | null>(null);
  const { register, handleSubmit, reset, setValue, getValues, watch } = useForm<Job>();
  const descriptionEditorRef = useRef<HTMLDivElement>(null);
  const howToApplyEditorRef = useRef<HTMLDivElement>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

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

  // Sidebar items for admin
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
      <main className="flex-1 flex flex-col p-4 md:p-8">
        <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>
        <p className="mb-6 text-gray-500">Welcome back, John! Here's what's happening today.</p>
        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {demoStats.map((stat, i) => (
            <div key={i} className={`rounded-lg shadow bg-white flex items-center gap-4 p-4 ${stat.bg}`}>
              <div>{stat.icon}</div>
              <div>
                <div className="text-2xl font-bold">{stat.value.toLocaleString()}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
                <div className="text-xs flex items-center gap-1">
                  {stat.change && <span className={stat.color}>{stat.change}</span>}
                  <span className="text-gray-400">{stat.desc}</span>
                </div>
              </div>
            </div>
          ))}
          </div>
        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 col-span-2">
            <h2 className="font-semibold mb-2">Job Posts (Last 7 Days)</h2>
            <div style={{ height: 180 }}>
              <ResponsiveLine
                data={nivoLineData}
                margin={{ top: 20, right: 30, bottom: 40, left: 50 }}
                xScale={{ type: 'point' }}
                yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false }}
                axisBottom={{ tickRotation: -30 }}
                axisLeft={{ legend: 'Jobs', legendOffset: -40, legendPosition: 'middle' }}
                colors={{ scheme: 'nivo' }}
                pointSize={8}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                enableArea={true}
                areaOpacity={0.15}
                useMesh={true}
                theme={{
                  axis: { ticks: { text: { fontSize: 12 } }, legend: { text: { fontSize: 14 } } },
                  grid: { line: { stroke: '#e0e0e0', strokeDasharray: '4 4' } },
                }}
              />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="font-semibold mb-2">Applications by Category</h2>
            <AntBar {...antBarConfig} />
          </div>
              </div>
        {/* Distribution & Top Jobs Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="font-semibold mb-2">Job Type Distribution</h2>
            <MUIPieChart
              series={[{
                data: muiPieData,
                arcLabel: (item) => `${item.label} (${item.value})`,
                arcLabelMinAngle: 10,
              }]}
              height={180}
              slotProps={{ legend: { direction: 'horizontal', position: { vertical: 'bottom', horizontal: 'center' } } }}
              sx={{
                [`& .${pieArcLabelClasses.root}`]: {
                  fontSize: 12,
                  fill: '#333',
                },
              }}
            />
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-semibold">Top Jobs by Applications</h2>
              <a href="#" className="text-blue-600 text-sm font-medium hover:underline">View All</a>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-gray-500">
                    <th className="text-left py-1 px-2">Job Title</th>
                    <th className="text-left py-1 px-2">Company</th>
                    <th className="text-left py-1 px-2">Category</th>
                    <th className="text-left py-1 px-2">Applications</th>
                    <th className="text-left py-1 px-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {demoTopJobs.map((job, i) => (
                    <tr key={i} className="border-t">
                      <td className="py-1 px-2 font-medium">{job.title}</td>
                      <td className="py-1 px-2">{job.company}</td>
                      <td className="py-1 px-2">{job.category}</td>
                      <td className="py-1 px-2">{job.applications}</td>
                      <td className="py-1 px-2">
                        <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-semibold">{job.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* Footer/User Info */}
        <div className="flex items-center justify-between mt-8 text-xs text-gray-400">
          <div>
            <span className="font-semibold">JD</span> John Doe &bull; Super Admin
          </div>
          <div>
            Terms & Support
          </div>
          </div>
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