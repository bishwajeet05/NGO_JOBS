"use client";
import Image from 'next/image';
import { 
  BarChart2, Briefcase, Calendar, User, Search, Send, Users, PieChart, Menu, 
  Home, MessageSquare, Bell, ChevronDown, Plus, MapPin, DollarSign, Building, Bookmark, Settings as SettingsIcon, LogOut, Globe, Trash, XCircle, Mail, FileText, Eye
} from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Mock Data
const stats = [
  { label: 'Application Sent', value: 43, icon: <Send className="text-green-500" />, color: 'border-green-500' },
  { label: 'Interviews Shortlisted', value: 27, icon: <Calendar className="text-blue-500" />, color: 'border-blue-500' },
  { label: 'Profile Viewed', value: '52k', icon: <User className="text-orange-500" />, color: 'border-orange-500' },
];

const recommendedJobs = [
  { title: 'Intern UX Designer', company: 'Maximoz Team', salary: '$14k - $25k', location: 'London, England', type: 'FULLTIME', logo: '/images/download.jpeg' },
  { title: 'Senior UX Designer', company: 'Inacyx Studios', salary: '$21k - $25k', location: 'Manchester, UK', type: 'PART TIME', logo: '/images/download.jpeg' },
  { title: 'Freelance UI Designer', company: 'Naonotu Team', salary: '$14k - $25k', location: 'London, England', type: 'FULLTIME', logo: '/images/download.jpeg' },
];

const featuredCompanies = [
  { name: 'Qerza', logo: '/images/download.jpeg' },
  { name: 'Inacyx', logo: '/images/download.jpeg' },
  { name: 'Naonotu', logo: '/images/download.jpeg' },
  { name: 'Maximoz', logo: '/images/download.jpeg' },
];

const appliedJobs = [
  {
    logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png',
    title: 'Finance Manager & Health',
    category: 'Design',
    location: 'New York',
    date: 'July 20, 2021',
    status: 'Pending',
  },
  {
    logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png',
    title: 'Restaurant Team Member',
    category: 'Customer',
    location: 'New York',
    date: 'May 7, 2021',
    status: 'Pending',
  },
  {
    logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png',
    title: 'Junior Graphic Designer (Web)',
    category: 'Design',
    location: 'New York',
    date: 'May 7, 2021',
    status: 'Approved',
  },
  {
    logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png',
    title: 'Recruiting Coordinator',
    category: 'Design',
    location: 'Los Angeles',
    date: 'April 19, 2021',
    status: 'Pending',
  },
  {
    logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png',
    title: 'Product Manager, Studio',
    category: 'Health and Care',
    location: 'London',
    date: 'April 19, 2021',
    status: 'Pending',
  },
];

const savedJobs = [
  {
    logo: 'https://cdn-icons-png.flaticon.com/512/5968/5968292.png',
    title: 'Product Designer',
    category: 'Accounting / Finance',
    location: 'New York',
    date: 'March 29, 2021',
  },
  {
    logo: 'https://cdn-icons-png.flaticon.com/512/5968/5968282.png',
    title: 'Product Manager, Studio',
    category: 'Health and Care',
    location: 'London',
    date: 'March 29, 2021',
  },
  {
    logo: 'https://cdn-icons-png.flaticon.com/512/5968/5968284.png',
    title: 'Recruiting Coordinator',
    category: 'Design',
    location: 'Los Angeles',
    date: 'March 29, 2021',
  },
];

const jobAlerts = [
  { title: 'jjhh', query: '', jobs: 'Jobs found 18', times: 'Daily' },
  { title: 'Jobs Feed', query: '', jobs: 'Jobs found 18', times: 'Weekly' },
  { title: 'test 01', query: '', jobs: 'Jobs found 18', times: 'Daily' },
  { title: 'kuchar', query: '', jobs: 'Jobs found 18', times: 'Daily' },
  { title: 'Software Engineer', query: '', jobs: 'Jobs found 18', times: 'Daily' },
  { title: 'Jobs Feed', query: '', jobs: 'Jobs found 18', times: 'Daily' },
  { title: 'développeur web', query: 'Salary Max: $850', jobs: 'Jobs found 1', times: 'Daily' },
  { title: 'job alert1', query: 'Job Title: program manager', jobs: 'Jobs found 0', times: 'Fortnightly' },
  { title: 'IT', query: '', jobs: 'Jobs found 18', times: 'Daily' },
  { title: 'Johan Forsberg', query: '', jobs: 'Jobs found 18', times: 'Daily' },
  { title: 'erg4v5i5', query: '', jobs: 'Jobs found 18', times: 'Daily' },
  { title: 'km.knjl', query: '', jobs: 'Jobs found 18', times: 'Daily' },
  { title: 'Linio', query: '', jobs: 'Jobs found 18', times: 'Daily' },
];

const messagesContacts = [
  { name: 'admin', lastMessage: 'test', time: '4 years', unread: false, avatar: '', role: '' },
  { name: 'admin', lastMessage: 'test', time: '4 years', unread: false, avatar: '', role: '' },
  { name: 'Udemy', lastMessage: 'Head of Development', time: '4 years', unread: false, avatar: 'https://cdn-icons-png.flaticon.com/512/5968/5968292.png', role: 'Head of Development' },
];

const messages = [
  { sender: 'admin', text: 'testits stels', time: 'July 1, 2021, 4:09 am', avatar: '' },
];

export default function CandidateQuickLogin() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSidebar, setActiveSidebar] = useState('Overview');
  const [activeTab, setActiveTab] = useState('Account Setting');
  const [activeProfileTab, setActiveProfileTab] = useState('Basic');
  const [activeResumeTab, setActiveResumeTab] = useState('Resume');
  const [socialLinks, setSocialLinks] = useState([
    { platform: '', url: '' }
  ]);
  const router = useRouter();
  
  // Candidate login form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      if (data.user.role === 'candidate') {
        router.push('/quick-login/candidate');
      } else if (data.user.role === 'employer') {
        router.push('/employer/dashboard');
      } else if (data.user.role === 'super_admin' || data.user.role === 'admin') {
        router.push('/super-admin');
      } else {
        router.push('/');
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Sidebar items
  const sidebarItems = [
    { icon: BarChart2, label: 'Overview' },
    { icon: User, label: 'Profile' },
    { icon: Briefcase, label: 'Applied Jobs' },
    { icon: Bookmark, label: 'Saved Jobs' },
    { icon: Bell, label: 'Job Alert' },
    { icon: MessageSquare, label: 'Message' },
    { icon: SettingsIcon, label: 'Settings' },
    { icon: LogOut, label: 'Log Out' },
  ];

  const socialOptions = [
    { value: '', label: 'Select One' },
    { value: 'linkedin', label: 'LinkedIn' },
    { value: 'twitter', label: 'Twitter' },
    { value: 'facebook', label: 'Facebook' },
    { value: 'instagram', label: 'Instagram' },
    { value: 'github', label: 'GitHub' },
    { value: 'website', label: 'Website' },
  ];

  const handleSocialChange = (idx: number, field: string, value: string) => {
    setSocialLinks(links => links.map((link, i) => i === idx ? { ...link, [field]: value } : link));
  };
  const handleAddSocial = () => setSocialLinks(links => [...links, { platform: '', url: '' }]);
  const handleRemoveSocial = (idx: number) => setSocialLinks(links => links.length === 1 ? links : links.filter((_, i) => i !== idx));

  return (
    <div className="min-h-screen bg-[#f6f8fb] flex flex-col md:flex-row">
      {/* Mobile Topbar */}
      <header className="md:hidden flex items-center justify-between bg-white px-4 py-3 shadow-sm sticky top-0 z-30">
        <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-md hover:bg-gray-100">
          <Menu className="w-6 h-6 text-indigo-600" />
        </button>
        <span className="font-extrabold text-lg text-gray-800">QERZA</span>
        <Image src="/images/wa.jpg" alt="User" width={36} height={36} className="rounded-full border-2 border-indigo-200" />
      </header>

      {/* Sidebar - Mobile Drawer & Desktop */}
      <aside 
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-100 py-8 px-4 shadow-lg transform transition-transform duration-300 md:relative md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="mb-8 px-2">
          <div className="text-xs text-gray-400 font-semibold mb-4">Candidate Dashboard</div>
        </div>
        <nav className="flex flex-col gap-2 text-gray-600">
          {sidebarItems.map(item => (
            item.label === 'Log Out' ? (
              <button
                key={item.label}
                onClick={() => router.push('/login')}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-semibold text-sm transition-colors w-full text-left hover:bg-gray-50 text-red-600`}
              >
                <item.icon className="w-5 h-5" /> {item.label}
              </button>
            ) : (
              <button
                key={item.label}
                onClick={() => setActiveSidebar(item.label)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-semibold text-sm transition-colors w-full text-left ${activeSidebar === item.label ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'}`}
              >
                <item.icon className="w-5 h-5" /> {item.label}
              </button>
            )
          ))}
        </nav>
        <div className="mt-auto text-xs text-gray-400 text-center pt-8">
          Qerza Job Portal Admin Dashboard<br/>
          © 2024 All Rights Reserved<br/>
          Made with ♥ by Peterdraw
        </div>
      </aside>
      
      {/* Mobile overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/30 z-30 md:hidden" onClick={() => setSidebarOpen(false)}></div>}

      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="hidden md:flex items-center justify-between bg-white px-6 py-3 shadow-sm sticky top-0 z-20 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <Menu className="w-6 h-6 text-gray-500" />
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          </div>
          <div className="flex-grow max-w-lg mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search something here..."
                className="w-full bg-[#f3f4f6] rounded-full px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 border border-gray-200"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </div>
          <div className="flex items-center gap-5">
            <button className="relative">
              <Bell className="w-6 h-6 text-gray-500" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-white text-[10px]">12</span>
            </button>
            <div className="flex items-center gap-3">
              <Image src="/images/wa.jpg" alt="User" width={36} height={36} className="rounded-full border-2 border-indigo-200" />
              <div className="text-right">
                <div className="font-semibold text-gray-800 text-sm">David Heree</div>
                <div className="text-xs text-gray-500">Super Admin</div>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          <div className={(activeSidebar === 'Profile' || activeSidebar === 'Settings' || activeSidebar === 'Resume' || activeSidebar === 'Applied Jobs' || activeSidebar === 'Saved Jobs' || activeSidebar === 'Job Alert' || activeSidebar === 'Message') ? '' : 'grid grid-cols-12 gap-6 lg:gap-8'}>
            {/* Main content */}
            <div className={`col-span-12 ${activeSidebar === 'Settings' ? '' : 'lg:col-span-8'}`}>
              {/* Render Overview, Profile, or Settings based on sidebar selection */}
              {activeSidebar === 'Overview' && (
                <>
                  {/* Stats Cards */}
                  <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                    {stats.map((stat) => (
                      <div key={stat.label} className={`rounded-xl bg-white p-4 shadow border-t-2 ${stat.color} flex items-center gap-4 min-h-[90px]`}>
                        <div className={`p-2 rounded-full bg-gray-100`}>{stat.icon}</div>
                        <div>
                          <div className={`text-xl font-bold text-gray-800`}>{stat.value}</div>
                          <div className="text-gray-500 text-sm font-medium mt-0.5">{stat.label}</div>
                        </div>
                      </div>
                    ))}
                  </section>
                  {/* Vacancy Stats */}
                  <section className="bg-white rounded-xl shadow p-4 mb-4">
                    <div className="h-48 flex items-center justify-center text-gray-400 bg-gray-50 rounded-lg">Chart Placeholder</div>
                  </section>
                  {/* Recommended Jobs */}
                  <section className="mb-4">
                    <h2 className="text-base font-semibold text-gray-800 mb-3">Recommended Jobs</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                      {recommendedJobs.map((job) => (
                        <div key={job.title} className="bg-white rounded-xl shadow p-4 flex flex-col min-h-[140px]">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <Image src={job.logo} alt={job.company} width={36} height={36} className="rounded-lg" />
                              <div>
                                <div className="font-bold text-gray-800 text-sm">{job.title}</div>
                                <div className="text-xs text-gray-500">{job.company}</div>
                              </div>
                            </div>
                            <button className="p-2 rounded-full hover:bg-gray-100"><Plus className="w-4 h-4 text-gray-500" /></button>
                          </div>
                          <div className="mt-3 space-y-1 text-xs text-gray-600">
                            <div className="flex items-center gap-2"><DollarSign className="w-3 h-3 text-gray-400"/> {job.salary} <span className="text-gray-400">/monthly</span></div>
                            <div className="flex items-center gap-2"><MapPin className="w-3 h-3 text-gray-400"/> {job.location}</div>
                            <div className="flex items-center gap-2"><Briefcase className="w-3 h-3 text-gray-400"/> {job.type}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                </>
              )}
              {activeSidebar === 'Profile' && (
                <section className="bg-white rounded-xl shadow-sm p-6 mb-8 w-full">
                  <h2 className="text-xl font-semibold text-gray-800 mb-6">Profile</h2>
                  {/* Profile Tabs */}
                  <div className="flex gap-8 border-b border-gray-200 mb-8">
                    {[
                      { label: 'Basic', icon: User },
                      { label: 'Profile', icon: Briefcase },
                      { label: 'Experience & Education', icon: Calendar },
                      { label: 'Social Media', icon: Globe },
                    ].map(tab => (
                      <button
                        key={tab.label}
                        onClick={() => setActiveProfileTab(tab.label)}
                        className={`flex items-center gap-2 pb-3 px-2 border-b-2 text-sm font-semibold transition-colors ${activeProfileTab === tab.label ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-blue-500'}`}
                      >
                        <tab.icon className="w-4 h-4" /> {tab.label}
                      </button>
                    ))}
                  </div>
                  {/* Profile Tab Content */}
                  {activeProfileTab === 'Basic' && (
                    <form className="space-y-8">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Basic Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                          {/* Profile Picture */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Profile Picture <span className="text-red-500">*</span></label>
                            <div className="flex items-center gap-4 mb-2">
                              <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden border border-gray-200">
                                <Image src="/images/ngo_job_board_india.jpg" alt="Profile" width={96} height={96} className="object-cover w-full h-full" />
                              </div>
                              <button type="button" className="p-2 rounded border border-gray-200 hover:bg-gray-50"><Trash className="w-4 h-4 text-gray-400" /></button>
                            </div>
                            <div className="text-xs text-gray-400 mb-4">Image Size: 164x164</div>
                          </div>
                          {/* Form Fields */}
                          <div className="grid grid-cols-1 gap-4">
                            <div className="flex gap-4">
                              <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name <span className="text-red-500">*</span></label>
                                <input type="text" className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100" defaultValue="Chintu" />
                              </div>
                              <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Professional Title/Tagline</label>
                                <input type="text" className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100" placeholder="Title" />
                              </div>
                            </div>
                            <div className="flex gap-4">
                              <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Experience Level <span className="text-red-500">*</span></label>
                                <select className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100">
                                  <option>Fresher</option>
                                  <option>1-3 Years</option>
                                  <option>3-5 Years</option>
                                  <option>5+ Years</option>
                                </select>
                              </div>
                              <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Education Level</label>
                                <select className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100">
                                  <option>High School</option>
                                  <option>Bachelor's</option>
                                  <option>Master's</option>
                                  <option>PhD</option>
                                </select>
                              </div>
                            </div>
                            <div className="flex gap-4">
                              <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Personal Website</label>
                                <input type="text" className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100" placeholder="Website" />
                              </div>
                              <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date Of Birth <span className="text-red-500">*</span></label>
                                <input type="date" className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100" placeholder="dd/mm/yyyy" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* CV/Resume Upload */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Your CV/Resume</label>
                        <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 flex items-center gap-4 bg-gray-50">
                          <button type="button" className="flex items-center gap-2 text-blue-600 font-semibold text-sm"><Plus className="w-4 h-4" /> Add a CV/Resume</button>
                          <span className="text-xs text-gray-400">Choose a new file - pdf</span>
                        </div>
                      </div>
                      <button type="submit" className="mt-4 px-8 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">Save Changes</button>
                    </form>
                  )}
                  {activeProfileTab === 'Profile' && (
                    <form className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Gender <span className="text-red-500">*</span></label>
                          <select className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100">
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Marital Status <span className="text-red-500">*</span></label>
                          <select className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100">
                            <option>Married</option>
                            <option>Single</option>
                            <option>Other</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Profession <span className="text-red-500">*</span></label>
                          <select className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100">
                            <option>Consultant</option>
                            <option>Manager</option>
                            <option>Developer</option>
                            <option>Designer</option>
                            <option>Other</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Your availability <span className="text-red-500">*</span></label>
                          <select className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100">
                            <option>Available</option>
                            <option>Not Available</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Skills you have <span className="text-red-500">*</span></label>
                        <input type="text" className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Languages you know <span className="text-red-500">*</span></label>
                        <input type="text" className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Biography</label>
                        {/* Replace this textarea with a rich text editor if needed */}
                        <textarea rows={6} className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100" placeholder="Write about yourself..." />
                      </div>
                    </form>
                  )}
                  {activeProfileTab === 'Experience & Education' && (
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-800">Experience</h3>
                        <button className="px-5 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">Add Experience</button>
                      </div>
                      <div className="overflow-x-auto rounded-lg border border-gray-100 bg-gray-50">
                        <table className="min-w-full text-sm">
                          <thead>
                            <tr className="text-gray-500 text-left bg-gray-50">
                              <th className="px-6 py-3 font-semibold">Organisation</th>
                              <th className="px-6 py-3 font-semibold">Department</th>
                              <th className="px-6 py-3 font-semibold">Designation</th>
                              <th className="px-6 py-3 font-semibold">Period</th>
                              <th className="px-6 py-3 font-semibold">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td colSpan={5} className="py-12 text-center">
                                {/* Simple SVG illustration for empty state */}
                                <svg width="80" height="80" fill="none" viewBox="0 0 80 80" className="mx-auto mb-2">
                                  <rect x="10" y="20" width="40" height="50" rx="4" fill="#F3F4F6" stroke="#CBD5E1" strokeWidth="2" />
                                  <rect x="30" y="10" width="40" height="50" rx="4" fill="#E0E7EF" stroke="#CBD5E1" strokeWidth="2" />
                                  <rect x="20" y="30" width="40" height="50" rx="4" fill="#F9FAFB" stroke="#CBD5E1" strokeWidth="2" />
                                </svg>
                                <div className="text-gray-400 text-sm">No Data Found!</div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                  {activeProfileTab === 'Social Media' && (
                    <form className="space-y-6">
                      {socialLinks.map((link, idx) => (
                        <div key={idx} className="flex items-center gap-2 bg-white border border-gray-200 rounded px-3 py-2">
                          <select
                            className="min-w-[140px] border-none focus:ring-0 text-gray-700 text-sm bg-transparent"
                            value={link.platform}
                            onChange={e => handleSocialChange(idx, 'platform', e.target.value)}
                          >
                            {socialOptions.map(opt => (
                              <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                          </select>
                          <input
                            type="text"
                            className="flex-1 border-none focus:ring-0 text-sm bg-transparent"
                            placeholder="Profile Link / URL..."
                            value={link.url}
                            onChange={e => handleSocialChange(idx, 'url', e.target.value)}
                          />
                          <button type="button" onClick={() => handleRemoveSocial(idx)} className="ml-2 text-gray-400 hover:text-red-500">
                            <XCircle className="w-5 h-5" />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={handleAddSocial}
                        className="w-full flex items-center justify-center gap-2 py-4 rounded bg-gray-50 border border-dashed border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-100"
                      >
                        <Plus className="w-5 h-5" /> Add New Social Link
                      </button>
                      <button type="submit" className="px-6 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">Save Changes</button>
                    </form>
                  )}
                </section>
              )}
              {activeSidebar === 'Settings' && (
                <section className="bg-white rounded-xl shadow-sm p-6 mb-8 w-full">
                  <h2 className="text-xl font-semibold text-gray-800 mb-6">Settings</h2>
                  {/* Settings Tabs (only Account Setting) */}
                  <div className="flex gap-8 border-b border-gray-200 mb-8">
                    {[{ label: 'Account Setting', icon: SettingsIcon }].map(tab => (
                      <button
                        key={tab.label}
                        onClick={() => setActiveTab(tab.label)}
                        className={`flex items-center gap-2 pb-3 px-2 border-b-2 text-sm font-semibold transition-colors ${activeTab === tab.label ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-blue-500'}`}
                      >
                        <tab.icon className="w-4 h-4" /> {tab.label}
                      </button>
                    ))}
                  </div>
                  {/* Settings Tab Content */}
                  {activeTab === 'Account Setting' && (
                    <form className="space-y-10">
                      {/* Location Section */}
                      <div>
                        <h3 className="text-base font-semibold text-gray-800 mb-3">Location</h3>
                        <div className="space-y-3">
                          <select className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100">
                            <option>Select Country</option>
                          </select>
                          <select className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100">
                            <option>Select State</option>
                          </select>
                          <select className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100">
                            <option>Select City</option>
                          </select>
                        </div>
                      </div>
                      {/* Contact Info Section */}
                      <div>
                        <h3 className="text-base font-semibold text-gray-800 mb-3">Your Contact Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input type="text" className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100" placeholder="Phone" />
                          <input type="text" className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100" placeholder="Secondary Phone" />
                          <input type="text" className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100" placeholder="Whatsapp Number" />
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><Mail className="w-4 h-4" /></span>
                            <input type="email" className="w-full border border-gray-200 rounded pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100" placeholder="Email Address" />
                          </div>
                        </div>
                        <button type="submit" className="mt-6 px-6 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">Save Changes</button>
                      </div>
                      {/* Change Account Email Section */}
                      <div className="pt-6 border-t border-gray-100">
                        <h3 className="text-base font-semibold text-gray-800 mb-3">Change Account Email Address</h3>
                        <input type="email" className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 mb-4" placeholder="Email *" defaultValue="hiyaki4019@cristout.com" />
                        <button type="button" className="px-6 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">Update Email</button>
                      </div>
                    </form>
                  )}
                </section>
              )}
              {activeSidebar === 'Resume' && (
                <section className="bg-white rounded-xl shadow-sm p-6 mb-8 w-full">
                  <h2 className="text-xl font-semibold text-gray-800 mb-6">Edit Resume</h2>
                  {/* Resume Editor UI */}
                  <div className="space-y-8">
                    {/* My Resume */}
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-3">My Resume</h3>
                      <div className="bg-[#f7f9fb] rounded-lg p-4 flex flex-col md:flex-row md:items-center gap-4 mb-2">
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-2">
                            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-semibold">cv_candidate.pdf</span>
                            <button className="text-red-500"><XCircle className="w-4 h-4" /></button>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-semibold">UG_Certificate2023.pdf</span>
                            <button className="text-red-500"><XCircle className="w-4 h-4" /></button>
                          </div>
                        </div>
                        <div>
                          <button className="px-4 py-2 rounded bg-blue-50 text-blue-700 font-semibold border border-blue-200">Browse</button>
                        </div>
                      </div>
                      <div className="text-xs text-gray-400">Upload file: pdf, doc, docs</div>
                    </div>
                    {/* Education */}
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-3">Education</h3>
                      <div className="space-y-2">
                        <div className="flex items-center bg-[#f7f9fb] rounded px-4 py-2 justify-between">
                          <span>Education 1</span>
                          <ChevronDown className="w-4 h-4 text-gray-400" />
                        </div>
                        <div className="flex items-center bg-[#f7f9fb] rounded px-4 py-2 justify-between">
                          <span>Education 2</span>
                          <ChevronDown className="w-4 h-4 text-gray-400" />
                        </div>
                        <button className="mt-2 px-4 py-2 rounded bg-blue-50 text-blue-700 font-semibold border border-blue-200">Add Another Education</button>
                      </div>
                    </div>
                    {/* Experience */}
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-3">Experience</h3>
                      <div className="space-y-2">
                        <div className="flex items-center bg-[#f7f9fb] rounded px-4 py-2 justify-between">
                          <span>Experience 1</span>
                          <ChevronDown className="w-4 h-4 text-gray-400" />
                        </div>
                        <div className="flex items-center bg-[#f7f9fb] rounded px-4 py-2 justify-between">
                          <span>Experience 2</span>
                          <ChevronDown className="w-4 h-4 text-gray-400" />
                        </div>
                        <button className="mt-2 px-4 py-2 rounded bg-blue-50 text-blue-700 font-semibold border border-blue-200">Add Another Experience</button>
                      </div>
                    </div>
                    {/* Portfolio */}
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-3">Portfolio</h3>
                      <div className="flex flex-wrap gap-4 mb-2">
                        {[1,2,3,4,5].map(i => (
                          <div key={i} className="relative w-28 h-28 rounded overflow-hidden bg-gray-100">
                            <img src={`https://randomuser.me/api/portraits/lego/${i}.jpg`} alt="Portfolio" className="object-cover w-full h-full" />
                            <button className="absolute top-1 right-1 text-red-500 bg-white rounded-full"><XCircle className="w-4 h-4" /></button>
                          </div>
                        ))}
                      </div>
                      <button className="px-4 py-2 rounded bg-blue-50 text-blue-700 font-semibold border border-blue-200">Browse</button>
                    </div>
                    {/* Award */}
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-3">Award</h3>
                      <div className="space-y-2">
                        <div className="flex items-center bg-[#f7f9fb] rounded px-4 py-2 justify-between">
                          <span>Award 1</span>
                          <ChevronDown className="w-4 h-4 text-gray-400" />
                        </div>
                        <div className="flex items-center bg-[#f7f9fb] rounded px-4 py-2 justify-between">
                          <span>Award 2</span>
                          <ChevronDown className="w-4 h-4 text-gray-400" />
                        </div>
                        <button className="mt-2 px-4 py-2 rounded bg-blue-50 text-blue-700 font-semibold border border-blue-200">Add Another Award</button>
                      </div>
                    </div>
                    <div>
                      <button className="px-6 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">Save Resume</button>
                    </div>
                  </div>
                </section>
              )}
              {activeSidebar === 'Applied Jobs' && (
                <section className="bg-white rounded-xl shadow-sm p-6 mb-8 w-full">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-6">Applied Jobs</h2>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                    <div className="flex-1 max-w-xs">
                      <input type="text" placeholder="Search ..." className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 bg-[#f7f9fb]" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">Sort by:</span>
                      <select className="border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 bg-[#f7f9fb]">
                        <option>Newest</option>
                        <option>Oldest</option>
                      </select>
                    </div>
                  </div>
                  <div className="overflow-x-auto rounded-lg border border-gray-100 bg-[#f7f9fb]">
                    <table className="min-w-full text-sm">
                      <thead>
                        <tr className="text-gray-500 text-left bg-[#f7f9fb]">
                          <th className="px-6 py-3 font-semibold">Job Title</th>
                          <th className="px-6 py-3 font-semibold">Date Applied</th>
                          <th className="px-6 py-3 font-semibold">Status</th>
                          <th className="px-6 py-3 font-semibold">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        {appliedJobs.map((job, idx) => (
                          <tr key={idx} className="border-b border-gray-200 last:border-b-0">
                            <td className="px-6 py-4 flex items-center gap-3 min-w-[220px]">
                              <img src={job.logo} alt="logo" className="w-10 h-10 rounded" />
                              <div>
                                <div className="font-semibold text-gray-800">{job.title}</div>
                                <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                                  <span>{job.category}</span>
                                  <span>•</span>
                                  <span>{job.location}</span>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">{job.date}</td>
                            <td className="px-6 py-4">
                              <span className={job.status === 'Approved' ? 'text-green-500 font-semibold' : 'text-orange-500 font-semibold'}>{job.status}</span>
                            </td>
                            <td className="px-6 py-4 flex items-center gap-2">
                              <button className="bg-[#f7f9fb] p-2 rounded hover:bg-red-100"><XCircle className="w-5 h-5 text-blue-400" /></button>
                              <button className="bg-[#f7f9fb] p-2 rounded hover:bg-blue-100"><Eye className="w-5 h-5 text-blue-400" /></button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              )}
              {activeSidebar === 'Saved Jobs' && (
                <section className="bg-white rounded-xl shadow-sm p-6 mb-8 w-full">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-6">Jobs Shortlist</h2>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                    <div className="flex-1 max-w-xs">
                      <input type="text" placeholder="Search ..." className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 bg-[#f7f9fb]" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">Sort by:</span>
                      <select className="border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 bg-[#f7f9fb]">
                        <option>Newest</option>
                        <option>Oldest</option>
                      </select>
                    </div>
                  </div>
                  <div className="overflow-x-auto rounded-lg border border-gray-100 bg-[#f7f9fb]">
                    <table className="min-w-full text-sm">
                      <thead>
                        <tr className="text-gray-500 text-left bg-[#f7f9fb]">
                          <th className="px-6 py-3 font-semibold">Job Title</th>
                          <th className="px-6 py-3 font-semibold">Posted Date</th>
                          <th className="px-6 py-3 font-semibold">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        {savedJobs.map((job, idx) => (
                          <tr key={idx} className="border-b border-gray-200 last:border-b-0">
                            <td className="px-6 py-4 flex items-center gap-3 min-w-[220px]">
                              <img src={job.logo} alt="logo" className="w-10 h-10 rounded" />
                              <div>
                                <div className="font-semibold text-gray-800">{job.title}</div>
                                <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                                  <span>{job.category}</span>
                                  <span>•</span>
                                  <span>{job.location}</span>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">{job.date}</td>
                            <td className="px-6 py-4 flex items-center gap-2">
                              <button className="bg-[#f7f9fb] p-2 rounded hover:bg-red-100"><XCircle className="w-5 h-5 text-blue-400" /></button>
                              <button className="bg-[#f7f9fb] p-2 rounded hover:bg-blue-100"><Eye className="w-5 h-5 text-blue-400" /></button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              )}
              {activeSidebar === 'Job Alert' && (
                <section className="bg-white rounded-xl shadow-sm p-6 mb-8 w-full">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-6">Job Alerts</h2>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                    <div className="flex-1 max-w-xs">
                      <input type="text" placeholder="Search ..." className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 bg-[#f7f9fb]" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">Sort by:</span>
                      <select className="border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 bg-[#f7f9fb]">
                        <option>Newest</option>
                        <option>Oldest</option>
                      </select>
                    </div>
                  </div>
                  <div className="overflow-x-auto rounded-lg border border-gray-100 bg-[#f7f9fb]">
                    <table className="min-w-full text-sm">
                      <thead>
                        <tr className="text-gray-500 text-left bg-[#f7f9fb]">
                          <th className="px-6 py-3 font-semibold">Title</th>
                          <th className="px-6 py-3 font-semibold">Alert Query</th>
                          <th className="px-6 py-3 font-semibold">Number Jobs</th>
                          <th className="px-6 py-3 font-semibold">Times</th>
                          <th className="px-6 py-3 font-semibold">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        {jobAlerts.map((alert, idx) => (
                          <tr key={idx} className="border-b border-gray-200 last:border-b-0">
                            <td className="px-6 py-4 min-w-[180px]">{alert.title}</td>
                            <td className="px-6 py-4 min-w-[220px]">
                              {alert.query ? <span className="text-xs text-gray-700" dangerouslySetInnerHTML={{__html: alert.query}} /> : null}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">{alert.jobs}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{alert.times}</td>
                            <td className="px-6 py-4 flex items-center gap-2">
                              <button className="bg-[#f7f9fb] p-2 rounded hover:bg-red-100"><XCircle className="w-5 h-5 text-blue-400" /></button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              )}
              {activeSidebar === 'Message' && (
                <section className="bg-white rounded-xl shadow-sm p-6 mb-8 w-full">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-6">Messages</h2>
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Contacts List */}
                    <div className="w-full md:w-1/3 bg-[#f7f9fb] rounded-lg p-4 flex flex-col" style={{minWidth: 260, maxWidth: 340}}>
                      <input type="text" placeholder="Search Contacts..." className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white mb-4" />
                      <div className="flex gap-4 mb-4 text-sm">
                        <button className="text-blue-600 font-semibold">All</button>
                        <button className="text-gray-400">Read</button>
                        <button className="text-gray-400">Unread</button>
                      </div>
                      <div className="flex-1 overflow-y-auto">
                        {messagesContacts.map((c, idx) => (
                          <div key={idx} className="flex items-center gap-3 py-3 border-b border-gray-200 last:border-b-0 cursor-pointer hover:bg-gray-50">
                            {c.avatar ? (
                              <img src={c.avatar} alt={c.name} className="w-10 h-10 rounded-full" />
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-400"><User className="w-6 h-6" /></div>
                            )}
                            <div className="flex-1">
                              <div className="font-semibold text-gray-800 text-sm">{c.name}</div>
                              <div className="text-xs text-gray-500 truncate">{c.lastMessage || c.role}</div>
                            </div>
                            <div className="text-xs text-gray-400">{c.time}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Chat Area */}
                    <div className="flex-1 bg-white rounded-lg flex flex-col border border-gray-100">
                      {/* Chat Header */}
                      <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-400"><User className="w-6 h-6" /></div>
                          <div>
                            <div className="font-semibold text-gray-800 text-sm">admin</div>
                            <div className="text-xs text-gray-500">test</div>
                          </div>
                        </div>
                        <button className="text-red-500 text-xs font-semibold hover:underline">Delete Conversation</button>
                      </div>
                      {/* Chat Messages */}
                      <div className="flex-1 px-6 py-4 overflow-y-auto">
                        {messages.map((m, idx) => (
                          <div key={idx} className="mb-4 flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-400"><User className="w-5 h-5" /></div>
                            <div>
                              <div className="font-semibold text-gray-800 text-xs mb-1">{m.sender} <span className="text-gray-400 font-normal ml-2 text-xs">{m.time}</span></div>
                              <div className="bg-[#f7f9fb] rounded-lg px-4 py-2 text-sm text-gray-700">{m.text}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                      {/* Chat Input */}
                      <div className="border-t border-gray-100 px-6 py-4 flex items-center gap-4">
                        <input type="text" placeholder="Write your message..." className="flex-1 border-none bg-transparent focus:outline-none text-sm" />
                        <button className="px-6 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">Send</button>
                      </div>
                    </div>
                  </div>
                </section>
              )}
            </div>

            {/* Right Profile Sidebar and Featured Companies only for Overview */}
            {activeSidebar === 'Overview' && (
              <>
                <aside className="col-span-12 lg:col-span-4 flex justify-center">
                  <div className="bg-white rounded-xl shadow-sm p-5 md:p-6 w-full max-w-xs mx-auto flex flex-col items-center gap-2 sticky top-24">
                    <div className="relative mb-2">
                      <Image src="/images/wa.jpg" alt="User" width={72} height={72} className="rounded-full border-4 border-white shadow-md" />
                      <span className="absolute bottom-1 right-1 block h-4 w-4 rounded-full bg-green-500 border-2 border-white"></span>
                    </div>
                    <div className="font-bold text-lg text-gray-800 mt-1">David Heree</div>
                    <div className="text-sm text-gray-500 mb-2">UX Designer</div>
                    <div className="w-full border-t border-gray-100 my-2"></div>
                    <div className="mt-2 w-full">
                      <h3 className="font-semibold text-gray-800 mb-3 text-sm">Recent Activities</h3>
                      <ul className="text-sm text-gray-600 space-y-4">
                        <li className="flex items-start gap-3">
                          <div className="p-2 bg-purple-100 rounded-full"><Briefcase className="w-4 h-4 text-purple-600"/></div>
                          <div>Your application has been accepted in <span className="font-bold">3 Vacancy</span> <span className="block text-xs text-gray-400 mt-0.5">12h ago</span></div>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="p-2 bg-green-100 rounded-full"><Send className="w-4 h-4 text-green-600"/></div>
                          <div>Your application has been sent to <span className="font-bold">Maximoz</span> <span className="block text-xs text-gray-400 mt-0.5">1d ago</span></div>
                        </li>
                      </ul>
                      <button className="w-full text-center text-xs font-semibold text-gray-500 mt-4 hover:underline">View More</button>
                    </div>
                  </div>
                </aside>
                {/* Featured Companies */}
                <section className="mt-8 col-span-12">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">Organaisations Companies</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                    {featuredCompanies.map(comp => (
                      <div key={comp.name} className="bg-white p-5 rounded-xl shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                        <Image src={comp.logo} alt={comp.name} width={40} height={40} className="rounded-lg"/>
                        <span className="font-semibold text-gray-700 text-sm">{comp.name}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 