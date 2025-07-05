"use client";
import { Settings as SettingsIcon, Globe, Mail, FileText, ToggleLeft } from "lucide-react";
import DashboardSidebar from '../DashboardSidebar';
import { useState } from 'react';

export default function SettingsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="min-h-screen bg-[#f6f8fb] flex flex-col md:flex-row">
      <DashboardSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <main className="flex-1 flex flex-col p-4 md:p-8">
        <h1 className="text-2xl font-bold mb-6">Site Settings</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Site title, logo, favicon */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex flex-col gap-2">
            <div className="flex items-center gap-2 mb-2">
              <Globe className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold">Site Title, Logo & Favicon</h2>
            </div>
            <div className="h-24 flex items-center justify-center text-gray-400">[Site Info Form Placeholder]</div>
          </section>
          {/* Email server settings */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex flex-col gap-2">
            <div className="flex items-center gap-2 mb-2">
              <Mail className="w-5 h-5 text-green-600" />
              <h2 className="text-lg font-semibold">Email Server Settings</h2>
            </div>
            <div className="h-24 flex items-center justify-center text-gray-400">[Email Server Settings Placeholder]</div>
          </section>
          {/* Privacy policy, Terms of use */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex flex-col gap-2">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-5 h-5 text-purple-600" />
              <h2 className="text-lg font-semibold">Privacy Policy & Terms of Use</h2>
            </div>
            <div className="h-24 flex items-center justify-center text-gray-400">[Policy/Terms Editor Placeholder]</div>
          </section>
          {/* Enable/disable registration or job posting */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex flex-col gap-2">
            <div className="flex items-center gap-2 mb-2">
              <ToggleLeft className="w-5 h-5 text-orange-600" />
              <h2 className="text-lg font-semibold">Enable/Disable Registration or Job Posting</h2>
            </div>
            <div className="h-24 flex items-center justify-center text-gray-400">[Toggle Controls Placeholder]</div>
          </section>
        </div>
      </main>
    </div>
  );
} 