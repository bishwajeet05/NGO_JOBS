"use client";
import { Bell, Mail, FileText } from "lucide-react";
import DashboardSidebar from '../DashboardSidebar';
import { useState } from 'react';
export default function NotificationsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="min-h-screen bg-[#f6f8fb] flex flex-col md:flex-row">
      <DashboardSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <main className="flex-1 flex flex-col p-4 md:p-8">
        <h1 className="text-2xl font-bold mb-6">Notifications & Communication</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* System-wide announcements */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex flex-col gap-2">
            <div className="flex items-center gap-2 mb-2">
              <Bell className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold">System Announcements</h2>
            </div>
            <div className="h-24 flex items-center justify-center text-gray-400">[Announcement Form Placeholder]</div>
          </section>
          {/* Email users */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex flex-col gap-2">
            <div className="flex items-center gap-2 mb-2">
              <Mail className="w-5 h-5 text-green-600" />
              <h2 className="text-lg font-semibold">Email Users</h2>
            </div>
            <div className="h-24 flex items-center justify-center text-gray-400">[Email Form/Bulk Email Placeholder]</div>
          </section>
          {/* Manage email templates */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex flex-col gap-2 md:col-span-2">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-5 h-5 text-purple-600" />
              <h2 className="text-lg font-semibold">Email Templates</h2>
            </div>
            <div className="h-24 flex items-center justify-center text-gray-400">[Email Templates Placeholder]</div>
          </section>
        </div>
      </main>
    </div>
  );
} 