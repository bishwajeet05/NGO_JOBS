"use client";
import { useEffect, useState } from "react";
import EmployerSidebar from '../EmployerSidebar';
import { Menu, Edit, Trash2 } from 'lucide-react';
import Image from 'next/image';

const EMPLOYER_ID = "demo-employer-id"; // TODO: Replace with real session user id

export default function MyGrantsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [grants, setGrants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingGrant, setEditingGrant] = useState<any>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/grants?employer_id=${EMPLOYER_ID}`)
      .then(res => res.json())
      .then(data => {
        setGrants(data);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this grant?")) return;
    const res = await fetch('/api/grants', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, employer_id: EMPLOYER_ID }),
    });
    if (res.ok) {
      setGrants(grants.filter(g => g.id !== id));
    } else {
      alert("Failed to delete grant");
    }
  };

  const handleEdit = async (grant: any) => {
    setEditingGrant(grant);
  };

  const handleSaveEdit = async (updated: any) => {
    const res = await fetch('/api/grants', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...updated, employer_id: EMPLOYER_ID }),
    });
    if (res.ok) {
      setGrants(grants.map(g => (g.id === updated.id ? updated : g)));
      setEditingGrant(null);
    } else {
      alert("Failed to update grant");
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f8fb] flex flex-col md:flex-row">
      <header className="md:hidden flex items-center justify-between bg-white px-4 py-3 shadow-sm sticky top-0 z-30">
        <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-md hover:bg-gray-100">
          <Menu className="w-6 h-6 text-indigo-600" />
        </button>
        <span className="font-extrabold text-lg text-gray-800">Employer Dashboard</span>
        <Image src="/images/wa.jpg" alt="User" width={36} height={36} className="rounded-full border-2 border-indigo-200" />
      </header>
      <EmployerSidebar />
      <main className="flex-1 flex flex-col p-4 md:p-8">
        <h2 className="text-2xl font-bold mb-6 text-blue-900">My Grants / Proposals</h2>
        {loading ? (
          <div>Loading...</div>
        ) : grants.length === 0 ? (
          <div className="text-gray-500">No grants posted yet.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {grants.map(grant => (
              <div key={grant.id} className="bg-white rounded-xl shadow p-6 flex flex-col gap-2 border border-blue-100">
                <div className="flex items-center gap-4 mb-2">
                  <Image src="/images/download.jpeg" alt={grant.title} width={80} height={80} className="rounded-lg object-cover" />
                  <div>
                    <h3 className="font-bold text-lg text-blue-900 mb-1">{grant.title}</h3>
                    <div className="text-sm text-gray-600">{grant.organization}</div>
                    <div className="text-xs text-gray-500">{grant.type} | {grant.sector}</div>
                  </div>
                </div>
                <div className="text-gray-700 text-base mb-2 line-clamp-2">{grant.description}</div>
                <div className="flex gap-3 mt-2">
                  <button onClick={() => handleEdit(grant)} className="flex items-center gap-1 px-4 py-1.5 rounded bg-yellow-100 text-yellow-800 font-semibold text-sm hover:bg-yellow-200"><Edit className="w-4 h-4" /> Edit</button>
                  <button onClick={() => handleDelete(grant.id)} className="flex items-center gap-1 px-4 py-1.5 rounded bg-red-100 text-red-800 font-semibold text-sm hover:bg-red-200"><Trash2 className="w-4 h-4" /> Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
        {/* TODO: Show edit form modal if editingGrant is set */}
      </main>
    </div>
  );
} 