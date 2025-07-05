'use client';
import React from 'react';
import { User, Briefcase, PlusCircle, Users, Star, Bell, Package, Calendar, Key, Trash2, LogOut, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const sidebarItems = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/employer/dashboard' },
  { label: 'Profile', icon: User, href: '/employer/profile' },
  { label: 'My Jobs', icon: Briefcase, href: '/employer/my-jobs' },
  { label: 'Submit Jobs', icon: PlusCircle, href: '/employer/submit-jobs' },
  { label: 'Applications', icon: Users, href: '/employer/applications' },
  { label: 'Shortlist Candidates', icon: Star, href: '/employer/shortlist-candidates' },
  { label: 'Candidate Alerts', icon: Bell, href: '/employer/candidate-alerts' },
  { label: 'Packages', icon: Package, href: '/employer/packages' },
  { label: 'Change Password', icon: Key, href: '/employer/change-password' },
  { label: 'Delete Profile', icon: Trash2, href: '/employer/delete-profile' },
  { label: 'Logout', icon: LogOut, href: '/logout' },
];

export default function EmployerSidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-64 bg-white border-r border-gray-100 py-4 px-4 shadow-lg flex flex-col min-h-screen pt-8">
      <div className="mb-4 px-2 flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-2">
          <User size={36} className="text-blue-600" />
        </div>
        <span className="text-lg font-semibold text-gray-900">Employer</span>
        <span className="text-sm text-gray-500">New York</span>
        <Link href="/employer/profile" className="text-blue-600 text-sm mt-1 hover:underline">View Profile</Link>
      </div>
      <nav className="flex flex-col gap-2 text-gray-600">
        {sidebarItems.map(({ label, icon: Icon, href }) => (
          <Link
            key={label}
            href={href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-semibold text-sm transition-colors w-full text-left hover:bg-blue-50/70 hover:text-blue-700 ${label === 'Logout' ? 'text-red-600 hover:bg-gray-50' : ''} ${pathname === href && label !== 'Logout' ? 'bg-blue-50 text-blue-700 font-bold shadow-sm' : ''}`}
          >
            <Icon className="w-5 h-5" /> {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
} 