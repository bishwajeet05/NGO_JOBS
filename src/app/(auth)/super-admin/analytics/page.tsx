"use client";

import { useState } from "react";
import { BarChart2, FileText, TrendingUp, Users, MapPin, Download, Briefcase, User, Settings as SettingsIcon, LogOut, Users as UsersIcon, Bell, CreditCard, LifeBuoy, LayoutGrid, Layers, Menu } from "lucide-react";
import { useRouter } from 'next/navigation';
import DashboardSidebar from '../DashboardSidebar';

export default function AnalyticsPage() {
  // Placeholder state for future data
  const [exporting, setExporting] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
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
      {/* Sidebar - Mobile Drawer & Desktop */}
      <DashboardSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {/* Main Content */}
      <main className="flex-1 flex flex-col p-4 md:p-8">
        <h1 className="text-2xl font-bold mb-6">Analytics & Reports</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* User Signups */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex flex-col gap-2">
            <div className="flex items-center gap-2 mb-2">
              <UsersIcon className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold">User Signups</h2>
            </div>
            <p className="text-gray-600 text-sm mb-2">Track daily, weekly, and monthly user registrations.</p>
            <div className="h-32 flex items-center justify-center text-gray-400">[Signup Chart Placeholder]</div>
          </section>

          {/* Active Job Posts by Category/Location */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex flex-col gap-2">
            <div className="flex items-center gap-2 mb-2">
              <BarChart2 className="w-5 h-5 text-green-600" />
              <h2 className="text-lg font-semibold">Active Job Posts</h2>
            </div>
            <p className="text-gray-600 text-sm mb-2">See active jobs by category and location.</p>
            <div className="h-32 flex items-center justify-center text-gray-400">[Active Jobs Chart Placeholder]</div>
          </section>

          {/* Candidate Application Trends */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex flex-col gap-2">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              <h2 className="text-lg font-semibold">Candidate Application Trends</h2>
            </div>
            <p className="text-gray-600 text-sm mb-2">Monitor how candidate applications change over time.</p>
            <div className="h-32 flex items-center justify-center text-gray-400">[Application Trends Chart Placeholder]</div>
          </section>

          {/* Traffic Sources & Page Views */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex flex-col gap-2">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-5 h-5 text-orange-600" />
              <h2 className="text-lg font-semibold">Traffic Sources & Page Views</h2>
            </div>
            <p className="text-gray-600 text-sm mb-2">View traffic sources and page views (if analytics is integrated).</p>
            <div className="h-32 flex items-center justify-center text-gray-400">[Traffic Sources Chart Placeholder]</div>
          </section>
        </div>

        {/* Export Data */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mt-6 flex flex-col gap-2 max-w-md">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-semibold">Export Data</h2>
          </div>
          <p className="text-gray-600 text-sm mb-2">Download analytics as CSV or PDF.</p>
          <div className="flex gap-4">
            <button
              className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors disabled:opacity-50"
              disabled={exporting}
              onClick={() => setExporting(true)}
            >
              <Download className="w-4 h-4" /> Export CSV
            </button>
            <button
              className="flex items-center gap-2 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors disabled:opacity-50"
              disabled={exporting}
              onClick={() => setExporting(true)}
            >
              <Download className="w-4 h-4" /> Export PDF
            </button>
          </div>
        </section>
      </main>
    </div>
  );
} 