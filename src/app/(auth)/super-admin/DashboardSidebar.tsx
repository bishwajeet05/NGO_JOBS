"use client";
import { useRouter, usePathname } from 'next/navigation';
import {
  BarChart2, Briefcase, FileText, Users as UsersIcon, LayoutGrid, CreditCard, Bell, Settings as SettingsIcon, LifeBuoy, Layers, LogOut, Calendar
} from 'lucide-react';

const sidebarItems = [
  { icon: BarChart2, label: 'Dashboard', href: '/super-admin' },
  { icon: Briefcase, label: 'Add Jobs', href: '/super-admin/add-jobs' },
  { icon: FileText, label: 'All Jobs', href: '/super-admin/all-jobs' },
  { icon: FileText, label: 'Post Grant', href: '/super-admin/post-grant' },
  { icon: Calendar, label: 'Post Event', href: '/super-admin/Event' },
  { icon: FileText, label: 'Analytics', href: '/super-admin/analytics' },
  { icon: LayoutGrid, label: 'Applications', href: '/super-admin/applications' },
  { icon: CreditCard, label: 'Payments', href: '/super-admin/payments' },
  { icon: Bell, label: 'Notifications', href: '/super-admin/notifications' },
  { icon: SettingsIcon, label: 'Settings', href: '/super-admin/settings' },
  { icon: LifeBuoy, label: 'Support', href: '/super-admin/support' },
  { icon: Layers, label: 'Content', href: '/super-admin/content' },
  { icon: Layers, label: 'Integrations', href: '/super-admin/integrations' },
  { icon: LogOut, label: 'Log Out' },
];

export default function DashboardSidebar({ sidebarOpen, setSidebarOpen }: { sidebarOpen?: boolean, setSidebarOpen?: (open: boolean) => void }) {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-100 py-4 px-4 shadow-lg transform transition-transform duration-300 md:relative md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
    >
      <div className="mb-4 px-2 flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-2">
          <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-blue-600">
            <circle cx="12" cy="8" r="4" strokeWidth="2" />
            <path d="M4 20c0-2.21 3.58-4 8-4s8 1.79 8 4" strokeWidth="2" />
          </svg>
        </div>
        <div className="text-lg font-semibold text-gray-900">Super Admin</div>
        <div className="text-sm text-gray-500">India</div>
        <a href="/super-admin/profile" className="text-blue-600 text-sm mt-1 hover:underline">View Profile</a>
      </div>
      <nav className="flex flex-col gap-2 text-gray-600">
        {sidebarItems.map(item => (
          item.label === 'Log Out' ? (
            <button
              key={item.label}
              onClick={() => router.push('/signin')}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-semibold text-sm transition-colors w-full text-left hover:bg-gray-50 text-red-600`}
            >
              <item.icon className="w-5 h-5" /> {item.label}
            </button>
          ) : (
            <button
              key={item.label}
              onClick={() => item.href && router.push(item.href)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-semibold text-sm transition-colors w-full text-left hover:bg-blue-50/70 hover:text-blue-700 ${pathname && item.href && pathname === item.href ? 'bg-blue-50 text-blue-700 font-bold shadow-sm' : ''}`}
            >
              <item.icon className="w-5 h-5" /> {item.label}
            </button>
          )
        ))}
      </nav>
    </aside>
  );
} 