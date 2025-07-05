"use client";
import { CreditCard, FileText, Star } from "lucide-react";
import DashboardSidebar from '../DashboardSidebar';
import { useState } from 'react';
export default function PaymentsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="min-h-screen bg-[#f6f8fb] flex flex-col md:flex-row">
      <DashboardSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <main className="flex-1 flex flex-col p-4 md:p-8">
        <h1 className="text-2xl font-bold mb-6">Payment & Subscription Management</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Transaction history */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex flex-col gap-2">
            <div className="flex items-center gap-2 mb-2">
              <CreditCard className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold">Transaction History</h2>
            </div>
            <div className="h-24 flex items-center justify-center text-gray-400">[Transaction Table Placeholder]</div>
          </section>
          {/* Manage subscription plans */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex flex-col gap-2">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-5 h-5 text-green-600" />
              <h2 className="text-lg font-semibold">Subscription Plans</h2>
            </div>
            <div className="h-24 flex items-center justify-center text-gray-400">[Subscription Plans Placeholder]</div>
          </section>
          {/* Download invoices/payment logs */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex flex-col gap-2 md:col-span-2">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-5 h-5 text-purple-600" />
              <h2 className="text-lg font-semibold">Invoices & Payment Logs</h2>
            </div>
            <div className="h-24 flex items-center justify-center text-gray-400">[Invoices/Logs Download Placeholder]</div>
          </section>
        </div>
      </main>
    </div>
  );
} 